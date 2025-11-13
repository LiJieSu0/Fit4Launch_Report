import React from 'react';
import { getKpiCellColor } from '../../../../../Utils/KpiRules';

const DpNSAPingOverallTable = ({ data }) => {
    if (!data) {
        return <div>No data available for Ping Overall Table.</div>;
    }

    const tableRows = [
        { metric: "Average", key: "average" },
        { metric: "Standard Deviation", key: "std_dev" },
        { metric: "Maximum", key: "max" },
        { metric: "Minimum", key: "min" },
    ];

    return (
        <div>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th rowSpan={2}>Ping RTT (ms)</th>
                        <th rowSpan={2}>Device Name</th>
                        <th>Seattle (5G NSA)</th>
                    </tr>
                    <tr>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan="2">{row.metric}</td>
                                <td>DUT</td>
                                <td style={row.key === "average" ? {
                                    backgroundColor: getKpiCellColor(
                                        'PingLatency',
                                        parseFloat(data[row.key].DUT.Overall),
                                        parseFloat(data[row.key].REF.Overall)
                                    )
                                } : {}}>
                                    {data[row.key].DUT.Overall}
                                </td>
                            </tr>
                            <tr>
                                <td>REF</td>
                                <td>{data[row.key].REF.Overall}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DpNSAPingOverallTable;