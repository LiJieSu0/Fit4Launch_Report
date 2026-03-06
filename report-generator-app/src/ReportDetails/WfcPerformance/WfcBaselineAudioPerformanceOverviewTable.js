import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcBaselineAudioPerformanceOverviewTable = () => {
    const { projectData, availableCities } = useReportData();

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderTableForCity = (city) => {
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

        return (
            <div key={`baseline-audio-overview-${city}`} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Audio NAT Functional</th>
                            <th>Unit</th>
                            <th>WFC</th>
                            <th>Cellular</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <a href="#baseline-audio-performance-details" style={{ color: 'inherit', textDecoration: 'underline' }}>p.56 active speech level</a>
                            </td>
                            <td>dBov</td>
                            <td>{formatVal(p56Wfc)}</td>
                            <td>{formatVal(p56Cell)}</td>
                            <td style={p56Delta !== 'N/A' ? { backgroundColor: getKpiCellColor('p56Delta', p56Delta), color: 'black' } : {}}>{p56Delta}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <a href="#baseline-audio-performance-details" style={{ color: 'inherit', textDecoration: 'underline' }}>p.56 rms long term energy</a>
                            </td>
                            <td>dBov</td>
                            <td>{formatVal(p56RmsWfc)}</td>
                            <td>{formatVal(p56RmsCell)}</td>
                            <td>{p56RmsDelta}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <a href="#baseline-audio-performance-details" style={{ color: 'inherit', textDecoration: 'underline' }}>p.56 active peak-factor</a>
                            </td>
                            <td>dB</td>
                            <td>{formatVal(p56PeakWfc)}</td>
                            <td>{formatVal(p56PeakCell)}</td>
                            <td>{p56PeakDelta}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'left' }}>
                                <a href="#baseline-audio-performance-details" style={{ color: 'inherit', textDecoration: 'underline' }}>POLQA Attenuation</a>
                            </td>
                            <td>dBov</td>
                            <td>{formatVal(polqaWfc)}</td>
                            <td>{formatVal(polqaCell)}</td>
                            <td>{polqaDelta}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {availableCities.filter(city => city === 'Seattle').map(city => renderTableForCity(city))}
        </div>
    );
};

export default WfcBaselineAudioPerformanceOverviewTable;
