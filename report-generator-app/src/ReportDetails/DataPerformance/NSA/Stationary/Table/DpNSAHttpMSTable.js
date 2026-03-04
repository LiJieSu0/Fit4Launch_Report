import React from 'react';
import { getKpiCellColor } from '../../../../../Utils/KpiRules';

function DpNSAHttpMSTable({ data, tableName }) {
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: (() => {
        const vals = [data?.Moderate?.DUT?.Mean, data?.Poor?.DUT?.Mean].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.DUT?.Mean?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.Mean?.toFixed(2) ?? "N/A",
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: (() => {
        const vals = [data?.Moderate?.REF?.Mean, data?.Poor?.REF?.Mean].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.REF?.Mean?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.Mean?.toFixed(2) ?? "N/A",
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: (() => {
        const vals = [data?.Moderate?.DUT?.["Standard Deviation"], data?.Poor?.DUT?.["Standard Deviation"]].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: (() => {
        const vals = [data?.Moderate?.REF?.["Standard Deviation"], data?.Poor?.REF?.["Standard Deviation"]].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: (() => {
        const vals = [data?.Moderate?.DUT?.Maximum, data?.Poor?.DUT?.Maximum].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.DUT?.Maximum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.Maximum?.toFixed(2) ?? "N/A",
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: (() => {
        const vals = [data?.Moderate?.REF?.Maximum, data?.Poor?.REF?.Maximum].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.REF?.Maximum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.Maximum?.toFixed(2) ?? "N/A",
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: (() => {
        const vals = [data?.Moderate?.DUT?.Minimum, data?.Poor?.DUT?.Minimum].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.DUT?.Minimum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.Minimum?.toFixed(2) ?? "N/A",
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: (() => {
        const vals = [data?.Moderate?.REF?.Minimum, data?.Poor?.REF?.Minimum].filter(v => typeof v === 'number');
        return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
      })(),
      site1: data?.Moderate?.REF?.Minimum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.Minimum?.toFixed(2) ?? "N/A",
    },
  ];

  return (
    <div className="">
      <h4>{tableName}</h4>
      <table className="general-table-style dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan="2">Location</th>
          </tr>
          <tr>
            <th>Moderate</th>
            <th>Poor</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const isDutAverage = row.category === "Average" && row.deviceName === "DUT";
            let overallCellStyle = {};
            let site1CellStyle = {};
            let site2CellStyle = {};

            if (isDutAverage) {
              const refRow = tableData[index + 1]; // In the tableData array, REF Average follows DUT Average
              if (refRow && refRow.deviceName === "REF") {
                const overallColor = getKpiCellColor("Throughput", parseFloat(row.overall), parseFloat(refRow.overall));
                if (overallColor) overallCellStyle = { backgroundColor: overallColor };

                const site1Color = getKpiCellColor("Throughput", parseFloat(row.site1), parseFloat(refRow.site1));
                if (site1Color) site1CellStyle = { backgroundColor: site1Color };

                const site2Color = getKpiCellColor("Throughput", parseFloat(row.site2), parseFloat(refRow.site2));
                if (site2Color) site2CellStyle = { backgroundColor: site2Color };
              }
            }

            return (
              <tr key={index}>
                {row.deviceName === "DUT" && (
                  <td rowSpan="2">{row.category}{" (Mbps)"}</td>
                )}
                <td>{row.deviceName}</td>
                <td style={overallCellStyle}>{row.overall}</td>
                <td style={site1CellStyle}>{row.site1}</td>
                <td style={site2CellStyle}>{row.site2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSAHttpMSTable;