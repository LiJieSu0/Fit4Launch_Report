import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';

import PValueTable from '../CallPerformance/PValueTable';
import WfcPerformanceChart from './WfcPerformanceChart';
import WfcMosLineChart from './WfcMosLineChart';
import WfcCpTable from './WfcCpTable';
import WfcHandoverTable from './WfcHandoverTable';

const WfcTestDetailsPage = ({ tc, label, isFirst = false }) => {
    const { allReportData, availableCities } = useReportData();

    const renderMarketTable = (city) => {
        const cityData = allReportData[city]?.wfcPerformance?.['WFC']?.[tc];
        if (!cityData) return null;



        const moInitFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_initiation_failures / cityData['DUT MO']?.total_mo_attempts : 0;
        const moRetFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_retention_failures / cityData['DUT MO']?.total_mo_attempts : 0;

        return (
            <>
                <div className='page-content'>

                    <div key={city} className="market-section" style={{ marginBottom: '60px', pageBreakAfter: 'always' }}>
                        {isFirst && <DynamicHeader level={1}>WFC Performance Test Details</DynamicHeader>}
                        <DynamicHeader level={2}>{tc} - {label} - {city} </DynamicHeader>
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
                                labels={['Setup Time']}
                                yAxisTitle="Time (s)"
                                dutValues={[cityData['DUT MO']?.mean_setup_time || cityData['DUT']?.mean_setup_time || 0]}
                                refValues={[cityData['REF MO']?.mean_setup_time || cityData['REF']?.mean_setup_time || 0]}
                            />
                            <WfcPerformanceChart
                                title="Average MOS"
                                labels={['MO', 'MT']}
                                yAxisTitle="Score"
                                dutValues={[
                                    cityData['DUT MO']?.mos_average || cityData['DUT']?.mos_average || 0,
                                    cityData['DUT MT']?.mos_average || 0
                                ]}
                                refValues={[
                                    cityData['REF MO']?.mos_average || cityData['REF']?.mos_average || 0,
                                    cityData['REF MT']?.mos_average || 0
                                ]}
                            />
                            <div className="metric-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <table className="mini-performance-table general-table-style" style={{ width: '100%', marginBottom: '10px', fontSize: '12px' }}>
                                    <thead>
                                        <tr>
                                            <th>RSSI (dBm)</th>
                                            <th>MO</th>
                                            <th>MT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>DUT</td>
                                            <td>{parseFloat(cityData['DUT MO']?.rssi_average).toFixed(2) || parseFloat(cityData['DUT']?.rssi_average).toFixed(2) || 'N/A'}</td>
                                            <td>{parseFloat(cityData['DUT MT']?.rssi_average).toFixed(2) || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td>REF</td>
                                            <td>{parseFloat(cityData['REF MO']?.rssi_average).toFixed(2) || parseFloat(cityData['REF']?.rssi_average).toFixed(2) || 'N/A'}</td>
                                            <td>{parseFloat(cityData['REF MT']?.rssi_average).toFixed(2) || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <WfcPerformanceChart
                                    title="Average RSSI"
                                    labels={['MO', 'MT']}
                                    yAxisTitle="RSSI (dBm)"
                                    dutValues={[
                                        parseFloat(cityData['DUT MO']?.rssi_average).toFixed(2) || parseFloat(cityData['DUT']?.rssi_average).toFixed(2) || 0,
                                        parseFloat(cityData['DUT MT']?.rssi_average).toFixed(2) || 0
                                    ]}
                                    refValues={[
                                        parseFloat(cityData['REF MO']?.rssi_average).toFixed(2) || parseFloat(cityData['REF']?.rssi_average).toFixed(2) || 0,
                                        parseFloat(cityData['REF MT']?.rssi_average).toFixed(2) || 0
                                    ]}
                                />
                            </div>
                            <div className="metric-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <table className="mini-performance-table general-table-style" style={{ width: '100%', marginBottom: '10px', fontSize: '12px' }}>
                                    <thead>
                                        <tr>
                                            <th>RSRP (dBm)</th>
                                            <th>MO</th>
                                            <th>MT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>DUT</td>
                                            <td>{parseFloat(cityData['DUT MO']?.rsrp_average).toFixed(2) || parseFloat(cityData['DUT']?.rsrp_average).toFixed(2) || 'N/A'}</td>
                                            <td>{parseFloat(cityData['DUT MT']?.rsrp_average).toFixed(2) || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td>REF</td>
                                            <td>{parseFloat(cityData['REF MO']?.rsrp_average).toFixed(2) || parseFloat(cityData['REF']?.rsrp_average).toFixed(2) || 'N/A'}</td>
                                            <td>{parseFloat(cityData['REF MT']?.rsrp_average).toFixed(2) || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <WfcPerformanceChart
                                    title="Average RSRP"
                                    labels={['MO', 'MT']}
                                    yAxisTitle="RSRP (dBm)"
                                    dutValues={[
                                        parseFloat(cityData['DUT MO']?.rsrp_average).toFixed(2) || parseFloat(cityData['DUT']?.rsrp_average).toFixed(2) || 0,
                                        parseFloat(cityData['DUT MT']?.rsrp_average).toFixed(2) || 0
                                    ]}
                                    refValues={[
                                        parseFloat(cityData['REF MO']?.rsrp_average).toFixed(2) || parseFloat(cityData['REF']?.rsrp_average).toFixed(2) || 0,
                                        parseFloat(cityData['REF MT']?.rsrp_average).toFixed(2) || 0
                                    ]}
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