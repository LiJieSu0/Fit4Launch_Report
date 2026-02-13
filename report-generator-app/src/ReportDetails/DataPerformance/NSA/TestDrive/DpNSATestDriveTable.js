import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpNSATestDriveTable({ data, tableName }) {
  if (!data) {
    return <div>No data available for {tableName}</div>;
  }

  const processData = (rawData) => {
    const processed = [];

    // Helper function to safely get nested values with DL/UL prefix support
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // Define metrics with DL/UL support
    const dlUlMetrics = [
      {
        name: "Throughput",
        unit: " (Mbps)",
        subMetrics: [
          { key: "Mean", label: "Mean" },
          { key: "Standard Deviation", label: "Standard Deviation" },
          { key: "Minimum", label: "Minimum" },
          { key: "Maximum", label: "Maximum" },
        ],
        kpiType: "Throughput",
      },
      {
        name: "Jitter",
        unit: " (s)",
        subMetrics: [
          { key: "Mean", label: "Mean" },
        ],
        kpiType: "Jitter",
      },
      {
        name: "Error Ratio",
        unit: " (%)",
        subMetrics: [
          { key: "Mean", label: "Mean" },
        ],
        kpiType: "ErrorRatio",
      },
    ];

    // Process DL metrics (UL removed)
    ["DL"].forEach(direction => {
      dlUlMetrics.forEach(metric => {
        metric.subMetrics.forEach(subMetric => {
          const metricPath = `${direction} ${metric.name}.${subMetric.key}`;
          const dutValue = getNestedValue(rawData["DUT"], metricPath);
          const refValue = getNestedValue(rawData["REF"], metricPath);

          if (dutValue !== undefined || refValue !== undefined) {
            processed.push({
              metric: `${direction} ${metric.name} ${subMetric.label}`,
              kpiType: metric.kpiType,
              unit: metric.unit,
              dutValue: typeof dutValue === 'number' ? dutValue.toFixed(2) : (dutValue || "N/A"),
              refValue: typeof refValue === 'number' ? refValue.toFixed(2) : (refValue || "N/A"),
            });
          }
        });
      });
    });

    // Process Ping RTT (no DL/UL prefix)
    const pingSubMetrics = [
      { key: "Min", label: "Minimum" },
      { key: "Max", label: "Maximum" },
      { key: "Mean", label: "Mean" },
      { key: "Std Dev", label: "Std Dev" },
    ];

    pingSubMetrics.forEach(subMetric => {
      const dutValue = getNestedValue(rawData["DUT"], `Ping RTT.${subMetric.key}`);
      const refValue = getNestedValue(rawData["REF"], `Ping RTT.${subMetric.key}`);

      if (dutValue !== undefined || refValue !== undefined) {
        processed.push({
          metric: `Ping RTT ${subMetric.label}`,
          kpiType: "PingLatency",
          unit: " (ms)",
          dutValue: typeof dutValue === 'number' ? dutValue.toFixed(2) : (dutValue || "N/A"),
          refValue: typeof refValue === 'number' ? refValue.toFixed(2) : (refValue || "N/A"),
        });
      }
    });

    return processed;
  };

  const tableData = processData(data);

  return (
    <div className="table-container">
      <h4>{tableName}</h4>
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
              <td>{row.metric}{row.unit}</td>
              <td style={{ backgroundColor: (row.metric.includes("Mean") || row.metric.includes("Avg")) ? getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) : 'inherit' }}>{row.dutValue}</td>
              <td>{row.refValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSATestDriveTable;