import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpMHSHttpSSTable({ data, tableName, kpiRule }) {
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: ((data.Good.DUT.Mean + data.Moderate.DUT.Mean) / 2).toFixed(2),
      site1: data.Good.DUT.Mean.toFixed(2),
      site2: data.Moderate.DUT.Mean.toFixed(2),
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: ((data.Good.REF.Mean + data.Moderate.REF.Mean) / 2).toFixed(2),
      site1: data.Good.REF.Mean.toFixed(2),
      site2: data.Moderate.REF.Mean.toFixed(2),
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: ((data.Good.DUT["Standard Deviation"] + data.Moderate.DUT["Standard Deviation"]) / 2).toFixed(2),
      site1: data.Good.DUT["Standard Deviation"].toFixed(2),
      site2: data.Moderate.DUT["Standard Deviation"].toFixed(2),
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: ((data.Good.REF["Standard Deviation"] + data.Moderate.REF["Standard Deviation"]) / 2).toFixed(2),
      site1: data.Good.REF["Standard Deviation"].toFixed(2),
      site2: data.Moderate.REF["Standard Deviation"].toFixed(2),
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: ((data.Good.DUT.Maximum + data.Moderate.DUT.Maximum) / 2).toFixed(2),
      site1: data.Good.DUT.Maximum.toFixed(2),
      site2: data.Moderate.DUT.Maximum.toFixed(2),
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: ((data.Good.REF.Maximum + data.Moderate.REF.Maximum) / 2).toFixed(2),
      site1: data.Good.REF.Maximum.toFixed(2),
      site2: data.Moderate.REF.Maximum.toFixed(2),
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: ((data.Good.DUT.Minimum + data.Moderate.DUT.Minimum) / 2).toFixed(2),
      site1: data.Good.DUT.Minimum.toFixed(2),
      site2: data.Moderate.DUT.Minimum.toFixed(2),
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: ((data.Good.REF.Minimum + data.Moderate.REF.Minimum) / 2).toFixed(2),
      site1: data.Good.REF.Minimum.toFixed(2),
      site2: data.Moderate.REF.Minimum.toFixed(2),
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
            <th>Good</th>
            <th>Moderate</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const overallColor =
              row.deviceName === "DUT" && row.category === "Average"
                ? getKpiCellColor(
                    kpiRule,
                    parseFloat(row.overall),
                    parseFloat(tableData[index + 1].overall)
                  )
                : undefined;

            return (
              <tr key={index}>
                {row.deviceName === "DUT" && (
                  <td rowSpan="2">{row.category}</td>
                )}
                <td>{row.deviceName}</td>
                <td style={{ backgroundColor: overallColor }}>{row.overall}</td>
                <td>{row.site1}</td>
                <td>{row.site2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpMHSHttpSSTable;