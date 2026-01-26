import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';

import PValueTable from '../CallPerformance/PValueTable';
import WfcPerformanceChart from './WfcPerformanceChart';
import WfcMosLineChart from './WfcMosLineChart';

const WfcTestDetailsPage = ({ tc, label, isFirst = false }) => {
    const { allReportData, availableCities } = useReportData();

    const renderMarketTable = (city) => {
        const cityData = allReportData[city]?.wfcPerformance?.['WFC']?.[tc];
        if (!cityData) return null;

        const devices = [
            { name: 'DUT', moKey: 'DUT MO', mtKey: 'DUT MT' },
            { name: 'REF', moKey: 'REF MO', mtKey: 'REF MT' }
        ];

        const moInitFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_initiation_failures / cityData['DUT MO']?.total_mo_attempts : 0;
        const moRetFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_retention_failures / cityData['DUT MO']?.total_mo_attempts : 0;

        return (
            <div key={city} className="market-section" style={{ marginBottom: '60px', pageBreakAfter: 'always' }}>
                {isFirst && <DynamicHeader level={1}>WFC Performance Test Details</DynamicHeader>}
                <DynamicHeader level={2}>{label} - {city} ({tc})</DynamicHeader>
                <table className="performance-table general-table-style">
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Attempts</th>
                            <th>Mean Setup Time (s)</th>
                            <th>Initiations Failure (%)</th>
                            <th>Retention Failure (%)</th>
                            <th>MO MOS</th>
                            <th>MT MOS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(({ name, moKey, mtKey }) => {
                            const moData = cityData[moKey];
                            const mtData = cityData[mtKey];
                            if (!moData && !mtData) return null;

                            const refMoData = cityData[moKey.includes('DUT') ? 'REF MO' : moKey];
                            const refMtData = cityData[mtKey.includes('DUT') ? 'REF MT' : mtKey];

                            const initFailPct = moData?.total_mo_attempts > 0 ? (moData.total_initiation_failures / moData.total_mo_attempts * 100).toFixed(1) : '0.0';
                            const retFailPct = moData?.total_mo_attempts > 0 ? (moData.total_retention_failures / moData.total_mo_attempts * 100).toFixed(1) : '0.0';

                            return (
                                <tr key={name}>
                                    <td>{name}</td>
                                    <td>{moData?.total_mo_attempts || 'N/A'}</td>
                                    <td style={{ backgroundColor: getKpiCellColor('CallSetupTime', moData?.mean_setup_time, refMoData?.mean_setup_time) }}>
                                        {moData?.mean_setup_time?.toFixed(2) || 'N/A'}
                                    </td>
                                    <td>{initFailPct}%</td>
                                    <td>{retFailPct}%</td>
                                    <td style={{ backgroundColor: getKpiCellColor('WfcMOS', moData?.mos_average, refMoData?.mos_average) }}>
                                        {moData?.mos_average?.toFixed(2) || 'N/A'}
                                    </td>
                                    <td style={{ backgroundColor: getKpiCellColor('WfcMOS', mtData?.mos_average, refMtData?.mos_average) }}>
                                        {mtData?.mos_average?.toFixed(2) || 'N/A'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="charts-grid-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '30px', width: '100%', boxSizing: 'border-box' }}>
                    <WfcPerformanceChart
                        title="Mean Setup Time"
                        labels={['Setup Time']}
                        yAxisTitle="Time (s)"
                        dutValues={[cityData['DUT MO']?.mean_setup_time || 0]}
                        refValues={[cityData['REF MO']?.mean_setup_time || 0]}
                    />
                    <WfcPerformanceChart
                        title="Average MOS"
                        labels={['MO MOS', 'MT MOS']}
                        yAxisTitle="Score"
                        dutValues={[cityData['DUT MO']?.mos_average || 0, cityData['DUT MT']?.mos_average || 0]}
                        refValues={[cityData['REF MO']?.mos_average || 0, cityData['REF MT']?.mos_average || 0]}
                    />
                </div>

                <div>
                    <WfcMosLineChart tc={tc} city={city} />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <PValueTable
                        data={cityData}
                        kpiType="WfcCallCriteria"
                        initFailureRate={moInitFailureRate}
                        retFailureRate={moRetFailureRate}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="page-content">
            {availableCities.map(city => renderMarketTable(city))}
        </div>
    );
};

export default WfcTestDetailsPage;