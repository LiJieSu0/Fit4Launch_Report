import React, { useContext, useEffect } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
import '../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';
import { getKpiCellClass, getWorstKpiClass } from '../../../Utils/KpiRules';

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

const VqAmrNbVq = ({ city: propCity, firstSection }) => {
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

  const amrNbKey = "5G Auto VoNR Enabled AMR NB VQ";
  const amrNbDataPath = reportData.voiceQuality["Voice Quality"][amrNbKey];

  if (!amrNbDataPath) {
    return <PageBreak>Loading {amrNbKey} data for {city}...</PageBreak>;
  }

  const getAmrNbValue = (device, type, stat, isPercentage = false, decimals = 2) => {
    const path = [device, `${type}_mos_stats`, stat];
    return getFormattedValue(amrNbDataPath, path, isPercentage, decimals);
  };

  const vqTableData1 = [
    {
      metric: "MOS Average",
      downlink: {
        ref: getAmrNbValue("REF1", "dl", "mean"),
        dut1: getAmrNbValue("DUT1", "dl", "mean"),
        dut2: getAmrNbValue("DUT2", "dl", "mean"),
        dut1Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT1", "dl", "mean"), getAmrNbValue("REF1", "dl", "mean")),
        dut2Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT2", "dl", "mean"), getAmrNbValue("REF1", "dl", "mean"))
      },
      uplink: {
        ref: getAmrNbValue("REF1", "ul", "mean"),
        dut1: getAmrNbValue("DUT1", "ul", "mean"),
        dut2: getAmrNbValue("DUT2", "ul", "mean"),
        dut1Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT1", "ul", "mean"), getAmrNbValue("REF1", "ul", "mean")),
        dut2Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT2", "ul", "mean"), getAmrNbValue("REF1", "ul", "mean"))
      },
      highlight: true
    },
    {
      metric: "MOS Stdev",
      downlink: {
        ref: getAmrNbValue("REF1", "dl", "std_dev"),
        dut1: getAmrNbValue("DUT1", "dl", "std_dev"),
        dut2: getAmrNbValue("DUT2", "dl", "std_dev")
      },
      uplink: {
        ref: getAmrNbValue("REF1", "ul", "std_dev"),
        dut1: getAmrNbValue("DUT1", "ul", "std_dev"),
        dut2: getAmrNbValue("DUT2", "ul", "std_dev")
      },
      highlight: false
    },
    {
      metric: "Maximum MOS",
      downlink: {
        ref: getAmrNbValue("REF1", "dl", "max"),
        dut1: getAmrNbValue("DUT1", "dl", "max"),
        dut2: getAmrNbValue("DUT2", "dl", "max")
      },
      uplink: {
        ref: getAmrNbValue("REF1", "ul", "max"),
        dut1: getAmrNbValue("DUT1", "ul", "max"),
        dut2: getAmrNbValue("DUT2", "ul", "max")
      },
      highlight: false
    },
    {
      metric: "Count",
      downlink: {
        ref: getAmrNbValue("REF1", "dl", "count", false, 0),
        dut1: getAmrNbValue("DUT1", "dl", "count", false, 0),
        dut2: getAmrNbValue("DUT2", "dl", "count", false, 0)
      },
      uplink: {
        ref: getAmrNbValue("REF1", "ul", "count", false, 0),
        dut1: getAmrNbValue("DUT1", "ul", "count", false, 0),
        dut2: getAmrNbValue("DUT2", "ul", "count", false, 0)
      },
      highlight: false
    },
    {
      metric: "% MOS < 2.0",
      downlink: {
        ref: getAmrNbValue("REF1", "dl", "% MOS < 2.0", true, 2),
        dut1: getAmrNbValue("DUT1", "dl", "% MOS < 2.0", true, 2),
        dut2: getAmrNbValue("DUT2", "dl", "% MOS < 2.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT1", "dl", "% MOS < 2.0"), getAmrNbValue("REF1", "dl", "% MOS < 2.0")),
        dut2Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT2", "dl", "% MOS < 2.0"), getAmrNbValue("REF1", "dl", "% MOS < 2.0"))
      },
      uplink: {
        ref: getAmrNbValue("REF1", "ul", "% MOS < 2.0", true, 2),
        dut1: getAmrNbValue("DUT1", "ul", "% MOS < 2.0", true, 2),
        dut2: getAmrNbValue("DUT2", "ul", "% MOS < 2.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT1", "ul", "% MOS < 2.0"), getAmrNbValue("REF1", "ul", "% MOS < 2.0")),
        dut2Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT2", "ul", "% MOS < 2.0"), getAmrNbValue("REF1", "ul", "% MOS < 2.0"))
      },
      highlight: true
    },
    {
      metric: "% MOS < 3.0",
      downlink: {
        ref: getAmrNbValue("REF1", "dl", "% MOS < 3.0", true, 2),
        dut1: getAmrNbValue("DUT1", "dl", "% MOS < 3.0", true, 2),
        dut2: getAmrNbValue("DUT2", "dl", "% MOS < 3.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT1", "dl", "% MOS < 3.0"), getAmrNbValue("REF1", "dl", "% MOS < 3.0")),
        dut2Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT2", "dl", "% MOS < 3.0"), getAmrNbValue("REF1", "dl", "% MOS < 3.0"))
      },
      uplink: {
        ref: getAmrNbValue("REF1", "ul", "% MOS < 3.0", true, 2),
        dut1: getAmrNbValue("DUT1", "ul", "% MOS < 3.0", true, 2),
        dut2: getAmrNbValue("DUT2", "ul", "% MOS < 3.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT1", "ul", "% MOS < 3.0"), getAmrNbValue("REF1", "ul", "% MOS < 3.0")),
        dut2Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT2", "ul", "% MOS < 3.0"), getAmrNbValue("REF1", "ul", "% MOS < 3.0"))
      },
      highlight: true
    }
  ];

  const getWorstClassForMetric = (metricName) => {
    const row = vqTableData1.find(r => r.metric === metricName);
    if (!row) return "";
    return getWorstKpiClass([
      row.downlink.dut1Class,
      row.downlink.dut2Class,
      row.uplink.dut1Class,
      row.uplink.dut2Class
    ]);
  };

  const vqTableData2 = [
    {
      metric: "MOS Average",
      results: "",
      highlightClass: getWorstClassForMetric("MOS Average")
    },
    {
      metric: "% MOS < 2.0",
      results: "",
      highlightClass: getWorstClassForMetric("% MOS < 2.0")
    },
    {
      metric: "% MOS < 3.0",
      results: "",
      highlightClass: getWorstClassForMetric("% MOS < 3.0")
    }
  ];
  return (
    <PageBreak>
      {firstSection && <DynamicHeader level={1} style={{ textAlign: 'center' }}>Voice Quality Test</DynamicHeader>}
      <DynamicHeader level={2}>5G Auto VoNR Enabled AMR NB VQ - {city}</DynamicHeader>
      <h4>Results</h4>
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
              <td className={row.highlightClass}>{row.results}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Details</h4>
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
              <td className={row.downlink.dut1Class}>{row.downlink.dut1}</td>
              <td className={row.downlink.dut2Class}>{row.downlink.dut2}</td>
              <td>{row.uplink.ref}</td>
              <td className={row.uplink.dut1Class}>{row.uplink.dut1}</td>
              <td className={row.uplink.dut2Class}>{row.uplink.dut2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageBreak>
  );
};

export default VqAmrNbVq;