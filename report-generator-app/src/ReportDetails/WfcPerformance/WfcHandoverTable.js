import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcHandoverTable = ({ cityData }) => {
    if (!cityData) return null;

    const devices = ['DUT', 'REF'];

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    return (
        <table className="performance-table general-table-style">
            <thead>
                <tr>
                    <th>Device</th>
                    <th>Handovers</th>
                    <th>Call Drop</th>
                    <th>Mean Setup Time (s)</th>
                    <th>Average MOS</th>
                </tr>
            </thead>
            <tbody>
                {devices.map((device) => {
                    const deviceData = cityData[device];
                    if (!deviceData) return null;

                    return (
                        <tr key={device}>
                            <td>{device}</td>
                            <td style={device === 'DUT' ? { backgroundColor: getKpiCellColor('MinimumHandovers', deviceData.minimum_handover) } : {}}>
                                {deviceData.minimum_handover || 'N/A'}
                            </td>
                            <td style={device === 'DUT' ? { backgroundColor: 'var(--performance-pass)' } : {}}>
                                {deviceData.total_retention_failures || 0}
                            </td>
                            <td style={device === 'DUT' ? { backgroundColor: getKpiCellColor('CallSetupTime', deviceData.mean_setup_time, cityData['REF']?.mean_setup_time) } : {}}>
                                {formatVal(deviceData.mean_setup_time)}
                            </td>
                            <td style={device === 'DUT' ? { backgroundColor: getKpiCellColor('WfcMOS', deviceData.mos_average, cityData['REF']?.mos_average) } : {}}>
                                {formatVal(deviceData.mos_average)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default WfcHandoverTable;
