import React, { useContext } from 'react';
import styles from './CoverageSummaryTable.module.css';
import { useReportData } from '../../Contexts/ReportContext';
import { HeaderContext } from '../../Contexts/HeaderContext';
import { getKpiCellColor } from '../../Utils/KpiRules';

const SECONDARY_KPI_CONFIG = [
    { name: "DL MCS", kpiType: "SecondaryMcs", segment: "Overall" },
    { name: "UL MCS", kpiType: "SecondaryMcs", segment: "Overall" },
    { name: "AVG BLER", kpiType: "SecondaryBler", segment: "Overall" },
    { name: "AVG Tx Power (dBm)", kpiType: "SecondaryTxPower", segment: "Overall" }
];

const SecondaryKpiSummaryTable = () => {
    const { projectData, availableCities, project } = useReportData();
    const { numberedHeaders } = useContext(HeaderContext);
    const markets = availableCities || ["Seattle", "New York"];

    const getDeviceLabel = () => {
        if (!project || !project.deviceData) return "Device";
        const dut = project.deviceData.find(d => d.role === "Device Under Test");
        return dut ? dut.testDeviceLabel : "Device";
    };

    const deviceLabel = getDeviceLabel();

    const BANDS = [
        { name: `${deviceLabel} (NR 25)`, key: "n25" },
        { name: `${deviceLabel} (NR 41)`, key: "n41" },
        { name: `${deviceLabel} (NR 71)`, key: "n71" },
        { name: `${deviceLabel} (LTE B66)`, key: "b66" },
    ];

    const getDynamicLink = (market, bandKey) => {
        const citySearch = market.toLowerCase();
        const bandLabel = bandKey.toUpperCase(); // e.g. N25

        // Find header that matches city, band, and "Secondary KPI" keyword
        const header = numberedHeaders.find(h => {
            const text = h.text.toLowerCase();
            const matchesCity = text.includes(citySearch);
            const matchesBand = text.includes(bandLabel.toLowerCase());
            const matchesSecondary = text.includes('secondary kpi');

            return matchesCity && matchesBand && matchesSecondary;
        });

        return header ? `#${header.id}` : '#';
    };

    const calculateSecondaryAvg = (cityData, band, deviceType, kpiName) => {
        const root = cityData?.coveragePerformance?.["Coverage Performance"];
        if (!root) return null;

        const isLte = band && band.toLowerCase().startsWith('b');
        const sectionName = isLte ? "LTE Coverage Test" : "5G VoNR Coverage Test";
        const bandData = root[sectionName]?.[band]?.[deviceType];
        if (!bandData) return null;

        const runs = Object.keys(bandData).filter(key => key.startsWith('Run'));
        if (runs.length === 0) return null;

        let sum = 0;
        let count = 0;

        runs.forEach(runKey => {
            const secondaryKpi = bandData[runKey]?.secondary_kpi;
            if (!secondaryKpi) return;

            if (kpiName === "AVG Tx Power (dBm)") {
                const val = secondaryKpi["TxPower"];
                if (typeof val === 'number') {
                    sum += val;
                    count++;
                }
            } else {
                // For MCS and BLER, we might want to average across segments or pick a specific one.
                // The requirements mentions "at Initial 30%, Middle 40% and Last 30%".
                // In detailed table, it shows segments. For summary, we can average them.
                const segments = ['First 30%', 'Middle 40%', 'Last 30%'];
                segments.forEach(seg => {
                    const stats = secondaryKpi[seg];
                    if (!stats) return;

                    let val;
                    if (kpiName === "DL MCS") val = stats["AVG DL MCS"];
                    if (kpiName === "UL MCS") val = stats["AVG UL MCS"];
                    if (kpiName === "AVG BLER") val = stats["AVG BLER"];

                    if (typeof val === 'number') {
                        sum += val;
                        count++;
                    }
                });
            }
        });

        return count > 0 ? sum / count : null;
    };

    const isPrimaryFailed = (cityData, bandKey) => {
        const root = cityData?.coveragePerformance?.["Coverage Performance"];
        if (!root) return false;

        const isLte = bandKey && bandKey.toLowerCase().startsWith('b');
        const sectionName = isLte ? "LTE Coverage Test" : "5G VoNR Coverage Test";
        const bandData = root[sectionName]?.[bandKey];
        if (!bandData) return false;

        const primaryKpis = ["first_dl_tp_gt_1", "first_ul_tp_gt_1", "mos_before_drop", "call_drop"];

        // Helper to check if a specific KPI failed
        const checkKpiFail = (kpiKey) => {
            const dutAvg = calculateAvgDistance(cityData, bandKey, "DUT", kpiKey);
            const refAvg = calculateAvgDistance(cityData, bandKey, "REF", kpiKey);
            if (dutAvg === null || refAvg === null) return false;
            const color = getKpiCellColor('CoverageDistance', dutAvg, refAvg);
            return color === 'var(--performance-fail)';
        };

        return primaryKpis.some(kpi => checkKpiFail(kpi));
    };

    // Duplicate logic from CoverageSummaryTable for consistency
    const calculateAvgDistance = (cityData, band, deviceType, kpiKey) => {
        const root = cityData?.coveragePerformance?.["Coverage Performance"];
        if (!root) return null;
        const isLte = band && band.toLowerCase().startsWith('b');
        const sectionName = isLte ? "LTE Coverage Test" : "5G VoNR Coverage Test";
        const bandData = root[sectionName]?.[band]?.[deviceType];
        if (!bandData) return null;
        const runs = Object.keys(bandData).filter(key => key.startsWith('Run'));
        let sum = 0, count = 0;
        runs.forEach(runKey => {
            const val = bandData[runKey]?.[kpiKey]?.distance_km;
            if (typeof val === 'number') { sum += val; count++; }
        });
        return count > 0 ? (sum / count) * 1000 : null;
    };

    const hasAnyDetailedFailure = (cityData, bandKey, kpi) => {
        const root = cityData?.coveragePerformance?.["Coverage Performance"];
        if (!root) return false;

        const isLte = bandKey && bandKey.toLowerCase().startsWith('b');
        const sectionName = isLte ? "LTE Coverage Test" : "5G VoNR Coverage Test";
        const bandData = root[sectionName]?.[bandKey];
        if (!bandData) return false;

        const dutData = bandData.DUT || {};
        const refData = bandData.REF || {};
        const runs = Object.keys(dutData).filter(key => key.startsWith('Run'));

        if (kpi.name === "AVG Tx Power (dBm)") {
            let dutSum = 0, refSum = 0, dutCount = 0, refCount = 0;
            runs.forEach(runKey => {
                const dutTx = dutData[runKey]?.secondary_kpi?.["TxPower"];
                const refTx = refData[runKey]?.secondary_kpi?.["TxPower"];
                if (typeof dutTx === 'number') { dutSum += dutTx; dutCount++; }
                if (typeof refTx === 'number') { refSum += refTx; refCount++; }
            });
            if (dutCount > 0 && refCount > 0) {
                const color = getKpiCellColor(kpi.kpiType, dutSum / dutCount, refSum / refCount);
                return color === 'var(--performance-fail)' || color === 'var(--performance-marginal-fail)';
            }
        } else {
            const segments = ['First 30%', 'Middle 40%', 'Last 30%'];
            for (const seg of segments) {
                let dutSum = 0, refSum = 0, dutCount = 0, refCount = 0;
                runs.forEach(runKey => {
                    const statsDut = dutData[runKey]?.secondary_kpi?.[seg];
                    const statsRef = refData[runKey]?.secondary_kpi?.[seg];
                    if (!statsDut || !statsRef) return;

                    let dutVal, refVal;
                    if (kpi.name === "DL MCS") {
                        dutVal = statsDut["AVG DL MCS"];
                        refVal = statsRef["AVG DL MCS"];
                    } else if (kpi.name === "UL MCS") {
                        dutVal = statsDut["AVG UL MCS"];
                        refVal = statsRef["AVG UL MCS"];
                    } else if (kpi.name === "AVG BLER") {
                        dutVal = statsDut["AVG BLER"];
                        refVal = statsRef["AVG BLER"];
                    }

                    if (typeof dutVal === 'number') { dutSum += dutVal; dutCount++; }
                    if (typeof refVal === 'number') { refSum += refVal; refCount++; }
                });

                if (dutCount > 0 && refCount > 0) {
                    const color = getKpiCellColor(kpi.kpiType, dutSum / dutCount, refSum / refCount);
                    if (color === 'var(--performance-fail)' || color === 'var(--performance-marginal-fail)') return true;
                }
            }
        }
        return false;
    };

    const getResult = (market, band, kpi) => {
        const cityData = projectData[market];
        if (!cityData) return { status: "N/A", color: "default", link: "#" };

        // New requirement: If all primary KPIs pass, secondary KPI table cell should be blank
        if (!isPrimaryFailed(cityData, band.key)) {
            return { status: "", color: "default", link: "#" };
        }

        const dutAvg = calculateSecondaryAvg(cityData, band.key, "DUT", kpi.name);
        const refAvg = calculateSecondaryAvg(cityData, band.key, "REF", kpi.name);

        if (dutAvg === null || refAvg === null) return { status: "N/A", color: "default", link: "#" };

        const link = getDynamicLink(market, band.key);
        const anyFailed = hasAnyDetailedFailure(cityData, band.key, kpi);

        // Show Red (Fail) if any detailed segment failed. 
        // Show Green (Pass) otherwise.
        let color = anyFailed ? 'var(--performance-fail)' : 'var(--performance-pass)';

        return { status: "Results", color, link };
    };

    const mapColorToClass = (color) => {
        if (color === 'var(--performance-pass)') return styles['result-pass'];
        if (color === 'var(--performance-fail)') return styles['result-fail'];
        return '';
    };

    return (
        <table className={`general-table-style ${styles['coverage-summary-table']}`} style={{ marginTop: '30px' }}>
            <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '35%' }} />
                {markets.map(market => (
                    <col key={market} style={{ width: `${40 / markets.length}%` }} />
                ))}
            </colgroup>
            <thead>
                <tr>
                    <th colSpan={markets.length + 2} style={{ textAlign: 'left', padding: '10px' }}>
                        Secondary KPI Summary Table (Only evaluated if Primary Distance KPI fails)
                    </th>
                </tr>
                <tr>
                    <th rowSpan="2">Device</th>
                    <th rowSpan="2">Secondary KPI</th>
                    <th colSpan={markets.length}>Market</th>
                </tr>
                <tr>
                    {markets.map(market => (
                        <th key={market}>{market}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {BANDS.map((band, bandIndex) => (
                    SECONDARY_KPI_CONFIG.map((kpi, kpiIndex) => {
                        const isLastInBand = kpiIndex === SECONDARY_KPI_CONFIG.length - 1;
                        return (
                            <tr
                                key={`${band.key}-${kpi.name}`}
                            >
                                {kpiIndex === 0 && (
                                    <td className="run-divider" rowSpan={SECONDARY_KPI_CONFIG.length}>
                                        {band.name}
                                    </td>
                                )}
                                <td className={isLastInBand ? 'run-divider' : ''}>{kpi.name}</td>
                                {markets.map(market => {
                                    const result = getResult(market, band, kpi);
                                    return (
                                        <td
                                            key={`${market}-${band.key}-${kpi.name}`}
                                            className={`${mapColorToClass(result.color)} ${isLastInBand ? 'run-divider' : ''}`}
                                            style={{
                                                backgroundColor: result.color !== 'default' ? `color-mix(in srgb, ${result.color}, white var(--secondary-kpi-lightness))` : '',
                                                color: result.status === "N/A" ? '' : 'black'
                                            }}
                                        >
                                            {result.status === "N/A" ? "N/A" : (
                                                result.status === "" ? "" : (
                                                    <a href={result.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {result.status}
                                                    </a>
                                                )
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })
                ))}
            </tbody>
        </table>
    );
};

export default SecondaryKpiSummaryTable;
