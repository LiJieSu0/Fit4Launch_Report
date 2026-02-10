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

    const safeToFixed = (val) => {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? "N/A" : parsed.toFixed(2);
    };

    const getSafeValue = (obj, ...path) => {
        let current = obj;
        for (const key of path) {
            if (current == null) return "N/A";
            current = current[key];
        }
        return current ?? "N/A";
    };

    return (
        <div className="">
            <h4>{tableName}</h4>
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
                        <td style={{ backgroundColor: getKpiCellColor('PingLatency', parseFloat(getSafeValue(data, 'average', 'DUT', 'Overall')), parseFloat(getSafeValue(data, 'average', 'REF', 'Overall'))) }}>{safeToFixed(getSafeValue(data, 'average', 'DUT', 'Overall'))}</td>
                        <td style={{ backgroundColor: getKpiCellColor('PingLatency', parseFloat(getSafeValue(data, 'average', 'DUT', 'Moderate')), parseFloat(getSafeValue(data, 'average', 'REF', 'Moderate'))) }}>{safeToFixed(getSafeValue(data, 'average', 'DUT', 'Moderate'))}</td>
                        <td style={{ backgroundColor: getKpiCellColor('PingLatency', parseFloat(getSafeValue(data, 'average', 'DUT', 'Poor')), parseFloat(getSafeValue(data, 'average', 'REF', 'Poor'))) }}>{safeToFixed(getSafeValue(data, 'average', 'DUT', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{safeToFixed(getSafeValue(data, 'average', 'REF', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'average', 'REF', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'average', 'REF', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Standard Deviation</td>
                        <td>DUT</td>
                        <td>{safeToFixed(getSafeValue(data, 'std_dev', 'DUT', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'std_dev', 'DUT', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'std_dev', 'DUT', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{safeToFixed(getSafeValue(data, 'std_dev', 'REF', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'std_dev', 'REF', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'std_dev', 'REF', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Maximum</td>
                        <td>DUT</td>
                        <td>{safeToFixed(getSafeValue(data, 'max', 'DUT', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'max', 'DUT', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'max', 'DUT', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{safeToFixed(getSafeValue(data, 'max', 'REF', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'max', 'REF', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'max', 'REF', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Minimum</td>
                        <td>DUT</td>
                        <td>{safeToFixed(getSafeValue(data, 'min', 'DUT', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'min', 'DUT', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'min', 'DUT', 'Poor'))}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{safeToFixed(getSafeValue(data, 'min', 'REF', 'Overall'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'min', 'REF', 'Moderate'))}</td>
                        <td>{safeToFixed(getSafeValue(data, 'min', 'REF', 'Poor'))}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpNSAPingTable;