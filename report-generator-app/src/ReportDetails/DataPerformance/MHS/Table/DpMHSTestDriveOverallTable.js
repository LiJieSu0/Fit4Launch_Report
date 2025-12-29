import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

const DpMHSTestDriveOverallTable = ({ data, tableName }) => {
    if (!data) {
        return <div>No data available for {tableName}</div>;
    }

    const processOverallData = (rawData) => {
        const overallMetrics = [];

        const dutDl = rawData["DUT UDP DL"];
        const refDl = rawData["REF UDP DL"];

        // Throughput DL
        overallMetrics.push({
            metric: "DL Throughput Mean (Mbps)",
            kpiType: "Throughput",
            dutValue: dutDl.Throughput.DL.Mean.toFixed(2),
            refValue: refDl.Throughput.DL.Mean.toFixed(2),
        });

        // Throughput UL
        overallMetrics.push({
            metric: "UL Throughput Mean (Mbps)",
            kpiType: "Throughput",
            dutValue: dutDl.Throughput.UL.Mean.toFixed(2),
            refValue: refDl.Throughput.UL.Mean.toFixed(2),
        });

        // Jitter DL
        overallMetrics.push({
            metric: "DL Jitter Mean (ms)",
            kpiType: "Jitter",
            dutValue: dutDl.Jitter["DL Mean"].toFixed(2),
            refValue: refDl.Jitter["DL Mean"].toFixed(2),
        });

        // Jitter UL
        overallMetrics.push({
            metric: "UL Jitter Mean (ms)",
            kpiType: "Jitter",
            dutValue: dutDl.Jitter["UL Mean"].toFixed(2),
            refValue: refDl.Jitter["UL Mean"].toFixed(2),
        });

        // Error Ratio DL
        overallMetrics.push({
            metric: "DL Packet Failure Rate Mean (%)",
            kpiType: "ErrorRatio",
            dutValue: dutDl['Error Ratio']["DL Mean"].toFixed(2),
            refValue: refDl['Error Ratio']["DL Mean"].toFixed(2),
        });

        // Error Ratio UL
        overallMetrics.push({
            metric: "UL Packet Failure Rate Mean (%)",
            kpiType: "ErrorRatio",
            dutValue: dutDl['Error Ratio']["UL Mean"].toFixed(2),
            refValue: refDl['Error Ratio']["UL Mean"].toFixed(2),
        });

        // Ping RTT
        overallMetrics.push({
            metric: "Ping RTT Mean (ms)",
            kpiType: "PingLatency",
            dutValue: dutDl['Ping RTT'].avg.toFixed(2),
            refValue: refDl['Ping RTT'].avg.toFixed(2),
        });

        return overallMetrics;
    };

    const tableData = processOverallData(data);

    let lastMetric = null;

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
                            <td style={{ backgroundColor: (row.metric.includes("Mean") || row.metric.includes("Avg")) ? getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) : 'inherit' }}>{row.dutValue}</td>
                            <td>{row.refValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DpMHSTestDriveOverallTable;