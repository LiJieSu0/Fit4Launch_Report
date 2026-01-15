import React, { useContext, useEffect } from 'react';
import CoverageTestTable from './CoverageTestTable';
import CoverageMap from './CoverageMap';
import { ReportContext } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const CITY_COORDS = {
    'Seattle': { latitude: 47.128234, longitude: -122.356792 },
    // Add other cities here as needed
};

const VonrCoverageSection = ({ city: propCity, firstSection = false }) => {
    const { city: globalCity, allReportData, loadCityData } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = allReportData[city];
    const BASE_STATION_COORDS = CITY_COORDS[city] || CITY_COORDS['Seattle'];

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
                    val = runInfo[metric].distance_km;
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
            segments: [
                { segment: 'First 30%', DUT: { bler: 0, mcs: 0, cqi: 0 }, REF: { bler: 0, mcs: 0, cqi: 0 } },
                { segment: 'Middle 40%', DUT: { bler: 0, mcs: 0, cqi: 0 }, REF: { bler: 0, mcs: 0, cqi: 0 } },
                { segment: 'Last 30%', DUT: { bler: 0, mcs: 0, cqi: 0 }, REF: { bler: 0, mcs: 0, cqi: 0 } },
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
            return {
                run: `RUN ${i + 1}`,
                segments: segments.map(seg => {
                    const dutStats = bandData['DUT']?.[runKey]?.['secondary_kpi']?.[seg] || {};
                    const refStats = bandData['REF']?.[runKey]?.['secondary_kpi']?.[seg] || {};
                    return {
                        segment: seg,
                        DUT: {
                            bler: dutStats['AVG BLER'] || 0,
                            mcs: dutStats['AVG MCS'] || 0,
                            cqi: dutStats['AVG CQI'] || 0
                        },
                        REF: {
                            bler: refStats['AVG BLER'] || 0,
                            mcs: refStats['AVG MCS'] || 0,
                            cqi: refStats['AVG CQI'] || 0
                        }
                    };
                })
            };
        });
    };

    const SecondaryKpiTable = ({ data }) => (
        <table className="general-table-style">
            <thead>
                <tr>
                    <th rowSpan="2">Run</th>
                    <th rowSpan="2">Segment</th>
                    <th colSpan="2">AVG BLER</th>
                    <th colSpan="2">AVG MCS</th>
                    <th colSpan="2">AVG CQI</th>
                </tr>
                <tr>
                    <th>DUT</th>
                    <th>REF</th>
                    <th>DUT</th>
                    <th>REF</th>
                    <th>DUT</th>
                    <th>REF</th>
                </tr>
            </thead>
            <tbody>
                {data.map((runData, runIndex) => (
                    <React.Fragment key={runIndex}>
                        {runData.segments.map((segmentData, segmentIndex) => (
                            <tr key={`${runIndex}-${segmentIndex}`}>
                                {segmentIndex === 0 && (
                                    <td rowSpan={runData.segments.length}>{runData.run}</td>
                                )}
                                <td>{segmentData.segment}</td>
                                <td>{segmentData.DUT.bler.toFixed(2)}</td>
                                <td>{segmentData.REF.bler.toFixed(2)}</td>
                                <td>{segmentData.DUT.mcs.toFixed(2)}</td>
                                <td>{segmentData.REF.mcs.toFixed(2)}</td>
                                <td>{segmentData.DUT.cqi.toFixed(2)}</td>
                                <td>{segmentData.REF.cqi.toFixed(2)}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );

    if (!reportData || !reportData.coveragePerformance) {
        return <div className="page-content">Loading {city} Coverage data...</div>;
    }

    const renderBandSection = (band) => {
        const bandLabel = band.toUpperCase();
        const dataDL = processVoNRCoverageData(band, 'first_dl_tp_gt_1');
        const dataUL = processVoNRCoverageData(band, 'first_ul_tp_gt_1');
        const dataMOS = processVoNRCoverageData(band, 'mos_before_drop');
        const dataAudio = processVoNRCoverageData(band, 'call_drop');
        const secondaryKpi = processSecondaryKpiData(band);

        // Use specific audio status for each band
        const bandStatus = dataAudio[dataAudio.length - 1];

        return (
            <div key={band}>
                <div className='page-content'>
                    {firstSection && band === 'n25' && <DynamicHeader level={1}>Coverage Test - All Networks</DynamicHeader>}
                    <DynamicHeader level={2}>5G VoNR Coverage Test - {bandLabel} - {city}</DynamicHeader>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - DL Throughput &lt; 1Mbps - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataDL.slice(0, -1)} status={dataDL[dataDL.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="first_dl_tp_gt_1"
                        baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
                    />
                </div>
                <div className='page-content'>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - UL Throughput &lt; 1Mbps - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataUL.slice(0, -1)} status={dataUL[dataUL.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="first_ul_tp_gt_1"
                        baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
                    />
                </div>
                <div className='page-content'>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - Last MOS Before Silence - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataMOS.slice(0, -1)} status={dataMOS[dataMOS.length - 1]} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="mos_before_drop"
                        baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
                    />
                </div>
                <div className='page-content'>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - Audio Call Drop - {city}</DynamicHeader>
                    <CoverageTestTable tableData={dataAudio.slice(0, -1)} status={bandStatus} />
                    <CoverageMap
                        bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.[band]}
                        metric="call_drop"
                        baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
                    />
                </div>
                <div className='page-content'>
                    <DynamicHeader level={3} hideInTOC={true}>5G VoNR Coverage Test {bandLabel} - Secondary KPI - {city}</DynamicHeader>
                    <SecondaryKpiTable data={secondaryKpi} />
                </div>
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
