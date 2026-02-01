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

        // Helper to calculate average of DL and UL metrics
        const getAverage = (device, metricName) => {
            const dlValue = device?.[`DL ${metricName}`]?.Mean;
            const ulValue = device?.[`UL ${metricName}`]?.Mean;

            if (dlValue !== undefined && ulValue !== undefined) {
                return ((dlValue + ulValue) / 2).toFixed(2);
            }
            return "N/A";
        };

        // Throughput (average of DL and UL)
        overallMetrics.push({
            metric: "Mean Throughput (Mbps)",
            kpiType: "Throughput",
            dutValue: getAverage(dutDl, 'Throughput'),
            refValue: getAverage(refDl, 'Throughput'),
        });

        // Jitter (average of DL and UL)
        overallMetrics.push({
            metric: "Mean Jitter (s)",
            kpiType: "Jitter",
            dutValue: getAverage(dutDl, 'Jitter'),
            refValue: getAverage(refDl, 'Jitter'),
        });

        // Error Ratio (average of DL and UL)
        overallMetrics.push({
            metric: "Packet Failure Rate (%)",
            kpiType: "ErrorRatio",
            dutValue: getAverage(dutDl, 'Error Ratio'),
            refValue: getAverage(refDl, 'Error Ratio'),
        });

        // Ping RTT (no DL/UL, try both "Mean" and "avg" keys)
        overallMetrics.push({
            metric: "Mean Round Trip Time (ms)",
            kpiType: "PingLatency",
            dutValue: getSafeValue(dutDl, 'Ping RTT.Mean') !== "N/A" ? getSafeValue(dutDl, 'Ping RTT.Mean') : getSafeValue(dutDl, 'Ping RTT.avg'),
            refValue: getSafeValue(refDl, 'Ping RTT.Mean') !== "N/A" ? getSafeValue(refDl, 'Ping RTT.Mean') : getSafeValue(refDl, 'Ping RTT.avg'),
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