import sys
sys.path.append(r'd:\ReportGenerator\python_scripts\src')
sys.path.append(r'd:\ReportGenerator\python_scripts')
import logging
from report_generator.analyzers.wfc_performance_analyzer import WfcPerformanceAnalyzer

logger = logging.getLogger()
analyzer = WfcPerformanceAnalyzer(None, logger)
print(analyzer._determine_category('_20260212_170219_CH04_TMO_5G SA_WFC-VoNR_DUT-MO_TC-148.csv'))
