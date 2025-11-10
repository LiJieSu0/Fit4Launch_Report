import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';
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
    mobile: { dut1: "3.61", dut2: "3.27", ref1: "3.69", ref2: "3.33" },
    base: { dut1: "3.68", dut2: "3.24", ref1: "3.79", ref2: "3.56" },
    highlight: true
  },
  {
    metric: "MOS Stdev",
    mobile: { dut1: "0.55", dut2: "0.50", ref1: "0.60", ref2: "0.53" },
    base: { dut1: "0.44", dut2: "0.30", ref1: "0.39", ref2: "0.33" },
    highlight: false
  },
  {
    metric: "Maximum MOS",
    mobile: { dut1: "4.01", dut2: "3.68", ref1: "4.08", ref2: "3.93" },
    base: { dut1: "4.02", dut2: "3.52", ref1: "4.04", ref2: "3.92" },
    highlight: false
  },
  {
    metric: "Count",
    mobile: { dut1: "511", dut2: "514", ref1: "515", ref2: "515" },
    base: { dut1: "502", dut2: "505", ref1: "506", ref2: "506" },
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    mobile: { dut1: "10.6%", dut2: "14.2%", ref1: "10.3%", ref2: "15.9%" },
    base: { dut1: "9.4%", dut2: "7.9%", ref1: "5.3%", ref2: "6.5%" },
    highlight: true
  },
  {
    metric: "% MOS < 3.4",
    mobile: { dut1: "15.1%", dut2: "38.5%", ref1: "13.0%", ref2: "41.4%" },
    base: { dut1: "10.8%", dut2: "80.6%", ref1: "7.3%", ref2: "11.3%" },
    highlight: true
  }
];

const vqTableData4 = [
  {
    metric: "MOS Average",
    mobile: { dut1: "3.65", dut2: "3.45", ref1: "3.73", ref2: "3.49" },
    base: { dut1: "3.70", dut2: "3.22", ref1: "3.71", ref2: "3.37" },
    highlight: true
  },
  {
    metric: "MOS Stdev",
    mobile: { dut1: "0.62", dut2: "0.62", ref1: "0.71", ref2: "0.51" },
    base: { dut1: "0.51", dut2: "0.64", ref1: "0.66", ref2: "0.66" },
    highlight: false
  },
  {
    metric: "Maximum MOS",
    mobile: { dut1: "4.08", dut2: "3.90", ref1: "4.19", ref2: "3.86" },
    base: { dut1: "4.06", dut2: "3.89", ref1: "4.14", ref2: "3.87" },
    highlight: false
  },
  {
    metric: "Count",
    mobile: { dut1: "505", dut2: "502", ref1: "507", ref2: "505" },
    base: { dut1: "507", dut2: "504", ref1: "505", ref2: "508" },
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    mobile: { dut1: "11.1%", dut2: "14.5%", ref1: "13.4%", ref2: "8.7%" },
    base: { dut1: "8.9%", dut2: "27.6%", ref1: "13.5%", ref2: "17.9%" },
    highlight: true
  },
  {
    metric: "% MOS < 3.4",
    mobile: { dut1: "15.0%", dut2: "18.1%", ref1: "17.9%", ref2: "18.2%" },
    base: { dut1: "12.4%", dut2: "47.0%", ref1: "17.2%", ref2: "28.0%" },
    highlight: true
  }
];

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


const VqDetailsPage = () => {
  

  return (
    <div>
        <div className="page-content">
            <h2>3.1 5G Auto VoNR Enabled AMR NB VQ</h2>
            <table className="general-table-style vq-details-table">
              <thead>
                <tr>
                  <th rowSpan="2"></th>
                  <th colSpan="3">DOWNLINK</th>
                  <th colSpan="3">UPLINK</th>
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
        </div>
        <div className="page-content">
            <h2>3.2 5G Auto VoNR Enabled AMR WB VQ</h2>
            <table className="general-table-style vq-details-table">
              <thead>
                <tr>
                  <th rowSpan="2"></th>
                  <th colSpan="3">MOBILE</th>
                  <th colSpan="3">BASE</th>
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
        </div>
        <div className="page-content">
            <h2>3.3 5G Auto VoNR Disabled EVS WB VQ</h2>
            <table className="general-table-style vq-details-table">
              <thead>
                <tr>
                  <th rowSpan="2"></th>
                  <th colSpan="4">MOBILE</th>
                  <th colSpan="4">BASE</th>
                </tr>
                <tr>
                  <th>DUT 1</th>
                  <th>DUT 2</th>
                  <th>REF 1</th>
                  <th>REF 2</th>
                  <th>DUT 1</th>
                  <th>DUT 2</th>
                  <th>REF 1</th>
                  <th>REF 2</th>
                </tr>
              </thead>
              <tbody>
                {vqTableData3.map((row, index) => (
                  <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
                    <td>{row.metric}</td>
                    <td>{row.mobile.dut1}</td>
                    <td>{row.mobile.dut2}</td>
                    <td>{row.mobile.ref1}</td>
                    <td>{row.mobile.ref2}</td>
                    <td>{row.base.dut1}</td>
                    <td>{row.base.dut2}</td>
                    <td>{row.base.ref1}</td>
                    <td>{row.base.ref2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        <div className="page-content">
            <h2>3.4 5G Auto VoNR Enabled EVS WB VQ</h2>
            <table className="general-table-style vq-details-table">
              <thead>
                <tr>
                  <th rowSpan="2"></th>
                  <th colSpan="4">MOBILE</th>
                  <th colSpan="4">BASE</th>
                </tr>
                <tr>
                  <th>DUT 1</th>
                  <th>DUT 2</th>
                  <th>REF 1</th>
                  <th>REF 2</th>
                  <th>DUT 1</th>
                  <th>DUT 2</th>
                  <th>REF 1</th>
                  <th>REF 2</th>
                </tr>
              </thead>
              <tbody>
                {vqTableData4.map((row, index) => (
                  <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
                    <td>{row.metric}</td>
                    <td>{row.mobile.dut1}</td>
                    <td>{row.mobile.dut2}</td>
                    <td>{row.mobile.ref1}</td>
                    <td>{row.mobile.ref2}</td>
                    <td>{row.base.dut1}</td>
                    <td>{row.base.dut2}</td>
                    <td>{row.base.ref1}</td>
                    <td>{row.base.ref2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
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
    </div>
    
  );
};

export default VqDetailsPage;