import React from 'react';
import './CoverageSummaryTable.module.css';



const summaryData = [
    {
        market: "Seattle",
        devices: [
            {
                name: "Samsung XCover Pro 7(NR 25)",
                kpis: [
                    { name: "DL Throughput < 1Mbps", result: "Fail" },
                    { name: "UL Throughput < 1Mbps", result: "Pass" },
                    { name: "Last MOS Before Silence", result: "Fail" },
                    { name: "Audio Call Drop", result: "Pass" },
                ]
            },
            {
                name: "Samsung XCover Pro 7(NR 41)",
                kpis: [
                    { name: "DL Throughput < 1Mbps", result: "Pass" },
                    { name: "UL Throughput < 1Mbps", result: "Pass" },
                    { name: "Last MOS Before Silence", result: "Pass" },
                    { name: "Audio Call Drop", result: "Pass" },
                ]
            },
            {
                name: "Samsung XCover Pro 7(NR 71)",
                kpis: [
                    { name: "DL Throughput < 1Mbps", result: "Pass" },
                    { name: "UL Throughput < 1Mbps", result: "Pass" },
                    { name: "Last MOS Before Silence", result: "Pass" },
                    { name: "Audio Call Drop", result: "Pass" },
                ]
            }

        ]
    }
    
];

const CoverageSummaryTable = () => {
    return (
        <table className="device-info-table summary-table">
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
                                <td className={kpiData.result === "green" ? "" : ""}></td>
                            </tr>
                        ))
                    ))
                ))}
            </tbody>
        </table>
    );
};

export default CoverageSummaryTable;