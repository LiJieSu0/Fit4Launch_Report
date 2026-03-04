import sys
import os
import re

# Add the project path to sys.path
sys.path.append(r'D:\ReportGenerator\python_scripts')
sys.path.append(r'D:\ReportGenerator\python_scripts\DataPerformance')

from DataPerformance.data_performance_statics import _determine_analysis_parameters

def test_detection(path):
    print(f"\nTesting path: {path}")
    params = _determine_analysis_parameters(path)
    print(f"  Protocol Detected: {params.get('protocol_type_detected')}")
    print(f"  Analysis Type: {params.get('analysis_type_detected')}")
    print(f"  Primary Throughput Col: {params.get('column_to_analyze_throughput')}")
    print(f"  Secondary Throughput Col: {params.get('column_to_analyze_throughput_fallback')}")

# Case 1: The user's specific problem file (no "UDP" in filename, but in path)
test_path_1 = r"D:\ReportGenerator\Raw Data\#Dry Run\Seattle\Data Performance\5G AUTO DP\Udp Test\UL\UDP Upload Task at 10 Mbps for 10 seconds\Good\_20260303_170837_CH01_samsung_SM-G766U_354877970010305_DUT_SEA.csv"
test_detection(test_path_1)

# Case 2: A file with "UDP" in filename
test_path_2 = r"D:\ReportGenerator\Raw Data\#Dry Run\Seattle\Data Performance\5G AUTO DP\Udp Test\DL\UDP Download Task at 200 Mbps for 10 seconds\Good\_20260204_070220_CH01_TMO_5G DP_UDP DL 200M 10S_L1 DUT_SEA.csv"
test_detection(test_path_2)
