import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpNSATestDriveTable({ data, tableName }) {
  if (!data) {
    return <div>No data available for {tableName}</div>;
  }

  const processData = (rawData) => {
    const processed = [];
    const metrics = [
      {
        name: "Throughput (Mbps)",
        subMetrics: [
          { key: "Throughput.Mean", label: "Mean" },
          { key: "Throughput.Standard Deviation", label: "Standard Deviation" },
          { key: "Throughput.Minimum", label: "Minimum" },
          { key: "Throughput.Maximum", label: "Maximum" },
          { key: "Throughput.Number of Intervals", label: "Number of Intervals" },
        ],
        kpiType: "Throughput",
      },
      {
        name: "Jitter (s)",
        subMetrics: [
          { key: "Jitter.Mean", label: "Mean" },
        ],
        kpiType: "Jitter",
      },
      {
        name: "Error Ratio (%)",
        subMetrics: [
          { key: "Error Ratio.Mean", label: "Mean" },
        ],
        kpiType: "ErrorRatio",
      },
      {
        name: "Ping RTT (ms)",
        subMetrics: [
          { key: "Ping RTT.min", label: "Min" },
          { key: "Ping RTT.max", label: "Max" },
          { key: "Ping RTT.avg", label: "Avg" },
          { key: "Ping RTT.std_dev", label: "Std Dev" },
        ],
        kpiType: "PingLatency",
      },
    ];

    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    metrics.forEach(metric => {
      metric.subMetrics.forEach(subMetric => {
        const dutValue = getNestedValue(rawData["UDP DL DUT1_Data Test Drive"], subMetric.key);
        const refValue = getNestedValue(rawData["UDP DL REF1_Data Test Drive"], subMetric.key);
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
                <td style={{ backgroundColor: (row.subMetric === "Mean" || row.subMetric === "Avg") ? getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) : 'inherit' }}>{row.dutValue}</td>
                <td>{row.refValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSATestDriveTable;