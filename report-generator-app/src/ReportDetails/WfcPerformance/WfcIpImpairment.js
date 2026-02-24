import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import PageBreak from '../../CommonPage/PageBreak';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';
import WfcPerformanceChart from './WfcPerformanceChart';

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

    const getChartData = (city) => {
        const chartLabels = [];
        const mosBeforeDut = [];
        const mosBeforeRef = [];
        const mosAfterDut = [];
        const mosAfterRef = [];
        const rssiDut = [];
        const rssiRef = [];
        const rsrpDut = [];
        const rsrpRef = [];

        targetTcs.forEach(tc => {
            const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[tc] || {};
            const dutData = cityData['DUT'] || {};
            const refData = cityData['REF'] || {};

            chartLabels.push(tcLabels[tc].replace(/TC\d+ /, ''));

            mosBeforeDut.push(dutData.mos_before_handover_average);
            mosBeforeRef.push(refData.mos_before_handover_average);

            mosAfterDut.push(dutData.mos_after_handover_average);
            mosAfterRef.push(refData.mos_after_handover_average);

            rssiDut.push(dutData.rssi_average);
            rssiRef.push(refData.rssi_average);

            rsrpDut.push(dutData.rsrp_average);
            rsrpRef.push(refData.rsrp_average);
        });

        return { chartLabels, mosBeforeDut, mosBeforeRef, mosAfterDut, mosAfterRef, rssiDut, rssiRef, rsrpDut, rsrpRef };
    };

    const renderMosCharts = (data) => {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '70%',
                marginTop: '20px', marginBottom: '40px', marginLeft: '-40px'
            }}>
                <div style={{ width: '60%', minWidth: 0 }}>
                    <WfcPerformanceChart
                        labels={data.chartLabels}
                        dutValues={data.mosBeforeDut}
                        refValues={data.mosBeforeRef}
                        title="MOS before handover"
                        yAxisTitle="MOS Score"
                        style={{ height: '300px' }}
                    />
                </div>
                <div style={{ width: '60%', minWidth: 0 }}>
                    <WfcPerformanceChart
                        labels={data.chartLabels}
                        dutValues={data.mosAfterDut}
                        refValues={data.mosAfterRef}
                        title="MOS during/after handover"
                        yAxisTitle="MOS Score"
                        style={{ height: '300px' }}
                    />
                </div>
            </div>
        );
    };

    const renderRssiRsrpCharts = (data) => {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '70%',
                marginTop: '40px', marginBottom: '40px', marginLeft: '-40px'
            }}>
                <div style={{ width: '60%', minWidth: 0 }}>
                    <WfcPerformanceChart
                        labels={data.chartLabels}
                        dutValues={data.rssiDut}
                        refValues={data.rssiRef}
                        title="RSSI"
                        yAxisTitle="dBm"
                        style={{ height: '300px' }}
                    />
                </div>
                <div style={{ width: '60%', minWidth: 0 }}>
                    <WfcPerformanceChart
                        labels={data.chartLabels}
                        dutValues={data.rsrpDut}
                        refValues={data.rsrpRef}
                        title="RSRP"
                        yAxisTitle="dBm"
                        style={{ height: '300px' }}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <PageBreak>
                <DynamicHeader level={1}>IP Impairments</DynamicHeader>
                {availableCities.filter(city => city === 'Seattle').map(city => {
                    const data = getChartData(city);
                    return (
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
                                        <th>Packet Loss (%)</th>
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
                                                    <td colSpan="10">No data found for Test Case: {tc} in {city}</td>
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
                                            let handoverDelayStyle = {};

                                            if (deviceType === 'DUT') {
                                                mosBeforeStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosBefore, referenceData?.mos_before_handover_average) };
                                                mosAfterStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosAfter, referenceData?.mos_after_handover_average) };
                                                callDropsStyle = { backgroundColor: getKpiCellColor('IpImpairmentCallDrops', callDrops) };
                                                handoverDelayStyle = { backgroundColor: getKpiCellColor('HandoverDelay', deviceData.handover_impact_delay) };
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
                                                    <td style={handoverDelayStyle}>{formatVal(deviceData.handover_impact_delay)}</td>
                                                    <td>1 %</td>
                                                    <td>1</td>
                                                    <td>{(typeof callDrops === 'number' ? callDrops : 0) + 1}</td>
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
                            {renderMosCharts(data)}
                        </div>
                    );
                })}
            </PageBreak>
            <PageBreak>
                {availableCities.filter(city => city === 'Seattle').map(city => {
                    const data = getChartData(city);
                    return (
                        <div key={`rssi-rsrp-charts-${city}`} style={{ paddingTop: '5px' }}>
                            {renderRssiRsrpCharts(data)}
                        </div>
                    );
                })}
            </PageBreak>
        </>
    );
};

export default WfcIpImpairment;
