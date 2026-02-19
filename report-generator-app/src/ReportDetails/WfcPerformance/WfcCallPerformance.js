import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcCallPerformance = ({ title, tc }) => {
    const { projectData, availableCities } = useReportData();
    const tcList = tc ? tc.split(' ').filter(Boolean) : [];

    // Helper to format numeric values for display
    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const profileNames = ["ETSI-B", "NSD-A", "NSD-C"];

    const renderMarketAndTc = (city) => {
        return (
            <div key={city} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Device</th>
                            <th>Attempts</th>
                            <th>Mean Setup Time (s)</th>
                            <th>MO MOS</th>
                            <th>MT MOS</th>
                            <th>Initiations Failure (%)</th>
                            <th>Retention Failure (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tcList.map((testCase, index) => {
                            const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase];
                            const profileName = profileNames[index] || `Profile ${index + 1}`;

                            if (!cityData) {
                                return (
                                    <tr key={testCase}>
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
                                <React.Fragment key={testCase}>
                                    {renderRow('DUT', cityData['DUT MO'] || cityData['DUT'], cityData['DUT MT'] || cityData['DUT'], cityData['REF MO'] || cityData['REF'], cityData['REF MT'] || cityData['REF'])}
                                    {renderRow('REF', cityData['REF MO'] || cityData['REF'], cityData['REF MT'] || cityData['REF'], null, null)}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            <PageBreak>
                <div className="market-section" style={{ marginBottom: '60px' }}>
                    <DynamicHeader level={2}>{title}</DynamicHeader>
                    {availableCities.filter(city => city === 'Seattle').map(city => renderMarketAndTc(city))}
                </div>
            </PageBreak>
        </>
    );
};

export default WfcCallPerformance;
