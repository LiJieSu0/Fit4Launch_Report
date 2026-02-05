import pandas as pd
import numpy as np
import os

def analyze_secondary_kpis(file_path):
    """
    Analyzes BLER, MCS, and CQI from a CSV file.
    Splits the data into First 30%, Middle 40%, and Last 30% segments and calculates averages.
    """
    try:
        # Define necessary columns
        col_bler = '[NR5G] [BLER & HARQ] PDSCH BLER'
        col_mcs = '[NR5G] [PCC] [PUSCH] [Modulation] MCS (Avg)'
        col_cqi = '[NR5G] [Quality Report] [CQI] WB CQI (Avg)'
        col_network = '[General] Serving Network'
        
        # Tx Power Columns
        col_tx_power_lte = '[LTE] [Power] [Tx Power] Tx power (PUSCH Total)'
        col_tx_power_5g = '[NR5G] [Power] Tx power (Total)'
        
        # Read only necessary columns to optimize performance
        # We need network column to filter out 'No service'
        df = pd.read_csv(file_path)
        
        # Check available columns
        available_cols = df.columns.tolist()
        
        # Identify which Tx Power column to use
        tx_power_col = None
        norm_path = file_path.lower()
        
        # Priority 1: Path contains "Coverage" and "LTE" -> FORCE use of LTE Header
        if "coverage" in norm_path and "lte" in norm_path:
            if col_tx_power_lte in available_cols:
                tx_power_col = col_tx_power_lte
        
        # Priority 2: Fallback to existing logic for NR or other cases
        elif col_tx_power_5g in available_cols:
            tx_power_col = col_tx_power_5g

        # Core required columns for segmentation (if any of these exist, we do segmentation)
        seg_cols = [col_bler, col_mcs, col_cqi]
        present_seg_cols = [c for c in seg_cols if c in available_cols]
        
        # If no target columns are found at all, return empty
        if not present_seg_cols and not tx_power_col:
            return {}

        # 1. Filter out rows where network is 'No service' or NaN
        # Also ensure we only take rows where at least one of our target KPIs has a value
        if col_network in df.columns:
            df = df[df[col_network].astype(str).str.lower() != 'no service'].copy()
        
        # Drop rows where all target KPIs are NaN (including TxPower if present)
        all_potential_cols = seg_cols + ([tx_power_col] if tx_power_col else [])
        present_cols = [c for c in all_potential_cols if c in df.columns]
        df = df.dropna(subset=present_cols, how='all').reset_index(drop=True)
        
        if df.empty:
            return {}

        # 2. Convert to numeric, errors='coerce' turns non-numeric to NaN
        for col in present_cols:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        total_rows = len(df)
        
        # 3. Calculate segment boundaries
        # First 30%, Middle 40%, Last 30%
        idx30 = int(total_rows * 0.3)
        idx70 = int(total_rows * 0.7)
        
        segments = {
            "First 30%": df.iloc[:idx30] if idx30 > 0 else pd.DataFrame(),
            "Middle 40%": df.iloc[idx30:idx70] if idx70 > idx30 else pd.DataFrame(),
            "Last 30%": df.iloc[idx70:] if total_rows > idx70 else pd.DataFrame()
        }
        
        results = {}
        
        for seg_name, seg_df in segments.items():
            results[seg_name] = {}
            if not seg_df.empty:
                if col_bler in available_cols:
                    results[seg_name]["AVG BLER"] = round(seg_df[col_bler].mean(), 2) if pd.notna(seg_df[col_bler].mean()) else 0
                if col_mcs in available_cols:
                    results[seg_name]["AVG MCS"] = round(seg_df[col_mcs].mean(), 2) if pd.notna(seg_df[col_mcs].mean()) else 0
                if col_cqi in available_cols:
                    results[seg_name]["AVG CQI"] = round(seg_df[col_cqi].mean(), 2) if pd.notna(seg_df[col_cqi].mean()) else 0
                if tx_power_col:
                    results[seg_name]["AVG TxPower"] = round(seg_df[tx_power_col].mean(), 2) if pd.notna(seg_df[tx_power_col].mean()) else 0
            else:
                if col_bler in available_cols: results[seg_name]["AVG BLER"] = 0
                if col_mcs in available_cols: results[seg_name]["AVG MCS"] = 0
                if col_cqi in available_cols: results[seg_name]["AVG CQI"] = 0
                if tx_power_col: results[seg_name]["AVG TxPower"] = 0

        # 4. Global Average Tx Power (if available)
        if tx_power_col:
            avg_tx_power = df[tx_power_col].mean()
            results["TxPower"] = round(avg_tx_power, 2) if pd.notna(avg_tx_power) else 0
                
        return results

    except Exception as e:
        print(f"Error analyzing secondary KPIs for {file_path}: {e}")
        return {}

if __name__ == "__main__":
    test_files = [
        r"d:\ReportGenerator\Raw Data\Seattle\Coverage Performance\5G VoNR Coverage Test\n25\_20260125_121112_CH01_TMO_5GNR_Coverage_DUT-N25_R1.csv",
        r"d:\ReportGenerator\Raw Data\Seattle\Coverage Performance\LTE Coverage Test\b66\_20260128_180911_CH01_TMO_LTE_B66_DUT-1_R2.csv"
    ]
    for test_file in test_files:
        if os.path.exists(test_file):
            print(f"\nTesting analysis for: {test_file}")
            res = analyze_secondary_kpis(test_file)
            import json
            print(json.dumps(res, indent=4))
