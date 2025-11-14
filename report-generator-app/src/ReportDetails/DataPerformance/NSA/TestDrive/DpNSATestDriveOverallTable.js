import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

const DpNSATestDriveOverallTable = ({ data, tableName }) => {
    if (!data) {
        return <div>No data available for {tableName}</div>;
    }

    const processOverallData = (rawData) => {
        const overallMetrics = [];

        const dutDl = rawData["UDP DL DUT1_Data Test Drive"];
        const refDl = rawData["UDP DL REF1_Data Test Drive"];

        // Throughput
        overallMetrics.push({
            metric: "Throughput (Mbps)",
            kpiType: "Throughput",
            dutValue: dutDl.Throughput.Mean.toFixed(2),
            refValue: refDl.Throughput.Mean.toFixed(2),
        });

        // Jitter
        overallMetrics.push({
            metric: "Jitter (s)",
            kpiType: "Jitter",
            dutValue: dutDl.Jitter.Mean.toFixed(2),
            refValue: refDl.Jitter.Mean.toFixed(2),
        });

        // Error Ratio
        overallMetrics.push({
            metric: "Error Ratio (%)",
            kpiType: "ErrorRatio",
            dutValue: dutDl['Error Ratio'].Mean.toFixed(2),
            refValue: refDl['Error Ratio'].Mean.toFixed(2),
        });

        // Ping RTT
        overallMetrics.push({
            metric: "Ping RTT (ms)",
            kpiType: "PingLatency",
            dutValue: dutDl['Ping RTT'].avg.toFixed(2),
            refValue: refDl['Ping RTT'].avg.toFixed(2),
        });

        return overallMetrics;
    };

    const tableData = processOverallData(data);

    return (
        <div className="table-container">
            <h3>{tableName}</h3>
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

export default DpNSATestDriveOverallTable;