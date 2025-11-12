import React from 'react';
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
                    { key: "Mean", label: "DL Mean" },
                    { key: "Standard Deviation", label: "DL Standard Deviation" },
                    { key: "Minimum", label: "DL Minimum" },
                    { key: "Maximum", label: "DL Maximum" },
                    { key: "Number of Intervals", label: "DL Number of Intervals" },
                ],
                path: "Throughput",
            },
            {
                name: "Jitter (s)",
                subMetrics: [
                    { key: "Mean", label: "DL Mean" },
                ],
                path: "Jitter",
            },
            {
                name: "Error Ratio (%)",
                subMetrics: [
                    { key: "Mean", label: "DL Mean" },
                ],
                path: "Error Ratio",
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
                    metric: metric.name,
                    subMetric: subMetric.label,
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
                                <td>{row.dutValue}</td>
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