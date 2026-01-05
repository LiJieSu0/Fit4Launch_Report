import React from 'react';
import { Bar } from 'react-chartjs-2';

const CallSummaryChart = ({ data }) => {
    const chartData = {
        labels: ['DUT', 'REF'],
        datasets: [
            {
                label: 'Total Calls',
                data: [data.DUT?.total_attempts || 0, data.REF?.total_attempts || 0],
                backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue for Total Calls
                borderColor: 'rgba(0, 0, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Successful Calls',
                data: [data.DUT?.total_initiation_successes || 0, data.REF?.total_initiation_successes || 0],
                backgroundColor: 'rgba(0, 128, 0, 0.6)', // Green for Successful Calls
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
            },
            {
                label: 'Init Failures Calls',
                data: [data.DUT?.total_initiation_failures || 0, data.REF?.total_initiation_failures || 0],
                backgroundColor: 'rgba(255, 0, 0, 1)', // Red for Init Failures
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1,
            },
            {
                label: 'Dropped Calls',
                data: [data.DUT?.call_result_distribution?.Drop || 0, data.REF?.call_result_distribution?.Drop || 0],
                backgroundColor: 'rgba(255, 255, 0, 0.6)', // Yellow for Dropped Calls
                borderColor: 'rgba(255, 255, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                align: 'center',
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Calls',
                    font: {
                        size: 18,
                    },
                },
                ticks: {
                    font: {
                        size: 18,
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default CallSummaryChart;
