import React, { useContext, useEffect } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
import '../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';
import { getKpiCellClass, getWorstKpiClass } from '../../../Utils/KpiRules';
import VqAttenuationTable from './VqAttenuationTable';

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

const VqAmrNbVq = ({ city: propCity }) => {
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

  const getAmrNbValue = (device, location, stat, isPercentage = false, decimals = 2) => {
    let path;
    const isDl = stat.startsWith('dl.');
    const isUl = stat.startsWith('ul.');

    if (isDl || isUl) {
      const type = isDl ? 'dl_mos_stats' : 'ul_mos_stats';
      const actualStat = stat.substring(3); // Remove 'dl.' or 'ul.'

      if (amrNbDataPath[location] && amrNbDataPath[location][device]) {
        path = [location, device, type, actualStat];
      } else if (amrNbDataPath[device]) {
        path = [device, type, actualStat];
      } else {
        path = [device, type, actualStat]; // Fallback
      }
    } else {
      if (amrNbDataPath[location] && amrNbDataPath[location][device]) {
        path = [location, device, stat];
      } else if (amrNbDataPath[device]) {
        path = [device, stat];
      } else {
        path = [device, stat]; // Fallback
      }
    }
    return getFormattedValue(amrNbDataPath, path, isPercentage, decimals);
  };

  const vqTableData1 = [
    {
      metric: "MOS Average",
      downlink: {
        ref: getAmrNbValue("REF", "Base", "dl.mean") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.mean") : getAmrNbValue("REF1", "Base", "dl.mean"),
        dut1: getAmrNbValue("DUT1", "Base", "dl.mean"),
        dut2: getAmrNbValue("DUT2", "Base", "dl.mean"),
        dut1Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT1", "Base", "dl.mean"), getAmrNbValue("REF", "Base", "dl.mean") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.mean") : getAmrNbValue("REF1", "Base", "dl.mean")),
        dut2Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT2", "Base", "dl.mean"), getAmrNbValue("REF", "Base", "dl.mean") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.mean") : getAmrNbValue("REF1", "Base", "dl.mean"))
      },
      uplink: {
        ref: getAmrNbValue("REF", "Base", "ul.mean") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.mean") : getAmrNbValue("REF1", "Base", "ul.mean"),
        dut1: getAmrNbValue("DUT1", "Base", "ul.mean"),
        dut2: getAmrNbValue("DUT2", "Base", "ul.mean"),
        dut1Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT1", "Base", "ul.mean"), getAmrNbValue("REF", "Base", "ul.mean") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.mean") : getAmrNbValue("REF1", "Base", "ul.mean")),
        dut2Class: getKpiCellClass('AmrMosAverage', getAmrNbValue("DUT2", "Base", "ul.mean"), getAmrNbValue("REF", "Base", "ul.mean") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.mean") : getAmrNbValue("REF1", "Base", "ul.mean"))
      },
      highlight: true
    },
    {
      metric: "MOS Stdev",
      downlink: {
        ref: getAmrNbValue("REF", "Base", "dl.std_dev") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.std_dev") : getAmrNbValue("REF1", "Base", "dl.std_dev"),
        dut1: getAmrNbValue("DUT1", "Base", "dl.std_dev"),
        dut2: getAmrNbValue("DUT2", "Base", "dl.std_dev")
      },
      uplink: {
        ref: getAmrNbValue("REF", "Base", "ul.std_dev") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.std_dev") : getAmrNbValue("REF1", "Base", "ul.std_dev"),
        dut1: getAmrNbValue("DUT1", "Base", "ul.std_dev"),
        dut2: getAmrNbValue("DUT2", "Base", "ul.std_dev")
      },
      highlight: false
    },
    {
      metric: "Maximum MOS",
      downlink: {
        ref: getAmrNbValue("REF", "Base", "dl.max") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.max") : getAmrNbValue("REF1", "Base", "dl.max"),
        dut1: getAmrNbValue("DUT1", "Base", "dl.max"),
        dut2: getAmrNbValue("DUT2", "Base", "dl.max")
      },
      uplink: {
        ref: getAmrNbValue("REF", "Base", "ul.max") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.max") : getAmrNbValue("REF1", "Base", "ul.max"),
        dut1: getAmrNbValue("DUT1", "Base", "ul.max"),
        dut2: getAmrNbValue("DUT2", "Base", "ul.max")
      },
      highlight: false
    },
    {
      metric: "Count",
      downlink: {
        ref: getAmrNbValue("REF", "Base", "dl.count", false, 0) !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.count", false, 0) : getAmrNbValue("REF1", "Base", "dl.count", false, 0),
        dut1: getAmrNbValue("DUT1", "Base", "dl.count", false, 0),
        dut2: getAmrNbValue("DUT2", "Base", "dl.count", false, 0)
      },
      uplink: {
        ref: getAmrNbValue("REF", "Base", "ul.count", false, 0) !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.count", false, 0) : getAmrNbValue("REF1", "Base", "ul.count", false, 0),
        dut1: getAmrNbValue("DUT1", "Base", "ul.count", false, 0),
        dut2: getAmrNbValue("DUT2", "Base", "ul.count", false, 0)
      },
      highlight: false
    },
    {
      metric: "% MOS < 2.0",
      downlink: {
        ref: getAmrNbValue("REF", "Base", "dl.% MOS < 2.0", true, 2) !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.% MOS < 2.0", true, 2) : getAmrNbValue("REF1", "Base", "dl.% MOS < 2.0", true, 2),
        dut1: getAmrNbValue("DUT1", "Base", "dl.% MOS < 2.0", true, 2),
        dut2: getAmrNbValue("DUT2", "Base", "dl.% MOS < 2.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT1", "Base", "dl.% MOS < 2.0"), getAmrNbValue("REF", "Base", "dl.% MOS < 2.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.% MOS < 2.0") : getAmrNbValue("REF1", "Base", "dl.% MOS < 2.0")),
        dut2Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT2", "Base", "dl.% MOS < 2.0"), getAmrNbValue("REF", "Base", "dl.% MOS < 2.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.% MOS < 2.0") : getAmrNbValue("REF1", "Base", "dl.% MOS < 2.0"))
      },
      uplink: {
        ref: getAmrNbValue("REF", "Base", "ul.% MOS < 2.0", true, 2) !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.% MOS < 2.0", true, 2) : getAmrNbValue("REF1", "Base", "ul.% MOS < 2.0", true, 2),
        dut1: getAmrNbValue("DUT1", "Base", "ul.% MOS < 2.0", true, 2),
        dut2: getAmrNbValue("DUT2", "Base", "ul.% MOS < 2.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT1", "Base", "ul.% MOS < 2.0"), getAmrNbValue("REF", "Base", "ul.% MOS < 2.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.% MOS < 2.0") : getAmrNbValue("REF1", "Base", "ul.% MOS < 2.0")),
        dut2Class: getKpiCellClass('AmrMosTwoPointZero', getAmrNbValue("DUT2", "Base", "ul.% MOS < 2.0"), getAmrNbValue("REF", "Base", "ul.% MOS < 2.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.% MOS < 2.0") : getAmrNbValue("REF1", "Base", "ul.% MOS < 2.0"))
      },
      highlight: true
    },
    {
      metric: "% MOS < 3.0",
      downlink: {
        ref: getAmrNbValue("REF", "Base", "dl.% MOS < 3.0", true, 2) !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.% MOS < 3.0", true, 2) : getAmrNbValue("REF1", "Base", "dl.% MOS < 3.0", true, 2),
        dut1: getAmrNbValue("DUT1", "Base", "dl.% MOS < 3.0", true, 2),
        dut2: getAmrNbValue("DUT2", "Base", "dl.% MOS < 3.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT1", "Base", "dl.% MOS < 3.0"), getAmrNbValue("REF", "Base", "dl.% MOS < 3.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.% MOS < 3.0") : getAmrNbValue("REF1", "Base", "dl.% MOS < 3.0")),
        dut2Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT2", "Base", "dl.% MOS < 3.0"), getAmrNbValue("REF", "Base", "dl.% MOS < 3.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "dl.% MOS < 3.0") : getAmrNbValue("REF1", "Base", "dl.% MOS < 3.0"))
      },
      uplink: {
        ref: getAmrNbValue("REF", "Base", "ul.% MOS < 3.0", true, 2) !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.% MOS < 3.0", true, 2) : getAmrNbValue("REF1", "Base", "ul.% MOS < 3.0", true, 2),
        dut1: getAmrNbValue("DUT1", "Base", "ul.% MOS < 3.0", true, 2),
        dut2: getAmrNbValue("DUT2", "Base", "ul.% MOS < 3.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT1", "Base", "ul.% MOS < 3.0"), getAmrNbValue("REF", "Base", "ul.% MOS < 3.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.% MOS < 3.0") : getAmrNbValue("REF1", "Base", "ul.% MOS < 3.0")),
        dut2Class: getKpiCellClass('AmrMosThreePointZero', getAmrNbValue("DUT2", "Base", "ul.% MOS < 3.0"), getAmrNbValue("REF", "Base", "ul.% MOS < 3.0") !== 'N/A' ? getAmrNbValue("REF", "Base", "ul.% MOS < 3.0") : getAmrNbValue("REF1", "Base", "ul.% MOS < 3.0"))
      },
      highlight: true
    },
    {
      metric: "Call Drop",
      downlink: {
        ref: (getAmrNbValue("REF", "Mobile", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("REF", "Mobile", "call_drop_count", false, 0)) : 0)
           + (getAmrNbValue("REF1", "Mobile", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("REF1", "Mobile", "call_drop_count", false, 0)) : 0),
        dut1: (getAmrNbValue("DUT1", "Mobile", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("DUT1", "Mobile", "call_drop_count", false, 0)) : 0),
        dut2: (getAmrNbValue("DUT2", "Mobile", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("DUT2", "Mobile", "call_drop_count", false, 0)) : 0),
      },
      uplink: {
        ref: (getAmrNbValue("REF", "Base", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("REF", "Base", "call_drop_count", false, 0)) : 0)
           + (getAmrNbValue("REF1", "Base", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("REF1", "Base", "call_drop_count", false, 0)) : 0),
        dut1: (getAmrNbValue("DUT1", "Base", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("DUT1", "Base", "call_drop_count", false, 0)) : 0),
        dut2: (getAmrNbValue("DUT2", "Base", "call_drop_count", false, 0) !== 'N/A' ? Number(getAmrNbValue("DUT2", "Base", "call_drop_count", false, 0)) : 0),
      },
      highlight: false
    },
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
      <DynamicHeader level={2}>5G Auto VoNR Enabled AMR NB VQ - {city}</DynamicHeader>
      {/* <VqAttenuationTable data={[
        {
          market: city,
          testType: amrNbKey,
          mobile: { 
            REF: getAmrNbValue("REF", "Mobile", "INPUT LEVEL") !== 'N/A' ? getAmrNbValue("REF", "Mobile", "INPUT LEVEL") : getAmrNbValue("REF1", "Mobile", "INPUT LEVEL"), 
            DUT1: getAmrNbValue("DUT1", "Mobile", "INPUT LEVEL"), 
            DUT2: getAmrNbValue("DUT2", "Mobile", "INPUT LEVEL") 
          },
          base: { 
            REF: getAmrNbValue("REF", "Base", "OUTPUT LEVEL") !== 'N/A' ? getAmrNbValue("REF", "Base", "OUTPUT LEVEL") : getAmrNbValue("REF1", "Base", "OUTPUT LEVEL"), 
            DUT1: getAmrNbValue("DUT1", "Base", "OUTPUT LEVEL"), 
            DUT2: getAmrNbValue("DUT2", "Base", "OUTPUT LEVEL") 
          },
          downlink: { 
            REF: getAmrNbValue("REF", "Base", "DL MOS ATTN") !== 'N/A' ? getAmrNbValue("REF", "Base", "DL MOS ATTN") : getAmrNbValue("REF1", "Base", "DL MOS ATTN"), 
            DUT1: getAmrNbValue("DUT1", "Base", "DL MOS ATTN"), 
            DUT2: getAmrNbValue("DUT2", "Base", "DL MOS ATTN") 
          },
          uplink: { 
            REF: getAmrNbValue("REF", "Base", "UL MOS ATTN") !== 'N/A' ? getAmrNbValue("REF", "Base", "UL MOS ATTN") : getAmrNbValue("REF1", "Base", "UL MOS ATTN"), 
            DUT1: getAmrNbValue("DUT1", "Base", "UL MOS ATTN"), 
            DUT2: getAmrNbValue("DUT2", "Base", "UL MOS ATTN") 
          }
        }
      ]} /> */}
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