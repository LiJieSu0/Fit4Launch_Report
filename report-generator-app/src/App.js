import CoverPage from './CommonPage/CoverPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import './StyleScript/Restricted_Report_Style.css';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
function App() {
  return (
    <div className="App">
      <CoverPage />
      <DeviceInfoPage/>
      <ContentsIndexPage />

    </div>
  );
}

export default App;
