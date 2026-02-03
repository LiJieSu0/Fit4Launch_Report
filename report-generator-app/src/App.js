import './StyleScript/Restricted_Report_Style.css';
import CoverPage from './CommonPage/CoverPage';
import AboutPage from './CommonPage/AboutPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import LegalPage from './CommonPage/LegalPage';

import { useState, useEffect } from 'react';

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
import WfcKpiPage from './ReportDetails/WfcPerformance/WfcKpiPage';

const reportType = {
  'CV': "Coverage Performance",
  'VQ': "Voice Quality",
  'CP': "Call Performance",
  'DP': "Data Performance",
  'WFC': "Wifi Call"
}

function App() {
  const [currentReport, setCurrentReport] = useState(null);

  useEffect(() => {
    if (currentReport) {
      document.title = reportType[currentReport];
    } else {
      document.title = "Report Generator";
    }
  }, [currentReport]);


  if (!currentReport) {
    return (
      <div className="App-Home" style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Report Generator</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
          {Object.entries(reportType).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setCurrentReport(key)}
              style={{ padding: '15px', fontSize: '18px', cursor: 'pointer', borderRadius: '8px', border: '1px solid #ccc' }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ReportDataProvider>
      <HeaderProvider>
        <div className="App">
          <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
            <button
              onClick={() => setCurrentReport(null)}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              ← Back to Main Menu
            </button>
          </div>
          <CoverPage reportType={reportType[currentReport]} />
          <ReportHeader />
          <DeviceInfoPage />
          <ContentsIndexPage />

          {currentReport === "CV" && (
            <>
              <CoverageSummaryPage />
              <CoverageDetails />
              <CoverageKpiPage />
            </>
          )}

          {currentReport === "VQ" && (
            <>
              <VqSummaryPage />
              <VqDetailsPage />
              <VqKpiPage />
            </>
          )}

          {currentReport === "CP" && (
            <>
              <CpSummaryPage />
              <CallPerformanceDetails />
              <CpKpiPage />
            </>
          )}

          {currentReport === "DP" && (
            <>
              <DpSummaryPage />
              <DpDetailsPage webPageUrl={"http://172.93.163.176/reference/kepler/mobile/"} />
              <DpKpiPage />
            </>
          )}

          {currentReport === "WFC" && (
            <>
              <WfcSummaryPage />
              <WfcDetailsPage />
              <WfcKpiPage />
            </>
          )}

          <LegalPage />
          <AboutPage />
          <ReportFooter reportType={reportType[currentReport]} />
        </div>
      </HeaderProvider>
    </ReportDataProvider>
  );
}



export default App;
