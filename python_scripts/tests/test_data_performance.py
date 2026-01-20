import pytest
import os
import pandas as pd
from unittest.mock import MagicMock, patch
from report_generator.analyzers.data_performance_analyzer import DataPerformanceAnalyzer
from report_generator.utils.config_loader import Config

@pytest.fixture
def analyzer(mock_project_structure):
    config = Config(mock_project_structure["config_path"])
    logger = MagicMock()
    return DataPerformanceAnalyzer(config, logger)

def test_data_performance_analyzer_initialization(analyzer):
    assert analyzer is not None
    assert analyzer.logger is not None

@patch("DataPerformance.data_performance_statics._determine_analysis_parameters")
@patch("DataPerformance.data_performance_statics.analyze_throughput")
def test_data_performance_analyze_http_dl(mock_throughput, mock_params, analyzer, tmp_path):
    # Setup mock parameters
    mock_params.return_value = {
        "device_type_detected": "DUT",
        "network_type_detected": "5G NSA",
        "analysis_type_detected": "data_performance",
        "analysis_direction_detected": "DL",
        "protocol_type_detected": "HTTP",
        "column_to_analyze_throughput": "DL TP",
        "event_col": "Event",
        "start_event": "Start",
        "end_event": "End",
        "column_to_analyze_throughput_fallback": None,
        "event_col_fallback": None,
        "column_to_analyze_throughput_third_fallback": None
    }
    
    # Setup mock throughput results
    mock_throughput.return_value = {"Mean": 100, "Number of Intervals": 5}
    
    csv_path = str(tmp_path / "test_http_dl.csv")
    with open(csv_path, "w") as f:
        f.write("dummy content")
        
    results = analyzer.analyze(csv_path)
    
    assert results["Device Type"] == "DUT"
    assert results["Throughput"]["Mean"] == 100
    assert results["Analysis Type"] == "data_performance"

def test_data_performance_validate(analyzer):
    assert analyzer.validate({"Throughput": {"Mean": 50}}) is True
    assert analyzer.validate({"Jitter": {"Mean": 10}}) is True
    assert analyzer.validate({"Other": "Value"}) is False
    assert analyzer.validate(None) is False
