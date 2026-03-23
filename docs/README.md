# Report Generator

Automated network performance test report generation system.

## System Overview

```
Raw Data (CSV) → Python Pipeline → JSON Data → React Frontend → PDF Report
```

## Quick Start

### 1. Python Pipeline
```bash
cd python_scripts/src/report_generator
python pipeline.py
```

### 2. React Frontend
```bash
cd report-generator-app
npm install
npm start
```

## Documentation

| Document | Description |
|:---|:---|
| `pipeline_logic_documentation.md` | Python pipeline 運作邏輯 |
| `python_scripts/MAINTENANCE.md` | Python 架構與維護 |
| `report-generator-app/docs/ARCHITECTURE.md` | React 架構說明 |
| `report-generator-app/MAINTENANCE.md` | React 維護指南 |

## Project Structure

```
ReportGenerator/
├── python_scripts/        # Python data processing
│   ├── src/report_generator/  # Core pipeline
│   ├── config/            # Configuration
│   └── MAINTENANCE.md     # Python docs
│
├── report-generator-app/  # React frontend
│   ├── src/               # React components
│   ├── docs/              # Architecture docs
│   └── MAINTENANCE.md     # React docs
│
├── docs/                  # Shared documentation
└── pipeline_logic_documentation.md
```

## Requirements

- Python 3.8+
- Node.js 16+
- npm 8+

## Related Documents

See individual documentation files for detailed information.