import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';



const CpSummaryPage = () => {



    const { allReportData } = useReportData();

    const getMarketRows = (marketName) => {
        const marketData = allReportData[marketName]?.callPerformance?.['Call Performance'];
        if (!marketData) return [];

        const scenarios = [
            { key: '5G Auto VoNR Disabled CP MO Drive', label: 'VoNR Disabled CP MO Drive', link: '#2.1' },
            { key: '5G Auto VoNR Disabled CP MT Drive', label: 'VoNR Disabled CP MT Drive', link: '#2.2' },
            { key: '5G Auto VoNR Enabled CP MO Drive', label: 'VoNR Enabled CP MO Drive', link: '#2.3' },
            { key: '5G Auto VoNR Enabled CP MT Drive', label: 'VoNR Enabled CP MT Drive', link: '#2.4' }
        ];

        return scenarios.map(s => {
            const data = marketData[s.key];
            if (!data) return null;

            const mapExcellentToPass = (color) => {
                if (color === 'var(--performance-excellent)') {
                    return 'var(--performance-pass)';
                }
                return color;
            };

            return {
                test: s.label,
                market: marketName,
                callInitiationLink: s.link,
                callRetentionLink: s.link,
                callSetupTimeLink: s.link,
                callInitiationColor: mapExcellentToPass(getKpiCellColor('CallInitiation', data.initiation_p_value)),
                callRetentionColor: mapExcellentToPass(getKpiCellColor('CallRetention', data.retention_p_value)),
                callSetupTimeColor: mapExcellentToPass(getKpiCellColor('CallSetupTime', data.DUT.mean_setup_time, data.REF.mean_setup_time))
            };
        }).filter(row => row !== null);

    };

    const seattleData = getMarketRows('Seattle');
    const newYorkData = getMarketRows('New York');


    return (
        <div className="page-content">
            <DynamicHeader level={1}>Call Performance Test Overview</DynamicHeader>
            <DynamicHeader level={2}>Seattle</DynamicHeader>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Call Initiation</th>
                        <th>Call Retention</th>
                        <th>Call Setup Time</th>
                    </tr>
                </thead>
                <tbody>
                    {seattleData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.test}</td>
                            <td style={{ backgroundColor: row.callInitiationColor }}><a href={row.callInitiationLink}>Result</a></td>
                            <td style={{ backgroundColor: row.callRetentionColor }}><a href={row.callRetentionLink}>Result</a></td>
                            <td style={{ backgroundColor: row.callSetupTimeColor }}><a href={row.callSetupTimeLink}>Result</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DynamicHeader level={2}>New York</DynamicHeader>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>Call Initiation</th>
                        <th>Call Retention</th>
                        <th>Call Setup Time</th>
                    </tr>
                </thead>
                <tbody>
                    {newYorkData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.test}</td>
                            <td style={{ backgroundColor: row.callInitiationColor }}><a href={row.callInitiationLink}>Result</a></td>
                            <td style={{ backgroundColor: row.callRetentionColor }}><a href={row.callRetentionLink}>Result</a></td>
                            <td style={{ backgroundColor: row.callSetupTimeColor }}><a href={row.callSetupTimeLink}>Result</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default CpSummaryPage;