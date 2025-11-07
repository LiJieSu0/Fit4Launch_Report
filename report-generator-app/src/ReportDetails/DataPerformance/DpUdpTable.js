import React from 'react';

function DpUdpTable({ data, tableName }) {
  const calculateOverallAverage = (good, moderate, poor) => {
    const sum = parseFloat(good) + parseFloat(moderate) + parseFloat(poor);
    return (sum / 3).toFixed(2); // Calculate average and format to 2 decimal places
  };

  // Dummy data structure for now, will be replaced with actual data
  const tableData = [
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "Reference(5G)",
      location: {
        good: "100",
        moderate: "80",
        poor: "20",
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "90",
        moderate: "70",
        poor: "10",
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "Reference(5G)",
      location: {
        good: "120",
        moderate: "90",
        poor: "30",
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "110",
        moderate: "85",
        poor: "25",
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "Reference(5G)",
      location: {
        good: "5",
        moderate: "10",
        poor: "20",
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "7",
        moderate: "12",
        poor: "22",
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "Reference(5G)",
      location: {
        good: "6",
        moderate: "11",
        poor: "21",
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "8",
        moderate: "13",
        poor: "23",
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "Reference(5G)",
      location: {
        good: "250",
        moderate: "200",
        poor: "50",
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "230",
        moderate: "180",
        poor: "40",
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "Reference(5G)",
      location: {
        good: "280",
        moderate: "220",
        poor: "60",
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "260",
        moderate: "210",
        poor: "55",
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "Reference(5G)",
      location: {
        good: "0.1",
        moderate: "0.5",
        poor: "1.0",
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "0.2",
        moderate: "0.6",
        poor: "1.1",
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "Reference(5G)",
      location: {
        good: "0.3",
        moderate: "0.7",
        poor: "1.2",
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "Wingtech Plunkett",
      location: {
        good: "0.4",
        moderate: "0.8",
        poor: "1.3",
      },
    },
  ];

  const getRowSpan = (currentMetric, currentIdealThroughput) => {
    let count = 0;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].metric === currentMetric && tableData[i].idealThroughput === currentIdealThroughput) {
        count++;
      }
    }
    return count;
  };

  const getMetricRowSpan = (currentMetric) => {
    let count = 0;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].metric === currentMetric) {
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
      <table className="device-info-table dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Metric</th>
            <th rowSpan="2">Ideal Throughput</th>
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
                <td>{calculateOverallAverage(row.location.good, row.location.moderate, row.location.poor)}</td>
                <td>{row.location.good}</td>
                <td>{row.location.moderate}</td>
                <td>{row.location.poor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpUdpTable;