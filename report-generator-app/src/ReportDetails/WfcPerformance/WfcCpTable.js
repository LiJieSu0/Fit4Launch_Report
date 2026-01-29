import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcCpTable = ({ cityData }) => {
    const devices = [
        { name: 'DUT', moKey: 'DUT MO', mtKey: 'DUT MT' },
        { name: 'REF', moKey: 'REF MO', mtKey: 'REF MT' }
    ];

    return (
        <table className="performance-table general-table-style">
            <thead>
                <tr>
                    <th>Device</th>
                    <th>Attempts</th>
                    <th>Mean Setup Time (s)</th>
                    <th>Initiations Failure (%)</th>
                    <th>Retention Failure (%)</th>
                    <th>MO MOS</th>
                    <th>MT MOS</th>
                </tr>
            </thead>
            <tbody>
                {devices.map(({ name, moKey, mtKey }) => {
                    const moData = cityData[moKey];
                    const mtData = cityData[mtKey];
                    if (!moData && !mtData) return null;

                    const refMoData = cityData[moKey.includes('DUT') ? 'REF MO' : moKey];
                    const refMtData = cityData[mtKey.includes('DUT') ? 'REF MT' : mtKey];

                    const initFailPct = moData?.total_mo_attempts > 0 ? (moData.total_initiation_failures / moData.total_mo_attempts * 100).toFixed(1) : '0.0';
                    const retFailPct = moData?.total_mo_attempts > 0 ? (moData.total_retention_failures / moData.total_mo_attempts * 100).toFixed(1) : '0.0';

                    return (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{moData?.total_mo_attempts || 'N/A'}</td>
                            <td style={{ backgroundColor: getKpiCellColor('CallSetupTime', moData?.mean_setup_time, refMoData?.mean_setup_time) }}>
                                {moData?.mean_setup_time?.toFixed(2) || 'N/A'}
                            </td>
                            <td>{initFailPct}%</td>
                            <td>{retFailPct}%</td>
                            <td style={{ backgroundColor: getKpiCellColor('WfcMOS', moData?.mos_average, refMoData?.mos_average) }}>
                                {moData?.mos_average?.toFixed(2) || 'N/A'}
                            </td>
                            <td style={{ backgroundColor: getKpiCellColor('WfcMOS', mtData?.mos_average, refMtData?.mos_average) }}>
                                {mtData?.mos_average?.toFixed(2) || 'N/A'}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default WfcCpTable;
