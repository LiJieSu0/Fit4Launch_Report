import React from 'react';
import '../../../../../StyleScript/Restricted_Report_Style.css';
import { getKpiCellColor } from '../../../../../Utils/KpiRules';

const DpNSAPingOverallTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="">
                <table className="general-table-style dp-details-table">
                    <thead>
                        <tr>
                            <th>Ping RTT (ms)</th>
                            <th>Device Name</th>
                            <th>Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="3">No data available</td></tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const kpiTargetCells = [
        {
            rowIndex: 0,
            colIndex: 2,
            dutValue: parseFloat(data.average.DUT.Overall),
            refValue: parseFloat(data.average.REF.Overall),
        },
    ];

    return (
        <div className="">
            <h3>Overall Ping RTT</h3>
            <table className="general-table-style dp-details-table">
                <thead>
                    <tr>
                        <th>Ping RTT (ms)</th>
                        <th>Device Name</th>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan="2">Average</td>
                        <td>DUT</td>
                        <td className={getKpiCellColor("PingLatency", kpiTargetCells[0].dutValue, kpiTargetCells[0].refValue)}>{parseFloat(data.average.DUT.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.average.REF.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Standard Deviation</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.std_dev.DUT.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.std_dev.REF.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Maximum</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.max.DUT.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.max.REF.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Minimum</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.min.DUT.Overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.min.REF.Overall).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpNSAPingOverallTable;