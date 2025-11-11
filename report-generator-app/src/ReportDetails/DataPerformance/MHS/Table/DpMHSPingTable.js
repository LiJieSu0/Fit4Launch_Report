import React from 'react';
import '../../../../StyleScript/Restricted_Report_Style.css';

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
                        <td>{data.average.DUT.Overall}</td>
                        <td>{data.average.DUT.Good}</td>
                        <td>{data.average.DUT.Moderate}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{data.average.REF.Overall}</td>
                        <td>{data.average.REF.Good}</td>
                        <td>{data.average.REF.Moderate}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Standard Deviation</td>
                        <td>DUT</td>
                        <td>{data.std_dev.DUT.Overall}</td>
                        <td>{data.std_dev.DUT.Good}</td>
                        <td>{data.std_dev.DUT.Moderate}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{data.std_dev.REF.Overall}</td>
                        <td>{data.std_dev.REF.Good}</td>
                        <td>{data.std_dev.REF.Moderate}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Maximum</td>
                        <td>DUT</td>
                        <td>{data.max.DUT.Overall}</td>
                        <td>{data.max.DUT.Good}</td>
                        <td>{data.max.DUT.Moderate}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{data.max.REF.Overall}</td>
                        <td>{data.max.REF.Good}</td>
                        <td>{data.max.REF.Moderate}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Minimum</td>
                        <td>DUT</td>
                        <td>{data.min.DUT.Overall}</td>
                        <td>{data.min.DUT.Good}</td>
                        <td>{data.min.DUT.Moderate}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{data.min.REF.Overall}</td>
                        <td>{data.min.REF.Good}</td>
                        <td>{data.min.REF.Moderate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpMHSPingTable;