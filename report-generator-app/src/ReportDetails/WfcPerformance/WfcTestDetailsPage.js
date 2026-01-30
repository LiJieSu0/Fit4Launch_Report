import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';

import PValueTable from '../CallPerformance/PValueTable';
import WfcPerformanceChart from './WfcPerformanceChart';
import WfcMosLineChart from './WfcMosLineChart';
import WfcCpTable from './WfcCpTable';
import WfcHandoverTable from './WfcHandoverTable';

const WfcTestDetailsPage = ({ tc, label, sectionNumber = 0 }) => {
    const { allReportData, availableCities } = useReportData();

    const renderMarketTable = (city) => {
        const cityData = allReportData[city]?.wfcPerformance?.['WFC']?.[tc];
        if (!cityData) return null;

        const hasMoMt = cityData['DUT MO'] || cityData['DUT MT'] || cityData['REF MO'] || cityData['REF MT'];

        const moInitFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_initiation_failures / cityData['DUT MO']?.total_mo_attempts : 0;
        const moRetFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_retention_failures / cityData['DUT MO']?.total_mo_attempts : 0;

        const formatVal = (val) => {
            if (val === undefined || val === null || val === 'N/A') return 'N/A';
            const num = parseFloat(val);
            return isNaN(num) ? 'N/A' : num.toFixed(2);
        };

        const getChartValue = (val) => {
            if (val === undefined || val === null || val === 'N/A') return 0;
            const num = parseFloat(val);
            return isNaN(num) ? 0 : num;
        };

        return (
            <>
                <div className='page-content'>
                    <div key={city} className="market-section" style={{ marginBottom: '60px', pageBreakAfter: 'always' }}>
                        {sectionNumber == 1 && <DynamicHeader level={1}>WFC Performance Test Details</DynamicHeader>}
                        {sectionNumber == 1 && <DynamicHeader level={2}>Call Performance </DynamicHeader>}
                        {sectionNumber == 2 && <DynamicHeader level={2}>Handover </DynamicHeader>}
                        <DynamicHeader level={3}>{tc} - {label} - {city} </DynamicHeader>
                        {(label === 'Call Performance' || label === 'Call Performance Baseline') && (
                            <>
                                <WfcCpTable cityData={cityData} />
                                <div style={{ marginTop: '10px' }}>
                                    <PValueTable
                                        data={cityData}
                                        kpiType="WfcCallCriteria"
                                        initFailureRate={moInitFailureRate}
                                        retFailureRate={moRetFailureRate}
                                    />
                                </div>
                            </>
                        )}
                        {(label !== 'Call Performance' && label !== 'Call Performance Baseline') && (
                            <WfcHandoverTable cityData={cityData} />
                        )}

                        <div className="charts-grid-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '10px', width: '100%', boxSizing: 'border-box' }}>
                            <WfcPerformanceChart
                                title="Mean Setup Time"
                                labels={hasMoMt ? ['MO', 'MT'] : ['Result']}
                                yAxisTitle="Time (s)"
                                dutValues={hasMoMt ? [
                                    getChartValue(cityData['DUT MO']?.mean_setup_time),
                                    getChartValue(cityData['DUT MT']?.mean_setup_time)
                                ] : [getChartValue(cityData['DUT']?.mean_setup_time)]}
                                refValues={hasMoMt ? [
                                    getChartValue(cityData['REF MO']?.mean_setup_time),
                                    getChartValue(cityData['REF MT']?.mean_setup_time)
                                ] : [getChartValue(cityData['REF']?.mean_setup_time)]}
                            />
                            <WfcPerformanceChart
                                title="Average MOS"
                                labels={hasMoMt ? ['MO', 'MT'] : ['Result']}
                                yAxisTitle="Score"
                                dutValues={hasMoMt ? [
                                    getChartValue(cityData['DUT MO']?.mos_average),
                                    getChartValue(cityData['DUT MT']?.mos_average)
                                ] : [getChartValue(cityData['DUT']?.mos_average)]}
                                refValues={hasMoMt ? [
                                    getChartValue(cityData['REF MO']?.mos_average),
                                    getChartValue(cityData['REF MT']?.mos_average)
                                ] : [getChartValue(cityData['REF']?.mos_average)]}
                            />

                            {/* RSSI Section */}
                            <div className="metric-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <table className="mini-performance-table general-table-style" style={{ width: '100%', marginBottom: '10px', fontSize: '12px' }}>
                                    <thead>
                                        <tr>
                                            <th>RSSI (dBm)</th>
                                            {hasMoMt ? (
                                                <>
                                                    <th>MO</th>
                                                    <th>MT</th>
                                                </>
                                            ) : (
                                                <th>Result</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>DUT</td>
                                            {hasMoMt ? (
                                                <>
                                                    <td>{formatVal(cityData['DUT MO']?.rssi_average)}</td>
                                                    <td>{formatVal(cityData['DUT MT']?.rssi_average)}</td>
                                                </>
                                            ) : (
                                                <td>{formatVal(cityData['DUT']?.rssi_average)}</td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td>REF</td>
                                            {hasMoMt ? (
                                                <>
                                                    <td>{formatVal(cityData['REF MO']?.rssi_average)}</td>
                                                    <td>{formatVal(cityData['REF MT']?.rssi_average)}</td>
                                                </>
                                            ) : (
                                                <td>{formatVal(cityData['REF']?.rssi_average)}</td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                                <WfcPerformanceChart
                                    title="Average RSSI"
                                    labels={hasMoMt ? ['MO', 'MT'] : ['Result']}
                                    yAxisTitle="RSSI (dBm)"
                                    dutValues={hasMoMt ? [
                                        getChartValue(cityData['DUT MO']?.rssi_average),
                                        getChartValue(cityData['DUT MT']?.rssi_average)
                                    ] : [getChartValue(cityData['DUT']?.rssi_average)]}
                                    refValues={hasMoMt ? [
                                        getChartValue(cityData['REF MO']?.rssi_average),
                                        getChartValue(cityData['REF MT']?.rssi_average)
                                    ] : [getChartValue(cityData['REF']?.rssi_average)]}
                                />
                            </div>

                            {/* RSRP Section */}
                            <div className="metric-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <table className="mini-performance-table general-table-style" style={{ width: '100%', marginBottom: '10px', fontSize: '12px' }}>
                                    <thead>
                                        <tr>
                                            <th>RSRP (dBm)</th>
                                            {hasMoMt ? (
                                                <>
                                                    <th>MO</th>
                                                    <th>MT</th>
                                                </>
                                            ) : (
                                                <th>Result</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>DUT</td>
                                            {hasMoMt ? (
                                                <>
                                                    <td>{formatVal(cityData['DUT MO']?.rsrp_average)}</td>
                                                    <td>{formatVal(cityData['DUT MT']?.rsrp_average)}</td>
                                                </>
                                            ) : (
                                                <td>{formatVal(cityData['DUT']?.rsrp_average)}</td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td>REF</td>
                                            {hasMoMt ? (
                                                <>
                                                    <td>{formatVal(cityData['REF MO']?.rsrp_average)}</td>
                                                    <td>{formatVal(cityData['REF MT']?.rsrp_average)}</td>
                                                </>
                                            ) : (
                                                <td>{formatVal(cityData['REF']?.rsrp_average)}</td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                                <WfcPerformanceChart
                                    title="Average RSRP"
                                    labels={hasMoMt ? ['MO', 'MT'] : ['Result']}
                                    yAxisTitle="RSRP (dBm)"
                                    dutValues={hasMoMt ? [
                                        getChartValue(cityData['DUT MO']?.rsrp_average),
                                        getChartValue(cityData['DUT MT']?.rsrp_average)
                                    ] : [getChartValue(cityData['DUT']?.rsrp_average)]}
                                    refValues={hasMoMt ? [
                                        getChartValue(cityData['REF MO']?.rsrp_average),
                                        getChartValue(cityData['REF MT']?.rsrp_average)
                                    ] : [getChartValue(cityData['REF']?.rsrp_average)]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='page-content'>
                        <div style={{ marginTop: '40px' }}>
                            <WfcMosLineChart tc={tc} city={city} />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            {availableCities.map(city => renderMarketTable(city))}
        </>
    );
};

export default WfcTestDetailsPage;