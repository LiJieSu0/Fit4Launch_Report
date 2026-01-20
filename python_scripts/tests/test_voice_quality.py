import pytest
import os
from unittest.mock import MagicMock, patch
from report_generator.analyzers.voice_quality_analyzer import VoiceQualityAnalyzer
from report_generator.utils.config_loader import Config

@pytest.fixture
def analyzer(mock_project_structure):
    config = Config(mock_project_structure["config_path"])
    logger = MagicMock()
    return VoiceQualityAnalyzer(config, logger)

def test_voice_quality_analyzer_initialization(analyzer):
    assert analyzer is not None

@patch("report_generator.analyzers.voice_quality_analyzer.analyze_vq_amr_nb")
def test_analyze_nb_vq(mock_nb, analyzer, tmp_path):
    # Setup mock NB results
    mock_nb.return_value = [{
        "device_type": "DUT",
        "ul_mos_stats": {"avg": 4.0},
        "dl_mos_stats": {"avg": 4.2}
    }]
    
    # Create mock directory structure
    vq_dir = tmp_path / "VQ"
    sub_dir = vq_dir / "5G Auto VoNR Enabled AMR NB VQ"
    sub_dir.mkdir(parents=True)
    
    results = analyzer.analyze(str(vq_dir))
    
    assert "5G Auto VoNR Enabled AMR NB VQ" in results
    assert results["5G Auto VoNR Enabled AMR NB VQ"]["DUT"]["ul_mos_stats"]["avg"] == 4.0

@patch("report_generator.analyzers.voice_quality_analyzer.analyze_audio_delay_directory")
def test_analyze_audio_delay(mock_ad, analyzer, tmp_path):
    # Setup mock Audio Delay results
    mock_ad.return_value = [{
        "device_type": "DUT",
        "file_path": "test_file.csv",
        "mean": 150.0,
        "std_dev": 10.0,
        "min": 130.0,
        "max": 170.0,
        "occurrences": 10
    }]
    
    vq_dir = tmp_path / "VQ"
    sub_dir = vq_dir / "Audio Delay"
    sub_dir.mkdir(parents=True)
    
    results = analyzer.analyze(str(vq_dir))
    
    assert "Audio Delay" in results
    assert results["Audio Delay"]["DUT"]["test_file"]["mean"] == 150.0

def test_voice_quality_validate(analyzer):
    assert analyzer.validate({"data": "exists"}) is True
    assert analyzer.validate({}) is False
