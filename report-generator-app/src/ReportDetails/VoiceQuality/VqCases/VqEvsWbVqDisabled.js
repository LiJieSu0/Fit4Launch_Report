import React, { useContext, useEffect } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
import '../../../StyleScript/Restricted_Report_Style.css';
import VqLineChart from './VqLineChart';
import VqMosTable from './VqMosTable';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';

const getFormattedValue = (data, path, isPercentage = false, decimals = 2) => {
  let value = data;
  for (const key of path) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return 'N/A';
    }
  }
  if (typeof value === 'number') {
    if (isPercentage) {
      return `${(value).toFixed(decimals)}%`;
    }
    return value.toFixed(decimals);
  }
  return value;
};

const VqEvsWbVqDisabled = ({ city: propCity }) => {
  const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData || !reportData.voiceQuality || !reportData.voiceQuality["Voice Quality"]) {
    return <PageBreak>Loading {city} voice quality data...</PageBreak>;
  }

  const evsWbKey = "5G Auto VoNR Disabled EVS WB VQ";
  const evsWbDataPath = reportData.voiceQuality["Voice Quality"][evsWbKey];

  if (!evsWbDataPath) {
    return <PageBreak>Loading {evsWbKey} data for {city}...</PageBreak>;
  }

  const getEvsWbValue = (category, device, stat, isPercentage = false, decimals = 2) => {
    const path = [category, `vonr disable evs wb ${device} ${category.toLowerCase()}`, stat];
    return getFormattedValue(evsWbDataPath, path, isPercentage, decimals);
  };

  const vqTableData3 = [
    {
      metric: "MOS Average",
      mobile: { dut1: getEvsWbValue("Mobile", "DUT1", "MOS Average"), dut2: getEvsWbValue("Mobile", "DUT2", "MOS Average"), ref1: getEvsWbValue("Mobile", "REF1", "MOS Average"), ref2: getEvsWbValue("Mobile", "REF2", "MOS Average") },
      base: { dut1: getEvsWbValue("Base", "DUT1", "MOS Average"), dut2: getEvsWbValue("Base", "DUT2", "MOS Average"), ref1: getEvsWbValue("Base", "REF1", "MOS Average"), ref2: getEvsWbValue("Base", "REF2", "MOS Average") },
      highlight: true
    },
    {
      metric: "MOS Stdev",
      mobile: { dut1: getEvsWbValue("Mobile", "DUT1", "MOS Stdev"), dut2: getEvsWbValue("Mobile", "DUT2", "MOS Stdev"), ref1: getEvsWbValue("Mobile", "REF1", "MOS Stdev"), ref2: getEvsWbValue("Mobile", "REF2", "MOS Stdev") },
      base: { dut1: getEvsWbValue("Base", "DUT1", "MOS Stdev"), dut2: getEvsWbValue("Base", "DUT2", "MOS Stdev"), ref1: getEvsWbValue("Base", "REF1", "MOS Stdev"), ref2: getEvsWbValue("Base", "REF2", "MOS Stdev") },
      highlight: false
    },
    {
      metric: "Maximum MOS",
      mobile: { dut1: getEvsWbValue("Mobile", "DUT1", "Maximum MOS"), dut2: getEvsWbValue("Mobile", "DUT2", "Maximum MOS"), ref1: getEvsWbValue("Mobile", "REF1", "Maximum MOS"), ref2: getEvsWbValue("Mobile", "REF2", "Maximum MOS") },
      base: { dut1: getEvsWbValue("Base", "DUT1", "Maximum MOS"), dut2: getEvsWbValue("Base", "DUT2", "Maximum MOS"), ref1: getEvsWbValue("Base", "REF1", "Maximum MOS"), ref2: getEvsWbValue("Base", "REF2", "Maximum MOS") },
      highlight: false
    },
    {
      metric: "Count",
      mobile: { dut1: getEvsWbValue("Mobile", "DUT1", "Counts", false, 0), dut2: getEvsWbValue("Mobile", "DUT2", "Counts", false, 0), ref1: getEvsWbValue("Mobile", "REF1", "Counts", false, 0), ref2: getEvsWbValue("Mobile", "REF2", "Counts", false, 0) },
      base: { dut1: getEvsWbValue("Base", "DUT1", "Counts", false, 0), dut2: getEvsWbValue("Base", "DUT2", "Counts", false, 0), ref1: getEvsWbValue("Base", "REF1", "Counts", false, 0), ref2: getEvsWbValue("Base", "REF2", "Counts", false, 0) },
      highlight: false
    },
    {
      metric: "% MOS < 3.4",
      mobile: { dut1: getEvsWbValue("Mobile", "DUT1", "% MOS < 3.4", true, 2), dut2: getEvsWbValue("Mobile", "DUT2", "% MOS < 3.4", true, 2), ref1: getEvsWbValue("Mobile", "REF1", "% MOS < 3.4", true, 2), ref2: getEvsWbValue("Mobile", "REF2", "% MOS < 3.4", true, 2) },
      base: { dut1: getEvsWbValue("Base", "DUT1", "% MOS < 3.4", true, 2), dut2: getEvsWbValue("Base", "DUT2", "% MOS < 3.4", true, 2), ref1: getEvsWbValue("Base", "REF1", "% MOS < 3.4", true, 2), ref2: getEvsWbValue("Base", "REF2", "% MOS < 3.4", true, 2) },
      highlight: true
    },
    {
      metric: "% MOS < 3.0",
      mobile: { dut1: getEvsWbValue("Mobile", "DUT1", "% MOS < 3.0", true, 2), dut2: getEvsWbValue("Mobile", "DUT2", "% MOS < 3.0", true, 2), ref1: getEvsWbValue("Mobile", "REF1", "% MOS < 3.0", true, 2), ref2: getEvsWbValue("Mobile", "REF2", "% MOS < 3.0", true, 2) },
      base: { dut1: getEvsWbValue("Base", "DUT1", "% MOS < 3.0", true, 2), dut2: getEvsWbValue("Base", "DUT2", "% MOS < 3.0", true, 2), ref1: getEvsWbValue("Base", "REF1", "% MOS < 3.0", true, 2), ref2: getEvsWbValue("Base", "REF2", "% MOS < 3.0", true, 2) },
      highlight: true
    },
  ];

  const vqTableDataEVStoEVS_3_3 = [
    {
      metric: "MOS Average",
      downlink: { value: "", className: "" },
      uplink: { value: "", className: "" },
      highlight: true
    },
    {
      metric: "% MOS < 3.4",
      downlink: { value: "", className: "" },
      uplink: { value: "", className: "" },
      highlight: false
    },
    {
      metric: "% MOS < 3.0",
      downlink: { value: "", className: "" },
      uplink: { value: "", className: "" },
      highlight: true
    }
  ];

  const vqTableDataEVStoAMR_3_3 = [
    {
      metric: "MOS Average",
      downlink: { value: "", className: "" },
      uplink: { value: "", className: "" },
      highlight: true
    },
    {
      metric: "% MOS < 3.4",
      downlink: { value: "", className: "" },
      uplink: { value: "", className: "" },
      highlight: false
    },
    {
      metric: "% MOS < 3.0",
      downlink: { value: "", className: "" },
      uplink: { value: "", className: "" },
      highlight: true
    }
  ];

  return (
    <>
      <PageBreak>
        <DynamicHeader level={2}>5G Auto VoNR Disabled EVS WB VQ - {city}</DynamicHeader>
        <h4>Results</h4>
        <div className="two-column-layout">
          <table className="general-table-style half-width-table vq-summary-table">
            <thead>
              <tr>
                <th colSpan="3" className="title">
                  Voice Quality Performance
                  EVS to EVS Calling
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

          <table className="general-table-style half-width-table vq-summary-table">
            <thead>
              <tr>
                <th colSpan="3" className="title">
                  Voice Quality Performance
                  EVS to AMR Transcode Calling
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
        <h4>Details</h4>
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
      </PageBreak>
      <PageBreak>
        <h4>VoNR Disabled EVS WB VQ Downlink MOS Distribution - {city}</h4>
        <VqLineChart dataSource="vonr_disabled_evs_wb_vq_mobile" city={city} />
        <VqMosTable dataSource="vonr_disabled_evs_wb_vq_mobile" city={city} />
        <h4>VoNR Disabled EVS WB VQ Uplink MOS Distribution - {city}</h4>
        <VqLineChart dataSource="vonr_disabled_evs_wb_vq_base" city={city} />
        <VqMosTable dataSource="vonr_disabled_evs_wb_vq_base" city={city} />
      </PageBreak>
    </>
  );
};

export default VqEvsWbVqDisabled;