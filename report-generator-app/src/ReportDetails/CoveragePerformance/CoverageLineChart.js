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

const CoverageLineChart = ({ dataFolderPath, fileNamePart, yAxisLabel, chartTitleContext }) => {
    const [chartDataList, setChartDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const newData = [];
            // We expect 5 runs
            for (let i = 1; i <= 5; i++) {
                const url = `${dataFolderPath}/Run${i}${fileNamePart}`;
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
                        newData.push({
                            run: i,
                            data: {
                                labels,
                                datasets: [
                                    {
                                        label: 'PC2',
                                        data: pc2Data,
                                        borderColor: '#FF9999', // Pinkish (similar to image)
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
                            },
                        });
                    }

                } catch (error) {
                    console.error(`Error loading data for Run ${i} from ${url}:`, error);
                }
            }
            setChartDataList(newData);
        };

        fetchData();
    }, [dataFolderPath, fileNamePart]);

    return (
        <div style={{ width: '100%' }}>
            {chartDataList.map((item) => (
                <div key={item.run} style={{ marginBottom: '40px', pageBreakInside: 'avoid' }}>
                    <div style={{ height: '400px', width: '100%', margin: '0 auto' }}>
                        <Line
                            data={item.data}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                animation: false, // Disable animation for generic reports
                                plugins: {
                                    datalabels: {
                                        display: false
                                    },
                                    title: {
                                        display: true,
                                        text: `Run ${item.run} ${chartTitleContext} (PC2 vs PC3)`,
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
                </div>
            ))}
        </div>
    );
};

export default CoverageLineChart;
