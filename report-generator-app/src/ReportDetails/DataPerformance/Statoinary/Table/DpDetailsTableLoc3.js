import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpDetailsTableLoc3({ data, tableName, kpiRule, kpiTargetCells }) {
  const formatVal = (val) => (val !== undefined && val !== null && typeof val === 'number') ? val.toFixed(2) : "N/A";

  const calculateOverall = (good, moderate, poor) => {
    const vals = [good, moderate, poor].filter(v => typeof v === 'number');
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "N/A";
  };

  const metrics = [
    { label: "Average (Mbps)", key: "Mean" },
    { label: "Standard Deviation (Mbps)", key: "Standard Deviation" },
    { label: "Maximum (Mbps)", key: "Maximum" },
    { label: "Minimum (Mbps)", key: "Minimum" }
  ];

  const tableData = [];
  metrics.forEach(metric => {
    ["DUT", "REF"].forEach(device => {
      const good = data?.Good?.[device]?.[metric.key];
      const moderate = data?.Moderate?.[device]?.[metric.key];
      const poor = data?.Poor?.[device]?.[metric.key];

      tableData.push({
        category: metric.label,
        deviceName: device,
        overall: calculateOverall(good, moderate, poor),
        site1: formatVal(good),
        site2: formatVal(moderate),
        site3: formatVal(poor)
      });
    });
  });

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