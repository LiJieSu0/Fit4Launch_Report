import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import PageBreak from '../../CommonPage/PageBreak';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';
import WfcPerformanceChart from './WfcPerformanceChart';

const WfcCoverage = ({ title, tc, section = 0 }) => {
    const { projectData, availableCities } = useReportData();
    const tcList = tc ? tc.split(' ').filter(Boolean) : [];

    const profileNames = ["Profile 5", "Profile 6"];

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

        tcList.forEach((testCase, index) => {
            const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase] || {};
            const dutData = cityData['DUT'] || {};
            const refData = cityData['REF'] || {};

            chartLabels.push(profileNames[index] || `Profile ${index + 5}`);

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
                {section == 1 && <h2>Walk in/out of WFC Coverage</h2>}
                <DynamicHeader level={2} id={`coverage-section-${title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>{title}</DynamicHeader>
                {availableCities.filter(city => city === 'Seattle').map(city => {
                    const data = getChartData(city);
                    return (
                        <div key={city}>
                            <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                                <thead>
                                    <tr>
                                        <th>Profile</th>
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
                                    {tcList.map((tc, index) => {
                                        const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[tc];
                                        const profileName = profileNames[index] || `Profile ${index + 5}`;

                                        if (!cityData) {
                                            return (
                                                <tr key={`kpi-${tc}`}>
                                                    <td>{profileName}</td>
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
                                                    {deviceType === 'DUT' && <td rowSpan="2">{profileName}</td>}
                                                    <td>{deviceType}</td>
                                                    <td style={mosBeforeStyle}>{formatVal(mosBefore)}</td>
                                                    <td style={mosAfterStyle}>{formatVal(mosAfter)}</td>
                                                    <td>{formatVal(rssi)}</td>
                                                    <td>{formatVal(rsrp)}</td>
                                                    <td style={callDropsStyle}>{callDrops}</td>
                                                    <td>{formatVal(deviceData.handover_impact_delay)}</td>
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

export default WfcCoverage;
