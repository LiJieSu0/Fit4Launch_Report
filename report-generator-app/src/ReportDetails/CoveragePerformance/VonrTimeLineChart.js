import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const VonrTimeLineChart = ({ analysisType, band, run, city, projectFolderName, height = '300px', width = '100%' }) => {
    const [chartData, setChartData] = useState(null);

    const getYAxisLabel = (type) => {
        switch (type) {
            case 'RSRP':
                return 'RSRP (dBm)';
            case 'SINR':
                return 'SINR (dB)';
            case 'TxPower':
                return 'TxPower (dBm)';
            default:
                return 'Value';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!analysisType || !band || !run) return;

            const url = `/AnalyzeResults/${encodeURIComponent(projectFolderName)}/${encodeURIComponent(city)}/CoverageTimeLine/${analysisType}TimeLine/${band.toUpperCase()}_Run${run}.csv`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();

                const lines = text.trim().split('\n');
                const dataRows = lines.slice(1);

                const dutData = [];
                const refData = [];
                const labels = [];

                dataRows.forEach((line, index) => {
                    const parts = line.trim().split(',');
                    if (parts.length >= 2) {
                        const dut = parseFloat(parts[0]);
                        const ref = parseFloat(parts[1]);
                        if (!isNaN(dut) && !isNaN(ref)) {
                            dutData.push(dut);
                            refData.push(ref);
                            labels.push(index + 1);
                        }
                    }
                });

                if (labels.length > 0) {
                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: 'DUT',
                                data: dutData,
                                borderColor: '#FF6384',
                                backgroundColor: '#FF6384',
                                borderWidth: 1,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                tension: 0.1,
                            },
                            {
                                label: 'REF',
                                data: refData,
                                borderColor: '#36A2EB',
                                backgroundColor: '#36A2EB',
                                borderWidth: 1,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                tension: 0.1,
                            },
                        ],
                    });
                }

            } catch (error) {
                console.error(`Error loading VonrTimeLineChart data for ${band} Run ${run}:`, error);
            }
        };

        fetchData();
    }, [analysisType, band, run, city, projectFolderName]);

    if (!chartData) {
        return (
            <div style={{ height, width, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Loading {analysisType} Run {run}...
            </div>
        );
    }

    return (
        <div style={{ height, width }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `Run ${run} ${analysisType}`,
                            font: { size: 14, weight: 'bold' },
                            color: '#333'
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Sample Index',
                                font: { weight: 'bold' }
                            },
                            ticks: {
                                maxTicksLimit: 20
                            },
                            grid: {
                                display: true
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: getYAxisLabel(analysisType),
                                font: { weight: 'bold' }
                            },
                            grid: {
                                display: true
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default VonrTimeLineChart;
