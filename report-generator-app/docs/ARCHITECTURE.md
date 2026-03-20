# React Report Generator - Architecture Documentation

This document provides a comprehensive overview of the React frontend architecture, explaining how data flows from JSON files to UI components, and how the application is structured.

---

## 1. Project Overview

The **Report Generator App** is a Single Page Application (SPA) built with **React 19** and bootstrapped using Create React App (CRA). Its primary purpose is to visualize network performance data in a report format that mimics a static multi-page document.

### Key Technologies

| Category | Technology |
|:---|:---|
| **Framework** | React 19 |
| **Build Tool** | React Scripts (Webpack via CRA) |
| **State Management** | React Context API |
| **Routing** | Custom state-based (no react-router) |
| **Charting** | `chart.js`, `react-chartjs-2`, `recharts` |
| **Maps** | `leaflet`, `react-leaflet` |
| **Styling** | CSS Modules + Global CSS |

### Getting Started

```bash
# Install dependencies
cd D:\ReportGenerator\report-generator-app
npm install

# Run development server
npm start
# Opens http://localhost:3000
```

---

## 2. Directory Structure

```
report-generator-app/
├── public/                          # Static assets served directly
│   ├── AnalyzeResults/             # JSON data files (output from pipeline)
│   │   ├── projects.json           # Project configuration
│   │   ├── config.json            # App configuration
│   │   └── #Project/              # Project folders
│   │       └── Seattle/           # Market/City folders
│   │           ├── coverage_performance_results.json
│   │           ├── data_performance_results.json
│   │           ├── voice_quality_results.json
│   │           ├── call_performance_results.json
│   │           └── wfc_performance_results.json
│   └── atmclogo.jpg               # Static images
│
├── src/                            # React source code
│   ├── App.js                     # Main entry point & routing
│   ├── index.js                   # React DOM rendering
│   │
│   ├── CommonPage/               # Shared components (all reports)
│   │   ├── CoverPage.js          # Report cover page
│   │   ├── ReportHeader.js       # Page header
│   │   ├── ReportFooter.js       # Page footer
│   │   ├── ContentsIndexPage.js  # Table of contents
│   │   ├── DeviceInfoPage.js     # Device information
│   │   ├── LegalPage.js          # Legal disclaimer
│   │   ├── PageBreak.js          # Print page break
│   │   └── DynamicHeader.js      # Dynamic section header
│   │
│   ├── Contexts/                 # React Context providers
│   │   ├── ReportContext.js      # Context definition & hook
│   │   ├── ReportDataProvider.js # Data fetching & caching
│   │   └── HeaderContext.js      # Dynamic header state
│   │
│   ├── ReportDetails/            # Report-specific components
│   │   ├── CallPerformance/      # Call Performance report
│   │   ├── VoiceQuality/         # Voice Quality report
│   │   ├── CoveragePerformance/  # Coverage Performance report
│   │   ├── DataPerformance/      # Data Performance report
│   │   └── WfcPerformance/       # WiFi Calling report
│   │
│   ├── Utils/                   # Utility functions
│   │   ├── DataLoader.js        # JSON data fetching
│   │   ├── CdfLoader.js        # CDF data loading
│   │   ├── KpiRules.js         # KPI threshold rules
│   │   └── ErrorLogger.js      # Error logging
│   │
│   ├── Constants/               # Configuration constants
│   │   └── ChartColors.js     # Chart color schemes
│   │
│   └── StyleScript/            # CSS stylesheets
│       └── Restricted_Report_Style.css
│
└── docs/                        # Documentation
    └── ARCHITECTURE.md         # This file
```

---

## 3. Data Flow Architecture

### Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DATA FLOW OVERVIEW                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│  │   Pipeline   │────▶│     JSON    │────▶│  DataLoader │             │
│  │  (Python)   │     │   Files     │     │   (Utils)   │             │
│  └──────────────┘     └──────────────┘     └──────────────┘             │
│                                                    │                     │
│                                                    ▼                     │
│                                          ┌──────────────┐              │
│                                          │ ReportData-  │              │
│                                          │ Provider     │              │
│                                          └──────────────┘              │
│                                                    │                     │
│                                                    ▼                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      ReportContext (React Context)                  │ │
│  │   - reportData      (current city's data)                          │ │
│  │   - projectData     (all cities' data for project)                 │ │
│  │   - project         (selected project object)                      │ │
│  │   - city            (selected city)                               │ │
│  │   - availableCities (list of available cities)                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                    │                     │
│                                                    ▼                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    Components (useReportData)                        │ │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │ │
│  │   │Coverage- │  │ Voice-   │  │  Call-   │  │  Data-   │          │ │
│  │   │Summary-  │  │Quality-  │  │Performance│  │Performance│          │ │
│  │   │Page.js   │  │Page.js   │  │Page.js   │  │Page.js   │          │ │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘          │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### JSON Data Path Resolution

Data is loaded from the `public/AnalyzeResults/` directory:

```javascript
// DataLoader.js
const BASE_DATA_PATH = '/AnalyzeResults/';

// URL pattern: /AnalyzeResults/{project}/{city}/*.json
// Example: /AnalyzeResults/%23Huaqin/Seattle/coverage_performance_results.json
```

| File | Purpose |
|:---|:---|
| `projects.json` | Project list with device info |
| `config.json` | App configuration (base station coordinates) |
| `coverage_performance_results.json` | Coverage test results |
| `data_performance_results.json` | Data throughput results |
| `voice_quality_results.json` | Voice quality test results |
| `call_performance_results.json` | Call performance results |
| `wfc_performance_results.json` | WiFi Calling results |

---

## 4. Context Architecture

### Context Hierarchy

```
App.js
    │
    ▼
ReportDataProvider
    │
    ├── Reports reportData, projectData, city, project, etc.
    │
    ▼
ReportContext (Provider)
    │
    ├── Wraps entire app
    │
    ▼
useReportData() Hook
    │
    ▼
Any Component
```

### ReportContext.js

```javascript
// Definition
export const ReportContext = createContext(null);

// Hook for consuming context
export const useReportData = () => {
  return useContext(ReportContext);
};
```

### ReportDataProvider.js

The `ReportDataProvider` manages all application state:

```javascript
// State managed by ReportDataProvider
{
  city: 'Seattle',                    // Currently selected city
  project: { dataFolderName, ... },  // Selected project object
  availableCities: ['Seattle', 'New York'],
  availableProjects: [{ dataFolderName, displayProjectName }, ...],
  allReportData: {                   // Cached data
    '#Huaqin-Seattle': { coveragePerformance, dataPerformance, ... },
    '#Huaqin-New York': { ... }
  },
  loading: true,
  error: null,
  appConfig: { coverage_station: { ... } }
}
```

### Using Context in Components

```jsx
import { useReportData } from '../Contexts/ReportContext';

function MyComponent() {
  const { reportData, city, setCity } = useReportData();
  
  if (!reportData) return <div>Loading...</div>;
  
  const coverage = reportData.coveragePerformance;
  
  return (
    <div>
      <h1>Coverage in {city}</h1>
      {/* Render coverage data */}
    </div>
  );
}
```

---

## 5. Application Routing

### State-Based Routing

Unlike traditional React apps using `react-router`, this app uses React state for navigation:

```javascript
// App.js - State-based navigation
const [currentReport, setCurrentReport] = useState(null);

const reportType = {
  'CV': "Coverage Performance",
  'VQ': "Voice Quality",
  'CP': "Call Performance",
  'DP': "Data Performance",
  'WFC': "Wifi Call"
};

// Navigation hierarchy:
// 1. Project Selection (currentReport = null, project = null)
// 2. Report Type Selection (currentReport = null, project = selected)
// 3. Report View (currentReport = 'CV'|'VQ'|'CP'|'DP'|'WFC')
```

### Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Flow                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                           │
│  │  Home Page  │  ← Select Project (availableProjects)     │
│  │  (Project)  │                                           │
│  └──────┬──────┘                                           │
│         │ Select project                                    │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │   Menu     │  ← Select Report Type (reportType)         │
│  │  (Reports) │                                           │
│  └──────┬──────┘                                           │
│         │ Select report type                                │
│         ▼                                                  │
│  ┌─────────────────────────────────────────────────────────┤
│  │                   Report View                           │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │  │Summary  │→│Details  │→│ KPI     │→│  Legal  │       │
│  │  │ Page    │ │ Page    │ │ Page    │ │ Page    │       │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│  └─────────────────────────────────────────────────────────┤
│         │ Back to Menu                                     │
│         ▼                                                  │
│  ┌─────────────┐                                           │
│  │   ← Menu   │                                           │
│  └─────────────┘                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### App.js Render Logic

```javascript
function App() {
  // No project selected → Show project selection
  if (!project) {
    return (
      <div>
        {availableProjects.map(p => (
          <button onClick={() => setProject(p)}>{p.displayProjectName}</button>
        ))}
      </div>
    );
  }

  // Project selected, no report selected → Show report menu
  if (!currentReport) {
    return (
      <div>
        {Object.entries(reportType).map(([key, value]) => (
          <button onClick={() => setCurrentReport(key)}>{value}</button>
        ))}
      </div>
    );
  }

  // Report selected → Show report components
  return (
    <div className="App">
      <CoverPage />
      <ReportHeader />
      <ContentsIndexPage />
      
      {currentReport === "CV" && <CoverageSummaryPage />}
      {currentReport === "CV" && <CoverageDetails />}
      {currentReport === "CV" && <CoverageKpiPage />}
      
      {currentReport === "VQ" && <VqSummaryPage />}
      {currentReport === "VQ" && <VqDetailsPage />}
      {currentReport === "VQ" && <VqKpiPage />}
      
      {/* ... other reports ... */}
      
      <LegalPage />
      <ReportFooter />
    </div>
  );
}
```

---

## 6. Configuration Files

### projects.json

Located at `public/AnalyzeResults/projects.json`:

```json
[
  {
    "dataFolderName": "#Dry Run",
    "displayProjectName": "ATMC Labs Pilot",
    "testDuration": "02/02/2026-02/08/2026",
    "deviceData": [
      {
        "testDeviceLabel": "Samsung XCover Pro7",
        "role": "Device Under Test",
        "softwareVersion": "...",
        "hardwareVersion": "...",
        "marketData": [
          {
            "market": "Seattle",
            "imei": ["354877970011048", "..."]
          }
        ]
      }
    ]
  }
]
```

| Field | Description |
|:---|:---|
| `dataFolderName` | Folder name used in URL path (e.g., `#Dry Run`) |
| `displayProjectName` | Display name shown in UI |
| `testDuration` | Test date range |
| `deviceData[]` | List of devices tested |
| `role` | "Device Under Test" or "Reference" |

### config.json

Located at `public/config.json`:

```json
{
  "coverage_station": {
    "Seattle": {
      "latitude": 47.409192,
      "longitude": -121.973509
    },
    "New York": {
      "latitude": 40.562337,
      "longitude": -74.695998
    },
    "Seattle_LTE": {
      "latitude": 47.570236,
      "longitude": -121.888454
    }
  }
}
```

---

## 7. Component Categories

### CommonPage Components

Shared across all report types:

| Component | Purpose |
|:---|:---|
| `CoverPage.js` | Report cover with title, date, control number |
| `ReportHeader.js` | Dynamic section headers |
| `ReportFooter.js` | Page footer with page numbers |
| `ContentsIndexPage.js` | Table of contents |
| `DeviceInfoPage.js` | Device information display |
| `LegalPage.js` | Legal disclaimer |
| `PageBreak.js` | Print CSS page break |

### ReportDetails Components

Report-specific components organized by category:

#### Coverage Performance
```
CoveragePerformance/
├── CoverageSummaryPage.js      # Coverage overview
├── CoverageDetails.js          # Detailed coverage data
├── CoverageKpiPage.js         # KPI summary
├── CoverageMap.js             # Map visualization
├── CoverageLineChart.js       # RSRP/SINR timeline
├── CoverageSummaryTable.js     # Summary table
├── CoverageTestTable.js       # Test results table
└── HpueCoverageSection.js     # HPUE specific section
```

#### Voice Quality
```
VoiceQuality/
├── VqSummaryPage.js           # VQ overview
├── VqDetailsPage.js          # Detailed VQ data
├── VqKpiPage.js             # KPI summary
├── VqMosTable.js            # MOS statistics table
├── VqLineChart.js           # MOS timeline chart
├── VqAttenuationTable.js    # Attenuation data
└── VqCases/                 # VQ test case components
    ├── VqAmrNbVq.js         # AMR Narrowband
    ├── VqAmrWbVq.js         # AMR Wideband
    ├── VqEvsWbVqEnabled.js  # EVS WB (Vonr Enabled)
    ├── VqEvsWbVqDisabled.js  # EVS WB (Vonr Disabled)
    ├── AutoVoNREnabledAudioDelay.js
    └── AutoVoNRDisabledAudioDelay.js
```

#### Call Performance
```
CallPerformance/
├── CpSummaryPage.js          # Call overview
├── CallPerformanceDetails.js # Detailed call data
├── CpKpiPage.js             # KPI summary
├── CpScenarioSection.js      # Scenario grouping
├── CpCaseTable.js           # Call results table
├── PValueTable.js           # Statistical p-value table
├── CallCategoriesTable.js   # Call categories
└── CallCategoriesChart.js   # Category chart
```

#### Data Performance
```
DataPerformance/
├── DpSummaryPage.js         # Throughput overview
├── DpDetailsPage.js         # Detailed throughput
├── DpKpiPage.js            # KPI summary
├── DpCDF_Chart.js          # CDF chart
├── DpHistogramComponent.js  # Histogram chart
├── DpRangeChart.js         # Range visualization
├── DpMrabDetailsPage.js    # MRAB details
├── DriveTest/              # Drive test components
│   ├── DpDriveTestDetailPage.js
│   ├── DpDriveTestTable.js
│   └── DpDriveTestOverallTable.js
└── Stationary/             # Stationary test components
    ├── Dp_httpSS_Component.js
    ├── Dp_httpMS_Component.js
    ├── Dp_Udp_Component.js
    ├── Dp_Ping_Component.js
    ├── Dp_playStore_Component.js
    ├── Dp_Webbrowser_Component.js
    └── Table/              # Data tables
        ├── DpUdpTableLoc3.js
        ├── DpPingTableLoc3.js
        ├── DpWebTable.js
        └── ...
```

#### WiFi Calling
```
WfcPerformance/
├── WfcSummaryPage.js        # WFC overview
├── WfcDetailsPage.js        # Detailed WFC data
├── WfcKpiPage.js           # KPI summary
├── WfcPerformanceChart.js   # MOS over time
├── WfcMosLineChart.js      # MOS line chart
├── WfcRssiLineChart.js     # RSSI line chart
├── WfcCallPerformance.js   # Call metrics
├── WfcBaselineDetails.js   # Baseline analysis
├── WfcHandoverTable.js     # Handover counts
├── WfcIpImpairment.js      # IP impairment analysis
├── WfcCoverageOverviewTable.js
├── WfcBaselineOverviewTable.js
├── WfcBaselineAudioPerformance.js
├── WfcMultiHandover.js
└── Tables/                 # Various WFC tables
```

---

## 8. Data Loader Utility

### DataLoader.js

```javascript
const BASE_DATA_PATH = '/AnalyzeResults/';

// Fetch with error handling
export const safeFetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching ${url}:`, error);
    return null;
  }
};

// Load all report data for a project/city
export const loadAllData = async (project, city) => {
  const folderName = project.dataFolderName;
  const projectPath = `${encodeURIComponent(folderName)}/`;
  const cityDataPath = `${BASE_DATA_PATH}${projectPath}${encodeURIComponent(city)}/`;
  
  const [callPerformance, coveragePerformance, dataPerformance, voiceQuality, wfcPerformance] =
    await Promise.all([
      safeFetchJson(`${cityDataPath}call_performance_results.json`),
      safeFetchJson(`${cityDataPath}coverage_performance_results.json`),
      safeFetchJson(`${cityDataPath}data_performance_results.json`),
      safeFetchJson(`${cityDataPath}voice_quality_results.json`),
      safeFetchJson(`${cityDataPath}wfc_performance_results.json`),
    ]);
  
  return { callPerformance, coveragePerformance, dataPerformance, voiceQuality, wfcPerformance };
};

// Get available projects
export const getAvailableProjects = async () => {
  const projects = await safeFetchJson(`${BASE_DATA_PATH}projects.json`);
  return projects || [];
};

// Get available cities
export const getAvailableCities = async () => {
  return ['Seattle', 'New York'];  // Hardcoded or dynamic
};
```

---

## 9. Common Maintenance Tasks

### Adding a New City

1. Ensure pipeline has generated data for the new city
2. Update `getAvailableCities()` in `DataLoader.js`:

```javascript
export const getAvailableCities = async () => {
  return ['Seattle', 'New York', 'Chicago'];  // Add new city
};
```

3. Update `config.json` with base station coordinates:

```json
{
  "coverage_station": {
    "Chicago": {
      "latitude": 41.8781,
      "longitude": -87.6298
    }
  }
}
```

### Adding a New Report Type

1. Create component folder in `src/ReportDetails/`
2. Build Summary, Details, and KPI components
3. Update `App.js`:

```javascript
// Add to reportType
const reportType = {
  'CV': "Coverage Performance",
  'VQ': "Voice Quality",
  'CP': "Call Performance",
  'DP': "Data Performance",
  'WFC': "Wifi Call",
  'NEW': "New Report Type"  // Add new type
};

// Add conditional render
{currentReport === "NEW" && <NewReportSummaryPage />}
{currentReport === "NEW" && <NewReportDetails />}
{currentReport === "NEW" && <NewReportKpiPage />}
```

### Updating KPI Thresholds

Edit `src/Utils/KpiRules.js`:

```javascript
export const KpiRules = {
  throughput: {
    excellent: 100,  // Mbps
    pass: 50,
    marginal: 25,
    fail: 0
  },
  mos: {
    excellent: 4.0,
    pass: 3.5,
    marginal: 2.5,
    fail: 0
  }
  // ...
};
```

---

## 10. Troubleshooting

### "N/A" Display Issues

| Cause | Solution |
|:---|:---|
| Wrong data folder selected | Check `project.dataFolderName` matches folder |
| Missing JSON file | Verify file exists in `AnalyzeResults/{project}/{city}/` |
| Data key mismatch | Ensure JSON structure matches component expectations |
| City not available | Add city to `getAvailableCities()` |

### Data Loading Failures

```javascript
// Check in browser console for:
// 1. 404 errors on JSON fetch
// 2. CORS errors (if not served from correct origin)
// 3. JSON parse errors
```

### Component Not Displaying

1. Verify `reportData` contains expected keys
2. Check component uses `useReportData()` hook correctly
3. Ensure data structure matches component's expected format

### Debug Data Flow

```javascript
// Add to any component to inspect data:
const { reportData, city } = useReportData();
console.log('Current city:', city);
console.log('Report data:', reportData);
```

---

## 11. Build & Deployment

### Building for Production

Since this is a report generator (not a web app):

```bash
npm start  # Development mode
# OR
# Just open index.html directly in browser
```

### Deployment Considerations

1. Copy pipeline output to `public/AnalyzeResults/`
2. Maintain folder structure: `{project}/{city}/*.json`
3. Ensure `projects.json` is at root of `AnalyzeResults/`

### Print to PDF

Use browser's Print function (Ctrl+P) to generate PDF reports.

---

## 12. Related Documentation

| Document | Location |
|:---|:---|
| Pipeline Logic | `D:\ReportGenerator\pipeline_logic_documentation.md` |
| Python Maintenance | `D:\ReportGenerator\python_scripts\MAINTENANCE.md` |
| React Maintenance | `D:\ReportGenerator\report-generator-app\MAINTENANCE.md` |
