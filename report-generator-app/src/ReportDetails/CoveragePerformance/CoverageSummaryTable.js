import React from 'react';
import styles from './CoverageSummaryTable.module.css';
import '.././../StyleScript/Restricted_Report_Style.css';
import { useReportData } from '../../Contexts/ReportContext';
import { HeaderContext } from '../../Contexts/HeaderContext';
import { useContext } from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const KPI_CONFIG = [
    { name: "DL Throughput < 1Mbps", key: "first_dl_tp_gt_1", link: "DL" },
    { name: "UL Throughput < 1Mbps", key: "first_ul_tp_gt_1", link: "UL" },
    // { name: "Last MOS Before Silence", key: "mos_before_drop", link: "MOS" },
    // { name: "Audio Call Drop", key: "call_drop", link: "Call" }
];

const BANDS = [
    { name: "Samsung XCover Pro 7(NR 25)", key: "n25", anchor: "2.1" },
    { name: "Samsung XCover Pro 7(NR 41)", key: "n41", anchor: "2.2" },
    { name: "Samsung XCover Pro 7(NR 71)", key: "n71", anchor: "2.3" },
    { name: "Samsung XCover Pro 7(LTE B66)", key: "b66", anchor: "2.4" },
    { name: "Samsung XCover Pro 7(LTE B2)", key: "b2", anchor: "2.5" }


];

const CoverageSummaryTable = () => {
    const { allReportData, availableCities, loadCityData } = useReportData();
    const { numberedHeaders } = useContext(HeaderContext);
    const markets = availableCities || ["Seattle", "New York"];

    const getDynamicLink = (market, bandKey, kpiLink) => {
        const citySearch = market.toLowerCase();
        const bandLabel = bandKey.toUpperCase(); // e.g. N25
        const kpiSearch = kpiLink === 'DL' ? 'dl' :
            kpiLink === 'UL' ? 'ul' :
                kpiLink === 'MOS' ? 'mos' :
                    kpiLink === 'Call' ? 'call drop' : '';

        // Find header that matches city, band, and kpi keyword
        const header = numberedHeaders.find(h => {
            const text = h.text.toLowerCase();
            const matchesCity = text.includes(citySearch);
            const matchesBand = text.includes(bandLabel.toLowerCase());
            const matchesKPI = kpiSearch ? text.includes(kpiSearch) : true;

            // For HPUE, it might be different, but BANDS currently doesn't have HPUE.
            // If it did, bandKey would be 'hpue'.
            const matchesHPUE = bandKey === 'hpue' ? text.includes('hpue') : !text.includes('hpue');

            return matchesCity && matchesBand && matchesKPI && matchesHPUE;
        });

        return header ? `#${header.id}` : '#';
    };

    React.useEffect(() => {
        markets.forEach(market => {
            if (!allReportData[market]) {
                loadCityData(market).catch(err => console.error(`Failed to load ${market}:`, err));
            }
        });
    }, [markets, allReportData, loadCityData]);

    const calculateAvgDistance = (cityData, band, deviceType, kpiKey) => {
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
            const val = bandData[runKey]?.[kpiKey]?.distance_km;
            if (typeof val === 'number') {
                sum += val;
                count++;
            }
        });

        return count > 0 ? sum / count : null;
    };

    const getResult = (market, band, kpi) => {
        const cityData = allReportData[market];
        if (!cityData) return { status: "N/A", color: "default", link: "#" };

        const dutAvg = calculateAvgDistance(cityData, band.key, "DUT", kpi.key);
        const refAvg = calculateAvgDistance(cityData, band.key, "REF", kpi.key);

        if (dutAvg === null || refAvg === null) return { status: "N/A", color: "default", link: "#" };

        const color = getKpiCellColor('CoverageDistance', dutAvg, refAvg);
        const status = color === 'var(--performance-pass)' || color === 'var(--performance-excellent)' ? "Pass" : "Fail";

        const link = getDynamicLink(market, band.key, kpi.link);

        return { status, color, link };
    };

    const mapColorToClass = (color) => {
        if (color === 'var(--performance-pass)') return styles['result-pass'];
        if (color === 'var(--performance-fail)') return styles['result-fail'];
        if (color === 'var(--performance-excellent)') return styles['result-excellent'];
        return '';
    };

    return (
        <table className={`general-table-style ${styles['coverage-summary-table']}`}>
            <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '35%' }} />
                {markets.map(market => (
                    <col key={market} style={{ width: `${40 / markets.length}%` }} />
                ))}
            </colgroup>
            <thead>
                <tr>
                    <th rowSpan="2">Device</th>
                    <th rowSpan="2">KPI</th>
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
                    KPI_CONFIG.map((kpi, kpiIndex) => (
                        <tr key={`${band.key}-${kpi.key}`}>
                            {kpiIndex === 0 && (
                                <td rowSpan={KPI_CONFIG.length}>
                                    {band.name}
                                </td>
                            )}
                            <td>{kpi.name}</td>
                            {markets.map(market => {
                                const result = getResult(market, band, kpi);
                                return (
                                    <td
                                        key={`${market}-${band.key}-${kpi.key}`}
                                        className={mapColorToClass(result.color)}
                                        style={{ backgroundColor: result.color !== 'default' ? result.color : '' }}
                                    >
                                        {mapColorToClass(result.color) === '' ? "N/A" : <a href={result.link} style={{ color: 'black' }}>
                                            Results
                                        </a>}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    );
};

export default CoverageSummaryTable;
