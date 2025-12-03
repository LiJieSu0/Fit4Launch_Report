import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';

const vqTableData2 = [
  {
    metric: "MOS Average",
    mobile: { ref: "3.36", dut1: "3.56", dut2: "3.52" },
    base: { ref: "3.42", dut1: "3.49", dut2: "3.57" },
    highlight: true
  },
  {
    metric: "MOS Stdev",
    mobile: { ref: "0.44", dut1: "0.20", dut2: "0.25" },
    base: { ref: "0.49", dut1: "0.34", dut2: "0.23" },
    highlight: false
  },
  {
    metric: "Maximum MOS",
    mobile: { ref: "3.77", dut1: "3.82", dut2: "3.83" },
    base: { ref: "3.80", dut1: "3.84", dut2: "3.81" },
    highlight: false
  },
  {
    metric: "Count",
    mobile: { ref: "502", dut1: "502", dut2: "503" },
    base: { ref: "505", dut1: "505", dut2: "505" },
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    mobile: { ref: "14.7%", dut1: "2.8%", dut2: "4.4%" },
    base: { ref: "12.3%", dut1: "8.7%", dut2: "4.8%" },
    highlight: true
  },
  {
    metric: "% MOS < 2.0",
    mobile: { ref: "2.4%", dut1: "0.2%", dut2: "0.0%" },
    base: { ref: "3.0%", dut1: "0.4%", dut2: "0.0%" },
    highlight: true
  }
];


const vqTableData3 = [
  {
    metric: "MOS Average",
    results: "3.56",
    highlightClass: "performance-excellent-bg"
  },
  {
    metric: "% MOS < 2.0",
    results: "0.2%",
    highlightClass: "performance-excellent-bg"
  },
  {
    metric: "% MOS < 3.0",
    results: "2.8%",
    highlightClass: "performance-excellent-bg"
  }
];

const VqAmrWbVq = () => {
  return (
    <div className="page-content">
      <h2>3.2 5G Auto VoNR Enabled AMR WB VQ</h2>
      <h3>Results</h3>      
      <table className="general-table-style performance-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {vqTableData3.map((row, index) => (
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
          </tr>
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
          {vqTableData2.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              <td>{row.mobile.ref}</td>
              <td>{row.mobile.dut1}</td>
              <td>{row.mobile.dut2}</td>
              <td>{row.base.ref}</td>
              <td>{row.base.dut1}</td>
              <td>{row.base.dut2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* New table for Voice Quality Performance EVS to EVS Call Scenario */}

    </div>
  );
};

export default VqAmrWbVq;