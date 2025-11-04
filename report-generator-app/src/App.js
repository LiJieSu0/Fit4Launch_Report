import './StyleScript/Restricted_Report_Style.css';
import CoverPage from './CommonPage/CoverPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import CpSummaryPage from './ReportDetails/CallPerformance/CpSummaryPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import ReportHeader from './CommonPage/ReportHeader';
import ReportFooter from './CommonPage/ReportFooter';
import CallPerformanceDetails from './ReportDetails/CallPerformance/CallPerformanceDetails';
import KpiPage from './CommonPage/KpiPage';
import AboutPage from './CommonPage/AboutPage';
import VqSummaryPage from './ReportDetails/VoiceQuality/VqSummaryPage';
import VqDetailsPage from './ReportDetails/VoiceQuality/VqDetailsPage';
import CoverageSummaryPage from './ReportDetails/CoveragePerformance/CoverageSummaryPage';
import CoverageDetails from './ReportDetails/CoveragePerformance/CoverageDetails';

function App() {
  return (
    <div className="App">
      <CoverPage />
      {/* The ReportHeader will be displayed on all pages except the CoverPage */}
      <ReportHeader />
      <DeviceInfoPage/>
      <ContentsIndexPage />
      {/* <CpSummaryPage />
      <CallPerformanceDetails /> */}

      {/* <VqSummaryPage />
      <VqDetailsPage /> */}
      <CoverageSummaryPage />
      <CoverageDetails />

      <KpiPage />
      <AboutPage />
      <ReportFooter />
    </div>
  );
}

export default App;
