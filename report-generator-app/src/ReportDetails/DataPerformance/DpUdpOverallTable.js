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
    <table className="general-table-style">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {processedData.map((row, pRowIndex) => (
          <tr key={pRowIndex}>
            {headers.map((header, colIndex) => {
              if (header === 'Metric' && !row.isFirstInMetricGroup) {
                return null;
              }
              if (header === 'Ideal Throughput' && !row.isFirstInIdealThroughputGroup) {
                return null;
              }

              let rowSpan = 1;
              if (header === 'Metric' && row.isFirstInMetricGroup) {
                rowSpan = row.metricRowSpan;
              } else if (header === 'Ideal Throughput' && row.isFirstInIdealThroughputGroup) {
                rowSpan = row.idealThroughputRowSpan;
              }

              return (
                <td key={colIndex} rowSpan={rowSpan}>
                  {row[header]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DpUdpOverallTable;