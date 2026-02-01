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
        
        # Read only necessary columns to optimize performance
        # We need network column to filter out 'No service'
        df = pd.read_csv(file_path)
        
        # Check if required columns exist
        available_cols = df.columns.tolist()
        required_cols = [col_bler, col_mcs, col_cqi]
        for col in required_cols:
            if col not in available_cols:
                print(f"Warning: Column '{col}' not found in {file_path}")
                # Return empty stats if columns are missing
                return {}

        # 1. Filter out rows where network is 'No service' or NaN
        # Also ensure we only take rows where at least one of our target KPIs has a value
        if col_network in df.columns:
            df = df[df[col_network].astype(str).str.lower() != 'no service'].copy()
        
        # Drop rows where all target KPIs are NaN
        df = df.dropna(subset=required_cols, how='all').reset_index(drop=True)
        
        if df.empty:
            return {}

        # 2. Convert to numeric, errors='coerce' turns non-numeric to NaN
        for col in required_cols:
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
            if not seg_df.empty:
                results[seg_name] = {
                    "AVG BLER": round(seg_df[col_bler].mean(), 2) if pd.notna(seg_df[col_bler].mean()) else 0,
                    "AVG MCS": round(seg_df[col_mcs].mean(), 2) if pd.notna(seg_df[col_mcs].mean()) else 0,
                    "AVG CQI": round(seg_df[col_cqi].mean(), 2) if pd.notna(seg_df[col_cqi].mean()) else 0
                }
            else:
                results[seg_name] = {
                    "AVG BLER": 0,
                    "AVG MCS": 0,
                    "AVG CQI": 0
                }
                
        return results

    except Exception as e:
        print(f"Error analyzing secondary KPIs for {file_path}: {e}")
        return {}

if __name__ == "__main__":
    # Test logic
    test_file = r"d:\ReportGenerator\Raw Data\Coverage Performance\5G VoNR Coverage Test\n25\DUT2_Run1.csv"
    if os.path.exists(test_file):
        print(f"Testing analysis for: {test_file}")
        res = analyze_secondary_kpis(test_file)
        import json
        print(json.dumps(res, indent=4))
