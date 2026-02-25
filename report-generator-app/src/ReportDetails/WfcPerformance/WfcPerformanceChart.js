import React from 'react';
import { Bar } from 'react-chartjs-2';

const WfcPerformanceChart = ({ labels, dutValues, refValues, title, yAxisTitle, style, beginAtZero = true }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'DUT',
                data: dutValues,
                backgroundColor: '#4472c4',
                borderColor: '#4472c4',
                borderWidth: 1,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
            },
            {
                label: 'REF',
                data: refValues,
                backgroundColor: '#70ad47',
                borderColor: '#70ad47',
                borderWidth: 1,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rect',
                    boxWidth: 10,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 14,
                    }
                }
            },
            y: {
                beginAtZero: beginAtZero,
                title: {
                    display: !!yAxisTitle,
                    text: yAxisTitle,
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    borderDash: [5, 5],
                    color: '#e0e0e0',
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="wfc-chart-wrapper" style={{ height: '200px', width: '80%', flex: '1', margin: '0px 0', boxSizing: 'border-box', ...style }}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h4>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default WfcPerformanceChart;
