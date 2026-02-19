import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

const WfcCallPerformance = ({ title, tc }) => {
    const { projectData, availableCities } = useReportData();
    const tcList = tc ? tc.split(' ').filter(Boolean) : [];

    // Helper to format numeric values for display
    const formatVal = (val) => {
        if (val === undefined || val === null || val === 'N/A') return 'N/A';
        const num = parseFloat(val);
        return isNaN(num) ? 'N/A' : num.toFixed(2);
    };

    const renderMarketAndTc = (city) => {
        return (
            <div key={city}>
                {tcList.map((testCase, index) => {
                    const cityData = projectData[city]?.wfcPerformance?.['WFC']?.[testCase];

                    // IF there's no data for this specific TC in this city, we might just skip rendering or show placeholders
                    if (!cityData) {
                        return (
                            <div key={testCase} style={{ marginBottom: '20px' }}>
                                <p>No data found for Test Case: {testCase} in {city}</p>
                            </div>
                        );
                    }

                    return (
                        <div key={testCase} style={{ marginBottom: '20px' }}>
                            <p>讀取到 Test Case: {testCase} in {city}</p>
                            <p>DUT 平均成功建立時間 (MO): {formatVal(cityData['DUT MO']?.mean_setup_time)}</p>
                            {/* 之後可以在這裡實作表格或圖表 */}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <PageBreak>
                <DynamicHeader level={2}>{title}</DynamicHeader>
            </PageBreak>
        </>
    );
};

export default WfcCallPerformance;
