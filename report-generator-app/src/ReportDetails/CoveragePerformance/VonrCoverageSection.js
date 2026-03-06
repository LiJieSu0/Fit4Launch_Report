import React, { useContext, useEffect } from 'react';
import CoverageTestTable from './CoverageTestTable';
import CoverageMap from './CoverageMap';
import VonrTimeLineChart from './VonrTimeLineChart';
import { ReportContext } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import SecondaryKpiTable from './SecondaryKpiTable';
import PageBreak from '../../CommonPage/PageBreak';

// CITY_COORDS removed - now fetched from config.json

const VonrCoverageSection = ({ city: propCity, firstSection = false, dataOnlyDevice = false }) => {
    const { city: globalCity, projectData, loadCityData, appConfig, project } = useContext(ReportContext);
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
            { device: 'DUT', run1: null, run2: null, run3: null, run4: null, run5: null, average: null },
            { device: 'REF', run1: null, run2: null, run3: null, run4: null, run5: null, average: null },
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
                let val = null;
                if (runInfo && runInfo[metric] && typeof runInfo[metric].distance_km === 'number') {
                    val = runInfo[metric].distance_km * 1000;
                }

                runData[`run${i}`] = (val !== null && val > 0) ? parseFloat(val.toFixed(2)) : null;

                if (val > 0) {
                    sum += val;
                    count++;
                }
            }

            runData.average = count > 0 ? parseFloat((sum / count).toFixed(2)) : null;
            return runData;
        });

        const dutAvg = rows[0].average;
        const refAvg = rows[1].average;
        const status = (dutAvg > 0 || refAvg > 0) ? (dutAvg >= 0.95 * refAvg ? "Pass" : "Fail") : "N/A";

        return [...rows, status];
    };

    const processSecondaryKpiData = (band) => {
        const segments = ['First 30%', 'Middle 40%', 'Last 30%'];
        const defaultData = Array.from({ length: 5 }, (_, i) => ({
            run: `RUN ${i + 1}`,
            txPower: { DUT: null, REF: null },
            segments: segments.map(seg => ({
                segment: seg,
                DUT: { bler: null, dlMcs: null, ulMcs: null },
                REF: { bler: null, dlMcs: null, ulMcs: null }
            }))
        }));

        const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];
        if (!rootData || !rootData['5G VoNR Coverage Test'] || !rootData['5G VoNR Coverage Test'][band]) {
            return [{
                run: 'Average',
                txPower: { DUT: null, REF: null },
                segments: segments.map(seg => ({
                    segment: seg,
                    DUT: { bler: null, dlMcs: null, ulMcs: null },
                    REF: { bler: null, dlMcs: null, ulMcs: null }
                }))
            }, ...defaultData];
        }

        const bandData = rootData['5G VoNR Coverage Test'][band];

        const runsData = Array.from({ length: 5 }, (_, i) => {
            const runKey = `Run${i + 1}`;
            const dutTxPower = bandData['DUT']?.[runKey]?.['secondary_kpi']?.['TxPower'] ?? null;
            const refTxPower = bandData['REF']?.[runKey]?.['secondary_kpi']?.['TxPower'] ?? null;

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
                            bler: dutStats['AVG BLER'] ?? null,
                            dlMcs: dutStats['AVG DL MCS'] ?? null,
                            ulMcs: dutStats['AVG UL MCS'] ?? null
                        },
                        REF: {
                            bler: refStats['AVG BLER'] ?? null,
                            dlMcs: refStats['AVG DL MCS'] ?? null,
                            ulMcs: refStats['AVG UL MCS'] ?? null
                        }
                    };
                })
            };
        });

        // Calculate Average
        const avgRow = {
            run: 'Average',
            txPower: { DUT: 0, REF: 0 },
            segments: segments.map(seg => ({
                segment: seg,
                DUT: { bler: 0, dlMcs: 0, ulMcs: 0 },
                REF: { bler: 0, dlMcs: 0, ulMcs: 0 }
            }))
        };

        const counts = {
            txPower: { DUT: 0, REF: 0 },
            segments: segments.map(() => ({
                DUT: { bler: 0, dlMcs: 0, ulMcs: 0 },
                REF: { bler: 0, dlMcs: 0, ulMcs: 0 }
            }))
        };

        runsData.forEach(run => {
            if (typeof run.txPower.DUT === 'number') { avgRow.txPower.DUT += run.txPower.DUT; counts.txPower.DUT++; }
            if (typeof run.txPower.REF === 'number') { avgRow.txPower.REF += run.txPower.REF; counts.txPower.REF++; }

            run.segments.forEach((seg, idx) => {
                const metrics = ['bler', 'dlMcs', 'ulMcs'];
                const devices = ['DUT', 'REF'];
                devices.forEach(dev => {
                    metrics.forEach(met => {
                        if (typeof seg[dev][met] === 'number') {
                            avgRow.segments[idx][dev][met] += seg[dev][met];
                            counts.segments[idx][dev][met]++;
                        }
                    });
                });
            });
        });

        // Finalize averages
        if (counts.txPower.DUT > 0) avgRow.txPower.DUT /= counts.txPower.DUT; else avgRow.txPower.DUT = null;
        if (counts.txPower.REF > 0) avgRow.txPower.REF /= counts.txPower.REF; else avgRow.txPower.REF = null;

        avgRow.segments.forEach((seg, idx) => {
            const metrics = ['bler', 'dlMcs', 'ulMcs'];
            const devices = ['DUT', 'REF'];
            devices.forEach(dev => {
                metrics.forEach(met => {
                    if (counts.segments[idx][dev][met] > 0) {
                        seg[dev][met] /= counts.segments[idx][dev][met];
                    } else {
                        seg[dev][met] = null;
                    }
                });
            });
        });

        return [avgRow, ...runsData];
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
                {!dataOnlyDevice && (
                    <>
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
                    </>
                )}
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - Secondary KPI - {city}</DynamicHeader>
                    <SecondaryKpiTable data={secondaryKpi} />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - RSRP TimeLine Analysis - {city}</DynamicHeader>
                    <VonrTimeLineChart
                        analysisType="RSRP"
                        band={band}
                        run="Average"
                        city={city}
                        projectFolderName={project?.dataFolderName || ''}
                        height="280px"
                        width="50%"
                    />
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - SINR TimeLine Analysis - {city}</DynamicHeader>
                    <VonrTimeLineChart
                        analysisType="SINR"
                        band={band}
                        run="Average"
                        city={city}
                        projectFolderName={project?.dataFolderName || ''}
                        height="280px"
                        width="50%"
                    />
                    <DynamicHeader level={3} hideInTOC={true}>5G NR Coverage Test {bandLabel} - TxPower TimeLine Analysis - {city}</DynamicHeader>
                    <VonrTimeLineChart
                        analysisType="TxPower"
                        band={band}
                        run="Average"
                        city={city}
                        projectFolderName={project?.dataFolderName || ''}
                        height="280px"
                        width="50%"
                    />
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
