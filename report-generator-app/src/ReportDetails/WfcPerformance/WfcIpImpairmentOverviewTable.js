import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcIpImpairmentOverviewTable = () => {
    const { projectData, availableCities } = useReportData();

    // Data Structure for the IP Impairments Overview
    const apDataConfig = [
        {
            apName: "ASUS RT-AC68U",
            tc: "TC171",
            profile: "IWLAN→NR"
        },
        {
            apName: "LinkSys Hydra Pro 6E",
            tc: "TC172",
            profile: "IWLAN→NR"
        },
        {
            apName: "Google Nest AP AC2200",
            tc: "TC173",
            profile: "IWLAN→NR"
        }
    ];

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderTableForCity = (city) => {
        return (
            <div key={`ip-impairment-overview-${city}`} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>Access Point</th>
                            <th>Device</th>
                            <th>MOS before handover</th>
                            <th>MOS during/after handover</th>
                            <th>RSSI</th>
                            <th>RSRP</th>
                            <th>Call Drops</th>
                            <th>Handover Delay impact to speech</th>
                            <th>Packet Loss (%)</th>
                            <th>Handovers occured</th>
                            <th>Attempts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apDataConfig.map((config, index) => {
                            const tcData = projectData[city]?.wfcPerformance?.['WFC']?.[config.tc];

                            if (!tcData) {
                                return (
                                    <tr key={`kpi-${config.apName}-${config.tc}`}>
                                        <td>{config.apName}</td>
                                        <td colSpan="10">No data found for TC in {city}</td>
                                    </tr>
                                );
                            }

                            const renderDeviceRow = (deviceType, isFirstDevice) => {
                                const deviceData = tcData[deviceType];
                                const refData = tcData['REF'];

                                if (!deviceData) return null;

                                const mosBefore = deviceData?.mos_before_handover_average;
                                const mosAfter = deviceData?.mos_after_handover_average;
                                const rssi = deviceData?.rssi_average;
                                const rsrp = deviceData?.rsrp_average;
                                const callDrops = deviceData?.total_retention_failures !== undefined ? deviceData.total_retention_failures : 'N/A';
                                const handoverDelay = deviceData?.handover_impact_delay;

                                let mosBeforeStyle = {};
                                let mosAfterStyle = {};
                                let callDropsStyle = {};
                                let handoverDelayStyle = {};
                                let packetLossStyle = {};
                                let rssiStyle = {};
                                let rsrpStyle = {};

                                let packetLossVal = '';
                                if (deviceType === 'DUT') {
                                    if (config.tc === 'TC171') packetLossVal = '13%';
                                    else if (config.tc === 'TC172') packetLossVal = '18%';
                                    else if (config.tc === 'TC173') packetLossVal = '20%';
                                } else if (deviceType === 'REF') {
                                    if (config.tc === 'TC171') packetLossVal = 'Call Drop';
                                }

                                if (deviceType === 'DUT') {
                                    mosBeforeStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosBefore, refData?.mos_before_handover_average) };
                                    mosAfterStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosAfter, refData?.mos_after_handover_average) };
                                    callDropsStyle = { backgroundColor: getKpiCellColor('IpImpairmentCallDrops', callDrops) };
                                    handoverDelayStyle = { backgroundColor: getKpiCellColor('HandoverDelay', handoverDelay) };
                                    packetLossStyle = { backgroundColor: getKpiCellColor('WfcPacketLoss', 1) };
                                    rssiStyle = { backgroundColor: getKpiCellColor('WfcRssiProfile6', rssi) };
                                    rsrpStyle = { backgroundColor: getKpiCellColor('WfcRsrp', rsrp) };
                                } else if (deviceType === 'REF') {
                                    if (config.tc === 'TC172' || config.tc === 'TC173') packetLossStyle = { backgroundColor: 'red' };
                                }

                                return (
                                    <tr key={`${config.apName}-${config.tc}-${deviceType}`}>
                                        {isFirstDevice && (
                                            <td rowSpan="2">
                                                <a href="#WfcImpairment" style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                                                    {config.apName}
                                                </a>
                                            </td>
                                        )}
                                        <td>{deviceType}</td>
                                        <td style={mosBeforeStyle}>{formatVal(mosBefore)}</td>
                                        <td style={mosAfterStyle}>{formatVal(mosAfter)}</td>
                                        <td style={rssiStyle}>{formatVal(rssi)}</td>
                                        <td style={rsrpStyle}>{formatVal(rsrp)}</td>
                                        <td style={callDropsStyle}>{callDrops}</td>
                                        <td style={handoverDelayStyle}>{formatVal(handoverDelay)}</td>
                                        <td style={packetLossStyle}>{packetLossVal}</td>
                                        <td>1</td>
                                        <td>{(typeof callDrops === 'number' ? callDrops : 0) + 1}</td>
                                    </tr>
                                );
                            };

                            return (
                                <React.Fragment key={`frag-${config.apName}-${config.tc}`}>
                                    {renderDeviceRow('DUT', true)}
                                    {renderDeviceRow('REF', false)}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '5px', width: '100%' }}>
                    Note: No values indicated device failed to execute testcase. No data represents call drop or device held onto call to signal call was initiated from.
                </div>
            </div>
        );
    };

    return (
        <div>
            {availableCities.filter(city => city === 'Seattle').map(city => renderTableForCity(city))}
        </div>
    );
};

export default WfcIpImpairmentOverviewTable;
