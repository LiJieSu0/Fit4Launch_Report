import React from 'react';
import styles from './CoverageSummaryTable.module.css';
import '.././../StyleScript/Restricted_Report_Style.css';

const summaryData = [
    {
        deviceName: "Samsung XCover Pro 7(NR 25)",
        kpis: [
            {
                name: "DL Throughput < 1Mbps",
                results: {
                    "Seattle": { status: "Fail", link: '#2.1DL' },
                    "New York": { status: "Pass", link: '#NY2.1DL' }
                }
            },
            {
                name: "UL Throughput < 1Mbps",
                results: {
                    "Seattle": { status: "Pass", link: '#2.1UL' },
                    "New York": { status: "Pass", link: '#NY2.1UL' }
                }
            },
            {
                name: "Last MOS Before Silence",
                results: {
                    "Seattle": { status: "Fail", link: '#2.1MOS' },
                    "New York": { status: "Fail", link: '#NY2.1MOS' }
                }
            },
            {
                name: "Audio Call Drop",
                results: {
                    "Seattle": { status: "Pass", link: '#2.1Call' },
                    "New York": { status: "Pass", link: '#NY2.1Call' }
                }
            },
        ]
    },
    {
        deviceName: "Samsung XCover Pro 7(NR 41)",
        kpis: [
            {
                name: "DL Throughput < 1Mbps",
                results: {
                    "Seattle": { status: "Pass", link: '#2.2DL' },
                    "New York": { status: "Pass", link: '#NY2.2DL' }
                }
            },
            {
                name: "UL Throughput < 1Mbps",
                results: {
                    "Seattle": { status: "Pass", link: '#2.2UL' },
                    "New York": { status: "Pass", link: '#NY2.2UL' }
                }
            },
            {
                name: "Last MOS Before Silence",
                results: {
                    "Seattle": { status: "Pass", link: '#2.2MOS' },
                    "New York": { status: "Pass", link: '#NY2.2MOS' }
                }
            },
            {
                name: "Audio Call Drop",
                results: {
                    "Seattle": { status: "Pass", link: '#2.2Call' },
                    "New York": { status: "Pass", link: '#NY2.2Call' }
                }
            },
        ]
    },
    {
        deviceName: "Samsung XCover Pro 7(NR 71)",
        kpis: [
            {
                name: "DL Throughput < 1Mbps",
                results: {
                    "Seattle": { status: "Pass", link: '#2.3DL' },
                    "New York": { status: "Pass", link: '#NY2.3DL' }
                }
            },
            {
                name: "UL Throughput < 1Mbps",
                results: {
                    "Seattle": { status: "Pass", link: '#2.3UL' },
                    "New York": { status: "Pass", link: '#NY2.3UL' }
                }
            },
            {
                name: "Last MOS Before Silence",
                results: {
                    "Seattle": { status: "Pass", link: '#2.3MOS' },
                    "New York": { status: "Pass", link: '#NY2.3MOS' }
                }
            },
            {
                name: "Audio Call Drop",
                results: {
                    "Seattle": { status: "Pass", link: '#2.3Call' },
                    "New York": { status: "Pass", link: '#NY2.3Call' }
                }
            },
        ]
    }
];

const markets = ["Seattle", "New York"];

const CoverageSummaryTable = () => {
    return (
        <table className={`general-table-style ${styles['coverage-summary-table']}`}>
            <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '35%' }} />
                {markets.map(market => (
                    <col key={market} style={{ width: `${40 / markets.length}%` }} />
                ))}
            </colgroup>
            <thead>
                <tr>
                    <th rowSpan="2">Device</th>
                    <th rowSpan="2">KPI</th>
                    <th colSpan={markets.length}>Market</th>
                </tr>
                <tr>
                    {markets.map(market => (
                        <th key={market}>{market}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {summaryData.map((deviceData, deviceIndex) => (
                    deviceData.kpis.map((kpiData, kpiIndex) => (
                        <tr key={`${deviceIndex}-${kpiIndex}`}>
                            {kpiIndex === 0 && (
                                <td rowSpan={deviceData.kpis.length}>
                                    {deviceData.deviceName}
                                </td>
                            )}
                            <td>{kpiData.name}</td>
                            {markets.map(market => {
                                const result = kpiData.results[market];
                                return (
                                    <td
                                        key={`${market}-${result.status}`}
                                        className={result.status === "Pass" ? styles['result-pass'] : styles['result-fail']}
                                    >
                                        <a href={result.link} style={{ color: 'black' }}>Results</a>
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    );
};

export default CoverageSummaryTable;
