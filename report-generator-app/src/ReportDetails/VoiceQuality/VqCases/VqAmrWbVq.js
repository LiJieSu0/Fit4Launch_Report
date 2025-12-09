import React, { useContext } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
import '../../../StyleScript/Restricted_Report_Style.css';

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

const VqAmrWbVq = () => {
  const { reportData } = useContext(ReportContext);

  if (!reportData || !reportData.voiceQuality || !reportData.voiceQuality["Voice Quality"]) {
    return <div>Loading voice quality data...</div>;
  }

  const amrWbKey = "5G Auto VoNR Enabled AMR WB VQ";
  const amrWbDataPath = reportData.voiceQuality["Voice Quality"][amrWbKey];

  if (!amrWbDataPath) {
    return <div>Loading {amrWbKey} data...</div>;
  }

  const getAmrWbValue = (category, device, stat, isPercentage = false, decimals = 2) => {
    const path = [category, `vonr enable amr wb ${device} ${category.toLowerCase()}`, stat];
    return getFormattedValue(amrWbDataPath, path, isPercentage, decimals);
  };

  const vqTableData2 = [
    {
      metric: "MOS Average",
      base: { ref: getAmrWbValue("Base", "REF", "MOS Average"), dut1: getAmrWbValue("Base", "DUT1", "MOS Average"), dut2: getAmrWbValue("Base", "DUT2", "MOS Average") },
      mobile: { ref: getAmrWbValue("Mobile", "REF", "MOS Average"), dut1: getAmrWbValue("Mobile", "DUT1", "MOS Average"), dut2: getAmrWbValue("Mobile", "DUT2", "MOS Average") },
      highlight: true
    },
    {
      metric: "MOS Stdev",
      base: { ref: getAmrWbValue("Base", "REF", "MOS Stdev"), dut1: getAmrWbValue("Base", "DUT1", "MOS Stdev"), dut2: getAmrWbValue("Base", "DUT2", "MOS Stdev") },
      mobile: { ref: getAmrWbValue("Mobile", "REF", "MOS Stdev"), dut1: getAmrWbValue("Mobile", "DUT1", "MOS Stdev"), dut2: getAmrWbValue("Mobile", "DUT2", "MOS Stdev") },
      highlight: false
    },
    {
      metric: "Maximum MOS",
      base: { ref: getAmrWbValue("Base", "REF", "Maximum MOS"), dut1: getAmrWbValue("Base", "DUT1", "Maximum MOS"), dut2: getAmrWbValue("Base", "DUT2", "Maximum MOS") },
      mobile: { ref: getAmrWbValue("Mobile", "REF", "Maximum MOS"), dut1: getAmrWbValue("Mobile", "DUT1", "Maximum MOS"), dut2: getAmrWbValue("Mobile", "DUT2", "Maximum MOS") },
      highlight: false
    },
    {
      metric: "Count",
      base: { ref: getAmrWbValue("Base", "REF", "Counts", false, 0), dut1: getAmrWbValue("Base", "DUT1", "Counts", false, 0), dut2: getAmrWbValue("Base", "DUT2", "Counts", false, 0) },
      mobile: { ref: getAmrWbValue("Mobile", "REF", "Counts", false, 0), dut1: getAmrWbValue("Mobile", "DUT1", "Counts", false, 0), dut2: getAmrWbValue("Mobile", "DUT2", "Counts", false, 0) },
      highlight: false
    },
    {
      metric: "% MOS < 2.0",
      base: { ref: getAmrWbValue("Base", "REF", "% MOS < 2.0", true, 2), dut1: getAmrWbValue("Base", "DUT1", "% MOS < 2.0", true, 2), dut2: getAmrWbValue("Base", "DUT2", "% MOS < 2.0", true, 2) },
      mobile: { ref: getAmrWbValue("Mobile", "REF", "% MOS < 2.0", true, 2), dut1: getAmrWbValue("Mobile", "DUT1", "% MOS < 2.0", true, 2), dut2: getAmrWbValue("Mobile", "DUT2", "% MOS < 2.0", true, 2) },
      highlight: true
    },
    {
      metric: "% MOS < 3.0",
      base: { ref: getAmrWbValue("Base", "REF", "% MOS < 3.0", true, 2), dut1: getAmrWbValue("Base", "DUT1", "% MOS < 3.0", true, 2), dut2: getAmrWbValue("Base", "DUT2", "% MOS < 3.0", true, 2) },
      mobile: { ref: getAmrWbValue("Mobile", "REF", "% MOS < 3.0", true, 2), dut1: getAmrWbValue("Mobile", "DUT1", "% MOS < 3.0", true, 2), dut2: getAmrWbValue("Mobile", "DUT2", "% MOS < 3.0", true, 2) },
      highlight: true
    }
  ];


  const vqTableData3 = [
    {
      metric: "MOS Average",
      results: getAmrWbValue("Mobile", "DUT1", "MOS Average"),
      highlightClass: "bg-performance-excellent"
    },
    {
      metric: "% MOS < 2.0",
      results: getAmrWbValue("Mobile", "DUT1", "% MOS < 2.0", true, 2),
      highlightClass: "bg-performance-excellent"
    },
    {
      metric: "% MOS < 3.0",
      results: getAmrWbValue("Mobile", "DUT1", "% MOS < 3.0", true, 2),
      highlightClass: "bg-performance-excellent"
    }
  ];

  return (
    <div className="page-content">
      <h2>2.2 5G Auto VoNR Enabled AMR WB VQ</h2>
      <div id='2.2'></div>
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
              <td>{row.base.dut1}</td>
              <td>{row.base.dut2}</td>
              <td>{row.mobile.ref}</td>
              <td>{row.mobile.dut1}</td>
              <td>{row.mobile.dut2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* New table for Voice Quality Performance EVS to EVS Call Scenario */}

    </div>
  );
};

export default VqAmrWbVq;