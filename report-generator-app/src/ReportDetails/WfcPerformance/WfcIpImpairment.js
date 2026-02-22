import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import PageBreak from '../../CommonPage/PageBreak';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';
const WfcIpImpairment = () => {
    const { projectData, availableCities } = useReportData();

    const tcLabels = {
        'TC171': 'TC171 ASUS RT-AC68U',
        'TC172': 'TC172 LinkSys Hydra Pro 6E',
        'TC173': 'TC173 Google Nest AP AC2200'
    };

    const targetTcs = ['TC171', 'TC172', 'TC173'];

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    return (
        <>
            <PageBreak>
                <DynamicHeader level={1}>IP Impairments</DynamicHeader>
                {availableCities.filter(city => city === 'Seattle').map(city => (
                    <div key={city}>
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
                                    <th>Handovers occured</th>
                                    <th>Attempts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targetTcs.map(tc => {
                                    const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[tc];
                                    if (!cityData) {
                                        return (
                                            <tr key={`kpi-${tc}`}>
                                                <td>{tcLabels[tc]}</td>
                                                <td colSpan="9">No data found for Test Case: {tc} in {city}</td>
                                            </tr>
                                        );
                                    }

                                    const dutData = cityData['DUT'];
                                    const refData = cityData['REF'];

                                    const renderRow = (deviceType, deviceData, referenceData) => {
                                        if (!deviceData) return null;

                                        const mosBefore = deviceData.mos_before_handover_average;
                                        const mosAfter = deviceData.mos_after_handover_average;
                                        const rssi = deviceData.rssi_average;
                                        const rsrp = deviceData.rsrp_average;
                                        const callDrops = deviceData.total_retention_failures !== undefined ? deviceData.total_retention_failures : 'N/A';

                                        let mosBeforeStyle = {};
                                        let mosAfterStyle = {};
                                        let callDropsStyle = {};

                                        if (deviceType === 'DUT') {
                                            mosBeforeStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosBefore, referenceData?.mos_before_handover_average) };
                                            mosAfterStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosAfter, referenceData?.mos_after_handover_average) };
                                            callDropsStyle = { backgroundColor: getKpiCellColor('IpImpairmentCallDrops', callDrops) };
                                        }

                                        return (
                                            <tr key={`${tc}-${deviceType}`}>
                                                {deviceType === 'DUT' && <td rowSpan="2">{tcLabels[tc].replace(/TC\d+ /, '')}</td>}
                                                <td>{deviceType}</td>
                                                <td style={mosBeforeStyle}>{formatVal(mosBefore)}</td>
                                                <td style={mosAfterStyle}>{formatVal(mosAfter)}</td>
                                                <td>{formatVal(rssi)}</td>
                                                <td>{formatVal(rsrp)}</td>
                                                <td style={callDropsStyle}>{callDrops}</td>
                                                <td>0</td>
                                                <td>1</td>
                                                <td>2</td>
                                            </tr>
                                        );
                                    };

                                    return (
                                        <React.Fragment key={`kpi-frag-${tc}`}>
                                            {renderRow('DUT', dutData, refData)}
                                            {renderRow('REF', refData, null)}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ))}
            </PageBreak>
        </>
    );
};

export default WfcIpImpairment;
