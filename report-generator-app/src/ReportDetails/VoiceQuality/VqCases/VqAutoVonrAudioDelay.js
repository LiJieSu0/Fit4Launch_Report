import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';

const vqTableData6 = [
  {
    metric: "Average (ms)",
    dut1: "310.82",
    dut2: "299.96",
    ref1: "331.56",
    ref2: "335.30",
    highlight: false
  },
  {
    metric: "Average of 2 Devices (ms)",
    dut: "305.39",
    ref: "333.43",
    highlight: true
  },
  {
    metric: "Stdev (ms)",
    dut1: "10.88",
    dut2: "14.76",
    ref1: "15.65",
    ref2: "34.55",
    highlight: false
  },
  {
    metric: "Maximum (ms)",
    dut1: "397.87",
    dut2: "386.30",
    ref1: "388.02",
    ref2: "823.20",
    highlight: false
  },
  {
    metric: "Minimum (ms)",
    dut1: "282.54",
    dut2: "266.91",
    ref1: "279.68",
    ref2: "296.00",
    highlight: false
  },
  {
    metric: "Count",
    dut1: "282",
    dut2: "281",
    ref1: "282",
    ref2: "280",
    highlight: false
  }
];

const VqAutoVonrAudioDelay = () => {
  return (
    <div className="page-content">
      <h2>3.6 Auto VoNR Enabled Audio Delay</h2>
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
          {vqTableData6.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              {row.metric === "Average of 2 Devices (ms)" ? (
                <>
                  <td colSpan="2">{row.dut}</td>
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

export default VqAutoVonrAudioDelay;