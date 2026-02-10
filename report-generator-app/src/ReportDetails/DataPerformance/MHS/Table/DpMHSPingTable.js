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

    const locations = ['Good', 'Moderate', 'Poor'];
    const availableLocations = locations.filter(loc => {
        // Check if any metric has data for this location
        return ['average', 'std_dev', 'max', 'min'].some(metric =>
            (data[metric].DUT[loc] && parseFloat(data[metric].DUT[loc]) > 0) ||
            (data[metric].REF[loc] && parseFloat(data[metric].REF[loc]) > 0)
        );
    });

    if (availableLocations.length === 0) {
        return (
            <div className="">
                <table className="general-table-style dp-details-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Ping RTT (ms)</th>
                            <th rowSpan="2">Device Name</th>
                            <th rowSpan="2">Overall</th>
                            <th colSpan="1">Location</th>
                        </tr>
                        <tr>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="4">No data available</td></tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const metrics = [
        { label: 'Average', key: 'average' },
        { label: 'Standard Deviation', key: 'std_dev' },
        { label: 'Maximum', key: 'max' },
        { label: 'Minimum', key: 'min' }
    ];

    return (
        <div className="">
            <table className="general-table-style dp-details-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Ping RTT (ms)</th>
                        <th rowSpan="2">Device Name</th>
                        <th rowSpan="2">Overall</th>
                        <th colSpan={availableLocations.length}>Location</th>
                    </tr>
                    <tr>
                        {availableLocations.map(loc => <th key={loc}>{loc}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((metric, index) => (
                        <React.Fragment key={metric.key}>
                            <tr>
                                <td rowSpan="2">{metric.label}</td>
                                <td>DUT</td>
                                <td style={metric.key === 'average' ? { backgroundColor: getKpiCellColor('PingLatency', parseFloat(data.average.DUT.Overall), parseFloat(data.average.REF.Overall)) } : {}}>
                                    {parseFloat(data[metric.key].DUT.Overall).toFixed(2)}
                                </td>
                                {availableLocations.map(loc => {
                                    const siteColor = metric.key === 'average'
                                        ? getKpiCellColor('PingLatency', parseFloat(data.average.DUT[loc] || 0), parseFloat(data.average.REF[loc] || 0))
                                        : undefined;
                                    return (
                                        <td key={`dut-${metric.key}-${loc}`} style={{ backgroundColor: siteColor }}>
                                            {parseFloat(data[metric.key].DUT[loc] || 0).toFixed(2)}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td>REF</td>
                                <td>{parseFloat(data[metric.key].REF.Overall).toFixed(2)}</td>
                                {availableLocations.map(loc => (
                                    <td key={`ref-${metric.key}-${loc}`}>
                                        {parseFloat(data[metric.key].REF[loc] || 0).toFixed(2)}
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DpMHSPingTable;
