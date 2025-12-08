import React from 'react';
import { getKpiCellColor } from '../../../Utils/KpiRules';
// Removed: import { Table } from 'react-bootstrap';

const DpDriveTestTable = ({ data, tableName }) => {
    if (!data) {
        return <div>No data available for {tableName}</div>;
    }

    const processData = (rawData) => {
        const processed = [];
        const metrics = [
            {
                name: "Throughput (Mbps)",
                subMetrics: [
                    { key: "Mean", label: "Mean" },
                    { key: "Standard Deviation", label: "Standard Deviation" },
                    { key: "Minimum", label: "Minimum" },
                    { key: "Maximum", label: "Maximum" },
                    { key: "Number of Intervals", label: "Number of Intervals" },
                ],
                path: "Throughput",
                kpiType: "Throughput",
            },
            {
                name: "Jitter (s)",
                subMetrics: [
                    { key: "Mean", label: "Mean" },
                ],
                path: "Jitter",
                kpiType: "Jitter",
            },
            {
                name: "Error Ratio (%)",
                subMetrics: [
                    { key: "Mean", label: "Mean" },
                ],
                path: "Error Ratio",
                kpiType: "ErrorRatio",
            },
            {
                name: "Ping RTT (ms)",
                subMetrics: [
                    { key: "min", label: "Min" },
                    { key: "max", label: "Max" },
                    { key: "avg", label: "Avg" },
                    { key: "std_dev", label: "Std Dev" },
                ],
                path: "Ping RTT",
                kpiType: "PingLatency",
            },
        ];

        const getNestedValue = (obj, path) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        };

        metrics.forEach(metric => {
            metric.subMetrics.forEach(subMetric => {
                let dutValue = getNestedValue(rawData["DUT UDP DL"], `${metric.path}.${subMetric.key}`);
                let refValue = getNestedValue(rawData["REF UDP DL"], `${metric.path}.${subMetric.key}`);

                if (subMetric.label !== "DL Number of Intervals") {
                    if (typeof dutValue === 'number') {
                        dutValue = dutValue.toFixed(2);
                    }
                    if (typeof refValue === 'number') {
                        refValue = refValue.toFixed(2);
                    }
                }

                processed.push({
                    metric: `${metric.name.includes("Ping RTT") ? "" : "DL "}${metric.name.replace(" (Mbps)", "").replace(" (s)", "").replace(" (%)", "")} ${subMetric.label}`,
                    kpiType: metric.kpiType,
                    dutValue: dutValue,
                    refValue: refValue,
                });
            });
        });

        return processed;
    };

    const tableData = processData(data);

    let lastMetric = null;

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
                    {tableData.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>{row.metric}</td>
                                <td style={{ backgroundColor: (row.metric.includes("Mean") || row.metric.includes("Avg")) ? getKpiCellColor(row.kpiType, parseFloat(row.dutValue), parseFloat(row.refValue)) : 'inherit' }}>{row.dutValue}</td>
                                <td>{row.refValue}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DpDriveTestTable;