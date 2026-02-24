import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';
import { getKpiCellColor } from '../../Utils/KpiRules';
import WfcPerformanceChart from './WfcPerformanceChart';
import WfcMosLineChart from './WfcMosLineChart';

const WfcMultiHandover = ({ title, tc }) => {
    const { projectData, availableCities } = useReportData();
    const tcList = tc ? tc.split(' ').filter(Boolean) : [];

    // Helper to format numeric values for display
    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const profileNames = ["Profile 1", "Profile 2", "Profile 3"];

    const getChartData = (city) => {
        const chartLabels = [];
        const setupTimeDutValues = [];
        const setupTimeRefValues = [];
        const mosDutValues = [];
        const mosRefValues = [];

        tcList.forEach((testCase, index) => {
            const profileName = profileNames[index] || `Profile ${index + 1}`;
            const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase] || {};

            const dutData = cityData['DUT'] || {};
            const refData = cityData['REF'] || {};

            chartLabels.push(profileName);
            setupTimeDutValues.push(dutData.mean_setup_time);
            setupTimeRefValues.push(refData.mean_setup_time);
            mosDutValues.push(dutData.mos_average);
            mosRefValues.push(refData.mos_average);
        });

        return { chartLabels, setupTimeDutValues, setupTimeRefValues, mosDutValues, mosRefValues };
    };

    const renderKpiTable = (city) => {
        return (
            <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th style={{ width: '15%', whiteSpace: 'nowrap' }}>Profile</th>
                        <th>Device</th>
                        <th>RSSI</th>
                        <th>Handovers</th>
                        <th>Call Drop</th>
                        <th>Mean Setup Time (s)</th>
                        <th>Average MOS</th>
                    </tr>
                </thead>
                <tbody>
                    {tcList.map((testCase, index) => {
                        const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase];
                        const profileName = profileNames[index] || `Profile ${index + 1}`;

                        if (!cityData) {
                            return (
                                <tr key={`kpi-${testCase}`}>
                                    <td>{profileName}</td>
                                    <td colSpan="5">No data found for Test Case: {testCase} in {city}</td>
                                </tr>
                            );
                        }

                        const renderRow = (deviceType, deviceData, refData) => {
                            const rssi = deviceData?.rssi_average;
                            const handovers = deviceData?.minimum_handover;
                            const callDrop = deviceData?.total_retention_failures;
                            const setupTime = deviceData?.mean_setup_time;
                            const mos = deviceData?.mos_average;

                            let rssiStyle = {};
                            let handoverStyle = {};
                            let setupTimeStyle = {};
                            let mosStyle = {};

                            if (deviceType === 'DUT') {
                                rssiStyle = { backgroundColor: getKpiCellColor('WfcRssiProfile6', rssi) };
                                handoverStyle = { backgroundColor: getKpiCellColor('MinimumHandovers', handovers) };
                                setupTimeStyle = { backgroundColor: getKpiCellColor('CallSetupTime', setupTime, refData?.mean_setup_time) };
                                mosStyle = { backgroundColor: getKpiCellColor('WfcMOS', mos, refData?.mos_average) };
                            }

                            return (
                                <tr key={`${testCase}-${deviceType}`}>
                                    {deviceType === 'DUT' && <td rowSpan="2">{profileName}</td>}
                                    <td>
                                        {deviceType}
                                    </td>
                                    <td style={rssiStyle}>{formatVal(rssi)}</td>
                                    <td style={handoverStyle}>{handovers !== undefined ? handovers : 'N/A'}</td>
                                    <td style={deviceType === 'DUT' ? { backgroundColor: getKpiCellColor('WfcCallDrops', callDrop) } : {}}>{callDrop !== undefined ? callDrop : 'N/A'}</td>
                                    <td style={setupTimeStyle}>{formatVal(setupTime)}</td>
                                    <td style={mosStyle}>{formatVal(mos)}</td>
                                </tr>
                            );
                        };

                        const dutData = cityData['DUT'] || {};
                        const refData = cityData['REF'] || {};

                        return (
                            <React.Fragment key={`kpi-frag-${testCase}`}>
                                {renderRow('DUT', dutData, refData)}
                                {renderRow('REF', refData, null)}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const renderBarCharts = (city) => {
        const { chartLabels, setupTimeDutValues, setupTimeRefValues, mosDutValues, mosRefValues } = getChartData(city);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '50%' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <WfcPerformanceChart
                        labels={chartLabels}
                        dutValues={setupTimeDutValues}
                        refValues={setupTimeRefValues}
                        title="Mean Setup Time (s)"
                        yAxisTitle="Setup Time (s)"
                        style={{ height: '250px' }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <WfcPerformanceChart
                        labels={chartLabels}
                        dutValues={mosDutValues}
                        refValues={mosRefValues}
                        title="Average MOS"
                        yAxisTitle="MOS Score"
                        style={{ height: '250px' }}
                    />
                </div>
            </div>
        );
    };

    const renderLineCharts = (city) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', width: '80%', marginLeft: '-150px' }}>
                {tcList.map((testCase, index) => (
                    <div key={`mos-dist-${index}`} style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <WfcMosLineChart tc={testCase} city={city} hideTitle={true} chartWidth="70%" />
                        <h5 style={{ marginTop: '0px' }}>{profileNames[index] || `Profile ${index + 1}`}</h5>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <PageBreak>
                <DynamicHeader level={2} id={`multihandover-section-${title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>{title}</DynamicHeader>
                {availableCities.filter(city => city === 'Seattle').map(city => (
                    <div key={city}>
                        <div style={{ marginBottom: '20px' }}>
                            {renderKpiTable(city)}
                        </div>
                        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                            {renderBarCharts(city)}
                        </div>
                    </div>
                ))}
            </PageBreak>
            <PageBreak>
                {availableCities.filter(city => city === 'Seattle').map(city => (
                    <div key={`line-charts-${city}`} style={{ paddingTop: '5px' }}>
                        {renderLineCharts(city)}
                    </div>
                ))}
            </PageBreak>
        </>
    );
};

export default WfcMultiHandover;
