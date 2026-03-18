import React, { useContext, useEffect } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
import '../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';
import VqAttenuationTable from './VqAttenuationTable';
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

const VqAmrWbVq = ({ city: propCity }) => {
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

  const amrWbKey = "5G Auto VoNR Enabled AMR WB VQ";
  const amrWbDataPath = reportData.voiceQuality["Voice Quality"][amrWbKey];

  if (!amrWbDataPath) {
    return <PageBreak>Loading {amrWbKey} data for {city}...</PageBreak>;
  }

  const getAmrWbValue = (category, device, stat, isPercentage = false, decimals = 2) => {
    const path = [category, `vonr enable amr wb ${device} ${category.toLowerCase()}`, stat];
    return getFormattedValue(amrWbDataPath, path, isPercentage, decimals);
  };

  const vqTableData2 = [
    {
      metric: "MOS Average",
      base: {
        ref: getAmrWbValue("Base", "REF1", "MOS Average"),
        dut1: getAmrWbValue("Base", "DUT1", "MOS Average"),
        dut2: getAmrWbValue("Base", "DUT2", "MOS Average"),
        dut1Class: getKpiCellClass('AmrMosAverage', getAmrWbValue("Base", "DUT1", "MOS Average"), getAmrWbValue("Base", "REF1", "MOS Average")),
        dut2Class: getKpiCellClass('AmrMosAverage', getAmrWbValue("Base", "DUT2", "MOS Average"), getAmrWbValue("Base", "REF1", "MOS Average"))
      },
      mobile: {
        ref: getAmrWbValue("Mobile", "REF1", "MOS Average"),
        dut1: getAmrWbValue("Mobile", "DUT1", "MOS Average"),
        dut2: getAmrWbValue("Mobile", "DUT2", "MOS Average"),
        dut1Class: getKpiCellClass('AmrMosAverage', getAmrWbValue("Mobile", "DUT1", "MOS Average"), getAmrWbValue("Mobile", "REF1", "MOS Average")),
        dut2Class: getKpiCellClass('AmrMosAverage', getAmrWbValue("Mobile", "DUT2", "MOS Average"), getAmrWbValue("Mobile", "REF1", "MOS Average"))
      },
      highlight: true
    },
    {
      metric: "MOS Stdev",
      base: { ref: getAmrWbValue("Base", "REF1", "MOS Stdev"), dut1: getAmrWbValue("Base", "DUT1", "MOS Stdev"), dut2: getAmrWbValue("Base", "DUT2", "MOS Stdev") },
      mobile: { ref: getAmrWbValue("Mobile", "REF1", "MOS Stdev"), dut1: getAmrWbValue("Mobile", "DUT1", "MOS Stdev"), dut2: getAmrWbValue("Mobile", "DUT2", "MOS Stdev") },
      highlight: false
    },
    {
      metric: "Maximum MOS",
      base: { ref: getAmrWbValue("Base", "REF1", "Maximum MOS"), dut1: getAmrWbValue("Base", "DUT1", "Maximum MOS"), dut2: getAmrWbValue("Base", "DUT2", "Maximum MOS") },
      mobile: { ref: getAmrWbValue("Mobile", "REF1", "Maximum MOS"), dut1: getAmrWbValue("Mobile", "DUT1", "Maximum MOS"), dut2: getAmrWbValue("Mobile", "DUT2", "Maximum MOS") },
      highlight: false
    },
    {
      metric: "Count",
      base: { ref: getAmrWbValue("Base", "REF1", "Counts", false, 0), dut1: getAmrWbValue("Base", "DUT1", "Counts", false, 0), dut2: getAmrWbValue("Base", "DUT2", "Counts", false, 0) },
      mobile: { ref: getAmrWbValue("Mobile", "REF1", "Counts", false, 0), dut1: getAmrWbValue("Mobile", "DUT1", "Counts", false, 0), dut2: getAmrWbValue("Mobile", "DUT2", "Counts", false, 0) },
      highlight: false
    },
    {
      metric: "% MOS < 2.0",
      base: {
        ref: getAmrWbValue("Base", "REF1", "% MOS < 2.0", true, 2),
        dut1: getAmrWbValue("Base", "DUT1", "% MOS < 2.0", true, 2),
        dut2: getAmrWbValue("Base", "DUT2", "% MOS < 2.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosTwoPointZero', getAmrWbValue("Base", "DUT1", "% MOS < 2.0"), getAmrWbValue("Base", "REF1", "% MOS < 2.0")),
        dut2Class: getKpiCellClass('AmrMosTwoPointZero', getAmrWbValue("Base", "DUT2", "% MOS < 2.0"), getAmrWbValue("Base", "REF1", "% MOS < 2.0"))
      },
      mobile: {
        ref: getAmrWbValue("Mobile", "REF1", "% MOS < 2.0", true, 2),
        dut1: getAmrWbValue("Mobile", "DUT1", "% MOS < 2.0", true, 2),
        dut2: getAmrWbValue("Mobile", "DUT2", "% MOS < 2.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosTwoPointZero', getAmrWbValue("Mobile", "DUT1", "% MOS < 2.0"), getAmrWbValue("Mobile", "REF1", "% MOS < 2.0")),
        dut2Class: getKpiCellClass('AmrMosTwoPointZero', getAmrWbValue("Mobile", "DUT2", "% MOS < 2.0"), getAmrWbValue("Mobile", "REF1", "% MOS < 2.0"))
      },
      highlight: true
    },
    {
      metric: "% MOS < 3.0",
      base: {
        ref: getAmrWbValue("Base", "REF1", "% MOS < 3.0", true, 2),
        dut1: getAmrWbValue("Base", "DUT1", "% MOS < 3.0", true, 2),
        dut2: getAmrWbValue("Base", "DUT2", "% MOS < 3.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosThreePointZero', getAmrWbValue("Base", "DUT1", "% MOS < 3.0"), getAmrWbValue("Base", "REF1", "% MOS < 3.0")),
        dut2Class: getKpiCellClass('AmrMosThreePointZero', getAmrWbValue("Base", "DUT2", "% MOS < 3.0"), getAmrWbValue("Base", "REF1", "% MOS < 3.0"))
      },
      mobile: {
        ref: getAmrWbValue("Mobile", "REF1", "% MOS < 3.0", true, 2),
        dut1: getAmrWbValue("Mobile", "DUT1", "% MOS < 3.0", true, 2),
        dut2: getAmrWbValue("Mobile", "DUT2", "% MOS < 3.0", true, 2),
        dut1Class: getKpiCellClass('AmrMosThreePointZero', getAmrWbValue("Mobile", "DUT1", "% MOS < 3.0"), getAmrWbValue("Mobile", "REF1", "% MOS < 3.0")),
        dut2Class: getKpiCellClass('AmrMosThreePointZero', getAmrWbValue("Mobile", "DUT2", "% MOS < 3.0"), getAmrWbValue("Mobile", "REF1", "% MOS < 3.0"))
      },
      highlight: true
    }
  ];


  const getWorstClassForMetric = (metricName) => {
    const row = vqTableData2.find(r => r.metric === metricName);
    if (!row) return "";
    return getWorstKpiClass([
      row.base.dut1Class,
      row.base.dut2Class,
      row.mobile.dut1Class,
      row.mobile.dut2Class
    ]);
  };

  const vqTableData3 = [
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
      <DynamicHeader level={2}>5G Auto VoNR Enabled AMR WB VQ - {city}</DynamicHeader>
      {/* <VqAttenuationTable
        title="Audio input/output levels and average attenuation - Mobile"
        data={[
          {
            mobile: {
              'REF': getAmrWbValue("Mobile", "REF1", "INPUT LEVEL"),
              'DUT 1': getAmrWbValue("Mobile", "DUT1", "INPUT LEVEL"),
              'DUT 2': getAmrWbValue("Mobile", "DUT2", "INPUT LEVEL")
            },
            base: {
              'REF': getAmrWbValue("Mobile", "REF1", "OUTPUT LEVEL"),
              'DUT 1': getAmrWbValue("Mobile", "DUT1", "OUTPUT LEVEL"),
              'DUT 2': getAmrWbValue("Mobile", "DUT2", "OUTPUT LEVEL")
            },
            downlink: {
              'REF': getAmrWbValue("Mobile", "REF1", "DL MOS ATTN"),
              'DUT 1': getAmrWbValue("Mobile", "DUT1", "DL MOS ATTN"),
              'DUT 2': getAmrWbValue("Mobile", "DUT2", "DL MOS ATTN")
            },
            uplink: {
              'REF': getAmrWbValue("Mobile", "REF1", "UL MOS ATTN"),
              'DUT 1': getAmrWbValue("Mobile", "DUT1", "UL MOS ATTN"),
              'DUT 2': getAmrWbValue("Mobile", "DUT2", "UL MOS ATTN")
            }
          }
        ]}
        entities={['REF', 'DUT 1', 'DUT 2']}
      /> */}
      {/* <VqAttenuationTable 
        title="Audio input/output levels and average attenuation - Base"
        data={[
          {
            mobile: {
              'REF': getAmrWbValue("Base", "REF1", "INPUT LEVEL"),
              'DUT 1': getAmrWbValue("Base", "DUT1", "INPUT LEVEL"),
              'DUT 2': getAmrWbValue("Base", "DUT2", "INPUT LEVEL")
            },
            base: {
              'REF': getAmrWbValue("Base", "REF1", "OUTPUT LEVEL"),
              'DUT 1': getAmrWbValue("Base", "DUT1", "OUTPUT LEVEL"),
              'DUT 2': getAmrWbValue("Base", "DUT2", "OUTPUT LEVEL")
            },
            downlink: {
              'REF': getAmrWbValue("Base", "REF1", "DL MOS ATTN"),
              'DUT 1': getAmrWbValue("Base", "DUT1", "DL MOS ATTN"),
              'DUT 2': getAmrWbValue("Base", "DUT2", "DL MOS ATTN")
            },
            uplink: {
              'REF': getAmrWbValue("Base", "REF1", "UL MOS ATTN"),
              'DUT 1': getAmrWbValue("Base", "DUT1", "UL MOS ATTN"),
              'DUT 2': getAmrWbValue("Base", "DUT2", "UL MOS ATTN")
            }
          }
        ]}
        entities={['REF', 'DUT 1', 'DUT 2']}
      /> */}
      <h4>Results</h4>
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
          {vqTableData2.map((row, index) => (
            <tr key={index} className={row.highlight ? 'highlight-row' : ''}>
              <td>{row.metric}</td>
              <td>{row.base.ref}</td>
              <td className={row.base.dut1Class}>{row.base.dut1}</td>
              <td className={row.base.dut2Class}>{row.base.dut2}</td>
              <td>{row.mobile.ref}</td>
              <td className={row.mobile.dut1Class}>{row.mobile.dut1}</td>
              <td className={row.mobile.dut2Class}>{row.mobile.dut2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageBreak>
  );
};

export default VqAmrWbVq;