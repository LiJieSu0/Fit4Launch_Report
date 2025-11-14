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
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../Constants/ChartColors';

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

function DpRangeChart({ data, chartTitle, yAxisTitle }) {
  const labels = Object.keys(data); // e.g., ['good', 'moderate', 'poor']

  const dutRanges = labels.map(region => [data[region].dutMin, data[region].dutMax]);
  const refRanges = labels.map(region => [data[region].refMin, data[region].refMax]);
  const dutMeans = labels.map(region => data[region].dutMean);
  const refMeans = labels.map(region => data[region].refMean);

  const chartData = {
    labels: labels.flatMap(label => [`${label}`, `${label}`]),
    datasets: [
      {
        label: 'Range',
        data: labels.flatMap(region => [[data[region].dutMin, data[region].dutMax], [data[region].refMin, data[region].refMax]]),
        backgroundColor: labels.flatMap(() => [CHART_COLOR_DUT, CHART_COLOR_REF]),
        borderColor: labels.flatMap(() => [CHART_COLOR_DUT, CHART_COLOR_REF]),
        borderWidth: 1,
        type: 'bar',
        barThickness: 30,
      },
      {
        label: 'Mean',
        data: labels.flatMap(region => [data[region].dutMean, data[region].refMean]),
        borderColor: ['rgba(255, 0, 0, 1)'],
        backgroundColor: ['rgba(255, 0, 0, 1)'],
        type: 'line',
        pointRadius: 30,
        showLine: false,
        pointStyle: 'dash',
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
            const dutColor = CHART_COLOR_DUT;
            const refColor = CHART_COLOR_REF;
            const meanColor = datasets[1].borderColor[0];

            return [
              {
                text: 'DUT',
                fillStyle: dutColor,
                strokeStyle: dutColor,
                lineWidth: datasets[0].borderWidth,
                hidden: false,
                index: 0
              },
              {
                text: 'REF',
                fillStyle: refColor,
                strokeStyle: refColor,
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
        text: chartTitle,
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
            offset: 0,
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
            offset: 30,
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
          text: yAxisTitle,
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