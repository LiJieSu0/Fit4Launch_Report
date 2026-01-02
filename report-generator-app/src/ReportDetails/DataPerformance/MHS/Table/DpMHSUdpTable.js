import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpMHSUdpTable({ data, tableName }) {
  // Detect which locations have data
  const getAvailableLocations = (data) => {
    const locations = new Set();
    data.forEach(row => {
      Object.keys(row.location).forEach(loc => {
        if (row.location[loc] !== undefined) {
          locations.add(loc);
        }
      });
    });
    return Array.from(locations).sort(); // Sort for consistent order
  };

  const availableLocations = getAvailableLocations(data);

  const calculateOverallAverage = (locationData) => {
    let sum = 0;
    let count = 0;
    availableLocations.forEach(loc => {
      if (locationData[loc] !== undefined) {
        sum += parseFloat(locationData[loc]);
        count++;
      }
    });
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
  const unit = {
    "Mean Throughput": " (Mbps)",
    "Max Throughput": " (Mbps)",
    "Min Throughput": " (Mbps)",
    "Mean Jitter": " (ms)",
    "Packet Failure Rate": " (%)",
  }
  return (
    <div className="">
      <h4>{tableName}</h4>
      <table className="general-table-style udp-stationary-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Metric</th>
            <th rowSpan="2">Ideal Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan={availableLocations.length}>Location</th>
          </tr>
          <tr>
            {availableLocations.map(loc => (
              <th key={loc}>{loc.charAt(0).toUpperCase() + loc.slice(1)}</th>
            ))}
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

            const refOverallValue = refRow ? calculateOverallAverage(refRow.location) : null;
            const currentOverallValue = calculateOverallAverage(row.location);

            return (
              <tr key={index}>
                {showMetric && (
                  <td rowSpan={getMetricRowSpan(row.metric)}>{row.metric}{unit[row.metric]}</td>
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
                {availableLocations.map(loc => (
                  <td key={loc}>
                    {row.location[loc] !== undefined ? row.location[loc].toFixed(2) : 'N/A'}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpMHSUdpTable;