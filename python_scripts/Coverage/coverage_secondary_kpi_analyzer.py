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
        
        # LTE Headers
        col_bler_lte = '[LTE] [L1] [BLER] PDSCH BLER'
        col_mcs_lte = '[LTE-A] [PCell] [L1] [MCS] DL MCS (TB0 & TB1 - Avg)'
        
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
            
            # Select LTE Headers for Segments
            target_bler = col_bler_lte
            target_mcs = col_mcs_lte
            target_cqi = col_cqi # Default to 5G CQI? Or maybe LTE has different CQI? Keeping as is for now if not specified.
        
        # Priority 2: Fallback to existing logic for NR or other cases
        elif col_tx_power_5g in available_cols:
            tx_power_col = col_tx_power_5g
            target_bler = col_bler
            target_mcs = col_mcs
            target_cqi = col_cqi
        
        else:
            # Default to 5G headers if no specific condition met
            target_bler = col_bler
            target_mcs = col_mcs
            target_cqi = col_cqi

        # Core required columns for segmentation (if any of these exist, we do segmentation)
        seg_cols = [target_bler, target_mcs, target_cqi]
        present_seg_cols = [c for c in seg_cols if c in available_cols]
        
        # If no target columns are found at all, return empty
        if not present_seg_cols and not tx_power_col:
            return {}

        # 0. Truncate Data at First "No Service" (Refined Logic Tech Specific)
        if col_network in df.columns:
            service_started = False
            first_no_service_index = None
            
            # Determine Technology Mode based on file path (heuristic)
            is_lte_mode = "lte" in file_path.lower()
            
            for idx, row in df.iterrows():
                network_status = str(row[col_network]).lower()
                
                # Check for valid service based on mode
                if not service_started:
                    if is_lte_mode:
                        if "lte" in network_status:
                            service_started = True
                    else:
                        # 5G Mode - Wait for NR SA
                        if "nr sa" in network_status:
                            service_started = True
                
                # If service has started, and we hit 'no service', this is our cut-off
                if service_started and network_status == 'no service':
                    first_no_service_index = idx
                    # print(f"Found Cut-off No Service at index {first_no_service_index}")
                    break
            
            if first_no_service_index is not None:
                # Keep only data BEFORE the first No Service (after valid service started)
                df = df.iloc[:first_no_service_index].copy()
        
        if df.empty:
            return {}

        # 1. Filter out rows where network is 'No Service' or NaN (Existing Logic - still good for random bad rows before the drop)
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

        # Apply Power Class filtering for Tx Power - ONLY for HPUE tests
        if "HPUE" in file_path.upper() and tx_power_col and tx_power_col in df.columns:
            filename = os.path.basename(file_path).upper()
            if 'PC2' in filename:
                df.loc[df[tx_power_col] > 26, tx_power_col] = np.nan
            elif 'PC3' in filename:
                df.loc[df[tx_power_col] > 24, tx_power_col] = np.nan

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
                if target_bler in available_cols:
                    results[seg_name]["AVG BLER"] = round(seg_df[target_bler].mean(), 2) if pd.notna(seg_df[target_bler].mean()) else 0
                if target_mcs in available_cols:
                    results[seg_name]["AVG MCS"] = round(seg_df[target_mcs].mean(), 2) if pd.notna(seg_df[target_mcs].mean()) else 0
                if target_cqi in available_cols:
                    results[seg_name]["AVG CQI"] = round(seg_df[target_cqi].mean(), 2) if pd.notna(seg_df[target_cqi].mean()) else 0
                if tx_power_col:
                    results[seg_name]["AVG TxPower"] = round(seg_df[tx_power_col].mean(), 2) if pd.notna(seg_df[tx_power_col].mean()) else 0
            else:
                if target_bler in available_cols: results[seg_name]["AVG BLER"] = 0
                if target_mcs in available_cols: results[seg_name]["AVG MCS"] = 0
                if target_cqi in available_cols: results[seg_name]["AVG CQI"] = 0
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
