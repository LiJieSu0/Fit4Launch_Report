import React from 'react';

const DpUdpOverallTable = ({ data, headers }) => {
  if (!data || data.length === 0 || !headers || headers.length === 0) {
    return <div>No data or headers available for UDP Overall Table.</div>;
  }

  const processedData = [];
  let i = 0;
  while (i < data.length) {
    const currentMetric = data[i]['Metric'];
    let metricGroupStart = i;
    let metricGroupEnd = i;

    // Find the end of the current Metric group
    while (metricGroupEnd < data.length && data[metricGroupEnd]['Metric'] === currentMetric) {
      metricGroupEnd++;
    }

    const metricRowSpan = metricGroupEnd - metricGroupStart;

    let j = metricGroupStart;
    while (j < metricGroupEnd) {
      const currentIdealThroughput = data[j]['Ideal Throughput'];
      let idealThroughputGroupStart = j;
      let idealThroughputGroupEnd = j;

      // Find the end of the current Ideal Throughput sub-group within the Metric group
      while (idealThroughputGroupEnd < metricGroupEnd && data[idealThroughputGroupEnd]['Ideal Throughput'] === currentIdealThroughput) {
        idealThroughputGroupEnd++;
      }

      const idealThroughputRowSpan = idealThroughputGroupEnd - idealThroughputGroupStart;

      for (let k = idealThroughputGroupStart; k < idealThroughputGroupEnd; k++) {
        processedData.push({
          ...data[k],
          metricRowSpan: metricRowSpan,
          isFirstInMetricGroup: k === metricGroupStart,
          idealThroughputRowSpan: idealThroughputRowSpan,
          isFirstInIdealThroughputGroup: k === idealThroughputGroupStart,
        });
      }
      j = idealThroughputGroupEnd;
    }
    i = metricGroupEnd;
  }

  return (
    <div>
      <table className="general-table-style">
        <thead>
          <tr>
            <th rowSpan="2">Metric</th>
            <th rowSpan="2">Ideal Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th>Seattle (5G NR)</th>
          </tr>
          <tr>
            <th>Overall</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, pRowIndex) => (
            <tr key={pRowIndex}>
              {row.isFirstInMetricGroup && (
                <td rowSpan={row.metricRowSpan}>{row['Metric']}</td>
              )}
              {row.isFirstInIdealThroughputGroup && (
                <td rowSpan={row.idealThroughputRowSpan}>{row['Ideal Throughput']}</td>
              )}
              <td>{row['Device Name']}</td>
              <td>{row['Overall']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DpUdpOverallTable;