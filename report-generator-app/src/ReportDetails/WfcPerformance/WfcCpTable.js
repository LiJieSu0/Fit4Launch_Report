import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcCpTable = ({ cityData }) => {
    const devices = [
        { name: 'DUT', moKey: 'DUT MO', mtKey: 'DUT MT' },
        { name: 'REF', moKey: 'REF MO', mtKey: 'REF MT' }
    ];

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
                    // Fallback logic: if 'DUT MO' is missing, try 'DUT'
                    const moData = cityData[moKey] || cityData[name];
                    const mtData = cityData[mtKey];
                    if (!moData && !mtData) return null;

                    const refMoData = cityData[moKey.includes('DUT') ? 'REF MO' : moKey] || cityData['REF'];
                    const refMtData = cityData[mtKey.includes('DUT') ? 'REF MT' : mtKey];

                    const initFailPct = moData?.total_mo_attempts > 0 ? (moData.total_initiation_failures / moData.total_mo_attempts * 100).toFixed(1) : '0.0';
                    const retFailPct = moData?.total_mo_attempts > 0 ? (moData.total_retention_failures / moData.total_mo_attempts * 100).toFixed(1) : '0.0';

                    return (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{moData?.total_mo_attempts || 'N/A'}</td>
                            <td style={name === 'DUT' ? { backgroundColor: getKpiCellColor('CallSetupTime', moData?.mean_setup_time, refMoData?.mean_setup_time) } : {}}>
                                {formatVal(moData?.mean_setup_time)}
                            </td>
                            <td>{initFailPct}%</td>
                            <td>{retFailPct}%</td>
                            <td style={name === 'DUT' ? { backgroundColor: getKpiCellColor('WfcMOS', moData?.mos_average, refMoData?.mos_average) } : {}}>
                                {formatVal(moData?.mos_average)}
                            </td>
                            <td style={name === 'DUT' ? { backgroundColor: getKpiCellColor('WfcMOS', mtData?.mos_average, refMtData?.mos_average) } : {}}>
                                {formatVal(mtData?.mos_average)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default WfcCpTable;
