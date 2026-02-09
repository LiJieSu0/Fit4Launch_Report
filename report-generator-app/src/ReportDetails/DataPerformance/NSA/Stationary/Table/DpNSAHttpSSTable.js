import React from 'react';
import { getKpiCellColor } from '../../../../../Utils/KpiRules';

function DpNSAHttpSSTable({ data, tableName }) {
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: (((data?.Moderate?.DUT?.Mean || 0) + (data?.Poor?.DUT?.Mean || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.DUT?.Mean?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.Mean?.toFixed(2) ?? "N/A",
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: (((data?.Moderate?.REF?.Mean || 0) + (data?.Poor?.REF?.Mean || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.REF?.Mean?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.Mean?.toFixed(2) ?? "N/A",
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: (((data?.Moderate?.DUT?.["Standard Deviation"] || 0) + (data?.Poor?.DUT?.["Standard Deviation"] || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: (((data?.Moderate?.REF?.["Standard Deviation"] || 0) + (data?.Poor?.REF?.["Standard Deviation"] || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.["Standard Deviation"]?.toFixed(2) ?? "N/A",
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: (((data?.Moderate?.DUT?.Maximum || 0) + (data?.Poor?.DUT?.Maximum || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.DUT?.Maximum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.Maximum?.toFixed(2) ?? "N/A",
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: (((data?.Moderate?.REF?.Maximum || 0) + (data?.Poor?.REF?.Maximum || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.REF?.Maximum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.REF?.Maximum?.toFixed(2) ?? "N/A",
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: (((data?.Moderate?.DUT?.Minimum || 0) + (data?.Poor?.DUT?.Minimum || 0)) / 2).toFixed(2),
      site1: data?.Moderate?.DUT?.Minimum?.toFixed(2) ?? "N/A",
      site2: data?.Poor?.DUT?.Minimum?.toFixed(2) ?? "N/A",
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: (((data?.Moderate?.REF?.Minimum || 0) + (data?.Poor?.REF?.Minimum || 0)) / 2).toFixed(2),
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
          {tableData.map((row, index) => (
            <tr key={index}>
              {row.deviceName === "DUT" && (
                <td rowSpan="2">{row.category}{" (Mbps)"}</td>
              )}
              <td>{row.deviceName}</td>
              <td style={{
                backgroundColor:
                  row.category === "Average" && row.deviceName === "DUT"
                    ? getKpiCellColor(
                      "Throughput",
                      parseFloat(row.overall),
                      parseFloat(tableData[1].overall)
                    )
                    : "transparent",
              }}>{row.overall}</td>
              <td>{row.site1}</td>
              <td>{row.site2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSAHttpSSTable;