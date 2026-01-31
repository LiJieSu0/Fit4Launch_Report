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
      { tc: 'TC158', subKey: 'DUT MO', label: 'TC158 - Call Performance' },
      { tc: 'TC159', subKey: 'DUT MO', label: 'TC159 - Call Performance' },
      { tc: 'TC160', subKey: 'DUT MO', label: 'TC160 - Call Performance' },
      { tc: 'TC161', subKey: 'DUT MO', label: 'TC161 - Call Performance' },
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

      const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
      };

      // Mapping to existing KPI rules as a placeholder
      return {
        test: s.label,
        market: marketName,
        link: getDynamicLink(s.tc, marketName),
        callSetupTimeColor: mapExcellentToPass(getKpiCellColor('CallSetupTime', data.mean_setup_time, refData?.mean_setup_time)),
        callInitiationColor: mapExcellentToPass(getKpiCellColor('WfcCallCriteria', tcData.initiation_p_value, initiationFailureRate)),
        callRetentionColor: mapExcellentToPass(getKpiCellColor('WfcCallCriteria', tcData.retention_p_value, retentionFailureRate)),
        moMosValue: formatVal(data.mos_average),
        moMosColor: mapExcellentToPass(getKpiCellColor('WfcMOS', data.mos_average, refData?.mos_average)),
        mtMosValue: formatVal(tcData['DUT MT']?.mos_average),
        mtMosColor: mapExcellentToPass(getKpiCellColor('WfcMOS', tcData['DUT MT']?.mos_average, tcData['REF MT']?.mos_average))
      };
    }).filter(row => row !== null);
  };

  const getHandoverMarketRows = (marketName) => {
    const marketData = allReportData[marketName]?.wfcPerformance?.['WFC'];
    if (!marketData) return [];

    const scenarios = [
      { tc: 'TC164', label: 'TC164 - Multi Handovers' },
      { tc: 'TC167', label: 'TC167 - Multi Handovers' },
      { tc: 'TC170', label: 'TC170 - Multi Handovers' },
      { tc: 'TC172', label: 'TC172 - IP Impairments' },
      { tc: 'TC175', label: 'TC175 - In of WFC Coverage' },
      { tc: 'TC178', label: 'TC178 - Out of WFC Coverage' },
    ];

    return scenarios.map(s => {
      const tcData = marketData[s.tc];
      if (!tcData) return null;
      const data = tcData['DUT'];
      if (!data) return null;

      const refData = tcData['REF'];

      const mapExcellentToPass = (color) => {
        if (color === 'var(--performance-excellent)') {
          return 'var(--performance-pass)';
        }
        return color;
      };

      const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
      };

      return {
        test: s.label,
        market: marketName,
        link: getDynamicLink(s.tc, marketName),
        mosValue: formatVal(data.mos_average),
        mosColor: mapExcellentToPass(getKpiCellColor('WfcMOS', data.mos_average, refData?.mos_average)),
        rssi: formatVal(data.rssi_average),
        rsrp: formatVal(data.rsrp_average),
        callDrops: data.total_retention_failures || 0,
        handovers: data.minimum_handover || 'N/A',
        handoversColor: getKpiCellColor('MinimumHandovers', data.minimum_handover)
      };
    }).filter(row => row !== null);
  };

  const seattleData = getMarketRows('Seattle');
  const newYorkData = getMarketRows('New York');

  const seattleHandoverData = getHandoverMarketRows('Seattle');
  const newYorkHandoverData = getHandoverMarketRows('New York');

  return (
    <div className="page-content">
      <DynamicHeader level={1}>WFC Performance Test Overview</DynamicHeader>

      <DynamicHeader level={2}>Seattle Market</DynamicHeader>
      <h4>Call Performance and Voice Quality</h4>
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

      <h4>Handover Performance and Voice Quality</h4>
      <table className="general-table-style">
        <thead>
          <tr>
            <th>Test</th>
            <th>Average MOS</th>
            <th>Average RSSI</th>
            <th>Average RSRP</th>
            <th>Call Drops</th>
            <th>Handovers</th>
          </tr>
        </thead>
        <tbody>
          {seattleHandoverData.map((row, index) => (
            <tr key={index}>
              <td>{row.test}</td>
              <td style={{ backgroundColor: row.mosColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: "var(--performance-pass)" }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: "var(--performance-pass)" }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: "var(--performance-pass)" }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.handoversColor }}><a href={row.link}>Result</a></td>
            </tr>
          ))}
          {seattleHandoverData.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data available</td></tr>}
        </tbody>
      </table>
      {/* 
      <DynamicHeader level={2}>New York Market</DynamicHeader>
      <h4>Call Performance and Voice Quality</h4>
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
              <td style={{ backgroundColor: row.moMosColor }}><a href={row.link}>Result</a></td>
              <td style={{ backgroundColor: row.mtMosColor }}><a href={row.link}>Result</a></td>
            </tr>
          ))}
          {newYorkData.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data available</td></tr>}
        </tbody>
      </table>

      <h4>Handover Case</h4>
      <table className="general-table-style">
        <thead>
          <tr>
            <th>Test</th>
            <th>Average MOS</th>
            <th>Average RSSI</th>
            <th>Average RSRP</th>
            <th>Call Drops</th>
            <th>Handovers</th>
          </tr>
        </thead>
        <tbody>
          {newYorkHandoverData.map((row, index) => (
            <tr key={index}>
              <td>{row.test}</td>
              <td style={{ backgroundColor: row.mosColor }}><a href={row.link}>Result</a></td>
              <td>{row.rssi}</td>
              <td>{row.rsrp}</td>
              <td>{row.callDrops}</td>
              <td>{row.handovers}</td>
            </tr>
          ))}
          {newYorkHandoverData.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data available</td></tr>}
        </tbody>
      </table> */}
    </div>
  );
};

export default WfcSummaryPage;