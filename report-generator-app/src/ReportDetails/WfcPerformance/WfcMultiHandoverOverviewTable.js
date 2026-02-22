import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcMultiHandoverOverviewTable = () => {
    const { projectData, availableCities } = useReportData();

    // Data Structure for the Multi Handover Overview
    const apDataConfig = [
        {
            apName: "T-Mobile HINT Gateway",
            anchorId: "multihandover-section-t-mobile-hint-gateway",
            tcs: ["TC162", "TC163", "TC164"],
            profiles: ["Profile 1", "Profile 2", "Profile 3"]
        },
        {
            apName: "ASUS RT-AC68U",
            anchorId: "multihandover-section-asus-rt-ac68u",
            tcs: ["TC165", "TC166", "TC167"],
            profiles: ["Profile 1", "Profile 2", "Profile 3"]
        },
        {
            apName: "LinkSys Hydra Pro 6E",
            anchorId: "multihandover-section-linksys-hydra-pro-6e",
            tcs: ["TC168", "TC169", "TC170"],
            profiles: ["Profile 1", "Profile 2", "Profile 3"]
        }
    ];

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderTableForCity = (city) => {
        return (
            <div key={`multihandover-overview-${city}`} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>AP Name</th>
                            <th>Profile</th>
                            <th>Device</th>
                            <th>Attempts</th>
                            <th>Call Drops</th>
                            <th>Mean Setup Time (s)</th>
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
                                            <td colSpan="6">No data found for TC in {city}</td>
                                        </tr>
                                    );
                                }

                                const renderDeviceRow = (deviceType, isFirstDevice) => {
                                    let moData, mtData, refMoData, refMtData;

                                    if (deviceType === 'DUT') {
                                        moData = cityData['DUT MO'] || cityData['DUT'];
                                        mtData = cityData['DUT MT'] || cityData['DUT'];
                                        refMoData = cityData['REF MO'] || cityData['REF'];
                                        refMtData = cityData['REF MT'] || cityData['REF'];
                                    } else {
                                        moData = cityData['REF MO'] || cityData['REF'];
                                        mtData = cityData['REF MT'] || cityData['REF'];
                                    }

                                    const attempts = moData?.total_mo_attempts;
                                    const retFailures = moData?.total_retention_failures;

                                    let setupTimeStyle = {};
                                    let moMosStyle = {};
                                    let mtMosStyle = {};

                                    if (deviceType === 'DUT') {
                                        setupTimeStyle = { backgroundColor: getKpiCellColor('CallSetupTime', moData?.mean_setup_time, refMoData?.mean_setup_time) };
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
                                            <td>{retFailures !== undefined ? retFailures : 'N/A'}</td>
                                            <td style={setupTimeStyle}>{formatVal(moData?.mean_setup_time)}</td>
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

export default WfcMultiHandoverOverviewTable;
