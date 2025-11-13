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
          { key: "DL.Mean", label: "DL Mean" },
          { key: "DL.Standard Deviation", label: "DL Standard Deviation" },
          { key: "DL.Minimum", label: "DL Minimum" },
          { key: "DL.Maximum", label: "DL Maximum" },
          { key: "DL.Number of Intervals", label: "DL Number of Intervals" },
          { key: "UL.Mean", label: "UL Mean" },
          { key: "UL.Standard Deviation", label: "UL Standard Deviation" },
          { key: "UL.Minimum", label: "UL Minimum" },
          { key: "UL.Maximum", label: "UL Maximum" },
          { key: "UL.Number of Intervals", label: "UL Number of Intervals" },
        ],
        path: "Throughput",
        kpiType: "Throughput",
      },
      {
        name: "Jitter (ms)",
        subMetrics: [
          { key: "DL Mean", label: "DL Mean" },
          { key: "UL Mean", label: "UL Mean" },
        ],
        path: "Jitter",
        kpiType: "Jitter",
      },
      {
        name: "Error Ratio (%)",
        subMetrics: [
          { key: "UL Mean", label: "UL Mean" },
          { key: "DL Mean", label: "DL Mean" },
        ],
        path: "Error Ratio",
        kpiType: "ErrorRatio",
      },
      {
        name: "Ping RTT (ms)",
        subMetrics: [
          { key: "min", label: "Min" },
          { key: "max", label: "Max" },
          { key: "avg", label: "Avg" },
          { key: "std_dev", label: "Std Dev" },
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
          metric: metric.name,
          subMetric: subMetric.label,
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
            <th>Sub-Metric</th>
            <th>DUT Value</th>
            <th>REF Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const showMetric = row.metric !== lastMetric;
            if (showMetric) {
              lastMetric = row.metric;
            }
            const metricRowSpan = tableData.filter(item => item.metric === row.metric).length;

            return (
              <tr key={index}>
                {showMetric && (
                  <td rowSpan={metricRowSpan}>{row.metric}</td>
                )}
                <td>{row.subMetric}</td>
                <td style={{ backgroundColor: (row.subMetric.includes("Mean") || row.subMetric === "Avg") ? getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) : 'inherit' }}>{row.dutValue}</td>
                <td>{row.refValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpMHSTestDriveTable;