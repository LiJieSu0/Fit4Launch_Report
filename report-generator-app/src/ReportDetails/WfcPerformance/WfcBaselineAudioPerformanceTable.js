import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcBaselineAudioPerformanceTable = () => {
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
        let polqaWfc = tc148Data?.['WFC']?.['POLQA Attenuation'];
        let polqaCell = tc148Data?.['Cellular']?.['POLQA Attenuation'];

        let p56Delta = 'N/A';
        let polqaDelta = 'N/A';

        if (p56Wfc !== undefined && p56Cell !== undefined && p56Wfc !== 'N/A' && p56Cell !== 'N/A') {
            p56Delta = (parseFloat(p56Wfc) - parseFloat(p56Cell)).toFixed(2);
        }
        if (polqaWfc !== undefined && polqaCell !== undefined && polqaWfc !== 'N/A' && polqaCell !== 'N/A') {
            polqaDelta = (parseFloat(polqaWfc) - parseFloat(polqaCell)).toFixed(2);
        }

        return (
            <div key={`baseline-audio-${city}`} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Audio NAT Functional</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'left', backgroundColor: 'white', color: 'black' }}>p.56 Audio Active Speech Level (ASL) Delta</td>
                            <td style={p56Delta !== 'N/A' ? { backgroundColor: getKpiCellColor('p56Delta', p56Delta), color: 'black', width: '20%' } : { width: '20%' }}>
                                {p56Delta !== 'N/A' ? 'Result' : 'N/A'}
                            </td>
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

export default WfcBaselineAudioPerformanceTable;
