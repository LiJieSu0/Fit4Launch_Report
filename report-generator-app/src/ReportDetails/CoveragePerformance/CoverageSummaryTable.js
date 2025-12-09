import React from 'react';
import styles from './CoverageSummaryTable.module.css';
import '.././../StyleScript/Restricted_Report_Style.css';



const summaryData = [
    {
        market: "Seattle",
        devices: [
            {
                name: "Samsung XCover Pro 7(NR 25)",
                kpis: [
                    { name: "DL Throughput < 1Mbps", result: "Fail",link:'#2.1DL' },
                    { name: "UL Throughput < 1Mbps", result: "Pass",link:'#2.1UL' },
                    { name: "Last MOS Before Silence", result: "Fail",link:'#2.1MOS' },
                    { name: "Audio Call Drop", result: "Pass",link:'#2.1Call' },
                ]
            },
            {
                name: "Samsung XCover Pro 7(NR 41)",
                kpis: [
                    { name: "DL Throughput < 1Mbps", result: "Pass",link:'#2.2DL' },
                    { name: "UL Throughput < 1Mbps", result: "Pass",link:'#2.2UL' },
                    { name: "Last MOS Before Silence", result: "Pass",link:'#2.2MOS' },
                    { name: "Audio Call Drop", result: "Pass",link:'#2.2Call' },
                ]
            },
            {
                name: "Samsung XCover Pro 7(NR 71)",
                kpis: [
                    { name: "DL Throughput < 1Mbps", result: "Pass",link:'#2.3DL' },
                    { name: "UL Throughput < 1Mbps", result: "Pass",link:'#2.3UL' },
                    { name: "Last MOS Before Silence", result: "Pass",link:'#2.3MOS' },
                    { name: "Audio Call Drop", result: "Pass",link:'#2.3Call' },
                ]
            }

        ]
    }
    
];

const CoverageSummaryTable = () => {
    return (
        <table className={`general-table-style `}>
            <thead>
                <tr>
                    <th>Market</th>
                    <th>Device</th>
                    <th>KPI</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {summaryData.map((marketData, marketIndex) => (
                    marketData.devices.map((deviceData, deviceIndex) => (
                        deviceData.kpis.map((kpiData, kpiIndex) => (
                            <tr key={`${marketIndex}-${deviceIndex}-${kpiIndex}`}>
                                {deviceIndex === 0 && kpiIndex === 0 && (
                                    <td rowSpan={marketData.devices.reduce((acc, device) => acc + device.kpis.length, 0)}>
                                        {marketData.market}
                                    </td>
                                )}
                                {kpiIndex === 0 && (
                                    <td rowSpan={deviceData.kpis.length}>
                                        {deviceData.name}
                                    </td>
                                )}
                                <td>{kpiData.name}</td>
                                <td className={kpiData.result === "Pass" ? styles['result-pass'] : styles['result-fail']}><a href={kpiData.link}>Results</a></td>
                            </tr>
                        ))
                    ))
                ))}
            </tbody>
        </table>
    );
};

export default CoverageSummaryTable;