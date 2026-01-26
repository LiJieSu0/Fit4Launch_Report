import React from 'react';
import { Bar } from 'react-chartjs-2';

const WfcPerformanceChart = ({ labels, dutValues, refValues, title, yAxisTitle }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'DUT',
                data: dutValues,
                backgroundColor: '#4472c4',
                borderColor: '#4472c4',
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
            },
            {
                label: 'REF',
                data: refValues,
                backgroundColor: '#70ad47',
                borderColor: '#70ad47',
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
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
                beginAtZero: true,
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
        <div className="wfc-chart-wrapper" style={{ height: '300px', width: '100%', maxWidth: '600px', margin: '20px 0' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h4>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default WfcPerformanceChart;
