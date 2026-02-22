import React, { useContext, useEffect } from 'react';
import CoverageTestTable from './CoverageTestTable';
import CoverageMap from './CoverageMap';
import { ReportContext } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import SecondaryKpiTable from './SecondaryKpiTable';
import PageBreak from '../../CommonPage/PageBreak';

// CITY_COORDS removed - now fetched from config.json

const VonrCoverageSection = ({ city: propCity, firstSection = false }) => {
    const { city: globalCity, projectData, loadCityData, appConfig } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = projectData[city];

    // Dynamically determine Base Station coordinates from appConfig
    // Logic: If band is LTE (starts with 'b'), use ${city}_LTE if available. Otherwise use ${city}.
    const getBaseStationCoords = (targetBand) => {
        if (!appConfig || !appConfig.coverage_station) {
            return { latitude: 47.409192, longitude: -121.973509 }; // Hard fallback to Seattle
        }

        const stations = appConfig.coverage_station;
        const isLte = targetBand && targetBand.toLowerCase().startsWith('b');
        const lteKey = `${city}_LTE`;

        if (isLte && stations[lteKey]) return stations[lteKey];
        if (stations[city]) return stations[city];
        return stations['Seattle'] || { latitude: 47.409192, longitude: -121.973509 };
    };

    const processVoNRCoverageData = (band, metric) => {
        const defaultRows = [
            { device: 'DUT', run1: 0, run2: 0, run3: 0, run4: 0, run5: 0, average: 0 },
            { device: 'REF', run1: 0, run2: 0, run3: 0, run4: 0, run5: 0, average: 0 },
            "N/A"
        ];

        const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];

        if (!rootData || !rootData['5G VoNR Coverage Test']) {
            return defaultRows;
        }

        const bandData = rootData['5G VoNR Coverage Test'][band];
        if (!bandData) {
            return defaultRows;
        }

        const rows = ['DUT', 'REF'].map(device => {
            const deviceRuns = bandData[device] || {};
            const runData = { device };
            let sum = 0;
            let count = 0;

            for (let i = 1; i <= 5; i++) {
                const runKey = `Run${i}`;
                const runInfo = deviceRuns[runKey];
                let val = 0;
                if (runInfo && runInfo[metric] && typeof runInfo[metric].distance_km === 'number') {
                    val = runInfo[metric].distance_km * 1000;
                }

                runData[`run${i}`] = val > 0 ? parseFloat(val.toFixed(2)) : 0;

                if (val > 0) {
                    sum += val;
                    count++;
                }
            }

            runData.average = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
            return runData;
        });

        const dutAvg = rows[0].average;
        const refAvg = rows[1].average;
        const status = (dutAvg > 0 || refAvg > 0) ? (dutAvg >= 0.95 * refAvg ? "Pass" : "Fail") : "N/A";

        return [...rows, status];
    };

    const processSecondaryKpiData = (band) => {
        const defaultData = Array.from({ length: 5 }, (_, i) => ({
            run: `RUN ${i + 1}`,
            txPower: { DUT: 0, REF: 0 },
            segments: [
                { segment: 'First 30%', DUT: { bler: 0, dlMcs: 0, ulMcs: 0 }, REF: { bler: 0, dlMcs: 0, ulMcs: 0 } },
                { segment: 'Middle 40%', DUT: { bler: 0, dlMcs: 0, ulMcs: 0 }, REF: { bler: 0, dlMcs: 0, ulMcs: 0 } },
                { segment: 'Last 30%', DUT: { bler: 0, dlMcs: 0, ulMcs: 0 }, REF: { bler: 0, dlMcs: 0, ulMcs: 0 } },
            ]
        }));

        const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];
        if (!rootData || !rootData['5G VoNR Coverage Test'] || !rootData['5G VoNR Coverage Test'][band]) {
            return defaultData;
        }

        const bandData = rootData['5G VoNR Coverage Test'][band];
        const segments = ['First 30%', 'Middle 40%', 'Last 30%'];

        return Array.from({ length: 5 }, (_, i) => {
            const runKey = `Run${i + 1}`;

            // TxPower is now at the run level in secondary_kpi, not inside segments
            const dutTxPower = bandData['DUT']?.[runKey]?.['secondary_kpi']?.['TxPower'] || 0;
            const refTxPower = bandData['REF']?.[runKey]?.['secondary_kpi']?.['TxPower'] || 0;

            return {
                run: `RUN ${i + 1}`,
                txPower: {
                    DUT: dutTxPower,
                    REF: refTxPower
                },
                segments: segments.map(seg => {
                    const dutStats = bandData['DUT']?.[runKey]?.['secondary_kpi']?.[seg] || {};
                    const refStats = bandData['REF']?.[runKey]?.['secondary_kpi']?.[seg] || {};
                    return {
                        segment: seg,
                        DUT: {
                            bler: dutStats['AVG BLER'] || 0,
                            dlMcs: dutStats['AVG DL MCS'] || 0,
                            ulMcs: dutStats['AVG UL MCS'] || 0
                        },
                        REF: {
                            bler: refStats['AVG BLER'] || 0,
                            dlMcs: refStats['AVG DL MCS'] || 0,
                            ulMcs: refStats['AVG UL MCS'] || 0
                        }
                    };
                })
            };
        });
    };



    if (!reportData || !reportData.coveragePerformance) {
        return <PageBreak>Loading {city} Coverage data...</PageBreak>;
    }

    const renderBandSection = (band) => {
        const bandLabel = band.toUpperCase();
        const dataDL = processVoNRCoverageData(band, 'first_dl_tp_gt_1');
        const dataUL = processVoNRCoverageData(band, 'first_ul_tp_gt_1');
        const dataMOS = processVoNRCoverageData(band, 'mos_before_drop');
        const dataAudio = processVoNRCoverageData(band, 'call_drop');
        const secondaryKpi = processSecondaryKpiData(band);

        const coords = getBaseStationCoords(band);
        const BASE_STATION_COORDS = [coords.latitude, coords.longitude];

        // Use specific audio status for each band
        const bandStatus = dataAudio[dataAudio.length - 1];

        return (
            <div key={band}>
                <PageBreak>
                    {firstSection && band === 'n25' && <DynamicHeader level={1}>5G NR Coverage Test</DynamicHeader>}
                    <DynamicHeader level={2}>5G NR Coverage Test - {bandLabel} - {city}</DynamicHeader>
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - DL Throughput &lt; 1Mbps - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataDL.slice(0, -1)} status={dataDL[dataDL.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="first_dl_tp_gt_1"
                        baseStation={BASE_STATION_COORDS}
                    />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - UL Throughput &lt; 1Mbps - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataUL.slice(0, -1)} status={dataUL[dataUL.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="first_ul_tp_gt_1"
                        baseStation={BASE_STATION_COORDS}
                    />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - Last MOS Before Silence - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataMOS.slice(0, -1)} status={dataMOS[dataMOS.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="mos_before_drop"
                        baseStation={BASE_STATION_COORDS}
                    />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - Audio Call Drop - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataAudio.slice(0, -1)} status={bandStatus} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="call_drop"
                        baseStation={BASE_STATION_COORDS}
                    />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - Secondary KPI - {city}</DynamicHeader>
                    <SecondaryKpiTable data={secondaryKpi} />
                </PageBreak>
            </div>
        );
    };

    return (
        <>
            {['n25', 'n41', 'n71'].map(band => renderBandSection(band))}
        </>
    );
};

export default VonrCoverageSection;
