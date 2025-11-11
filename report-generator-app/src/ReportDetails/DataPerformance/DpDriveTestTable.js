import React from 'react';
// Removed: import { Table } from 'react-bootstrap';

const DpDriveTestTable = ({ data }) => {
    if (!data) {
        return <div>No data available.</div>;
    }

    const dutData = data["DUT UDP DL"];
    const refData = data["REF UDP DL"];

    return (
        <div>
            <h2>Drive Test Data Performance</h2>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>DUT UDP DL</th>
                        <th>REF UDP DL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Throughput Mean</td>
                        <td>{dutData?.Throughput?.Mean?.toFixed(2)}</td>
                        <td>{refData?.Throughput?.Mean?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Throughput Standard Deviation</td>
                        <td>{dutData?.Throughput?.["Standard Deviation"]?.toFixed(2)}</td>
                        <td>{refData?.Throughput?.["Standard Deviation"]?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Throughput Minimum</td>
                        <td>{dutData?.Throughput?.Minimum?.toFixed(2)}</td>
                        <td>{refData?.Throughput?.Minimum?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Throughput Maximum</td>
                        <td>{dutData?.Throughput?.Maximum?.toFixed(2)}</td>
                        <td>{refData?.Throughput?.Maximum?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Jitter Mean</td>
                        <td>{dutData?.Jitter?.Mean?.toFixed(2)}</td>
                        <td>{refData?.Jitter?.Mean?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Error Ratio Mean</td>
                        <td>{dutData?.["Error Ratio"]?.Mean?.toFixed(2)}</td>
                        <td>{refData?.["Error Ratio"]?.Mean?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Ping RTT Min</td>
                        <td>{dutData?.["Ping RTT"]?.min?.toFixed(2)}</td>
                        <td>{refData?.["Ping RTT"]?.min?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Ping RTT Max</td>
                        <td>{dutData?.["Ping RTT"]?.max?.toFixed(2)}</td>
                        <td>{refData?.["Ping RTT"]?.max?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Ping RTT Avg</td>
                        <td>{dutData?.["Ping RTT"]?.avg?.toFixed(2)}</td>
                        <td>{refData?.["Ping RTT"]?.avg?.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Ping RTT Std Dev</td>
                        <td>{dutData?.["Ping RTT"]?.std_dev?.toFixed(2)}</td>
                        <td>{refData?.["Ping RTT"]?.std_dev?.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpDriveTestTable;