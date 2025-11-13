import React from 'react';
import { getKpiCellColor } from '../../../../../Utils/KpiRules';

function DpNSAHttpMSTable({ data, tableName }) {
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: ((data.Moderate.DUT.Mean + data.Poor.DUT.Mean) / 2).toFixed(2),
      site1: data.Moderate.DUT.Mean.toFixed(2),
      site2: data.Poor.DUT.Mean.toFixed(2),
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: ((data.Moderate.REF.Mean + data.Poor.REF.Mean) / 2).toFixed(2),
      site1: data.Moderate.REF.Mean.toFixed(2),
      site2: data.Poor.REF.Mean.toFixed(2),
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: ((data.Moderate.DUT["Standard Deviation"] + data.Poor.DUT["Standard Deviation"]) / 2).toFixed(2),
      site1: data.Moderate.DUT["Standard Deviation"].toFixed(2),
      site2: data.Poor.DUT["Standard Deviation"].toFixed(2),
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: ((data.Moderate.REF["Standard Deviation"] + data.Poor.REF["Standard Deviation"]) / 2).toFixed(2),
      site1: data.Moderate.REF["Standard Deviation"].toFixed(2),
      site2: data.Poor.REF["Standard Deviation"].toFixed(2),
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: ((data.Moderate.DUT.Maximum + data.Poor.DUT.Maximum) / 2).toFixed(2),
      site1: data.Moderate.DUT.Maximum.toFixed(2),
      site2: data.Poor.DUT.Maximum.toFixed(2),
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: ((data.Moderate.REF.Maximum + data.Poor.REF.Maximum) / 2).toFixed(2),
      site1: data.Moderate.REF.Maximum.toFixed(2),
      site2: data.Poor.REF.Maximum.toFixed(2),
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: ((data.Moderate.DUT.Minimum + data.Poor.DUT.Minimum) / 2).toFixed(2),
      site1: data.Moderate.DUT.Minimum.toFixed(2),
      site2: data.Poor.DUT.Minimum.toFixed(2),
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: ((data.Moderate.REF.Minimum + data.Poor.REF.Minimum) / 2).toFixed(2),
      site1: data.Moderate.REF.Minimum.toFixed(2),
      site2: data.Poor.REF.Minimum.toFixed(2),
    },
  ];

  return (
    <div className="">
      <h3>{tableName}</h3>
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
                <td rowSpan="2">{row.category}</td>
              )}
              <td>{row.deviceName}</td>
              <td style={{
                backgroundColor:
                  row.category === "Average" && row.deviceName === "DUT"
                    ? getKpiCellColor(
                      "Throughput",
                      parseFloat(row.overall),
                      parseFloat(tableData[index + 1].overall)
                    )
                    : "inherit",
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

export default DpNSAHttpMSTable;