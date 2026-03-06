import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';
import PageBreak from '../../CommonPage/PageBreak';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const WfcBaselineAudioPerformance = () => {
    const { projectData, availableCities } = useReportData();

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderDataForCity = (city) => {
        const tc148Data = projectData[city]?.wfcPerformance?.['WFC']?.['TC148'];

        let p56Wfc = tc148Data?.['WFC']?.['p56 Active Speech Level'];
        let p56Cell = tc148Data?.['Cellular']?.['p56 Active Speech Level'];
        let p56RmsWfc = tc148Data?.['WFC']?.['p56 rms'];
        let p56RmsCell = tc148Data?.['Cellular']?.['p56 rms'];
        let p56PeakWfc = tc148Data?.['WFC']?.['p56 peack-factor'];
        let p56PeakCell = tc148Data?.['Cellular']?.['p56 peack-factor'];
        let polqaWfc = tc148Data?.['WFC']?.['POLQA Attenuation'];
        let polqaCell = tc148Data?.['Cellular']?.['POLQA Attenuation'];

        let p56Delta = 'N/A';
        let p56RmsDelta = 'N/A';
        let p56PeakDelta = 'N/A';
        let polqaDelta = 'N/A';

        if (p56Wfc !== undefined && p56Cell !== undefined && p56Wfc !== 'N/A' && p56Cell !== 'N/A') {
            p56Delta = (parseFloat(p56Wfc) - parseFloat(p56Cell)).toFixed(2);
        }
        if (p56RmsWfc !== undefined && p56RmsCell !== undefined && p56RmsWfc !== 'N/A' && p56RmsCell !== 'N/A') {
            p56RmsDelta = (parseFloat(p56RmsWfc) - parseFloat(p56RmsCell)).toFixed(2);
        }
        if (p56PeakWfc !== undefined && p56PeakCell !== undefined && p56PeakWfc !== 'N/A' && p56PeakCell !== 'N/A') {
            p56PeakDelta = (parseFloat(p56PeakWfc) - parseFloat(p56PeakCell)).toFixed(2);
        }
        if (polqaWfc !== undefined && polqaCell !== undefined && polqaWfc !== 'N/A' && polqaCell !== 'N/A') {
            polqaDelta = (parseFloat(polqaWfc) - parseFloat(polqaCell)).toFixed(2);
        }

        // --- Table ---
        const table = (
            <div style={{ marginBottom: '30px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>Audio NAT Functional</th>
                            <th>Unit</th>
                            <th>WFC</th>
                            <th>Cellular</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'left' }}>p.56 active speech level</td>
                            <td>dBov</td>
                            <td>{formatVal(p56Wfc)}</td>
                            <td>{formatVal(p56Cell)}</td>
                            <td style={p56Delta !== 'N/A' ? { backgroundColor: getKpiCellColor('p56Delta', p56Delta), color: 'black' } : {}}>{p56Delta}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>p.56 rms long term energy</td>
                            <td>dBov</td>
                            <td>{formatVal(p56RmsWfc)}</td>
                            <td>{formatVal(p56RmsCell)}</td>
                            <td>{p56RmsDelta}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>p.56 active peak-factor</td>
                            <td>dB</td>
                            <td>{formatVal(p56PeakWfc)}</td>
                            <td>{formatVal(p56PeakCell)}</td>
                            <td>{p56PeakDelta}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>POLQA Attenuation</td>
                            <td>dBov</td>
                            <td>{formatVal(polqaWfc)}</td>
                            <td>{formatVal(polqaCell)}</td>
                            <td>{polqaDelta}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

        // --- Chart ---
        const chartData = {
            labels: ['p.56 Active Speech Level', 'p.56 rms long term energy', 'p.56 active peak-factor', 'POLQA Attenuation'],
            datasets: [
                {
                    label: 'WFC',
                    data: [
                        p56Wfc !== undefined && p56Wfc !== 'N/A' ? parseFloat(p56Wfc) : 0,
                        p56RmsWfc !== undefined && p56RmsWfc !== 'N/A' ? parseFloat(p56RmsWfc) : 0,
                        p56PeakWfc !== undefined && p56PeakWfc !== 'N/A' ? parseFloat(p56PeakWfc) : 0,
                        polqaWfc !== undefined && polqaWfc !== 'N/A' ? parseFloat(polqaWfc) : 0
                    ],
                    backgroundColor: '#4472c4',
                    borderColor: '#4472c4',
                    borderWidth: 1,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                },
                {
                    label: 'Cellular',
                    data: [
                        p56Cell !== undefined && p56Cell !== 'N/A' ? parseFloat(p56Cell) : 0,
                        p56RmsCell !== undefined && p56RmsCell !== 'N/A' ? parseFloat(p56RmsCell) : 0,
                        p56PeakCell !== undefined && p56PeakCell !== 'N/A' ? parseFloat(p56PeakCell) : 0,
                        polqaCell !== undefined && polqaCell !== 'N/A' ? parseFloat(polqaCell) : 0
                    ],
                    backgroundColor: '#ed7d31', // Using distinct color for Cellular
                    borderColor: '#ed7d31',
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
                        font: { size: 14 },
                    },
                },
                title: { display: false },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                },
                datalabels: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 14 } }
                },
                y: {
                    title: {
                        display: true,
                        text: 'dBov',
                        font: { size: 14 },
                    },
                    grid: {
                        borderDash: [5, 5],
                        color: '#e0e0e0',
                    },
                    ticks: { font: { size: 12 } },
                },
            },
        };

        const chart = (
            <div className="wfc-chart-wrapper" style={{
                height: '300px', width: '40%',
                margin: '0 auto', boxSizing: 'border-box', marginLeft: '-40px'
            }}>
                <Bar data={chartData} options={options} />
            </div>
        );

        return (
            <div key={`baseline-audio-detail-${city}`} style={{ marginBottom: '40px' }}>
                {table}
                {chart}
            </div>
        );
    };

    return (
        <>
            <PageBreak>
                <DynamicHeader level={1} >Baseline Audio Performance</DynamicHeader>
                {availableCities.filter(city => city === 'Seattle').map(city => renderDataForCity(city))}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <img src="/WFC_Freq.png" alt="WFC Frequency" style={{ width: '80%', maxWidth: '800px' }} />
                </div>
            </PageBreak>
        </>
    );
};

export default WfcBaselineAudioPerformance;
