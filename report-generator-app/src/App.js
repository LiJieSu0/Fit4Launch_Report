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
import { HeaderProvider } from './Contexts/HeaderContext';

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

import WfcSummaryPage from './ReportDetails/WfcPerformance/WfcSummaryPage';
import WfcDetailsPage from './ReportDetails/WfcPerformance/WfcDetailsPage';
const reportType = {
  'CV': "Coverage Performance",
  'VQ': "Voice Quality",
  'CP': "Call Performance",
  'DP': "Data Performance",
  'WFC': "WFC"
}
// Report Type Setup-------------------------------------------------------------------------
const reportTypeNo = "DP";
// Report Type Setup-------------------------------------------------------------------------
//TODO Summary page results and link need to be loaded from file

function App() {
  return (
    <ReportDataProvider>
      <HeaderProvider>
        <div className="App">
          {/* <CoverPage reportType={reportType[reportTypeNo]} />
          <ReportHeader />
          <DeviceInfoPage />*/}
          <ContentsIndexPage />
          {reportTypeNo === "CV" && (
            <>
              <CoverageSummaryPage />
              <CoverageDetails />
              <CoverageKpiPage />
            </>
          )}

          {reportTypeNo === "VQ" && (
            <>
              <VqSummaryPage />
              <VqDetailsPage />
              <VqKpiPage />
            </>
          )}

          {reportTypeNo === "CP" && (
            <>
              <CpSummaryPage />
              <CallPerformanceDetails />
              <CpKpiPage />
            </>
          )}

          {reportTypeNo === "DP" && (
            <>
              <DpSummaryPage />
              <DpDetailsPage />
              <DpKpiPage />
            </>
          )}

          {reportTypeNo === "WFC" && (
            <>
              <WfcSummaryPage />
              <WfcDetailsPage />
            </>
          )}
          <LegalPage />
          <AboutPage />
          <ReportFooter reportType={reportType[reportTypeNo]} />
        </div>
      </HeaderProvider>
    </ReportDataProvider>
  );
}



export default App;
