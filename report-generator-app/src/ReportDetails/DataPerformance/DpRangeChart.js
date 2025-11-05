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
  LineElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartDataLabels
);

function DpRangeChart({ dataPerformanceResults }) {
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
        data: [
          [dutMin, dutMax],
          [refMin, refMax],
        ],
        backgroundColor: ['rgba(20, 218, 20, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(20, 218, 20, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderWidth: 1,
        type:'bar',
        barThickness: 30
      },
      {
        data: [dutMean, refMean],
        borderColor: ['rgba(255, 0, 0, 1)'],
        backgroundColor:['rgba(255, 0, 0, 1)'],
        type: 'line',
        pointRadius: 20,
        showLine: false,
        pointStyle:'cross'
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function(chart) {
            const datasets = chart.data.datasets;
            const dutColor = datasets[0].backgroundColor[0];
            const refColor = datasets[0].backgroundColor[1];
            const meanColor = datasets[1].borderColor[0];

            return [
              {
                text: 'DUT',
                fillStyle: dutColor,
                strokeStyle: datasets[0].borderColor[0],
                lineWidth: datasets[0].borderWidth,
                hidden: false,
                index: 0
              },
              {
                text: 'REF',
                fillStyle: refColor,
                strokeStyle: datasets[0].borderColor[1],
                lineWidth: datasets[0].borderWidth,
                hidden: false,
                index: 1
              },
              {
                text: 'Mean',
                fillStyle: meanColor,
                strokeStyle: meanColor,
                lineWidth: datasets[1].borderWidth,
                hidden: false,
                index: 2
              }
            ];
          }
        }
      },
      title: {
        display: true,
        text: 'TPUT Performance (Min-Max with Mean)',
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold'
        },
        labels: {
          min: {
            align: 'end',
            anchor: 'start',
            offset: -20,
            formatter: function(value, context) {
              if (context.dataset.type === 'bar') {
                return value[0].toFixed(2);
              }
              return null;
            }
          },
          max: {
            align: 'end',
            anchor: 'end',
            offset: 5,
            formatter: function(value, context) {
              if (context.dataset.type === 'bar') {
                return value[1].toFixed(2);
              }
              return null;
            }
          },
          mean: {
            align: 'right',
            anchor: 'center',
            offset:20,
            formatter: function(value, context) {
              if (context.dataset.type === 'line') {
                return value.toFixed(2);
              }
              return null;
            }
          }
        }
      }
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
    <div style={{ width: '600px', margin: 'auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default DpRangeChart;