import React, { useEffect } from 'react';
import CpCaseTable from './CpCaseTable';
import PValueTable from './PValueTable';
import CallSummaryChart from './CallSummaryChart';
import CallCategoriesChart from './CallCategoriesChart';
import CallCategoriesTable from './CallCategoriesTable';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { useReportData } from '../../Contexts/ReportContext';
import PageBreak from '../../CommonPage/PageBreak';

const CpScenarioSection = ({ title, city, isFirst = false }) => {
    const { projectData, loadCityData, loading } = useReportData();

    // Ensure data for the specified city is loaded
    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    // Read the data for this specific city and scenario
    const reportData = projectData[city];
    const data = reportData?.callPerformance?.['Call Performance']?.[title];

    if (loading && !reportData) {
        return <PageBreak>Loading {city} data...</PageBreak>;
    }

    if (!data) {
        return null;
    }

    return (
        <PageBreak>
            {isFirst && <DynamicHeader level={1}>Call Performance Test </DynamicHeader>}
            <CpCaseTable title={title} data={data} city={city} />
            <PValueTable data={data} />
            <CallSummaryChart data={data} />
            <CallCategoriesChart data={data} />
            <CallCategoriesTable data={data} />
        </PageBreak>
    );
};

export default CpScenarioSection;
