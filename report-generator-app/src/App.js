import './StyleScript/Restricted_Report_Style.css';
import CoverPage from './CommonPage/CoverPage';
import AboutPage from './CommonPage/AboutPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';

import DeviceInfoPage from './CommonPage/DeviceInfoPage';
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

function App() {
  return (
    <div className="App">
      <CoverPage />
      
      <ReportHeader />
      <DeviceInfoPage/>
      <ContentsIndexPage />

      {/* <CpSummaryPage />
      <CallPerformanceDetails /> 
      <CpKpiPage/>  */}

      {/* <VqSummaryPage />
      <VqDetailsPage />
      <VqKpiPage/> */}
      
      {/* <CoverageSummaryPage />
      <CoverageDetails />
      <CoverageKpiPage /> */}

      <DpSummaryPage />
      <DpDetailsPage /> 
      <DpKpiPage />

      <AboutPage />
      <ReportFooter />
    </div>
  );
}

export default App;
