import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';
import { getKpiCellColor } from '../../Utils/KpiRules';
import WfcPerformanceChart from './WfcPerformanceChart';
import WfcMosLineChart from './WfcMosLineChart';

const WfcCallPerformance = ({ title, tc, sectionNumber = 0 }) => {
    const { projectData, availableCities } = useReportData();
    const tcList = tc ? tc.split(' ').filter(Boolean) : [];

    // Helper to format numeric values for display
    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const profileNames = ["ETSI-B", "NSD-A", "NSD-C"];

    const getChartData = (city) => {
        const chartLabels = [];
        const setupTimeDutValues = [];
        const setupTimeRefValues = [];
        const mosDutValues = [];
        const mosRefValues = [];

        tcList.forEach((testCase, index) => {
            const profileName = profileNames[index] || `Profile ${index + 1}`;
            const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase] || {};

            // MO
            const dutMo = cityData['DUT MO'] || cityData['DUT'] || {};
            const refMo = cityData['REF MO'] || cityData['REF'] || {};
            chartLabels.push(`${profileName} MO`);
            setupTimeDutValues.push(dutMo.mean_setup_time);
            setupTimeRefValues.push(refMo.mean_setup_time);
            mosDutValues.push(dutMo.mos_average);
            mosRefValues.push(refMo.mos_average);

            // MT
            const dutMt = cityData['DUT MT'] || cityData['DUT'] || {};
            const refMt = cityData['REF MT'] || cityData['REF'] || {};
            chartLabels.push(`${profileName} MT`);
            setupTimeDutValues.push(dutMt.mean_setup_time);
            setupTimeRefValues.push(refMt.mean_setup_time);
            mosDutValues.push(dutMt.mos_average);
            mosRefValues.push(refMt.mos_average);
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
                        <th>Attempts</th>
                        <th>Mean Setup Time (s)</th>
                        <th>MO MOS</th>
                        <th>MT MOS</th>
                        <th style={{ width: '8%', whiteSpace: 'normal', wordWrap: 'break-word' }}>Initiations Failure (%)</th>
                        <th style={{ width: '8%', whiteSpace: 'normal', wordWrap: 'break-word' }}>Retention Failure (%)</th>
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
                                    <td colSpan="7">No data found for Test Case: {testCase} in {city}</td>
                                </tr>
                            );
                        }

                        const renderRow = (deviceType, dataMo, dataMt, refDataMo, refDataMt) => {
                            const attempts = dataMo?.total_mo_attempts;
                            const initFailures = dataMo?.total_initiation_failures;
                            const retFailures = dataMo?.total_retention_failures;

                            const initFailurePct = (attempts > 0 && initFailures !== undefined) ? ((initFailures / attempts) * 100).toFixed(2) + '%' : 'N/A';
                            const retFailurePct = (attempts > 0 && retFailures !== undefined) ? ((retFailures / attempts) * 100).toFixed(2) + '%' : 'N/A';

                            let setupTimeStyle = {};
                            let moMosStyle = {};
                            let mtMosStyle = {};

                            if (deviceType === 'DUT') {
                                setupTimeStyle = { backgroundColor: getKpiCellColor('CallSetupTime', dataMo?.mean_setup_time, refDataMo?.mean_setup_time) };
                                moMosStyle = { backgroundColor: getKpiCellColor('WfcMOS', dataMo?.mos_average, refDataMo?.mos_average) };
                                mtMosStyle = { backgroundColor: getKpiCellColor('WfcMOS', dataMt?.mos_average, refDataMt?.mos_average) };
                            }

                            return (
                                <tr key={`${testCase}-${deviceType}`}>
                                    {deviceType === 'DUT' && <td rowSpan="2">{profileName}</td>}
                                    <td>
                                        {deviceType}
                                    </td>
                                    <td>{attempts !== undefined ? attempts : 'N/A'}</td>
                                    <td style={setupTimeStyle}>{formatVal(dataMo?.mean_setup_time)}</td>
                                    <td style={moMosStyle}>{formatVal(dataMo?.mos_average)}</td>
                                    <td style={mtMosStyle}>{formatVal(dataMt?.mos_average)}</td>
                                    <td>{initFailurePct}</td>
                                    <td>{retFailurePct}</td>
                                </tr>
                            );
                        };

                        return (
                            <React.Fragment key={`kpi-frag-${testCase}`}>
                                {renderRow('DUT', cityData['DUT MO'] || cityData['DUT'], cityData['DUT MT'] || cityData['DUT'], cityData['REF MO'] || cityData['REF'], cityData['REF MT'] || cityData['REF'])}
                                {renderRow('REF', cityData['REF MO'] || cityData['REF'], cityData['REF MT'] || cityData['REF'], null, null)}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const renderPValueTable = (city) => {
        return (
            <div className="p-value-table-container">
                <h4 style={{ textAlign: 'center', margin: '10px 0' }}>P-Value Table</h4>
                <table className="mini-performance-table general-table-style" style={{ width: '80%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>Metrics</th>
                            {tcList.map((testCase, index) => (
                                <th key={`p-header-${testCase}`}>{profileNames[index] || `Profile ${index + 1}`}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Call Initiation</td>
                            {tcList.map(testCase => {
                                const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase] || {};
                                const dutMoData = cityData['DUT MO'] || cityData['DUT'] || {};

                                const moAttempts = dutMoData.total_mo_attempts || 0;
                                const initFailures = dutMoData.total_initiation_failures || 0;
                                const moInitFailureRate = moAttempts > 0 ? initFailures / moAttempts : 0;

                                const pValue = cityData.initiation_p_value !== undefined ? cityData.initiation_p_value : 1;

                                const cellColor = getKpiCellColor('WfcCallCriteria', pValue, moInitFailureRate);

                                return (
                                    <td key={`init-${testCase}`} style={{ backgroundColor: cellColor }}>
                                        {pValue.toFixed(3)}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>Call Retention</td>
                            {tcList.map(testCase => {
                                const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase] || {};
                                const dutMoData = cityData['DUT MO'] || cityData['DUT'] || {};

                                const moAttempts = dutMoData.total_mo_attempts || 0;
                                const retFailures = dutMoData.total_retention_failures || 0;
                                const moRetFailureRate = moAttempts > 0 ? retFailures / moAttempts : 0;

                                const pValue = cityData.retention_p_value !== undefined ? cityData.retention_p_value : 1;

                                const cellColor = getKpiCellColor('WfcCallCriteria', pValue, moRetFailureRate);

                                return (
                                    <td key={`ret-${testCase}`} style={{ backgroundColor: cellColor }}>
                                        {pValue.toFixed(3)}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
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
                {sectionNumber == 1 && <DynamicHeader level={1}>Wifi Call Performance</DynamicHeader>}
                <DynamicHeader level={2} id={`section-${title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>{title}</DynamicHeader>
                {availableCities.filter(city => city === 'Seattle').map(city => (
                    <div key={city}>
                        <div style={{ marginBottom: '20px' }}>
                            {renderKpiTable(city)}
                        </div>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            {renderPValueTable(city)}
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

export default WfcCallPerformance;
