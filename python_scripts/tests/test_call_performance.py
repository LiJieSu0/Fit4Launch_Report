import pytest
import os
from unittest.mock import MagicMock, patch
from report_generator.analyzers.call_performance_analyzer import CallPerformanceAnalyzer
from report_generator.utils.config_loader import Config

@pytest.fixture
def analyzer(mock_project_structure):
    config = Config(mock_project_structure["config_path"])
    logger = MagicMock()
    return CallPerformanceAnalyzer(config, logger)

def test_call_performance_analyzer_initialization(analyzer):
    assert analyzer is not None

@patch("report_generator.analyzers.call_performance_analyzer.analyze_directory")
@patch("report_generator.analyzers.call_performance_analyzer._calculate_fisher_exact_criteria")
def test_analyze_call_performance(mock_fisher, mock_analyze, analyzer, tmp_path):
    # Setup mock results for DUT and REF
    mock_analyze.side_effect = [
        {"total_attempts": 100, "total_initiation_failures": 5, "total_retention_failures": 2, "total_initiation_successes": 95},
        {"total_attempts": 100, "total_initiation_failures": 2, "total_retention_failures": 1, "total_initiation_successes": 98}
    ]
    mock_fisher.return_value = (None, 0.45)
    
    # Create mock directory structure
    root_dir = tmp_path / "CallPerformance"
    scenario_dir = root_dir / "Scenario1"
    (scenario_dir / "DUT").mkdir(parents=True)
    (scenario_dir / "REF").mkdir(parents=True)
    
    results = analyzer.analyze(str(root_dir))
    
    assert "Scenario1" in results
    assert "DUT" in results["Scenario1"]
    assert "REF" in results["Scenario1"]
    assert results["Scenario1"]["initiation_p_value"] == 0.45
    assert results["Scenario1"]["retention_p_value"] == 0.45

def test_call_performance_validate(analyzer):
    assert analyzer.validate({"Scenario": {"data": "..."}}) is True
    assert analyzer.validate({}) is False
