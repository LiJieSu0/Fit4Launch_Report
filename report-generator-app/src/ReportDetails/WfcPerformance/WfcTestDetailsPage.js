import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { getKpiCellColor } from '../../Utils/KpiRules';

import PValueTable from '../CallPerformance/PValueTable';

const WfcTestDetailsPage = ({ tc, label }) => {
    const { allReportData, availableCities } = useReportData();

    const renderMarketTable = (city) => {
        const cityData = allReportData[city]?.wfcPerformance?.['WFC']?.[tc];
        if (!cityData) return null;

        const scenarios = [
            { key: 'DUT MO', device: 'DUT', mode: 'MO' },
            { key: 'DUT MT', device: 'DUT', mode: 'MT' },
            { key: 'REF MO', device: 'REF', mode: 'MO' },
            { key: 'REF MT', device: 'REF', mode: 'MT' }
        ];

        const initFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_initiation_failures / cityData['DUT MO']?.total_mo_attempts : 0;
        const retFailureRate = cityData['DUT MO']?.total_mo_attempts > 0 ? cityData['DUT MO']?.total_retention_failures / cityData['DUT MO']?.total_mo_attempts : 0;

        return (
            <div key={city} className="market-section" style={{ marginBottom: '40px' }}>
                <DynamicHeader level={2}>{label} - {city} ({tc})</DynamicHeader>
                <table className="performance-table general-table-style">
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Scenario</th>
                            <th>MOS Average</th>
                            <th>Mean Setup Time (s)</th>
                            <th>Attempts</th>
                            <th>Init Failure (%)</th>
                            <th>Ret Failure (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scenarios.map(({ key, device, mode }) => {
                            const data = cityData[key];
                            if (!data) return null;

                            const refKey = key.includes('DUT') ? key.replace('DUT', 'REF') : key;
                            const refData = cityData[refKey];

                            const initFailPct = data.total_mo_attempts > 0 ? (data.total_initiation_failures / data.total_mo_attempts * 100).toFixed(1) : '0.0';
                            const retFailPct = data.total_mo_attempts > 0 ? (data.total_retention_failures / data.total_mo_attempts * 100).toFixed(1) : '0.0';

                            return (
                                <tr key={key}>
                                    <td>{device}</td>
                                    <td>{mode}</td>
                                    <td style={{ backgroundColor: getKpiCellColor('WfcMOS', data.mos_average, refData?.mos_average) }}>
                                        {data.mos_average?.toFixed(2) || 'N/A'}
                                    </td>
                                    <td style={{ backgroundColor: getKpiCellColor('CallSetupTime', data.mean_setup_time, refData?.mean_setup_time) }}>
                                        {data.mean_setup_time?.toFixed(2) || 'N/A'}
                                    </td>
                                    <td>{data.total_mo_attempts || 'N/A'}</td>
                                    <td>{initFailPct}%</td>
                                    <td>{retFailPct}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <PValueTable
                    data={cityData}
                    kpiType="WfcCallCriteria"
                    initFailureRate={initFailureRate}
                    retFailureRate={retFailureRate}
                />
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