import pandas as pd
import os
import re
import sys

# Add the 'Scripts' directory to sys.path to enable imports from it
script_dir = os.path.dirname(os.path.abspath(__file__))
scripts_parent_dir = os.path.dirname(script_dir) # This is 'Scripts' directory
if scripts_parent_dir not in sys.path:
    sys.path.insert(0, scripts_parent_dir)

# Import necessary functions from data_performance_statics.py and ping_statics.py
from data_performance_statics import _clean_header, _calculate_statistics, analyze_throughput, analyze_jitter, analyze_error_ratio
# Removed _find_related_ping_file as it's no longer needed for MHS Drive Ping RTT
# import ping_statics # No longer needed if Ping RTT is calculated directly from MHS file

def analyze_mhs_drive_data(file_path, device_type_detected):
    """
    Analyzes MHS Test Drive Data for Throughput, Jitter, Error Ratio, and Ping RTT.
    
    Args:
        file_path (str): The path to the MHS UDP Drive CSV file (DUT or REF).
        device_type_detected (str): "DUT" or "REF"
        
    Returns:
        dict: A dictionary containing the calculated statistics.
    """
    
    all_mhs_stats = {}

    # Define parameters for MHS UDP Drive analysis
    # These are derived from the _determine_analysis_parameters in data_performance_statics.py
    # and adjusted for the specific MHS UDP Drive context.
    
    # Common event columns for UDP
    event_col = _clean_header("[Event][Data call test detail events]IPERF Call Event")
    event_col_fallback = _clean_header("[Event] [Data call test detail events] IPERF Call Event")
    start_event = "IPERF_T_Start"
    end_event = "IPERF_T_End"

    # --- Throughput Analysis (DL and UL) ---
    # DL Throughput
    dl_throughput_col = _clean_header("[Call Test] [Throughput] Application DL TP")
    dl_throughput_fallback_col = _clean_header("[NR5G] [(NR + LTE)] [Throughput] PDSCH TP")
    dl_throughput_third_fallback_col = _clean_header("DL TP (excl. slow start)")
    
    dl_throughput_stats = analyze_throughput(
        file_path, dl_throughput_col, event_col, start_event, end_event,
        fallback_column_name=dl_throughput_fallback_col,
        fallback_event_col_name=event_col_fallback,
        third_fallback_column_name=dl_throughput_third_fallback_col
    )
    if dl_throughput_stats:
        all_mhs_stats["DL Throughput"] = dl_throughput_stats

    # UL Throughput
    ul_throughput_col = _clean_header("[Call Test] [Throughput] Application UL TP")
    ul_throughput_fallback_col = _clean_header("[NR5G] [Throughput] PUSCH TP")
    ul_throughput_third_fallback_col = _clean_header("UL Avg TP")
    
    ul_throughput_stats = analyze_throughput(
        file_path, ul_throughput_col, event_col, start_event, end_event,
        fallback_column_name=ul_throughput_fallback_col,
        fallback_event_col_name=event_col_fallback,
        third_fallback_column_name=ul_throughput_third_fallback_col
    )
    if ul_throughput_stats:
        all_mhs_stats["UL Throughput"] = ul_throughput_stats

    # --- Jitter Analysis (DL and UL) ---
    # DL Jitter
    dl_jitter_col = _clean_header("[Call Test] [iPerf] [Throughput] DL Jitter")
    dl_jitter_stats = analyze_jitter(
        file_path, dl_jitter_col, event_col, start_event, end_event,
        fallback_event_col_name=event_col_fallback
    )
    if dl_jitter_stats:
        all_mhs_stats["DL Jitter"] = dl_jitter_stats

    # UL Jitter
    ul_jitter_col = _clean_header("[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Jitter")
    ul_jitter_stats = analyze_jitter(
        file_path, ul_jitter_col, event_col, start_event, end_event,
        fallback_event_col_name=event_col_fallback
    )
    if ul_jitter_stats:
        all_mhs_stats["UL Jitter"] = ul_jitter_stats

    # --- Error Ratio Analysis (DL and UL) ---
    # DL Error Ratio
    dl_error_ratio_col = _clean_header("[Call Test] [iPerf] [Throughput] DL Error Ratio")
    dl_error_ratio_stats = analyze_error_ratio(
        file_path, dl_error_ratio_col, event_col, start_event, end_event,
        fallback_event_col_name=event_col_fallback
    )
    if dl_error_ratio_stats:
        all_mhs_stats["DL Error Ratio"] = dl_error_ratio_stats

    # UL Error Ratio
    ul_error_ratio_col = _clean_header("[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Error Ratio")
    ul_error_ratio_stats = analyze_error_ratio(
        file_path, ul_error_ratio_col, event_col, start_event, end_event,
        fallback_event_col_name=event_col_fallback
    )
    if ul_error_ratio_stats:
        all_mhs_stats["UL Error Ratio"] = ul_error_ratio_stats


    # --- Ping RTT Analysis ---
    # Ping RTT column is directly in the MHS Drive file
    ping_rtt_col = _clean_header("[Call Test] [PING] [RTT] RTT")
    
    try:
        data = pd.read_csv(file_path)
        data.columns = [_clean_header(col) for col in data.columns]

        if ping_rtt_col in data.columns:
            ping_rtt_data = data[ping_rtt_col].dropna()
            if not ping_rtt_data.empty:
                ping_stats_result = _calculate_statistics(ping_rtt_data, ping_rtt_col)
                if ping_stats_result:
                    all_mhs_stats["Ping RTT"] = {
                        "Mean": ping_stats_result["Mean"],
                        "Min": ping_stats_result["Minimum"],
                        "Max": ping_stats_result["Maximum"],
                        "Std Dev": ping_stats_result["Standard Deviation"]
                    }
            else:
                print(f"No valid Ping RTT data found in column '{ping_rtt_col}' for {file_path}.")
        else:
            print(f"Ping RTT column '{ping_rtt_col}' not found in {file_path}.")
    except Exception as e:
        print(f"Error reading file {file_path} for Ping RTT analysis: {e}")

    return all_mhs_stats

if __name__ == "__main__":
    # Example usage for testing
    # Create dummy files for testing
    dummy_raw_data_dir = "Raw Data"
    dummy_mhs_dir = os.path.join(dummy_raw_data_dir, "Data Performance", "5G AUTO DP", "5G Auto Data Test MHS Drive")
    os.makedirs(dummy_mhs_dir, exist_ok=True)

    # Create dummy DUT MHS UDP Drive.csv with Ping RTT data
    dut_mhs_udp_content = """Time,Event,IPERF Call Event,[Call Test] [Throughput] Application DL TP,[Call Test] [Throughput] Application UL TP,[Call Test] [iPerf] [Throughput] DL Jitter,[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Jitter,[Call Test] [iPerf] [Throughput] DL Error Ratio,[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Error Ratio,[Call Test] [PING] [RTT] RTT
1,IPERF_T_Start,IPERF_T_Start,10,5,1,0.5,0.1,0.05,50
2,,,12,6,1.2,0.6,0.12,0.06,55
3,,,11,5.5,1.1,0.55,0.11,0.055,60
4,IPERF_T_End,IPERF_T_End,13,6.5,1.3,0.65,0.13,0.065,65
5,IPERF_T_Start,IPERF_T_Start,9,4.5,0.9,0.45,0.09,0.045,48
6,,,11,5.5,1.1,0.55,0.11,0.055,52
7,IPERF_T_End,IPERF_T_End,10,5,1,0.5,0.1,0.05,58
"""
    dut_mhs_udp_path = os.path.join(dummy_mhs_dir, "DUT MHS UDP Drive.csv")
    with open(dut_mhs_udp_path, "w") as f:
        f.write(dut_mhs_udp_content)

    # Create dummy REF MHS UDP Drive.csv with Ping RTT data
    ref_mhs_udp_content = """Time,Event,IPERF Call Event,[Call Test] [Throughput] Application DL TP,[Call Test] [Throughput] Application UL TP,[Call Test] [iPerf] [Throughput] DL Jitter,[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Jitter,[Call Test] [iPerf] [Throughput] DL Error Ratio,[Call Test] [iPerf] [Call Average] [Jitter and Error] UL Error Ratio,[Call Test] [PING] [RTT] RTT
1,IPERF_T_Start,IPERF_T_Start,11,6,1.1,0.6,0.11,0.06,45
2,,,13,7,1.3,0.7,0.13,0.07,50
3,,,12,6.5,1.2,0.65,0.12,0.065,55
4,IPERF_T_End,IPERF_T_End,14,7.5,1.4,0.75,0.14,0.075,60
5,IPERF_T_Start,IPERF_T_Start,10,5,1,0.5,0.1,0.05,42
6,,,12,6,1.2,0.6,0.12,0.06,48
7,IPERF_T_End,IPERF_T_End,11,5.5,1.1,0.55,0.11,0.055,53
"""
    ref_mhs_udp_path = os.path.join(dummy_mhs_dir, "REF MHS UDP Drive.csv")
    with open(ref_mhs_udp_path, "w") as f:
        f.write(ref_mhs_udp_content)

    print(f"Analyzing DUT MHS UDP Drive.csv: {dut_mhs_udp_path}")
    dut_results = analyze_mhs_drive_data(dut_mhs_udp_path, "DUT")
    print("\nDUT MHS Drive Analysis Results:")
    print(dut_results)

    print(f"\nAnalyzing REF MHS UDP Drive.csv: {ref_mhs_udp_path}")
    ref_results = analyze_mhs_drive_data(ref_mhs_udp_path, "REF")
    print("\nREF MHS Drive Analysis Results:")
    print(ref_results)

    # Clean up dummy files and directories
    # os.remove(dut_mhs_udp_path)
    # os.remove(ref_mhs_udp_path)
    # os.removedirs(dummy_mhs_dir)
    # os.removedirs(dummy_raw_data_dir)