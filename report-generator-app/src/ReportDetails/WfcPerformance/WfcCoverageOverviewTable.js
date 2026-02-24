import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const WfcCoverageOverviewTable = () => {
    const { projectData, availableCities } = useReportData();

    // Data Structure for the Walk In/Out WFC Coverage Overview
    const apDataConfig = [
        {
            apName: "ASUS RT-AC68U",
            anchorId: "coverage-section-asus-rt-ac68u",
            tcs: ["TC177", "TC174"],
            profiles: ["Profile 5 (Walk In)", "Profile 6 (Walk Out)"]
        },
        {
            apName: "LinkSys Hydra Pro 6E",
            anchorId: "coverage-section-linksys-hydra-pro-6e",
            tcs: ["TC178", "TC175"],
            profiles: ["Profile 5 (Walk In)", "Profile 6 (Walk Out)"]
        },
        {
            apName: "T-Mobile HINT Gateway",
            anchorId: "coverage-section-t-mobile-hint-gateway",
            tcs: ["TC179", "TC176"],
            profiles: ["Profile 5 (Walk In)", "Profile 6 (Walk Out)"]
        }
    ];

    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderTableForCity = (city) => {
        return (
            <div key={`coverage-overview-${city}`} style={{ marginBottom: '20px' }}>
                <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th>AP Name</th>
                            <th>Profile</th>
                            <th>Device</th>
                            <th>Attempts</th>
                            <th>MOS before handover</th>
                            <th>MOS during/after handover</th>
                            <th>RSSI (dBm)</th>
                            <th>RSRP (dBm)</th>
                            <th>Call Drops</th>
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
                                    const deviceData = cityData[deviceType];
                                    const refData = cityData['REF'];

                                    if (!deviceData) {
                                        return (
                                            <tr key={`${apConfig.apName}-${tc}-${deviceType}`}>
                                                {tcIndex === 0 && isFirstDevice && <td rowSpan={apConfig.tcs.length * 2}>{apConfig.apName}</td>}
                                                {isFirstDevice && <td rowSpan="2">{profileName}</td>}
                                                <td>{deviceType}</td>
                                                <td colSpan="6">N/A</td>
                                            </tr>
                                        );
                                    }

                                    const attempts = deviceData?.total_retention_failures !== undefined ? "N/A" : "N/A"; // Coverage doesn't normally output attempts explicitly this way, but using N/A as placeholder or omitting
                                    const mosBefore = deviceData?.mos_before_handover_average;
                                    const mosAfter = deviceData?.mos_after_handover_average;
                                    const rssi = deviceData?.rssi_average;
                                    const rsrp = deviceData?.rsrp_average;
                                    const callDrops = deviceData?.total_retention_failures;

                                    let mosBeforeStyle = {};
                                    let mosAfterStyle = {};
                                    let callDropsStyle = {};

                                    if (deviceType === 'DUT') {
                                        mosBeforeStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosBefore, refData?.mos_before_handover_average) };
                                        mosAfterStyle = { backgroundColor: getKpiCellColor('IpImpairmentMOS', mosAfter, refData?.mos_after_handover_average) };
                                        callDropsStyle = { backgroundColor: getKpiCellColor('IpImpairmentCallDrops', callDrops) };
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
                                            <td>{(typeof callDrops === 'number' ? callDrops : 0) + 1}</td>
                                            <td style={mosBeforeStyle}>{formatVal(mosBefore)}</td>
                                            <td style={mosAfterStyle}>{formatVal(mosAfter)}</td>
                                            <td>{formatVal(rssi)}</td>
                                            <td>{formatVal(rsrp)}</td>
                                            <td style={callDropsStyle}>{callDrops !== undefined ? callDrops : 'N/A'}</td>
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

export default WfcCoverageOverviewTable;
