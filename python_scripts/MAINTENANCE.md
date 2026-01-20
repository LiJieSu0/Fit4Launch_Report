# Python Script Maintenance Guide

This document is designed to help developers quickly understand the architecture, operation flow, and how to extend functionality for the `ReportGenerator` Python scripts.

## 1. System Overview

The primary goal of this system is to automate the processing of raw CSV data produced by test equipment, perform statistical analysis, and generate JSON data required for the frontend report application.

## 2. System Architecture

The system utilizes a combination of a Pipeline pattern and the Strategy pattern.

### Core Component Dependency Diagram

```mermaid
graph TD
    P[pipeline.py] --> C[Config Loader]
    P --> L[Logger]
    P --> BA[BaseAnalyzer]
    BA <|-- DPA[DataPerformanceAnalyzer]
    BA <|-- CPA[CallPerformanceAnalyzer]
    BA <|-- VQA[VoiceQualityAnalyzer]
    BA <|-- COV[CoveragePerformanceAnalyzer]
    DPA --> DPS[data_performance_statics.py]
    P --> DPR[data_path_reader.py]
    P --> CED[check_empty_data.py]
```

### Directory Structure

The project is organized into several key directories containing analysis scripts, configuration, and source code.

```text
python_scripts/
├── config/                 # Configuration files
│   └── config.yaml         # Main project configuration (paths, analysis types)
├── src/                    # Main source code (Modularized)
│   └── report_generator/   # Core logic package
│       ├── pipeline.py     # Main orchestration pipeline
│       ├── base_analyzer.py # Abstract base class for all analyzers
│       ├── analyzers/      # Category-specific analyzer implementations
│       │   ├── call_performance_analyzer.py
│       │   ├── coverage_performance_analyzer.py
│       │   ├── data_performance_analyzer.py
│       │   ├── google_throughput_analyzer.py
│       │   ├── mhs_drive_analyzer.py
│       │   ├── mrab_performance_analyzer.py
│       │   └── voice_quality_analyzer.py
│       └── utils/          # Utility functions (logger, config loader)
├── DataPerformance/        # Data-related logic (legacy/underlying stats)
│   ├── data_performance_statics.py # Core parameter determination & stats logic
│   ├── data_path_reader.py         # File discovery logic
│   ├── ping_statics.py             # Ping analysis
│   └── mrab_statistics.py          # MRAB analysis
├── CallPerformance/        # Call performance specific scripts
├── VoiceQuality/           # Audio quality analysis scripts (MOS, delay)
├── Coverage/               # Coverage and RF metric analysis scripts
├── Wfc/                    # Wi-Fi Calling specific analyzers
├── Analyze Summary/        # Default output directory for JSON results
│   ├── rsrp_data/          # Extracted RSRP CSVs
│   ├── tx_power_data/      # Extracted Tx power CSVs
│   └── vq_linechart_data/  # MOS line chart JSONs
├── logs/                   # System runtime logs
└── requirements.txt        # Python dependencies
```

### Component Description

*   **`pipeline.py` (DataAnalysisPipeline)**: The entry point and orchestration center of the system. It is responsible for reading configurations, scanning directories, dispatching the corresponding Analyzers, and aggregating the final results for output.
*   **`BaseAnalyzer`**: Defines the abstract interface (`analyze`, `validate`, `export`) for all analyzers.
*   **Specific Analyzers**: Located in `src/report_generator/analyzers/`, these implement specific analysis logic for different test categories (e.g., Data, Call, Voice, Coverage).
*   **Utility Classes (Utils)**:
    *   `config_loader.py`: Handles reading `config/config.yaml`.
    *   `logger.py`: Configures global logging functionality.

## 3. Operation Flow (Data Flow)

1.  **Initialization**: `DataAnalysisPipeline` reads `config.yaml` and initializes logging and output paths.
2.  **File Scanning**: Scans CSV files under `base_raw_data_dir` using `data_path_reader`.
3.  **Parameter Determination**: The core logic `_determine_analysis_parameters` (in `data_performance_statics.py`) determines the following based on filenames and directory paths:
    *   Analysis Type
    *   Protocol Type
    *   Network Type
    *   Device Role (DUT/REF)
4.  **Execution of Analysis**:
    *   **File-based Analysis**: For items calculated from a single file, such as Data Performance.
    *   **Directory-based Analysis**: For items that require processing multiple files within a directory, such as Call Performance and Voice Quality.
5.  **Post-processing**: Executes additional logic, such as VQ Line Chart statistics or specific Coverage extractions.
6.  **Results Export**: Aggregates all results and saves them into multiple JSON files (e.g., `data_performance_results.json`).
7.  **Validation**: Executes `check_empty_data` to ensure no unexpected empty collections exist in the exported JSON files.

## 4. How to Extend and Modify

### A. Adding a New Analysis Type

1.  **Define Rules**: Add new filename or path detection rules in `_determine_analysis_parameters` within `data_performance_statics.py` and assign a new `analysis_type`.
2.  **Create Analyzer**: Create a new class inheriting from `BaseAnalyzer` in the `src/report_generator/analyzers/` directory.
3.  **Register Analyzer**: Add the new mapping to the `self.analyzers` dictionary in the `__init__` method of `pipeline.py`.
4.  **Configure Path**: Add the target directory and its corresponding `analysis_type` to `analysis.directories` in `config/config.yaml`.

### B. Modifying Existing Analysis Logic

*   **Data Related**: Primarily modify `DataPerformance/data_performance_statics.py`.
*   **Voice Related**: Primarily modify scripts under `VoiceQuality/`.
*   **Pipeline Flow**: Modify `src/report_generator/pipeline.py` (e.g., changing JSON nesting structure or file filtering rules).

## 5. Development Environment and Tips

*   **Environment Variables**: `pipeline.py` automatically adds key directories like `src` to `sys.path` to avoid import errors.
*   **Logging**: During development, set `logging.level` to `DEBUG` in `config.yaml` to observe the detailed filename determination process.
*   **Dependencies**: Refer to `requirements.txt`.

---
> [!IMPORTANT]
> For any modifications involving filename determination, ensure you test the output of `_determine_analysis_parameters` first, as this is the most critical part of the system's operation.
