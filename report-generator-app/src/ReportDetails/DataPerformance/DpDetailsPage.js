import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement, // Add LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement // Register LineElement
);

function DpDetailsPage() {
const dataPerformanceResults = {
  "5G AUTO DP": {
    "2.1.1 5G Auto Data Test Drive": {
      "DUT UDP DL": {
        "Throughput": {
          "Mean": 9.781204435636633,
          "Minimum": 5.826606741573033,
          "Maximum": 10.000303370786517
        }
      },
      "REF UDP DL": {
        "Throughput": {
          "Mean": 7.4,
          "Minimum": 6.843808988764044,
          "Maximum": 10.000685393258427
        }
      }
    }
  }
};

  const dutThroughput = dataPerformanceResults["5G AUTO DP"]["2.1.1 5G Auto Data Test Drive"]["DUT UDP DL"]["Throughput"];
  const refThroughput = dataPerformanceResults["5G AUTO DP"]["2.1.1 5G Auto Data Test Drive"]["REF UDP DL"]["Throughput"];

  const dutMin = dutThroughput.Minimum;
  const dutMax = dutThroughput.Maximum;
  const dutMean = dutThroughput.Mean;

  const refMin = refThroughput.Minimum;
  const refMax = refThroughput.Maximum;
  const refMean = refThroughput.Mean;

  const chartData = {
    labels: ['DUT', 'REF'],
    datasets: [
      {
        label: 'Min-Max Range',
        data: [
          [dutMin, dutMax],
          [refMin, refMax],
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
      {
        label: 'Mean',
        data: [dutMean, refMean],
        type: 'scatter',
        backgroundColor: ['red', 'blue'],
        pointRadius: 5,
        showLine: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'TPUT Performance (Min-Max with Mean)',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Throughput',
        },
      },
    },
  };

  return (
    <div>
      <h2>Data Performance Details Page</h2>
      <div style={{ width: '600px', margin: 'auto' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default DpDetailsPage;