import pytest
import os
import yaml
import tempfile
import shutil

@pytest.fixture
def mock_config_dir():
    """Creates a temporary directory with a mock config.yaml."""
    temp_dir = tempfile.mkdtemp()
    config_dir = os.path.join(temp_dir, "config")
    os.makedirs(config_dir)
    
    config_data = {
        "logging": {
            "log_file": "logs/test_pipeline.log",
            "level": "DEBUG"
        },
        "project": {
            "base_raw_data_dir": "raw_data",
            "output_dir": "output"
        },
        "analysis": {
            "directories": [
                {"path": "Data Performance/Ping", "analysis_type": "data_performance"},
                {"path": "Call Performance", "analysis_type": "call_performance"}
            ]
        }
    }
    
    config_path = os.path.join(config_dir, "config.yaml")
    with open(config_path, "w", encoding="utf-8") as f:
        yaml.dump(config_data, f)
        
    yield temp_dir
    shutil.rmtree(temp_dir)

@pytest.fixture
def mock_project_structure(mock_config_dir):
    """Sets up a mock project structure inside the temp directory."""
    raw_data_dir = os.path.join(mock_config_dir, "raw_data")
    output_dir = os.path.join(mock_config_dir, "output")
    os.makedirs(raw_data_dir)
    os.makedirs(output_dir)
    
    # Create some mock CSV files
    ping_dir = os.path.join(raw_data_dir, "Data Performance/Ping")
    os.makedirs(ping_dir)
    with open(os.path.join(ping_dir, "test_dut.csv"), "w") as f:
        f.write("Time,KPI1,KPI2\n12:00,10,20")
        
    return {
        "root": mock_config_dir,
        "raw_data": raw_data_dir,
        "output": output_dir,
        "config_path": os.path.join(mock_config_dir, "config/config.yaml")
    }
