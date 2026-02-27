import sys
sys.path.append(r'd:\ReportGenerator\python_scripts\src')
sys.path.append(r'd:\ReportGenerator\python_scripts')
import pandas as pd
import logging
from report_generator.analyzers.wfc_performance_analyzer import WfcPerformanceAnalyzer

logger = logging.getLogger()
analyzer = WfcPerformanceAnalyzer(None, logger)
csv_path = r'd:\ReportGenerator\Raw Data\#Dry Run\Seattle\WFC\_20260212_170219_CH04_TMO_5G SA_WFC-VoNR_DUT-MO_TC-148.csv'

try:
    df = pd.read_csv(csv_path, low_memory=False)
    res = analyzer._calculate_tc148_audio_performance(df)
    print("TC148 Result:", res)
except Exception as e:
    print(f"Error: {e}")
