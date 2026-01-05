import React, { useEffect } from 'react';
import CpCaseTable from './CpCaseTable';
import PValueTable from './PValueTable';
import CallSummaryChart from './CallSummaryChart';
import CallCategoriesChart from './CallCategoriesChart';
import CallCategoriesTable from './CallCategoriesTable';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { useReportData } from '../../Contexts/ReportContext';

const CpScenarioSection = ({ title, city, isFirst }) => {
    const { allReportData, loadCityData, loading } = useReportData();

    // Ensure data for the specified city is loaded
    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    // Read the data for this specific city and scenario
    const reportData = allReportData[city];
    const data = reportData?.callPerformance?.['Call Performance']?.[title];

    if (loading && !reportData) {
        return <div className='page-content'>Loading {city} data...</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <div className='page-content'>
            {isFirst && <DynamicHeader level={1}>Call Performance Test - {city}</DynamicHeader>}
            <CpCaseTable title={title} data={data} />
            <PValueTable data={data} />
            <CallSummaryChart data={data} />
            <CallCategoriesChart data={data} />
            <CallCategoriesTable data={data} />
        </div>
    );
};

export default CpScenarioSection;
