import React from 'react';
import { getKpiCellColor } from '../../../Utils/KpiRules';

const DpDriveTestOverallTable = ({ data, tableName }) => {
    if (!data) {
        return <div>No data available for {tableName}</div>;
    }

    const processOverallData = (rawData) => {
        const overallMetrics = [];

        const dutDl = rawData["DUT UDP DL"];
        const refDl = rawData["REF UDP DL"];

        // Throughput
        overallMetrics.push({
            metric: "Throughput (Mbps)",
            kpiType: "Throughput",
            dutValue: (dutDl?.Throughput?.Mean || 0).toFixed(2),
            refValue: (refDl?.Throughput?.Mean || 0).toFixed(2),
        });

        // Jitter
        overallMetrics.push({
            metric: "Jitter (s)",
            kpiType: "Jitter",
            dutValue: (dutDl?.Jitter?.Mean || 0).toFixed(2),
            refValue: (refDl?.Jitter?.Mean || 0).toFixed(2),
        });

        // Error Ratio
        overallMetrics.push({
            metric: "Packet Failure Rate (%)",
            kpiType: "ErrorRatio",
            dutValue: (dutDl?.['Error Ratio']?.Mean || 0).toFixed(2),
            refValue: (refDl?.['Error Ratio']?.Mean || 0).toFixed(2),
        });

        // Ping RTT - only add if data exists
        if (dutDl?.['Ping RTT'] || refDl?.['Ping RTT']) {
            overallMetrics.push({
                metric: "Ping RTT (ms)",
                kpiType: "PingLatency",
                dutValue: (dutDl?.['Ping RTT']?.Mean || 0).toFixed(2),
                refValue: (refDl?.['Ping RTT']?.Mean || 0).toFixed(2),
            });
        }

        return overallMetrics;
    };

    const tableData = processOverallData(data);

    return (
        <div className="table-container">
            <h4>{tableName}</h4>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>DUT Value</th>
                        <th>REF Value</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.metric}</td>
                            <td style={{ backgroundColor: getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) }}>{row.dutValue}</td>
                            <td>{row.refValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DpDriveTestOverallTable;