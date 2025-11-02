import CoverPage from './CommonPage/CoverPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import './StyleScript/Restricted_Report_Style.css';

function App() {
  return (
    <div className="App">
      <CoverPage />
      <div className="restricted-report-content">
        <ContentsIndexPage />
      </div>
    </div>
  );
}

export default App;
