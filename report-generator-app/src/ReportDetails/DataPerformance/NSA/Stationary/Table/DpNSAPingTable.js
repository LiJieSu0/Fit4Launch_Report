import React from 'react';
import '../../../../../StyleScript/Restricted_Report_Style.css';
import { getKpiCellColor } from '../../../../../Utils/KpiRules';

const DpNSAPingTable = ({ data, tableName }) => {
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
                            <th>Moderate</th>
                            <th>Poor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="5">No data available</td></tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const calculateOverall = (moderate, poor) => {
        const moderateVal = parseFloat(moderate);
        const poorVal = parseFloat(poor);
        if (isNaN(moderateVal) || isNaN(poorVal)) {
            return "N/A";
        }
        return ((moderateVal + poorVal) / 2).toFixed(2);
    };

    return (
        <div className="">
            <h3>{tableName}</h3>
            <table className="general-table-style dp-details-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Ping RTT (ms)</th>
                        <th rowSpan="2">Device Name</th>
                        <th rowSpan="2">Overall</th>
                        <th colSpan="2">Location</th>
                    </tr>
                    <tr>
                        <th>Moderate</th>
                        <th>Poor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan="2">Average</td>
                        <td>DUT</td>
                        <td style={{ backgroundColor: getKpiCellColor('PingLatency', parseFloat(data.average.DUT.Overall), parseFloat(data.average.REF.Overall)) }}>{parseFloat(data.average.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.average.DUT.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.average.DUT.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.average.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.average.REF.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.average.REF.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Standard Deviation</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.std_dev.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.DUT.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.DUT.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.std_dev.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.REF.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.std_dev.REF.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Maximum</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.max.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.max.DUT.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.max.DUT.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.max.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.max.REF.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.max.REF.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Minimum</td>
                        <td>DUT</td>
                        <td>{parseFloat(data.min.DUT.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.min.DUT.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.min.DUT.Poor).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{parseFloat(data.min.REF.Overall).toFixed(2)}</td>
                        <td>{parseFloat(data.min.REF.Moderate).toFixed(2)}</td>
                        <td>{parseFloat(data.min.REF.Poor).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpNSAPingTable;