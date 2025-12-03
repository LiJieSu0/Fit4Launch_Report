import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';

const vqTableData5 = [
  {
    metric: "Average (ms)",
    dut1: "333.23",
    dut2: "326.47",
    ref1: "323.20",
    ref2: "328.31",
    highlight: false
  },
  {
    metric: "Average of 2 Devices (ms)",
    dut: "329.85",
    ref: "325.75",
    highlight: true
  },
  {
    metric: "Stdev (ms)",
    dut1: "13.03",
    dut2: "13.57",
    ref1: "16.70",
    ref2: "51.00",
    highlight: false
  },
  {
    metric: "Maximum (ms)",
    dut1: "365.41",
    dut2: "367.91",
    ref1: "415.75",
    ref2: "1157.07",
    highlight: false
  },
  {
    metric: "Minimum (ms)",
    dut1: "278.42",
    dut2: "298.17",
    ref1: "274.78",
    ref2: "285.33",
    highlight: false
  },
  {
    metric: "Count",
    dut1: "286",
    dut2: "285",
    ref1: "286",
    ref2: "285",
    highlight: false
  }
];

const VqKpiAudioDelay = () => {
  return (
    <div className="page-content">
      <h2>3.5 KPI FOR AUDIO DELAY</h2>
      <table className="general-table-style vq-details-table">
        <thead>
          <tr>
            <th rowSpan="2"></th>
            <th colSpan="4">KPI FOR AUDIO DELAY</th>
          </tr>
          <tr>
            <th>DUT 1</th>
            <th>DUT 2</th>
            <th>REF 1</th>
            <th>REF 2</th>
          </tr>
        </thead>
        <tbody>
          {vqTableData5.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              {row.metric === "Average of 2 Devices (ms)" ? (
                <>
                  <td colSpan="2" className="bg-performance-pass">{row.dut}</td>
                  <td colSpan="2">{row.ref}</td>
                </>
              ) : (
                <>
                  <td>{row.dut1}</td>
                  <td>{row.dut2}</td>
                  <td>{row.ref1}</td>
                  <td>{row.ref2}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VqKpiAudioDelay;