import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';
import VqLineChart from './VqLineChart';
import VqMosTable from './VqMosTable';

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

const vqTableDataEVStoEVS_3_3 = [
  {
    metric: "MOS Average",
    downlink: { value: "", className: "bg-performance-fail" },
    uplink: { value: "", className: "bg-performance-fail" },
    highlight: true
  },
  {
    metric: "% MOS < 3.4",
    downlink: { value: "", className: "bg-performance-excellent" },
    uplink: { value: "", className: "bg-performance-excellent" },
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    downlink: { value: "", className: "bg-performance-excellent" },
    uplink: { value: "", className: "bg-performance-excellent" },
    highlight: true
  }
];

const vqTableDataEVStoAMR_3_3 = [
  {
    metric: "MOS Average",
    downlink: { value: "", className: "bg-performance-excellent" },
    uplink: { value: "", className: "bg-performance-excellent" },
    highlight: true
  },
  {
    metric: "% MOS < 3.4",
    downlink: { value: "", className: "bg-performance-excellent" },
    uplink: { value: "", className: "bg-performance-excellent" },
    highlight: false
  },
  {
    metric: "% MOS < 3.0",
    downlink: { value: "", className: "bg-performance-pass" },
    uplink: { value: "", className: "bg-performance-excellent" },
    highlight: true
  }
];

const VqEvsWbVqEnabled = () => {
  return (
    <>
      <div className="page-content">
        <h2>3.4 5G Auto VoNR Enabled EVS WB VQ</h2>
        <h3>Results</h3>
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
                  <td className={row.downlink.className}>{row.downlink.value}</td>
                  <td className={row.uplink.className}>{row.uplink.value}</td>
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
              {vqTableDataEVStoAMR_3_3.map((row, index) => (
                <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
                  <td>{row.metric}</td>
                  <td className={row.downlink.className}>{row.downlink.value}</td>
                  <td className={row.uplink.className}>{row.uplink.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Details</h3>
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
        <h3>VoNR Enabled EVS WB VQ Downlink</h3>
        <VqLineChart dataSource="vonr_enabled_evs_wb_vq_mobile" />
        <VqMosTable dataSource="vonr_enabled_evs_wb_vq_mobile" />
        <h3>VoNR Enabled EVS WB VQ Uplink</h3>
        <VqLineChart dataSource="vonr_enabled_evs_wb_vq_base" />
        <VqMosTable dataSource="vonr_enabled_evs_wb_vq_base" />
      </div>
    </>

  );
};

export default VqEvsWbVqEnabled;