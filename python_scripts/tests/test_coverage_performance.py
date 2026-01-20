import pytest
import os
from unittest.mock import MagicMock, patch
from report_generator.analyzers.coverage_performance_analyzer import CoveragePerformanceAnalyzer
from report_generator.utils.config_loader import Config

@pytest.fixture
def analyzer(mock_project_structure):
    config = Config(mock_project_structure["config_path"])
    logger = MagicMock()
    return CoveragePerformanceAnalyzer(config, logger)

def test_coverage_analyzer_initialization(analyzer):
    assert analyzer is not None

@patch("report_generator.analyzers.coverage_performance_analyzer.analyze_n41_coverage")
@patch("report_generator.analyzers.coverage_performance_analyzer.haversine_distance")
def test_analyze_n41(mock_haversine, mock_n41, analyzer, tmp_path):
    # Setup mock RSRP data
    mock_n41.return_value = [{"latitude": 40.0, "longitude": -74.0, "rsrp": -100}]
    mock_haversine.return_value = 1.5
    
    # Create mock directory structure for N41
    n41_dir = tmp_path / "N41"
    run_dir = n41_dir / "Run1"
    run_dir.mkdir(parents=True)
    
    results = analyzer.analyze(str(n41_dir), analysis_type="n41_coverage")
    
    assert "Run1" in results
    assert results["Run1"][0]["distance_km"] == 1.5
    assert results["Run1"][0]["rsrp"] == -100

@patch("report_generator.analyzers.coverage_performance_analyzer.find_dut_ref_files")
@patch("report_generator.analyzers.coverage_performance_analyzer.analyze_coverage_coordinates")
def test_analyze_coordinate(mock_coords, mock_find_files, analyzer, tmp_path):
    # Setup mock coordinate data
    mock_find_files.return_value = [("DUT1_Run1.csv", "REF1_Run1.csv")]
    mock_coords.return_value = (40.0, -74.0)
    
    # Create mock directory structure for coordinates
    coord_dir = tmp_path / "Coordinates"
    sub_dir = coord_dir / "Subfolder"
    sub_dir.mkdir(parents=True)
    
    results = analyzer.analyze(str(coord_dir), analysis_type="coverage_coordinate")
    
    assert "Subfolder" in results
    assert "DUT" in results["Subfolder"]
    assert results["Subfolder"]["DUT"]["Run1"] == (40.0, -74.0)

def test_coverage_validate(analyzer):
    assert analyzer.validate({"some": "data"}) is True
    assert analyzer.validate({}) is False
