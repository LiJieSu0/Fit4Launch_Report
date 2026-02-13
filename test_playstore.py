import sys
import os
import pandas as pd

# Add project root to sys.path
sys.path.append(r'D:\ReportGenerator\python_scripts')

from DataPerformance.google_throughput_analyzer import analyze_throughput

file_path = r'D:\ReportGenerator\Raw Data\#Dry Run\Seattle\Data Performance\5G AUTO DP\5G Auto Data Play-store app Download\5G Auto Data Play-store app DL Stationary Good\_20260205_134219_CH01_TMO_5G DP_APP 30M_L1 DUT_SEA.csv'

print(f"Checking file: {file_path}")
if os.path.exists(file_path):
    try:
        res = analyze_throughput(file_path)
        print(f"Analysis Result: {res}")
    except Exception as e:
        print(f"Error during analysis: {e}")
else:
    print("File DOES NOT exist.")
