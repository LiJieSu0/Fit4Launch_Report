import React from 'react';
import '../../../../StyleScript/Restricted_Report_Style.css';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

const DpMHSPingTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="">
                <table className="general-table-style dp-details-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Ping RTT (ms)</th>
                            <th rowSpan="2">Device Name</th>
                            <th rowSpan="2">Overall</th>
                            <th colSpan="2">Location</th>
                        </tr>
                        <tr>
                            <th>Good</th>
                            <th>Moderate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="5">No data available</td></tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="">
            <table className="general-table-style dp-details-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Ping RTT (ms)</th>
                        <th rowSpan="2">Device Name</th>
                        <th rowSpan="2">Overall</th>
                        <th colSpan="2">Location</th>
                    </tr>
                    <tr>
                        <th>Good</th>
                        <th>Moderate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan="2">Average</td>
                        <td>DUT</td>
                        <td style={{ backgroundColor: getKpiCellColor('PingLatency', parseFloat(data.average.DUT.Overall), parseFloat(data.average.REF.Overall)) }}>{parseFloat(data.average.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.average.DUT.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.average.DUT.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.average.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.average.REF.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.average.REF.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Standard Deviation</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.std_dev.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.DUT.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.DUT.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.std_dev.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.REF.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.REF.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Maximum</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.max.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.max.DUT.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.max.DUT.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.max.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.max.REF.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.max.REF.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Minimum</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.min.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.min.DUT.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.min.DUT.Moderate).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.min.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.min.REF.Good).toFixed(2)}</td>
                        <td>{parseFloat(data.min.REF.Moderate).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpMHSPingTable;