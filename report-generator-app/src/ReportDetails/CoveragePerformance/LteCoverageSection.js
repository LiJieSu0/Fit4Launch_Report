import React, { useContext, useEffect, useMemo } from 'react';
import CoverageTestTable from './CoverageTestTable';
import CoverageMap from './CoverageMap';
import VonrTimeLineChart from './VonrTimeLineChart';
import { ReportContext } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import SecondaryKpiTable from './SecondaryKpiTable';
import PageBreak from '../../CommonPage/PageBreak';

const LteCoverageSection = ({ city: propCity, firstSection = false, dataOnlyDevice = false }) => {
    const { city: globalCity, projectData, loadCityData, appConfig, project } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = projectData[city];

    // Logic requested: NY uses "New York" key, Seattle uses "Seattle_LTE" key
    const getBaseStationCoords = () => {
        const defaultNY = { latitude: 40.562337, longitude: -74.695998 };
        const defaultSeattleLTE = { latitude: 47.570236, longitude: -121.888454 };

        if (!appConfig || !appConfig.coverage_station) {
            return city === "New York" ? defaultNY : defaultSeattleLTE;
        }

        const stations = appConfig.coverage_station;
        if (city === "New York") return stations["New York"] || defaultNY;
        if (city === "Seattle") return stations["Seattle_LTE"] || defaultSeattleLTE;

        return stations[city] || stations["Seattle_LTE"] || defaultSeattleLTE;
    };

    const lteBands = useMemo(() => {
        const root = reportData?.coveragePerformance?.['Coverage Performance']?.['LTE Coverage Test'];
        if (!root) return [];
        return Object.keys(root).filter(b => b.startsWith('b')).sort();
    }, [reportData]);

    const processLteCoverageData = (band, metric) => {
        const defaultRows = [
            { device: 'DUT', run1: null, run2: null, run3: null, run4: null, run5: null, run6: null, run7: null, run8: null, run9: null, run10: null, average: null },
            { device: 'REF', run1: null, run2: null, run3: null, run4: null, run5: null, run6: null, run7: null, run8: null, run9: null, run10: null, average: null },
            "N/A"
        ];

        const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];
        if (!rootData || !rootData['LTE Coverage Test'] || !rootData['LTE Coverage Test'][band]) {
            return defaultRows;
        }

        const bandData = rootData['LTE Coverage Test'][band];

        const rows = ['DUT', 'REF'].map(device => {
            const deviceRuns = bandData[device] || {};
            const runData = { device };
            let sum = 0;
            let count = 0;

            for (let i = 1; i <= 10; i++) {
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
        const defaultData = Array.from({ length: 10 }, (_, i) => ({
            run: `RUN ${i + 1}`,
            txPower: { DUT: null, REF: null },
            segments: segments.map(seg => ({
                segment: seg,
                DUT: { bler: null, dlMcs: null, ulMcs: null },
                REF: { bler: null, dlMcs: null, ulMcs: null }
            }))
        }));

        const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];
        if (!rootData || !rootData['LTE Coverage Test'] || !rootData['LTE Coverage Test'][band]) {
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

        const bandData = rootData['LTE Coverage Test'][band];

        const runsData = Array.from({ length: 10 }, (_, i) => {
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
        return <PageBreak>Loading {city} LTE Coverage data...</PageBreak>;
    }

    const renderBandSection = (band) => {
        const bandLabel = band.toUpperCase();
        const dataDL = processLteCoverageData(band, 'first_dl_tp_gt_1');
        const dataUL = processLteCoverageData(band, 'first_ul_tp_gt_1');
        const dataMOS = processLteCoverageData(band, 'mos_before_drop');
        const dataAudio = processLteCoverageData(band, 'call_drop');
        const bandStatus = dataAudio[dataAudio.length - 1];
        const secondaryKpi = processSecondaryKpiData(band);

        const coords = getBaseStationCoords();
        const BASE_STATION_COORDS = [coords.latitude, coords.longitude];

        const isFirstBand = lteBands.length > 0 && band === lteBands[0];

        return (
            <div key={band}>
                <PageBreak>
                    {firstSection && isFirstBand && <DynamicHeader level={1}>LTE Coverage Test</DynamicHeader>}
                    <DynamicHeader level={2}>LTE Coverage Test - {bandLabel} - {city}</DynamicHeader>
                    <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - DL Throughput &lt; 1Mbps - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataDL.slice(0, -1)} status={dataDL[dataDL.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['LTE Coverage Test']?.[band]}
                        metric="first_dl_tp_gt_1"
                        baseStation={BASE_STATION_COORDS}
                    />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - UL Throughput &lt; 1Mbps - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataUL.slice(0, -1)} status={dataUL[dataUL.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['LTE Coverage Test']?.[band]}
                        metric="first_ul_tp_gt_1"
                        baseStation={BASE_STATION_COORDS}
                    />
                </PageBreak>
                {!dataOnlyDevice && (
                    <>
                        <PageBreak>
                            <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - Last MOS Before Silence - {city}</DynamicHeader>
                            <CoverageTestTable tableData={dataMOS.slice(0, -1)} status={dataMOS[dataMOS.length - 1]} />
                            <CoverageMap
                                bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['LTE Coverage Test']?.[band]}
                                metric="mos_before_drop"
                                baseStation={BASE_STATION_COORDS}
                            />
                        </PageBreak>
                        <PageBreak>
                            <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - Audio Call Drop - {city}</DynamicHeader>
                            <CoverageTestTable tableData={dataAudio.slice(0, -1)} status={bandStatus} />
                            <CoverageMap
                                bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['LTE Coverage Test']?.[band]}
                                metric="call_drop"
                                baseStation={BASE_STATION_COORDS}
                            />
                        </PageBreak>
                    </>
                )}
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - Secondary KPI - {city}</DynamicHeader>
                    <SecondaryKpiTable data={secondaryKpi} />
                </PageBreak>
                <PageBreak>
                    <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - RSRP TimeLine Analysis - {city}</DynamicHeader>
                    <VonrTimeLineChart
                        analysisType="RSRP"
                        band={band}
                        run="Average"
                        city={city}
                        projectFolderName={project?.dataFolderName || ''}
                        height="280px"
                        width="40%"
                    />

                    <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - SINR TimeLine Analysis - {city}</DynamicHeader>
                    <VonrTimeLineChart
                        analysisType="SINR"
                        band={band}
                        run="Average"
                        city={city}
                        projectFolderName={project?.dataFolderName || ''}
                        height="280px"
                        width="40%"
                    />
                    <DynamicHeader level={3} hideInTOC={true}>LTE Coverage Test {bandLabel} - TxPower TimeLine Analysis - {city}</DynamicHeader>
                    <VonrTimeLineChart
                        analysisType="TxPower"
                        band={band}
                        run="Average"
                        city={city}
                        projectFolderName={project?.dataFolderName || ''}
                        height="280px"
                        width="40%"
                    />
                </PageBreak>
            </div>
        );
    };

    return (
        <>{lteBands.length > 0 ? lteBands.map(band => renderBandSection(band)) : <PageBreak>No LTE Band data found for {city}.</PageBreak>}</>
    );
};

export default LteCoverageSection;
