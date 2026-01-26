import sys
import os
import logging
import json

# Add necessary paths
cwd = r"d:\ReportGenerator\python_scripts"
sys.path.append(os.path.join(cwd, 'src'))
sys.path.append(cwd)

from report_generator.analyzers.wfc_performance_analyzer import WfcPerformanceAnalyzer

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Test")

# Initialize analyzer
analyzer = WfcPerformanceAnalyzer(config={}, logger=logger)

# Run analysis
results = analyzer.analyze(r"d:\ReportGenerator\Raw Data\WFC")

# Print results for a TC
if results:
    # Just show the first TC to verify
    first_tc = list(results.keys())[0]
    print(f"Results for {first_tc}:")
    print(json.dumps(results[first_tc], indent=4))
    
    # Check if p-values exist in any TC
    has_p_values = any('initiation_p_value' in tc_res for tc_res in results.values())
    print(f"\nFound p-values in results: {has_p_values}")
else:
    print("No results found.")
