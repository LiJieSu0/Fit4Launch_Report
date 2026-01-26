import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { useReportData } from '../../Contexts/ReportContext';
import { HeaderContext } from '../../Contexts/HeaderContext';
import { useContext } from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcSummaryPage = () => {
  const { allReportData } = useReportData();
  const { numberedHeaders } = useContext(HeaderContext);

  const getDynamicLink = (scenarioKey, marketName) => {
    const searchText = `${scenarioKey} - ${marketName}`.toLowerCase();
    const header = numberedHeaders.find(h => h.text.toLowerCase().includes(searchText));
    return header ? `#${header.id}` : '#';
  };

  const getMarketRows = (marketName) => {
    const marketData = allReportData[marketName]?.wfcPerformance?.['WFC'];
    if (!marketData) return [];

    // Define WFC scenarios based on wfc_performance_results.json structure
    const scenarios = [
      { tc: 'TC150', subKey: 'DUT MO', label: 'TC150 - WFC MO Call' },
      { tc: 'TC151', subKey: 'DUT MO', label: 'TC151 - WFC MO Call' },
      { tc: 'TC152', subKey: 'DUT MO', label: 'TC152 - WFC MO Call' },
      { tc: 'TC153', subKey: 'DUT MO', label: 'TC153 - WFC MO Call' },
      { tc: 'TC154', subKey: 'DUT MO', label: 'TC154 - WFC MO Call' },
      { tc: 'TC155', subKey: 'DUT MO', label: 'TC155 - WFC MO Call' },
      { tc: 'TC156', subKey: 'DUT MO', label: 'TC156 - WFC MO Call' },
      { tc: 'TC157', subKey: 'DUT MO', label: 'TC157 - WFC MO Call' },
    ];

    return scenarios.map(s => {
      const tcData = marketData[s.tc];
      if (!tcData) return null;
      const data = tcData[s.subKey];
      if (!data) return null;

      const refData = tcData[s.subKey.replace('DUT', 'REF')];

      const mapExcellentToPass = (color) => {
        if (color === 'var(--performance-excellent)') {
          return 'var(--performance-pass)';
        }
        return color;
      };

      // Mapping to existing KPI rules as a placeholder
      return {
        test: s.label,
        market: marketName,
        link: getDynamicLink(s.tc, marketName),
        callSetupTimeColor: mapExcellentToPass(getKpiCellColor('CallSetupTime', data.mean_setup_time, refData?.mean_setup_time)),
        callInitiationColor: 'var(--performance-pass)',
        callRetentionColor: 'var(--performance-pass)'
      };
    }).filter(row => row !== null);
  };

  const seattleData = getMarketRows('Seattle');
  const newYorkData = getMarketRows('New York');

  return (
    <div className="page-content">
      <DynamicHeader level={1}>WFC Performance Test Overview</DynamicHeader>

      <DynamicHeader level={2}>Seattle</DynamicHeader>
      <table className="general-table-style">
        <thead>
          <tr>
            <th>Test</th>
            <th>Call Setup Time</th>
            <th>Call Initiation</th>
            <th>Call Retention</th>
          </tr>
        </thead>
        <tbody>
          {seattleData.map((row, index) => (
            <tr key={index}>
              <td>{row.test}</td>
              <td style={{ backgroundColor: row.callSetupTimeColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callInitiationColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callRetentionColor }}><a href={row.link}>Result</a></td>
            </tr>
          ))}
          {seattleData.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No data available</td></tr>}
        </tbody>
      </table>

      {/* <DynamicHeader level={2}>New York</DynamicHeader>
      <table className="general-table-style">
        <thead>
          <tr>
            <th>Test</th>
            <th>Call Setup Time</th>
            <th>Call Initiation</th>
            <th>Call Retention</th>
          </tr>
        </thead>
        <tbody>
          {newYorkData.map((row, index) => (
            <tr key={index}>
              <td>{row.test}</td>
              <td style={{ backgroundColor: row.callSetupTimeColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callInitiationColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callRetentionColor }}><a href={row.link}>Result</a></td>
            </tr>
          ))}
          {newYorkData.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No data available</td></tr>}
        </tbody>
      </table> */}

    </div>
  );
};

export default WfcSummaryPage;