import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';

const vqTableData1 = [
  {
    metric: "MOS Average",
    downlink: { ref: "4.29", dut1: "4.33", dut2: "4.32" },
    uplink: { ref: "4.28", dut1: "4.31", dut2: "4.33" },
    highlight: true
  },
  {
    metric: "MOS Stdev",
    downlink: { ref: "0.26", dut1: "0.16", dut2: "0.19" },
    uplink: { ref: "0.36", dut1: "0.35", dut2: "0.22" },
    highlight: false
  },
  {
    metric: "Maximum MOS",
    downlink: { ref: "4.47", dut1: "4.49", dut2: "4.48" },
    uplink: { ref: "4.50", dut1: "4.50", dut2: "4.50" },
    highlight: false
  },
  {
    metric: "Count",
    downlink: { ref: "512", dut1: "512", dut2: "510" },
    uplink: { ref: "510", dut1: "510", dut2: "509" },
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    downlink: { ref: "1.0%", dut1: "0.4%", dut2: "0.6%" },
    uplink: { ref: "1.6%", dut1: "2.0%", dut2: "0.6%" },
    highlight: true
  },
  {
    metric: "% MOS < 2.0",
    downlink: { ref: "0.4%", dut1: "0.0%", dut2: "0.0%" },
    uplink: { ref: "0.4%", dut1: "0.4%", dut2: "0.0%" },
    highlight: true
  }
];

const vqTableData2 = [
  {
    metric: "MOS Average",
    results: "4.33",
    highlightClass: "performance-excellent-bg"
  },
  {
    metric: "% MOS < 2.0",
    results: "0.0%",
    highlightClass: "performance-excellent-bg"
  },
  {
    metric: "% MOS < 3.0",
    results: "0.4%",
    highlightClass: "performance-excellent-bg"
  }
];

const VqAmrNbVq = () => {
  return (
    <div className="page-content">
      <h2>3.1 5G Auto VoNR Enabled AMR NB VQ</h2>
      <h3>Results</h3>
      <table className="general-table-style performance-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {vqTableData2.map((row, index) => (
            <tr key={index}>
              <td>{row.metric}</td>
              <td className={row.highlightClass}></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Details</h3>
      <table className="general-table-style vq-details-table">
        <thead>
          <tr>
            <th rowSpan="2"></th>
            <th colSpan="3">Downlink</th>
            <th colSpan="3">Uplink</th>
          </tr>
          <tr>
            <th>REF</th>
            <th>DUT 1</th>
            <th>DUT 2</th>
            <th>REF</th>
            <th>DUT 1</th>
            <th>DUT 2</th>
          </tr>
        </thead>
        <tbody>
          {vqTableData1.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              <td>{row.downlink.ref}</td>
              <td>{row.downlink.dut1}</td>
              <td>{row.downlink.dut2}</td>
              <td>{row.uplink.ref}</td>
              <td>{row.uplink.dut1}</td>
              <td>{row.uplink.dut2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* New table for Voice Quality Performance EVS to EVS Call Scenario */}

    </div>
  );
};

export default VqAmrNbVq;