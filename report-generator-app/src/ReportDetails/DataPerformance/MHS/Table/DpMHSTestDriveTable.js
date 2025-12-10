import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpMHSTestDriveTable({ data, tableName }) {
  if (!data) {
    return <div>No data available for {tableName}</div>;
  }

  const processData = (rawData) => {
    const processed = [];
    const metrics = [
      {
        name: "Throughput (Mbps)",
        subMetrics: [
          { key: "DL.Mean", label: "Mean (Mbps)" },
          { key: "DL.Standard Deviation", label: "Standard Deviation (Mbps)" },
          { key: "DL.Minimum", label: "Minimum (Mbps)" },
          { key: "DL.Maximum", label: "Maximum (Mbps)" },
          { key: "DL.Number of Intervals", label: "Number of Intervals" },
          { key: "UL.Mean", label: "Mean (Mbps)" },
          { key: "UL.Standard Deviation", label: "Standard Deviation (Mbps)" },
          { key: "UL.Minimum", label: "Minimum (Mbps)" },
          { key: "UL.Maximum", label: "Maximum (Mbps)" },
          { key: "UL.Number of Intervals", label: "Number of Intervals" },
        ],
        path: "Throughput",
        kpiType: "Throughput",
      },
      {
        name: "Jitter (ms)",
        subMetrics: [
          { key: "DL Mean", label: "Mean (ms)" },
          { key: "UL Mean", label: "Mean (ms)" },
        ],
        path: "Jitter",
        kpiType: "Jitter",
      },
      {
        name: "Error Ratio (%)",
        subMetrics: [
          { key: "UL Mean", label: "Mean (%)" },
          { key: "DL Mean", label: "Mean (%)" },
        ],
        path: "Error Ratio",
        kpiType: "ErrorRatio",
      },
      {
        name: "Ping RTT (ms)",
        subMetrics: [
          { key: "min", label: "Minimum (ms)" },
          { key: "max", label: "Maximum (ms)" },
          { key: "avg", label: "Mean (ms)" },
          { key: "std_dev", label: "Std Dev (ms)" },
        ],
        path: "Ping RTT",
        kpiType: "PingLatency",
      },
    ];

    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    metrics.forEach(metric => {
      metric.subMetrics.forEach(subMetric => {
        const dutValue = getNestedValue(rawData["DUT UDP DL"], `${metric.path}.${subMetric.key}`);
        const refValue = getNestedValue(rawData["REF UDP DL"], `${metric.path}.${subMetric.key}`);
        processed.push({
          metric: (() => {
            let prefix = "";
            if (metric.name.includes("Throughput") || metric.name.includes("Jitter") || metric.name.includes("Error Ratio")) {
              if (subMetric.key.startsWith("DL")) {
                prefix = "DL ";
              } else if (subMetric.key.startsWith("UL")) {
                prefix = "UL ";
              }
            }
            return `${prefix}${metric.name.replace(" (Mbps)", "").replace(" (ms)", "").replace(" (%)", "")} ${subMetric.label}`;
          })(),
          kpiType: metric.kpiType,
          dutValue: typeof dutValue === 'number' ? dutValue.toFixed(2) : dutValue,
          refValue: typeof refValue === 'number' ? refValue.toFixed(2) : refValue,
        });
      });
    });

    return processed;
  };

  const tableData = processData(data);

  let lastMetric = null;

  return (
    <div className="table-container">
      <h3>{tableName}</h3>
      <table className="general-table-style">
        <thead>
          <tr>
            <th>Metric</th>
            <th>DUT Value</th>
            <th>REF Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.metric}</td>
              <td style={{ backgroundColor: (row.metric.includes("Mean") || row.metric.includes("Avg")) ? getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) : 'inherit' }}>{row.dutValue}</td>
              <td>{row.refValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DpMHSTestDriveTable;