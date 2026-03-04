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

        // Helper to get only DL metric
        const getDlValue = (device, metricName) => {
            const dlValue = device?.[`DL ${metricName}`]?.Mean;
            return dlValue !== undefined ? dlValue.toFixed(2) : "N/A";
        };

        // Throughput (DL only)
        overallMetrics.push({
            metric: "Mean DL Throughput (Mbps)",
            kpiType: "Throughput",
            dutValue: getDlValue(dutDl, 'Throughput'),
            refValue: getDlValue(refDl, 'Throughput'),
        });

        // Jitter (DL only)
        overallMetrics.push({
            metric: "Mean DL Jitter (s)",
            kpiType: "Jitter",
            dutValue: getDlValue(dutDl, 'Jitter'),
            refValue: getDlValue(refDl, 'Jitter'),
        });

        // Error Ratio (DL only)
        overallMetrics.push({
            metric: "Packet Failure Rate (%)",
            kpiType: "ErrorRatio",
            dutValue: getDlValue(dutDl, 'Error Ratio'),
            refValue: getDlValue(refDl, 'Error Ratio'),
        });

        // Ping RTT (no DL/UL, all data uses "Mean")
        overallMetrics.push({
            metric: "Mean Round Trip Time (ms)",
            kpiType: "PingLatency",
            dutValue: getSafeValue(dutDl, 'Ping RTT.Mean'),
            refValue: getSafeValue(refDl, 'Ping RTT.Mean'),
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