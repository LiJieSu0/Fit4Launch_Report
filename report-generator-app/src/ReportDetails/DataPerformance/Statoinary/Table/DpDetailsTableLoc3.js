import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpDetailsTableLoc3({ data, tableName, kpiRule, kpiTargetCells }) {
  const tableData = [
    {
      category: "Average (Mbps)",
      deviceName: "DUT",
      overall: (((data?.Good?.DUT?.Mean || 0) + (data?.Moderate?.DUT?.Mean || 0) + (data?.Poor?.DUT?.Mean || 0)) / 3).toFixed(2),
      site1: data?.Good?.DUT?.Mean?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.DUT?.Mean?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.DUT?.Mean?.toFixed(2) ?? "N/A"
    },
    {
      category: "Average (Mbps)",
      deviceName: "REF",
      overall: (((data?.Good?.REF?.Mean || 0) + (data?.Moderate?.REF?.Mean || 0) + (data?.Poor?.REF?.Mean || 0)) / 3).toFixed(2),
      site1: data?.Good?.REF?.Mean?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.REF?.Mean?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.REF?.Mean?.toFixed(2) ?? "N/A"
    },
    {
      category: "Standard Deviation (Mbps)",
      deviceName: "DUT",
      overall: (((data?.Good?.DUT?.["Standard Deviation"] || 0) + (data?.Moderate?.DUT?.["Standard Deviation"] || 0) + (data?.Poor?.DUT?.["Standard Deviation"] || 0)) / 3).toFixed(2),
      site1: data?.Good?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A"
    },
    {
      category: "Standard Deviation (Mbps)",
      deviceName: "REF",
      overall: (((data?.Good?.REF?.["Standard Deviation"] || 0) + (data?.Moderate?.REF?.["Standard Deviation"] || 0) + (data?.Poor?.REF?.["Standard Deviation"] || 0)) / 3).toFixed(2),
      site1: data?.Good?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A"
    },
    {
      category: "Maximum (Mbps)",
      deviceName: "DUT",
      overall: (((data?.Good?.DUT?.Maximum || 0) + (data?.Moderate?.DUT?.Maximum || 0) + (data?.Poor?.DUT?.Maximum || 0)) / 3).toFixed(2),
      site1: data?.Good?.DUT?.Maximum?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.DUT?.Maximum?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.DUT?.Maximum?.toFixed(2) ?? "N/A"
    },
    {
      category: "Maximum (Mbps)",
      deviceName: "REF",
      overall: (((data?.Good?.REF?.Maximum || 0) + (data?.Moderate?.REF?.Maximum || 0) + (data?.Poor?.REF?.Maximum || 0)) / 3).toFixed(2),
      site1: data?.Good?.REF?.Maximum?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.REF?.Maximum?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.REF?.Maximum?.toFixed(2) ?? "N/A"
    },
    {
      category: "Minimum (Mbps)",
      deviceName: "DUT",
      overall: (((data?.Good?.DUT?.Minimum || 0) + (data?.Moderate?.DUT?.Minimum || 0) + (data?.Poor?.DUT?.Minimum || 0)) / 3).toFixed(2),
      site1: data?.Good?.DUT?.Minimum?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.DUT?.Minimum?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.DUT?.Minimum?.toFixed(2) ?? "N/A"
    },
    {
      category: "Minimum (Mbps)",
      deviceName: "REF",
      overall: (((data?.Good?.REF?.Minimum || 0) + (data?.Moderate?.REF?.Minimum || 0) + (data?.Poor?.REF?.Minimum || 0)) / 3).toFixed(2),
      site1: data?.Good?.REF?.Minimum?.toFixed(2) ?? "N/A",
      site2: data?.Moderate?.REF?.Minimum?.toFixed(2) ?? "N/A",
      site3: data?.Poor?.REF?.Minimum?.toFixed(2) ?? "N/A"
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
            <th colSpan="3">Location</th>
          </tr>
          <tr>
            <th>Good</th>
            <th>Moderate</th>
            <th>Poor</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            let overallCellStyle = {};
            let site1CellStyle = {};
            let site2CellStyle = {};
            let site3CellStyle = {};

            if (kpiRule && kpiTargetCells && row.deviceName === "DUT" && row.category === "Average (Mbps)") {
              const refRow = tableData.find(r => r.deviceName === "REF" && r.category === "Average (Mbps)");
              if (refRow) {
                const overallColor = getKpiCellColor(kpiRule, parseFloat(row.overall), parseFloat(refRow.overall));
                if (overallColor) overallCellStyle = { backgroundColor: overallColor };

                const site1Color = getKpiCellColor(kpiRule, parseFloat(row.site1), parseFloat(refRow.site1));
                if (site1Color) site1CellStyle = { backgroundColor: site1Color };

                const site2Color = getKpiCellColor(kpiRule, parseFloat(row.site2), parseFloat(refRow.site2));
                if (site2Color) site2CellStyle = { backgroundColor: site2Color };

                const site3Color = getKpiCellColor(kpiRule, parseFloat(row.site3), parseFloat(refRow.site3));
                if (site3Color) site3CellStyle = { backgroundColor: site3Color };
              }
            }

            return (
              <tr key={index}>
                {row.deviceName === "DUT" && (
                  <td rowSpan="2">{row.category}</td>
                )}
                <td>{row.deviceName}</td>
                <td style={overallCellStyle}>{row.overall}</td>
                <td style={site1CellStyle}>{row.site1}</td>
                <td style={site2CellStyle}>{row.site2}</td>
                <td style={site3CellStyle}>{row.site3}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpDetailsTableLoc3;