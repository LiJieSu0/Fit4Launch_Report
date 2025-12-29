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

const CoverageLineChart = ({ analysisType, run }) => {
    const [chartData, setChartData] = useState(null);

    // Determine settings based on analysisType
    let dataFolderPath = "";
    let fileNamePart = "";
    let yAxisLabel = "";
    let chartTitleContext = "";

    if (analysisType === 'RSRP') {
        dataFolderPath = "/AnalyzeResults/Seattle/rsrp_data";
        fileNamePart = "_PC2_PC3_RSRP_Analysis.csv";
        yAxisLabel = "RSRP Value";
        chartTitleContext = "RSRP Analysis";
    } else if (analysisType === 'TxPower') {
        dataFolderPath = "/AnalyzeResults/Seattle/tx_power_data";
        fileNamePart = "_PC2_PC3_TxPower_Analysis.csv";
        yAxisLabel = "Tx Power Value (dBm)";
        chartTitleContext = "Tx Power Analysis";
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!analysisType || !run) return;

            const url = `${dataFolderPath}/Run${run}${fileNamePart}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();

                // Parse CSV
                const lines = text.trim().split('\n');
                // skip header
                const dataRows = lines.slice(1);

                const pc2Data = [];
                const pc3Data = [];
                const labels = [];

                dataRows.forEach((line, index) => {
                    // Trim line to avoid issues with CR/LF
                    const parts = line.trim().split(',');
                    if (parts.length >= 2) {
                        const pc2 = parseFloat(parts[0]);
                        const pc3 = parseFloat(parts[1]);
                        if (!isNaN(pc2) && !isNaN(pc3)) {
                            pc2Data.push(pc2);
                            pc3Data.push(pc3);
                            labels.push(index + 1); // 1-based index
                        }
                    }
                });

                if (labels.length > 0) {
                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: 'PC2',
                                data: pc2Data,
                                borderColor: '#FF9999', // Pinkish
                                backgroundColor: '#FF9999',
                                borderWidth: 2,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                tension: 0.1,
                            },
                            {
                                label: 'PC3',
                                data: pc3Data,
                                borderColor: '#36A2EB', // Blueish
                                backgroundColor: '#36A2EB',
                                borderWidth: 2,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                tension: 0.1,
                            },
                        ],
                    });
                }

            } catch (error) {
                console.error(`Error loading data for Run ${run} from ${url}:`, error);
            }
        };

        fetchData();
    }, [analysisType, run, dataFolderPath, fileNamePart]);

    if (!chartData) {
        return <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Run {run}...</div>;
    }
    // 寬度百分比顯示會因為螢幕不同而改變大小，這段需要修改
    return (
        <div style={{ height: '350px', width: '40%', marginBottom: '20px' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    layout: {
                        padding: {
                            right: 20,
                            left: 10
                        }
                    },
                    plugins: {
                        datalabels: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: `Run ${run} ${chartTitleContext} (PC2 vs PC3)`,
                            font: { size: 16, weight: 'bold' },
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
                                text: 'Data Point Order',
                                font: { weight: 'bold' }
                            },
                            ticks: {
                                maxTicksLimit: 40,
                                maxRotation: 45,
                                minRotation: 45
                            },
                            grid: {
                                display: true,
                                drawBorder: true
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: yAxisLabel,
                                font: { weight: 'bold' }
                            },
                            grid: {
                                display: true,
                                drawBorder: true
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default CoverageLineChart;
