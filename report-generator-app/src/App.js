import './StyleScript/Restricted_Report_Style.css';
import CoverPage from './CommonPage/CoverPage';
import AboutPage from './CommonPage/AboutPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import LegalPage from './CommonPage/LegalPage';


import { useState } from 'react';


import { ReportDataProvider } from './Contexts/ReportDataProvider';


import ReportHeader from './CommonPage/ReportHeader';
import ReportFooter from './CommonPage/ReportFooter';

import CallPerformanceDetails from './ReportDetails/CallPerformance/CallPerformanceDetails';
import CpSummaryPage from './ReportDetails/CallPerformance/CpSummaryPage';
import CpKpiPage from './ReportDetails/CallPerformance/CpKpiPage';

import VqSummaryPage from './ReportDetails/VoiceQuality/VqSummaryPage';
import VqDetailsPage from './ReportDetails/VoiceQuality/VqDetailsPage';
import VqKpiPage from './ReportDetails/VoiceQuality/VqKpiPage';

import CoverageSummaryPage from './ReportDetails/CoveragePerformance/CoverageSummaryPage';
import CoverageDetails from './ReportDetails/CoveragePerformance/CoverageDetails';
import CoverageKpiPage from './ReportDetails/CoveragePerformance/CoverageKpiPage';

import DpKpiPage from './ReportDetails/DataPerformance/DpKpiPage';
import DpSummaryPage from './ReportDetails/DataPerformance/DpSummaryPage';
import DpDetailsPage from './ReportDetails/DataPerformance/DpDetailsPage';
const reportType = {
  1: "Coverage Performance",
  2: "Voice Quality",
  3: "Call Performance",
  4: "Data Performance"
}
const reportTypeNo = 2;
function App() {
  return (
    <ReportDataProvider>
      <div className="App">
        <CoverPage reportType={reportType[reportTypeNo]} />
        <ReportHeader />
        <DeviceInfoPage />
        <ContentsIndexPage />
        {/* <CoverageSummaryPage />
        <CoverageDetails />
        <CoverageKpiPage /> */}

        <VqSummaryPage />
        <VqDetailsPage />
        <VqKpiPage />

        {/* <CpSummaryPage />
        <CallPerformanceDetails />
        <CpKpiPage /> */}

        {/* <DpSummaryPage />
        <DpDetailsPage />
        <DpKpiPage /> */}

        <LegalPage number={reportType==4?4:5} />
        <AboutPage number={reportType==4?5:6} />
        <ReportFooter reportType={reportType[reportTypeNo]} />
      </div>
    </ReportDataProvider>
  );
}



export default App;
