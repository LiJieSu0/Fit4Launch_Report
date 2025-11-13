import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

const DpWebOverallTable = ({ data }) => {
    if (!data) {
        return <div>No data available for Web Browser Overall Table.</div>;
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
                        <th rowSpan={2}>Web Page Load Time (s)</th>
                        <th rowSpan={2}>Device Name</th>
                        <th>Seattle (5G NR)</th>
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
                                        'WebPageLoadTime',
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

export default DpWebOverallTable;