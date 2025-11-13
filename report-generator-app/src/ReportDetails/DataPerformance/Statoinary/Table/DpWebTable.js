import React from "react";
import '../../../../StyleScript/Restricted_Report_Style.css';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

function DpWebTable({ data }) {
    // 'data' prop is expected to be an array of objects, each representing a row.
    // For now, we'll use placeholder data or empty strings as requested.

    const tableData = data;

    return (
        <div className="">
            <table className="general-table-style dp-details-table">
                <thead>
                    <tr>
                        <th>Web Page Load Time (s)</th>
                        <th>Device Name</th>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan="2">{row.category}</td>
                                <td>{row.dut.device}</td>
                                <td style={row.category === "Average" ? {
                                    backgroundColor: getKpiCellColor(
                                        'WebPageLoadTime',
                                        parseFloat(row.dut.overall),
                                        parseFloat(row.ref.overall)
                                    )
                                } : {}}>
                                    {row.dut.overall}
                                </td>
                            </tr>
                            <tr>
                                <td>{row.ref.device}</td>
                                <td>{row.ref.overall}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DpWebTable;