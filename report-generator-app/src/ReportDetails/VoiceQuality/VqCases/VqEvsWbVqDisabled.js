import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';
import VqLineChart from './VqLineChart';
import VqMosTable from './VqMosTable';
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

const vqTableDataEVStoEVS_3_3 = [
  {
    metric: "MOS Average",
    downlink: "",
    uplink: "",
    highlight: true
  },
  {
    metric: "% MOS < 3.4",
    downlink: "",
    uplink: "",
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    downlink: "",
    uplink: "",
    highlight: true
  }
];

const VqEvsWbVqDisabled = () => {
  return (
    <div className="page-content">
      <h2>3.3 5G Auto VoNR Disabled EVS WB VQ</h2>
      <div className="two-column-layout">
        <table className="general-table-style half-width-table">
          <thead>
            <tr>
              <th colSpan="3" className="title">
                Voice Quality Performance
                EVS to EVS Call Scenario
              </th>
            </tr>
            <tr>
              <th>Metric</th>
              <th>Downlink</th>
              <th>Uplink</th>
            </tr>
          </thead>
          <tbody>
            {vqTableDataEVStoEVS_3_3.map((row, index) => (
              <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
                <td>{row.metric}</td>
                <td>{row.downlink}</td>
                <td>{row.uplink}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="general-table-style half-width-table">
          <thead>
            <tr>
              <th colSpan="3" className="title">
                Voice Quality Performance
                EVS to AMR Call Scenario
              </th>
            </tr>
            <tr>
              <th>Metric</th>
              <th>Downlink</th>
              <th>Uplink</th>
            </tr>
          </thead>
          <tbody>
            {vqTableDataEVStoEVS_3_3.map((row, index) => (
              <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
                <td>{row.metric}</td>
                <td>{row.downlink}</td>
                <td>{row.uplink}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table className="general-table-style vq-details-table">
        <thead>
          <tr>
            <th rowSpan="2"></th>
            <th colSpan="4">Downlink</th>
            <th colSpan="4">Uplink</th>
          </tr>
          <tr>
            <th>DUT 1 (EVS to EVS)</th>
            <th>REF 1 (EVS to EVS)</th>
            <th>DUT 2 (EVS to AMR)</th>
            <th>REF 2 (EVS to AMR)</th>
            <th>DUT 1 (EVS to EVS)</th>
            <th>REF 1 (EVS to EVS)</th>
            <th>DUT 2 (EVS to AMR)</th>
            <th>REF 2 (EVS to AMR)</th>
          </tr>
        </thead>
        <tbody>
          {vqTableData3.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              <td>{row.mobile.dut1}</td>
              <td>{row.mobile.ref1}</td>
              <td>{row.mobile.dut2}</td>
              <td>{row.mobile.ref2}</td>
              <td>{row.base.dut1}</td>
              <td>{row.base.ref1}</td>
              <td>{row.base.dut2}</td>
              <td>{row.base.ref2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>VoNR Disabled EVS WB VQ Downlink</h3>
      <VqLineChart dataSource="vonr_disabled_evs_wb_vq_mobile" />
      <VqMosTable  dataSource="vonr_disabled_evs_wb_vq_mobile" />
      <h3>VoNR Disabled EVS WB VQ Uplink</h3>
      <VqLineChart dataSource="vonr_disabled_evs_wb_vq_base" />
          
    </div>
  );
};

export default VqEvsWbVqDisabled;