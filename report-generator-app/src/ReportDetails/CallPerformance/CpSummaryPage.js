import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';


const CpSummaryPage = () => {



    const CpSummaryData = [
        {
            test: 'VoNR Disabled CP MO Drive',
            market: 'Seattle',
            callInitiationLink: '#2.1',
            callRetentionLink: '#2.1',
            callSetupTimeLink: '#2.1',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-pass',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Disabled CP MO Drive',
            market: 'New York',
            callInitiationLink: '#2.1',
            callRetentionLink: '#2.1',
            callSetupTimeLink: '#2.1',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-pass',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Disabled CP MT Drive',
            market: 'Seattle',
            callInitiationLink: '#2.2',
            callRetentionLink: '#2.2',
            callSetupTimeLink: '#2.2',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-fail',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Disabled CP MT Drive',
            market: 'New York',
            callInitiationLink: '#2.2',
            callRetentionLink: '#2.2',
            callSetupTimeLink: '#2.2',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-fail',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Enabled CP MO Drive',
            market: 'Seattle',
            callInitiationLink: '#2.3',
            callRetentionLink: '#2.3',
            callSetupTimeLink: '#2.3',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-pass',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Enabled CP MO Drive',
            market: 'New York',
            callInitiationLink: '#2.3',
            callRetentionLink: '#2.3',
            callSetupTimeLink: '#2.3',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-pass',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Enabled CP MT Drive',
            market: 'Seattle',
            callInitiationLink: '#2.4',
            callRetentionLink: '#2.4',
            callSetupTimeLink: '#2.4',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-pass',
            callSetupTimeClassName: 'bg-performance-pass'
        },
        {
            test: 'VoNR Enabled CP MT Drive',
            market: 'New York',
            callInitiationLink: '#2.4',
            callRetentionLink: '#2.4',
            callSetupTimeLink: '#2.4',
            callInitiationClassName: 'bg-performance-pass',
            callRetentionClassName: 'bg-performance-pass',
            callSetupTimeClassName: 'bg-performance-pass'
        },
    ];

    const seattleData = CpSummaryData.filter(row => row.market === 'Seattle');
    const newYorkData = CpSummaryData.filter(row => row.market === 'New York');


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
                            <td className={row.callInitiationClassName}><a href={row.callInitiationLink}>Result</a></td>
                            <td className={row.callRetentionClassName}><a href={row.callRetentionLink}>Result</a></td>
                            <td className={row.callSetupTimeClassName}><a href={row.callSetupTimeLink}>Result</a></td>
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
                            <td className={row.callInitiationClassName}><a href={row.callInitiationLink}>Result</a></td>
                            <td className={row.callRetentionClassName}><a href={row.callRetentionLink}>Result</a></td>
                            <td className={row.callSetupTimeClassName}><a href={row.callSetupTimeLink}>Result</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default CpSummaryPage;