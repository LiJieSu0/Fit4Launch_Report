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
            metric: "Throughput (Mbps)",
            subMetric: "DL Mean",
            kpiType: "Throughput",
            dutValue: dutDl.Throughput.DL.Mean.toFixed(2),
            refValue: refDl.Throughput.DL.Mean.toFixed(2),
        });

        // Throughput UL
        overallMetrics.push({
            metric: "Throughput (Mbps)",
            subMetric: "UL Mean",
            kpiType: "Throughput",
            dutValue: dutDl.Throughput.UL.Mean.toFixed(2),
            refValue: refDl.Throughput.UL.Mean.toFixed(2),
        });

        // Jitter DL
        overallMetrics.push({
            metric: "Jitter (ms)",
            subMetric: "DL Mean",
            kpiType: "Jitter",
            dutValue: dutDl.Jitter["DL Mean"].toFixed(2),
            refValue: refDl.Jitter["DL Mean"].toFixed(2),
        });

        // Jitter UL
        overallMetrics.push({
            metric: "Jitter (ms)",
            subMetric: "UL Mean",
            kpiType: "Jitter",
            dutValue: dutDl.Jitter["UL Mean"].toFixed(2),
            refValue: refDl.Jitter["UL Mean"].toFixed(2),
        });

        // Error Ratio DL
        overallMetrics.push({
            metric: "Error Ratio (%)",
            subMetric: "DL Mean",
            kpiType: "ErrorRatio",
            dutValue: dutDl['Error Ratio']["DL Mean"].toFixed(2),
            refValue: refDl['Error Ratio']["DL Mean"].toFixed(2),
        });

        // Error Ratio UL
        overallMetrics.push({
            metric: "Error Ratio (%)",
            subMetric: "UL Mean",
            kpiType: "ErrorRatio",
            dutValue: dutDl['Error Ratio']["UL Mean"].toFixed(2),
            refValue: refDl['Error Ratio']["UL Mean"].toFixed(2),
        });

        // Ping RTT
        overallMetrics.push({
            metric: "Ping RTT (ms)",
            subMetric: "Avg",
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
            <h3>{tableName}</h3>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Sub-Metric</th>
                        <th>DUT Value</th>
                        <th>REF Value</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => {
                        const showMetric = row.metric !== lastMetric;
                        if (showMetric) {
                            lastMetric = row.metric;
                        }
                        const metricRowSpan = tableData.filter(item => item.metric === row.metric).length;

                        return (
                            <tr key={index}>
                                {showMetric && (
                                    <td rowSpan={metricRowSpan}>{row.metric}</td>
                                )}
                                <td>{row.subMetric}</td>
                                <td style={{ backgroundColor: getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) }}>{row.dutValue}</td>
                                <td>{row.refValue}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DpMHSTestDriveOverallTable;