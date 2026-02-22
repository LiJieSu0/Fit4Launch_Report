import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcCallOverviewTable = () => {
    const { projectData, availableCities } = useReportData();

    // Data Structure for the Call Overview
    const apDataConfig = [
        {
            apName: "LinkSys Hydra Pro 6E",
            anchorId: "section-linksys-hydra-pro-6e",
            tcs: ["TC153", "TC154", "TC155"],
            profiles: ["ETSI-B", "NSD-A", "NSD-C"]
        },
        {
            apName: "Google Nest AP AC2200",
            anchorId: "section-google-nest-ap-ac2200",
            tcs: ["TC159", "TC160", "TC161"],
            profiles: ["ETSI-B", "NSD-A", "NSD-C"]
        },
        {
            apName: "ASUS RT-AC68U",
            anchorId: "section-asus-rt-ac68u",
            tcs: ["TC156", "TC157", "TC158"],
            profiles: ["ETSI-B", "NSD-A", "NSD-C"]
        }
    ];

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderTableForCity = (city) => {
        return (
            <div key={`call-overview-${city}`} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>AP Name</th>
                            <th>Profile</th>
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
                        {apDataConfig.map((apConfig, apIndex) => {
                            return apConfig.tcs.map((tc, tcIndex) => {
                                const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[tc];
                                const profileName = apConfig.profiles[tcIndex];

                                if (!cityData) {
                                    return (
                                        <tr key={`kpi-${apConfig.apName}-${tc}`}>
                                            {tcIndex === 0 && <td rowSpan={apConfig.tcs.length * 2}>{apConfig.apName}</td>}
                                            <td rowSpan="2">{profileName}</td>
                                            <td colSpan="7">No data found for TC in {city}</td>
                                        </tr>
                                    );
                                }

                                const renderDeviceRow = (deviceType, isFirstDevice) => {
                                    let moData, mtData, refMoData, refMtData, cityDataForKpi;

                                    if (deviceType === 'DUT') {
                                        moData = cityData['DUT MO'] || cityData['DUT'];
                                        mtData = cityData['DUT MT'] || cityData['DUT'];
                                        refMoData = cityData['REF MO'] || cityData['REF'];
                                        refMtData = cityData['REF MT'] || cityData['REF'];
                                        cityDataForKpi = cityData;
                                    } else {
                                        moData = cityData['REF MO'] || cityData['REF'];
                                        mtData = cityData['REF MT'] || cityData['REF'];
                                    }

                                    const attempts = moData?.total_mo_attempts;
                                    const initFailures = moData?.total_initiation_failures;
                                    const retFailures = moData?.total_retention_failures;

                                    const initFailureRate = (attempts > 0 && initFailures !== undefined) ? (initFailures / attempts) : 0;
                                    const retFailureRate = (attempts > 0 && retFailures !== undefined) ? (retFailures / attempts) : 0;

                                    const initFailurePct = (attempts > 0 && initFailures !== undefined) ? (initFailureRate * 100).toFixed(2) + '%' : '0.0%';
                                    const retFailurePct = (attempts > 0 && retFailures !== undefined) ? (retFailureRate * 100).toFixed(2) + '%' : '0.0%';

                                    let setupTimeStyle = {};
                                    let initFailureStyle = {};
                                    let retFailureStyle = {};
                                    let moMosStyle = {};
                                    let mtMosStyle = {};

                                    if (deviceType === 'DUT') {
                                        setupTimeStyle = { backgroundColor: getKpiCellColor('CallSetupTime', moData?.mean_setup_time, refMoData?.mean_setup_time) };

                                        const initiationPValue = cityDataForKpi?.initiation_p_value !== undefined ? cityDataForKpi.initiation_p_value : 1;
                                        initFailureStyle = { backgroundColor: getKpiCellColor('WfcCallCriteria', initiationPValue, initFailureRate) };

                                        const retentionPValue = cityDataForKpi?.retention_p_value !== undefined ? cityDataForKpi.retention_p_value : 1;
                                        retFailureStyle = { backgroundColor: getKpiCellColor('WfcCallCriteria', retentionPValue, retFailureRate) };

                                        moMosStyle = { backgroundColor: getKpiCellColor('WfcMOS', moData?.mos_average, refMoData?.mos_average) };
                                        mtMosStyle = { backgroundColor: getKpiCellColor('WfcMOS', mtData?.mos_average, refMtData?.mos_average) };
                                    }

                                    return (
                                        <tr key={`${apConfig.apName}-${tc}-${deviceType}`}>
                                            {tcIndex === 0 && isFirstDevice && (
                                                <td rowSpan={apConfig.tcs.length * 2}>
                                                    <a href={`#${apConfig.anchorId}`} style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                                                        {apConfig.apName}
                                                    </a>
                                                </td>
                                            )}
                                            {isFirstDevice && <td rowSpan="2">{profileName}</td>}
                                            <td>{deviceType}</td>
                                            <td>{attempts !== undefined ? attempts : 'N/A'}</td>
                                            <td style={setupTimeStyle}>{formatVal(moData?.mean_setup_time)}</td>
                                            <td style={initFailureStyle}>{initFailurePct}</td>
                                            <td style={retFailureStyle}>{retFailurePct}</td>
                                            <td style={moMosStyle}>{formatVal(moData?.mos_average)}</td>
                                            <td style={mtMosStyle}>{formatVal(mtData?.mos_average)}</td>
                                        </tr>
                                    );
                                };

                                return (
                                    <React.Fragment key={`frag-${apConfig.apName}-${tc}`}>
                                        {renderDeviceRow('DUT', true)}
                                        {renderDeviceRow('REF', false)}
                                    </React.Fragment>
                                );
                            });
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {availableCities.filter(city => city === 'Seattle').map(city => renderTableForCity(city))}
        </div>
    );
};

export default WfcCallOverviewTable;
