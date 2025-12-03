import './StyleScript/Restricted_Report_Style.css';
import CoverPage from './CommonPage/CoverPage';
import AboutPage from './CommonPage/AboutPage';
import ContentsIndexPage from './CommonPage/ContentsIndexPage';
import DeviceInfoPage from './CommonPage/DeviceInfoPage';
import LegalPage from './CommonPage/LegalPage';


import { useState, useEffect } from 'react';
import useDataLoader from './Utils/DataLoader';


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
  const [market, setMarket] = useState('Seattle'); // New state for market selection
  const { marketData, loading, error } = useDataLoader(market); // Use useDataLoader with market

  if (loading) {
    return <div className="App">Loading {market} market data...</div>;
  }
  if (error) {
    return <div className="App" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="App">
      <CoverPage />
      
      {/* <ReportHeader /> */}

      {/* <DeviceInfoPage/>
      <ContentsIndexPage /> */}

      {/* <CpSummaryPage />
      <CallPerformanceDetails />
      <CpKpiPage/>  */}

      {/* <VqSummaryPage />
      <VqDetailsPage />
      <VqKpiPage/> */}
      
      {/* <CoverageSummaryPage />
      <CoverageDetails />
      <CoverageKpiPage /> */}

      {/* <DpSummaryPage />
      <DpDetailsPage />
      <DpKpiPage /> */}

      {/* <LegalPage/> */}
      {/* <AboutPage /> */}
      {/* <ReportFooter /> */}

      {/* Displaying data for demonstration */}
      <header className="App-header">
        <h1>Market Data Report</h1>
        <select onChange={(e) => setMarket(e.target.value)} value={market}>
          <option value="Seattle">Seattle</option>
          {/* Add other market options here as needed */}
        </select>
      </header>
      <main>
        <h2>Call Performance ({market})</h2>
        <pre>{JSON.stringify(marketData.callPerformance, null, 2)}</pre>

        <h2>Coverage Performance ({market})</h2>
        <pre>{JSON.stringify(marketData.coveragePerformance, null, 2)}</pre>

        <h2>Data Performance ({market})</h2>
        <pre>{JSON.stringify(marketData.dataPerformance, null, 2)}</pre>

        <h2>Voice Quality ({market})</h2>
        <pre>{JSON.stringify(marketData.voiceQuality, null, 2)}</pre>
      </main>
    </div>
  );
}

export default App;
