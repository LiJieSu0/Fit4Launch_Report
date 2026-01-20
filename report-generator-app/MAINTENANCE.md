# React Report Generator - Maintenance Guide

This document provides a comprehensive overview of the `report-generator-app`, designed to help new developers understand the architecture, data flow, and common maintenance tasks.

## 1. Project Overview

The **Report Generator App** is a Single Page Application (SPA) built with **React 19** and bootstrapped using Create React App (CRA). Its primary purpose is to visualize network performance data (Coverage, Voice Quality, Call Performance, Data Performance) in a report format that mimics a static multi-page document.

### Key Technologies
- **Framework**: React 19
- **Build Tool**: React Scripts (Webpack via CRA)
- **Charting**: `chart.js`, `react-chartjs-2`, `recharts`
- **Maps**: `leaflet`, `react-leaflet`

## 2. Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
cd report-generator-app
npm install
```

### Running Locally
To start the development server:
```bash
npm start
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload if you make edits.

## 3. Architecture & Directory Structure

The project uses a custom state-based routing system instead of `react-router` to maintain a flat, report-like structure.

### `src/` Directory Breakdown

| Directory/File | Description |
| :--- | :--- |
| **`App.js`** | The main entry point. Handles the top-level "routing" (switching between report types like CP, VQ, Coverage) using local state. |
| **`CommonPage/`** | Contains shared UI components used across all reports (e.g., `CoverPage`, `ReportHeader`, `ReportFooter`, `DeviceInfoPage`). |
| **`Contexts/`** | Manages global state: <br> - `ReportDataProvider`: Fetches and provides data from JSON files. <br> - `HeaderContext`: Manages dynamic headers for the Table of Contents. |
| **`ReportDetails/`** | Contains the core logic and views for each report type, organized by folder: <br> - `CallPerformance/` <br> - `VoiceQuality/` <br> - `CoveragePerformance/` <br> - `DataPerformance/` |
| **`Utils/`** | Helper functions, including data loaders (`DataLoader.js`). |
| **`Constants/`** | Configuration constants and static data. |

## 4. Key Mechanics

### Data Flow (ReportDataProvider)
Data is not hardcoded in components. Instead, it is fetched via `ReportDataProvider.js`:
1.  **Loading**: Uses `Utils/DataLoader.js` to fetch JSON files from the `public/` or `data/` folder.
2.  **Caching**: Data is cached by city (e.g., "Seattle", "New York") in the `allReportData` state to prevent redundant requests.
3.  **Consumption**: Components use `useReportData()` hook to access the currently selected city's data.

### Navigation & Routing
Unlike traditional web apps, this report viewer acts like a digital binder:
-   **Report Types**: `App.js` renders different groups of components based on the `currentReport` state (e.g., 'CP', 'VQ').
-   **Cities**: City selection is often handled within the specific report details pages or via a global context, depending on the implementation.

### Styling
-   **CSS Modules**: Used for component-specific styles (e.g., `ReportHeader.module.css`).
-   **Global Styles**: `App.css` and `index.css` handle global themes and resets.
-   **StyleScript/**: Contains legacy or shared stylesheets (e.g., `Restricted_Report_Style.css`).

## 5. Common Maintenance Tasks

### Adding a New City
To display data for a new city (e.g., "Chicago"):
1.  Ensure the backend/Python scripts have generated the corresponding JSON data.
2.  In **`ReportDetails`** components (like `CallPerformanceDetails.js`), duplicate the scenario blocks and change the `city` prop:
    ```jsx
    <CpScenarioSection title="..." city="Chicago" />
    ```
    *Note: Some pages might dynamically iterate over available cities, while others (like CP Details) may require manual additions for specific layout control.*

### Adding a New Report Section
1.  Create a new folder in `src/ReportDetails/`.
2.  Build your Summary and Details components.
3.  Import them in `App.js`.
4.  Add a new key to the `reportType` object in `App.js`.
5.  Add a conditional render block in the `return` statement of `App.js`.

### Updating KPI Rules
If pass/fail criteria change:
-   Look for a `KpiRules.js` or similar configuration file (typically in `Utils` or `Constants`).
-   Update the threshold values. The UI should automatically reflect these changes as components typically derive color status (Pass/Fail) from these rules.

## 6. Build & Deployment

### Building for Production
No need to build for production as the app is a report generator and not a web application.
Just print the report to a PDF file through the browser.


### Deployment Considerations
-   The app expects data files (JSON) to be available relative to the `index.html`. Ensure your deployment process copies the generated report data into the `build/data` or `public/data` directory.
