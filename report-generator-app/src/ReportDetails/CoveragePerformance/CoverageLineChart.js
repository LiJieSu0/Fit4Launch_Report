import React, { useEffect, useState, useRef } from 'react';
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

const CoverageLineChart = ({ analysisType, run, city, projectFolderName }) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    // Determine settings based on analysisType
    let dataFolderPath = "";
    let fileNamePart = "";
    let yAxisLabel = "";
    let chartTitleContext = "";

    if (analysisType === 'RSRP') {
        dataFolderPath = `/AnalyzeResults/${encodeURIComponent(projectFolderName)}/${encodeURIComponent(city)}/rsrp_data`;
        fileNamePart = "_PC2_PC3_RSRP_Analysis.csv";
        yAxisLabel = "RSRP Value";
        chartTitleContext = "RSRP Analysis";
    } else if (analysisType === 'TxPower') {
        dataFolderPath = `/AnalyzeResults/${encodeURIComponent(projectFolderName)}/${encodeURIComponent(city)}/tx_power_data`;
        fileNamePart = "_PC2_PC3_TxPower_Analysis.csv";
        yAxisLabel = "Tx Power Value (dBm)";
        chartTitleContext = "Tx Power Analysis";
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!analysisType || !run) return;

            const runsToFetch = run === 'Average' ? 5 : 1;
            const allRunsData = [];

            try {
                for (let r = 1; r <= runsToFetch; r++) {
                    const currentRun = run === 'Average' ? r : run;
                    const url = `${dataFolderPath}/Run${currentRun}${fileNamePart}`;

                    const response = await fetch(url);
                    if (response.ok) {
                        const text = await response.text();
                        const lines = text.trim().split('\n');
                        const dataRows = lines.slice(1);

                        const runPc2 = [];
                        const runPc3 = [];
                        dataRows.forEach((line) => {
                            const parts = line.trim().split(',');
                            if (parts.length >= 2) {
                                const pc2 = parseFloat(parts[0]);
                                const pc3 = parseFloat(parts[1]);
                                if (!isNaN(pc2) && !isNaN(pc3)) {
                                    runPc2.push(pc2);
                                    runPc3.push(pc3);
                                }
                            }
                        });
                        if (runPc2.length > 0) {
                            allRunsData.push({ pc2: runPc2, pc3: runPc3 });
                        }
                    } else if (run !== 'Average') {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }

                if (allRunsData.length > 0) {
                    const minLength = Math.min(...allRunsData.map(d => d.pc2.length));

                    const finalPc2Data = [];
                    const finalPc3Data = [];
                    const labels = [];

                    for (let i = 0; i < minLength; i++) {
                        let pc2Sum = 0;
                        let pc3Sum = 0;
                        allRunsData.forEach(runData => {
                            pc2Sum += runData.pc2[i];
                            pc3Sum += runData.pc3[i];
                        });
                        finalPc2Data.push(parseFloat((pc2Sum / allRunsData.length).toFixed(2)));
                        finalPc3Data.push(parseFloat((pc3Sum / allRunsData.length).toFixed(2)));
                        labels.push(i + 1);
                    }

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: 'PC2',
                                data: finalPc2Data,
                                borderColor: '#FF9999',
                                backgroundColor: '#FF9999',
                                borderWidth: 2,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                tension: 0.1,
                            },
                            {
                                label: 'PC3',
                                data: finalPc3Data,
                                borderColor: '#36A2EB',
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
                console.error(`Error loading data for Run ${run} from ${dataFolderPath}:`, error);
            }
        };

        fetchData();
    }, [analysisType, run, dataFolderPath, fileNamePart, city, projectFolderName]);

    // Chart.js uses canvas; CSS width cannot constrain canvas during print.
    // Use beforeprint/afterprint to manually resize the chart to a fixed pixel width.
    useEffect(() => {
        const handleBeforePrint = () => {
            if (chartRef.current) {
                chartRef.current.resize(700, 280);
            }
        };
        const handleAfterPrint = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };
        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);
        return () => {
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    if (!chartData) {
        return <div className="coverage-line-chart-container" style={{ height: '280px', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading {run === 'Average' ? 'Averaged' : `Run ${run}`}...</div>;
    }
    // 寬度百分比顯示會因為螢幕不同而改變大小，這段需要修改
    return (
        <div className="coverage-line-chart-container" style={{ height: '280px', width: run === 'Average' ? '50%' : '50%', marginBottom: '20px' }}>
            <Line
                ref={chartRef}
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
                            text: `${run === 'Average' ? 'Averaged' : `Run ${run}`} ${chartTitleContext} (PC2 vs PC3)`,
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
