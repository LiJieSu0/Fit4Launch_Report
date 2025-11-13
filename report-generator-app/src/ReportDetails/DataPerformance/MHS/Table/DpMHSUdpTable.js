import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpMHSUdpTable({ data, tableName }) {
  const calculateOverallAverage = (good, moderate) => {
    let sum = 0;
    let count = 0;
    if (good !== undefined) {
      sum += parseFloat(good);
      count++;
    }
    if (moderate !== undefined) {
      sum += parseFloat(moderate);
      count++;
    }
    return count > 0 ? (sum / count).toFixed(2) : 'N/A';
  };

  // Dummy data structure for now, will be replaced with actual data
  const getRowSpan = (currentMetric, currentIdealThroughput) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].metric === currentMetric && data[i].idealThroughput === currentIdealThroughput) {
        count++;
      }
    }
    return count;
  };

  const getMetricRowSpan = (currentMetric) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].metric === currentMetric) {
        count++;
      }
    }
    return count;
  };

  let lastMetric = null;
  let lastIdealThroughput = null;

  return (
    <div className="">
      <h3>{tableName}</h3>
      <table className="general-table-style udp-stationary-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Metric</th>
            <th rowSpan="2">Ideal Throughput</th>
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
          {data.map((row, index) => {
            const showMetric = row.metric !== lastMetric;
            const showIdealThroughput = row.idealThroughput !== lastIdealThroughput || showMetric;

            if (showMetric) {
              lastMetric = row.metric;
              lastIdealThroughput = row.idealThroughput;
            } else if (showIdealThroughput) {
              lastIdealThroughput = row.idealThroughput;
            }

            const refRow = data.find(
              (item) =>
                item.metric === row.metric &&
                item.idealThroughput === row.idealThroughput &&
                item.deviceName === 'REF'
            );

            const refOverallValue = refRow ? calculateOverallAverage(refRow.location.good, refRow.location.moderate) : null;
            const currentOverallValue = calculateOverallAverage(row.location.good, row.location.moderate);

            return (
              <tr key={index}>
                {showMetric && (
                  <td rowSpan={getMetricRowSpan(row.metric)}>{row.metric}</td>
                )}
                {showIdealThroughput && (
                  <td rowSpan={getRowSpan(row.metric, row.idealThroughput)}>{row.idealThroughput}</td>
                )}
                <td>{row.deviceName}</td>
                <td style={{
                  backgroundColor: row.deviceName === 'DUT' && refOverallValue !== null && row.metric !== 'Max Throughput' && currentOverallValue !== 'N/A' && refOverallValue !== 'N/A'
                    ? getKpiCellColor(
                        row.metric === 'Mean Jitter' ? 'Jitter' :
                        row.metric === 'Packet Failure Rate' ? 'ErrorRatio' :
                        'Throughput',
                        parseFloat(currentOverallValue),
                        parseFloat(refOverallValue)
                      )
                    : 'inherit'
                }}>
                  {currentOverallValue}
                </td>
                <td>{row.location.good !== undefined ? row.location.good.toFixed(2) : 'N/A'}</td>
                <td>{row.location.moderate !== undefined ? row.location.moderate.toFixed(2) : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpMHSUdpTable;