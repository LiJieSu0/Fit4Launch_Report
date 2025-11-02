import CoverPage from './CommonPage/CoverPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import SummaryPage from './CommonPage/SummaryPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import ReportHeader from './CommonPage/ReportHeader';
import ReportFooter from './CommonPage/ReportFooter';


// import './StyleScript/Restricted_Report_Style.css';

function App() {
  return (
    <div className="App">
      <CoverPage />
      {/* The ReportHeader will be displayed on all pages except the CoverPage */}
      <ReportHeader />
      <DeviceInfoPage/>
      <ContentsIndexPage />
      <SummaryPage />
      <ReportFooter />
    </div>
  );
}

export default App;
