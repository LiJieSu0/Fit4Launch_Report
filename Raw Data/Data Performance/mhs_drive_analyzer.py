import pandas as pd
import numpy as np
import sys
import os
import json

def analyze_csv(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return None

    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        print(f"Error reading CSV file {file_path}: {e}")
        return None

    # Helper function to get column name safely
    def get_column(df, potential_names):
        for name in potential_names:
            if name in df.columns:
                return name
        return None

    # Function to calculate statistics for a series
    def calculate_series_stats(series, stats_type='average'):
        if series.empty:
            return None
        if stats_type == 'average':
            return series.mean()
        elif stats_type == 'full':
            return {
                "Mean": series.mean(),
                "Standard Deviation": series.std() if len(series) > 1 else 0, # std dev requires at least 2 data points
                "Minimum": series.min(),
                "Maximum": series.max(),
                "Number of Intervals": len(series)
            }
        elif stats_type == 'rtt':
            return {
                "min": series.min(),
                "max": series.max(),
                "avg": series.mean(),
                "std_dev": series.std() if len(series) > 1 else 0
            }
        return None

    # Define columns for analysis
    dl_jitter_cols = ["[Call Test] [iPerf] [Throughput] DL Jitter"]
    ul_jitter_cols = ["[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Jitter"]
    ul_error_ratio_cols = ["[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Error Ratio"]
    dl_error_ratio_cols = ["[Call Test] [iPerf] [Throughput] DL Error Ratio"]
    rtt_cols = ["[Call Test] [PING] [RTT] RTT"]
    app_dl_tp_cols = ["[Call Test] [Throughput] Application DL TP"]
    app_ul_tp_cols = ["[Call Test] [iPerf] [Call Average] [Throughput] UL Avg TP"]

    # Initialize structured results
    structured_results = {
        "Device Type": "Unknown",
        "Analysis Direction": "Unknown",
        "Protocol Type": "UDP",
        "Network Type": "5G",
        "Analysis Type": "data_performance",
        "Throughput": {},
        "Jitter": {},
        "Error Ratio": {},
        "Ping RTT": {}
    }

    # Determine Device Type and Analysis Direction from file name
    file_name = os.path.basename(file_path).lower()
    if "dut" in file_name:
        structured_results["Device Type"] = "DUT"
        structured_results["Analysis Direction"] = "DL" # Assuming DL for DUT based on example
    elif "ref" in file_name:
        structured_results["Device Type"] = "REF"
        structured_results["Analysis Direction"] = "DL" # Assuming DL for REF based on example
    
    # DL Jitter
    dl_jitter_col = get_column(df, dl_jitter_cols)
    if dl_jitter_col:
        dl_jitter_series = pd.to_numeric(df[dl_jitter_col], errors='coerce').dropna()
        if not dl_jitter_series.empty:
            structured_results["Jitter"]["DL Mean"] = calculate_series_stats(dl_jitter_series, 'average')

    # UL Jitter
    ul_jitter_col = get_column(df, ul_jitter_cols)
    if ul_jitter_col:
        ul_jitter_series = pd.to_numeric(df[ul_jitter_col], errors='coerce').dropna()
        if not ul_jitter_series.empty:
            structured_results["Jitter"]["UL Mean"] = calculate_series_stats(ul_jitter_series, 'average')

    # UL Error Ratio
    ul_error_ratio_col = get_column(df, ul_error_ratio_cols)
    if ul_error_ratio_col:
        ul_error_ratio_series = pd.to_numeric(df[ul_error_ratio_col], errors='coerce').dropna()
        if not ul_error_ratio_series.empty:
            structured_results["Error Ratio"]["UL Mean"] = calculate_series_stats(ul_error_ratio_series, 'average')

    # DL Error Ratio
    dl_error_ratio_col = get_column(df, dl_error_ratio_cols)
    if dl_error_ratio_col:
        dl_error_ratio_series = pd.to_numeric(df[dl_error_ratio_col], errors='coerce').dropna()
        if not dl_error_ratio_series.empty:
            structured_results["Error Ratio"]["DL Mean"] = calculate_series_stats(dl_error_ratio_series, 'average')

    # RTT
    rtt_col = get_column(df, rtt_cols)
    if rtt_col:
        rtt_series = pd.to_numeric(df[rtt_col], errors='coerce').dropna()
        if not rtt_series.empty:
            structured_results["Ping RTT"] = calculate_series_stats(rtt_series, 'rtt')

    # Application DL TP
    app_dl_tp_col = get_column(df, app_dl_tp_cols)
    if app_dl_tp_col:
        app_dl_tp_series = pd.to_numeric(df[app_dl_tp_col], errors='coerce').dropna()
        if not app_dl_tp_series.empty:
            structured_results["Throughput"]["DL"] = calculate_series_stats(app_dl_tp_series, 'full')

    # Application UL TP
    app_ul_tp_col = get_column(df, app_ul_tp_cols)
    if app_ul_tp_col:
        app_ul_tp_series = pd.to_numeric(df[app_ul_tp_col], errors='coerce').dropna()
        if not app_ul_tp_series.empty:
            structured_results["Throughput"]["UL"] = calculate_series_stats(app_ul_tp_series, 'full')

    return structured_results

if __name__ == "__main__":
    base_path = "Raw Data/Data Performance/5G AUTO DP/5G Auto Data Test MHS Drive"
    dut_file_path = os.path.join(base_path, "DUT MHS UDP Drive.csv")
    ref_file_path = os.path.join(base_path, "REF MHS UDP Drive.csv")

    combined_results = {
        "5G Auto Data Test MHS Drive": {}
    }

    # Analyze DUT file
    dut_analysis = analyze_csv(dut_file_path)
    if dut_analysis:
        combined_results["5G Auto Data Test MHS Drive"]["DUT UDP DL"] = dut_analysis
    else:
        print(f"Could not perform analysis for {dut_file_path}", file=sys.stderr)

    # Analyze REF file
    ref_analysis = analyze_csv(ref_file_path)
    if ref_analysis:
        combined_results["5G Auto Data Test MHS Drive"]["REF UDP DL"] = ref_analysis
    else:
        print(f"Could not perform analysis for {ref_file_path}", file=sys.stderr)

    print(json.dumps(combined_results, indent=4, ensure_ascii=False))
