import CoverPage from './CommonPage/CoverPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import ReportHeader from './CommonPage/ReportHeader';
import './StyleScript/Restricted_Report_Style.css';
function App() {
  return (
    <div className="App">
      <CoverPage />
      {/* The ReportHeader will be displayed on all pages except the CoverPage */}
      <ReportHeader />
      <DeviceInfoPage/>
      <ContentsIndexPage />

    </div>
  );
}

export default App;
