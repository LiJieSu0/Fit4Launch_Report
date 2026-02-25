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
                            <th>RSSI</th>
                            <th>RSRP</th>
                            <th>Handovers</th>
                            <th>Call Drops</th>
                            <th>Average MOS</th>
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
                                            <td colSpan="5">No data found for TC in {city}</td>
                                        </tr>
                                    );
                                }

                                const renderDeviceRow = (deviceType, isFirstDevice) => {
                                    const dutData = cityData['DUT'] || {};
                                    const refData = cityData['REF'] || {};
                                    const deviceData = deviceType === 'DUT' ? dutData : refData;

                                    const rssi = deviceData?.rssi_average;
                                    const rsrp = deviceData?.rsrp_average;
                                    const handovers = deviceData?.minimum_handover;
                                    const retFailures = deviceData?.total_retention_failures;
                                    const mos = deviceData?.mos_average;

                                    let rssiStyle = {};
                                    let rsrpStyle = {};
                                    let handoverStyle = {};
                                    let mosStyle = {};

                                    if (deviceType === 'DUT') {
                                        rssiStyle = { backgroundColor: getKpiCellColor('WfcRssiProfile6', rssi) };
                                        rsrpStyle = { backgroundColor: getKpiCellColor('WfcRsrp', rsrp) };
                                        handoverStyle = { backgroundColor: getKpiCellColor('MinimumHandovers', handovers) };
                                        mosStyle = { backgroundColor: getKpiCellColor('WfcMOS', mos, refData?.mos_average) };
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
                                            <td style={rssiStyle}>{formatVal(rssi)}</td>
                                            <td style={rsrpStyle}>{formatVal(rsrp)}</td>
                                            <td style={handoverStyle}>{handovers !== undefined ? handovers : 'N/A'}</td>
                                            <td style={deviceType === 'DUT' ? { backgroundColor: getKpiCellColor('WfcCallDrops', retFailures) } : {}}>{retFailures !== undefined ? retFailures : 'N/A'}</td>
                                            <td style={mosStyle}>{formatVal(mos)}</td>
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
