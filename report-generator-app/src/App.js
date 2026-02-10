import './StyleScript/Restricted_Report_Style.css';
import CoverPage from './CommonPage/CoverPage';
import AboutPage from './CommonPage/AboutPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import LegalPage from './CommonPage/LegalPage';

import { useContext, useState, useEffect } from 'react';
import { ReportContext } from './Contexts/ReportContext';


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
  const { project, setProject, availableProjects } = useContext(ReportContext);
  const [currentReport, setCurrentReport] = useState(null);

  // Derive project name from project folder for display (e.g., #Dry Run -> Dry Run)
  const displayProjectName = project ? project.replace('#', '') : "Select Project";

  useEffect(() => {
    if (currentReport) {
      document.title = `${displayProjectName} - ${reportType[currentReport]}`;
    } else {
      document.title = project ? `${displayProjectName} Menu` : "Report Generator";
    }
  }, [currentReport, project, displayProjectName]);


  if (!project) {
    return (
      <div className="App-Home" style={{ padding: '50px', textAlign: 'center' }}>
        <img src="atmclogo.jpg" alt="atmcl" style={{ maxWidth: '200px', marginBottom: '30px' }} />
        <h1>Select a Project</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
          {availableProjects.map((p) => (
            <button
              key={p}
              onClick={() => setProject(p)}
              style={{ padding: '15px', fontSize: '18px', cursor: 'pointer', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}
            >
              {p.replace('#', '')}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="App-Home" style={{ padding: '50px', textAlign: 'center' }}>
        <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
          <button
            onClick={() => setProject(null)}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            ← Switch Project
          </button>
        </div>
        <h1>{displayProjectName}</h1>
        <p>Select report type to view</p>
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
    <div className="App">
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000, display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setCurrentReport(null)}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          ← Menu
        </button>
      </div>
      <CoverPage reportType={reportType[currentReport]} projectName={displayProjectName} />
      <ReportHeader projectName={displayProjectName} />
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
  );
}



export default App;
