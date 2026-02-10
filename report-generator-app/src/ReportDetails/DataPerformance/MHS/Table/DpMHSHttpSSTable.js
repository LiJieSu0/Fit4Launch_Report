import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpMHSHttpSSTable({ data, tableName, kpiRule }) {
  const allCategories = ["Good", "Moderate", "Poor"];

  // Determine available categories (columns where at least one device has data)
  const availableCategories = allCategories.filter(cat => {
    const hasDUT = data?.[cat]?.['DUT']?.['Mean'] !== undefined;
    const hasREF = data?.[cat]?.['REF']?.['Mean'] !== undefined;
    return hasDUT || hasREF;
  });

  const metrics = [
    { label: "Average", key: "Mean" },
    { label: "Standard Deviation", key: "Standard Deviation" },
    { label: "Maximum", key: "Maximum" },
    { label: "Minimum", key: "Minimum" },
  ];

  const tableData = [];

  metrics.forEach(metric => {
    ["DUT", "REF"].forEach(device => {
      const row = {
        category: metric.label,
        deviceName: device,
        overall: "N/A",
        sites: {}
      };

      let sum = 0;
      let count = 0;

      availableCategories.forEach(cat => {
        const val = data?.[cat]?.[device]?.[metric.key];
        if (val !== undefined && val !== null) {
          row.sites[cat] = val.toFixed(2);
          sum += val;
          count++;
        } else {
          row.sites[cat] = "N/A";
        }
      });

      if (count > 0) {
        row.overall = (sum / count).toFixed(2);
      }
      tableData.push(row);
    });
  });

  return (
    <div className="">
      <h4>{tableName}</h4>
      <table className="general-table-style dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput (Mbps)</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan={availableCategories.length}>Location</th>
          </tr>
          <tr>
            {availableCategories.map(cat => (
              <th key={cat}>{cat}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            // Determine background color for DUT Average Overall
            const overallColor =
              row.deviceName === "DUT" && row.category === "Average" && !isNaN(parseFloat(row.overall)) && !isNaN(parseFloat(tableData[index + 1]?.overall))
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
                {availableCategories.map(cat => {
                  const siteColor =
                    row.deviceName === "DUT" && row.category === "Average" && !isNaN(parseFloat(row.sites[cat])) && !isNaN(parseFloat(tableData[index + 1]?.sites[cat]))
                      ? getKpiCellColor(
                        kpiRule,
                        parseFloat(row.sites[cat]),
                        parseFloat(tableData[index + 1].sites[cat])
                      )
                      : undefined;
                  return (
                    <td key={cat} style={{ backgroundColor: siteColor }}>{row.sites[cat]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpMHSHttpSSTable;