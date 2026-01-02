import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

const DpNSATestDriveOverallTable = ({ data, tableName }) => {
    if (!data) {
        return <div>No data available for {tableName}</div>;
    }

    const processOverallData = (rawData) => {
        const overallMetrics = [];

        const dutDl = rawData["DUT"] || {};
        const refDl = rawData["REF"] || {};

        const getSafeValue = (obj, path) => {
            const val = path.split('.').reduce((acc, part) => acc && acc[part], obj);
            return typeof val === 'number' ? val.toFixed(2) : "N/A";
        };

        // Throughput
        overallMetrics.push({
            metric: "Mean Throughput (Mbps)",
            kpiType: "Throughput",
            dutValue: getSafeValue(dutDl, 'Throughput.Mean'),
            refValue: getSafeValue(refDl, 'Throughput.Mean'),
        });

        // Jitter
        overallMetrics.push({
            metric: "Mean Jitter (s)",
            kpiType: "Jitter",
            dutValue: getSafeValue(dutDl, 'Jitter.Mean'),
            refValue: getSafeValue(refDl, 'Jitter.Mean'),
        });

        // Error Ratio
        overallMetrics.push({
            metric: "Packet Failure Rate (%)",
            kpiType: "ErrorRatio",
            dutValue: getSafeValue(dutDl, 'Error Ratio.Mean'),
            refValue: getSafeValue(refDl, 'Error Ratio.Mean'),
        });

        // Ping RTT
        overallMetrics.push({
            metric: "Mean Round Trip Time (ms)",
            kpiType: "PingLatency",
            dutValue: getSafeValue(dutDl, 'Ping RTT.avg'),
            refValue: getSafeValue(refDl, 'Ping RTT.avg'),
        });

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

export default DpNSATestDriveOverallTable;