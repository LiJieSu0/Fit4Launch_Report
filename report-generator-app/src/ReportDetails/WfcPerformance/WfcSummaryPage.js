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
    const header = numberedHeaders.find(h =>
      h.text.toLowerCase().includes(scenarioKey.toLowerCase()) &&
      h.text.toLowerCase().includes(marketName.toLowerCase())
    );
    return header ? `#${header.id}` : '#';
  };

  const getMarketRows = (marketName) => {
    const marketData = allReportData[marketName]?.wfcPerformance?.['WFC'];
    if (!marketData) return [];

    // Define WFC scenarios based on wfc_performance_results.json structure
    const scenarios = [
      { tc: 'TC150', subKey: 'DUT MO', label: 'TC150 - Call Performance Baseline' },
      { tc: 'TC151', subKey: 'DUT MO', label: 'TC151 - Call Performance Baseline' },
      { tc: 'TC152', subKey: 'DUT MO', label: 'TC152 - Call Performance' },
      { tc: 'TC153', subKey: 'DUT MO', label: 'TC153 - Call Performance' },
      { tc: 'TC154', subKey: 'DUT MO', label: 'TC154 - Call Performance' },
      { tc: 'TC155', subKey: 'DUT MO', label: 'TC155 - Call Performance' },
      { tc: 'TC156', subKey: 'DUT MO', label: 'TC156 - Call Performance' },
      { tc: 'TC157', subKey: 'DUT MO', label: 'TC157 - Call Performance' },
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

      const initiationFailureRate = data.total_mo_attempts > 0 ? data.total_initiation_failures / data.total_mo_attempts : 0;
      const retentionFailureRate = data.total_mo_attempts > 0 ? data.total_retention_failures / data.total_mo_attempts : 0;

      // Mapping to existing KPI rules as a placeholder
      return {
        test: s.label,
        market: marketName,
        link: getDynamicLink(s.tc, marketName),
        callSetupTimeColor: mapExcellentToPass(getKpiCellColor('CallSetupTime', data.mean_setup_time, refData?.mean_setup_time)),
        callInitiationColor: mapExcellentToPass(getKpiCellColor('WfcCallCriteria', tcData.initiation_p_value, initiationFailureRate)),
        callRetentionColor: mapExcellentToPass(getKpiCellColor('WfcCallCriteria', tcData.retention_p_value, retentionFailureRate)),
        moMosValue: data.mos_average?.toFixed(2),
        moMosColor: mapExcellentToPass(getKpiCellColor('WfcMOS', data.mos_average, refData?.mos_average)),
        mtMosValue: tcData['DUT MT']?.mos_average?.toFixed(2),
        mtMosColor: mapExcellentToPass(getKpiCellColor('WfcMOS', tcData['DUT MT']?.mos_average, tcData['REF MT']?.mos_average))
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
            <th>MO MOS</th>
            <th>MT MOS</th>
          </tr>
        </thead>
        <tbody>
          {seattleData.map((row, index) => (
            <tr key={index}>
              <td>{row.test}</td>
              <td style={{ backgroundColor: row.callSetupTimeColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callInitiationColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callRetentionColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.moMosColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.mtMosColor }}><a href={row.link}>Result</a></td>
            </tr>
          ))}
          {seattleData.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data available</td></tr>}
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
            <th>MO MOS</th>
            <th>MT MOS</th>
          </tr>
        </thead>
        <tbody>
          {newYorkData.map((row, index) => (
            <tr key={index}>
              <td>{row.test}</td>
              <td style={{ backgroundColor: row.callSetupTimeColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callInitiationColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.callRetentionColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.moMosColor }}><a href={row.link}>{row.moMosValue}</a></td>
              <td style={{ backgroundColor: row.mtMosColor }}><a href={row.link}>{row.mtMosValue}</a></td>
            </tr>
          ))}
          {newYorkData.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data available</td></tr>}
        </tbody>
      </table> */}

    </div>
  );
};

export default WfcSummaryPage;