import pytest
import os
import shutil
from unittest.mock import MagicMock, patch
from report_generator.pipeline import DataAnalysisPipeline
from report_generator.utils.config_loader import Config

@patch("report_generator.pipeline.Config")
@patch("report_generator.pipeline.setup_logger")
def test_pipeline_initialization(mock_logger, mock_config, tmp_path):
    # Setup mock config
    mock_instance = mock_config.return_value
    mock_instance.get.side_effect = lambda key, default=None: {
        "logging": {"log_file": "test.log", "level": "DEBUG"},
        "project.base_raw_data_dir": str(tmp_path / "raw"),
        "project.output_dir": str(tmp_path / "out")
    }.get(key, default)
    
    pipeline = DataAnalysisPipeline()
    assert pipeline.base_raw_data_dir == str(tmp_path / "raw")
    assert pipeline.output_dir == str(tmp_path / "out")
    assert "data_performance" in pipeline.results

def test_insert_into_nested_dict():
    pipeline = MagicMock(spec=DataAnalysisPipeline)
    pipeline.results = {}
    DataAnalysisPipeline._insert_into_nested_dict(pipeline, pipeline.results, ["A", "B", "C"], 100)
    assert pipeline.results["A"]["B"]["C"] == 100

def test_config_loader(mock_project_structure):
    config = Config(mock_project_structure["config_path"])
    assert config.get("logging.level") == "DEBUG"
    assert config.get("non.existent", "default") == "default"

@patch("report_generator.pipeline.data_path_reader.get_csv_file_paths")
@patch("report_generator.pipeline.DataAnalysisPipeline._run_post_processing")
@patch("report_generator.pipeline.DataAnalysisPipeline._export_all")
@patch("report_generator.pipeline.check_empty_data.validate_json_results")
def test_pipeline_run_flow(mock_validate, mock_export, mock_post, mock_get_files, mock_project_structure):
    # This tests the high-level flow of the pipeline run method
    mock_get_files.return_value = [] # No files to process for simple flow test
    mock_validate.return_value = []
    
    with patch("report_generator.pipeline.Config") as mock_config_cls:
        mock_config = mock_config_cls.return_value
        mock_config.get.side_effect = lambda key, default=None: {
            "logging": {"log_file": "test.log", "level": "DEBUG"},
            "project.base_raw_data_dir": mock_project_structure["raw_data"],
            "project.output_dir": mock_project_structure["output"],
            "analysis.directories": [{"path": "Data Performance/Ping", "analysis_type": "data_performance"}]
        }.get(key, default)
        
        pipeline = DataAnalysisPipeline()
        pipeline.run()
        
        mock_post.assert_called_once()
        mock_export.assert_called_once()
        mock_validate.assert_called_once()
