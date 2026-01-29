import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcHandoverTable = ({ cityData }) => {
    if (!cityData) return null;

    const devices = ['DUT', 'REF'];

    return (
        <table className="performance-table general-table-style">
            <thead>
                <tr>
                    <th>Device</th>
                    <th>Handovers</th>
                    <th>Mean Setup Time (s)</th>
                </tr>
            </thead>
            <tbody>
                {devices.map((device) => {
                    const deviceData = cityData[device];
                    if (!deviceData) return null;

                    return (
                        <tr key={device}>
                            <td>{device}</td>
                            <td>{deviceData.minimum_handover || 'N/A'}</td>
                            <td style={{ backgroundColor: getKpiCellColor('CallSetupTime', deviceData.mean_setup_time, cityData[device === 'DUT' ? 'REF' : 'DUT']?.mean_setup_time) }}>
                                {deviceData.mean_setup_time?.toFixed(2) || 'N/A'}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default WfcHandoverTable;
