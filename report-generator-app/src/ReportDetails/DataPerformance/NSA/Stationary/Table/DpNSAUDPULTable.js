import React from 'react';

function DpNSAUDPULTable({ data, tableName }) {
  const calculateOverallAverage = (moderate, poor) => {
    const moderateVal = parseFloat(moderate);
    const poorVal = parseFloat(poor);
    if (isNaN(moderateVal) || isNaN(poorVal)) {
        return "N/A";
    }
    return ((moderateVal + poorVal) / 2).toFixed(2);
  };

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
            <th>Moderate</th>
            <th>Poor</th>
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

            return (
              <tr key={index}>
                {showMetric && (
                  <td rowSpan={getMetricRowSpan(row.metric)}>{row.metric}</td>
                )}
                {showIdealThroughput && (
                  <td rowSpan={getRowSpan(row.metric, row.idealThroughput)}>{row.idealThroughput}</td>
                )}
                <td>{row.deviceName}</td>
                <td>{calculateOverallAverage(row.location.moderate, row.location.poor)}</td>
                <td>{row.location.moderate.toFixed(2)}</td>
                <td>{row.location.poor.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSAUDPULTable;