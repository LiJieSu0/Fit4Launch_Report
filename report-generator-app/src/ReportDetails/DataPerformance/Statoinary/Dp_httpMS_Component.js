import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './Table/DpDetailsTableLoc3';
import DpThroughputOverallTable from '../DpThroughputOverallTable';
import DpRangeChart from '../DpRangeChart';
import DpHistogramComponent from '../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

import { useEffect } from 'react';

function Dp_httpMS_Component({ city: propCity }) {
    const { city: globalCity, allReportData, loadCityData } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = allReportData[city];

    // Update to use dataPerformance from the fetched JSON
    if (!reportData) {
        return <div className="page-content">Loading {city} data...</div>;
    }

    if (reportData.dataPerformance === null) {
        return null; // Hide if data is missing
    }

    // Path: ["Data Performance"]["5G AUTO DP"]["HTTP Multi Stream"]
    const httpMS_Data_Source = reportData.dataPerformance?.["Data Performance"]?.["5G AUTO DP"]?.["HTTP Multi Stream"] || { DL: {}, UL: {} };

    const defaultThroughput = { Mean: 0, "Standard Deviation": 0, Minimum: 0, Maximum: 0 };

    const getThroughput = (dir, category, device) => {
        return httpMS_Data_Source?.[dir]?.[category]?.[device]?.Throughput || defaultThroughput;
    };

    const httpMS_Stationary_DL = {
        Good: {
            DUT: getThroughput('DL', 'Good', 'DUT'),
            REF: getThroughput('DL', 'Good', 'REF'),
        },
        Moderate: {
            DUT: getThroughput('DL', 'Moderate', 'DUT'),
            REF: getThroughput('DL', 'Moderate', 'REF'),
        },
        Poor: {
            DUT: getThroughput('DL', 'Poor', 'DUT'),
            REF: getThroughput('DL', 'Poor', 'REF'),
        },
    };

    const httpMS_Stationary_UL = {
        Good: {
            DUT: getThroughput('UL', 'Good', 'DUT'),
            REF: getThroughput('UL', 'Good', 'REF'),
        },
        Moderate: {
            DUT: getThroughput('UL', 'Moderate', 'DUT'),
            REF: getThroughput('UL', 'Moderate', 'REF'),
        },
        Poor: {
            DUT: getThroughput('UL', 'Poor', 'DUT'),
            REF: getThroughput('UL', 'Poor', 'REF'),
        },
    };

    // Helper to calculate average only for non-zero means (available data)
    const calculateOverallMean = (dataObj, device, field = 'Mean') => {
        const values = [dataObj.Good[device][field], dataObj.Moderate[device][field], dataObj.Poor[device][field]].filter(v => v > 0);
        return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    };

    const calculateOverallMin = (dataObj, device) => {
        const values = [dataObj.Good[device].Minimum, dataObj.Moderate[device].Minimum, dataObj.Poor[device].Minimum].filter(v => v > 0);
        return values.length > 0 ? Math.min(...values) : 0;
    };

    const calculateOverallMax = (dataObj, device) => {
        const values = [dataObj.Good[device].Maximum, dataObj.Moderate[device].Maximum, dataObj.Poor[device].Maximum].filter(v => v > 0);
        return values.length > 0 ? Math.max(...values) : 0;
    };

    const dlRangeChartData = {
        Good: {
            dutMin: httpMS_Stationary_DL.Good.DUT.Minimum,
            dutMax: httpMS_Stationary_DL.Good.DUT.Maximum,
            refMin: httpMS_Stationary_DL.Good.REF.Minimum,
            refMax: httpMS_Stationary_DL.Good.REF.Maximum,
            dutMean: httpMS_Stationary_DL.Good.DUT.Mean,
            refMean: httpMS_Stationary_DL.Good.REF.Mean,
        },
        Moderate: {
            dutMin: httpMS_Stationary_DL.Moderate.DUT.Minimum,
            dutMax: httpMS_Stationary_DL.Moderate.DUT.Maximum,
            refMin: httpMS_Stationary_DL.Moderate.REF.Minimum,
            refMax: httpMS_Stationary_DL.Moderate.REF.Maximum,
            dutMean: httpMS_Stationary_DL.Moderate.DUT.Mean,
            refMean: httpMS_Stationary_DL.Moderate.REF.Mean,
        },
        Poor: {
            dutMin: httpMS_Stationary_DL.Poor.DUT.Minimum,
            dutMax: httpMS_Stationary_DL.Poor.DUT.Maximum,
            refMin: httpMS_Stationary_DL.Poor.REF.Minimum,
            refMax: httpMS_Stationary_DL.Poor.REF.Maximum,
            dutMean: httpMS_Stationary_DL.Poor.DUT.Mean,
            refMean: httpMS_Stationary_DL.Poor.REF.Mean,
        },
        Overall: {
            dutMin: calculateOverallMin(httpMS_Stationary_DL, 'DUT'),
            dutMax: calculateOverallMax(httpMS_Stationary_DL, 'DUT'),
            refMin: calculateOverallMin(httpMS_Stationary_DL, 'REF'),
            refMax: calculateOverallMax(httpMS_Stationary_DL, 'REF'),
            dutMean: calculateOverallMean(httpMS_Stationary_DL, 'DUT'),
            refMean: calculateOverallMean(httpMS_Stationary_DL, 'REF'),
        },
    };

    const ulRangeChartData = {
        Good: {
            dutMin: httpMS_Stationary_UL.Good.DUT.Minimum,
            dutMax: httpMS_Stationary_UL.Good.DUT.Maximum,
            refMin: httpMS_Stationary_UL.Good.REF.Minimum,
            refMax: httpMS_Stationary_UL.Good.REF.Maximum,
            dutMean: httpMS_Stationary_UL.Good.DUT.Mean,
            refMean: httpMS_Stationary_UL.Good.REF.Mean,
        },
        Moderate: {
            dutMin: httpMS_Stationary_UL.Moderate.DUT.Minimum,
            dutMax: httpMS_Stationary_UL.Moderate.DUT.Maximum,
            refMin: httpMS_Stationary_UL.Moderate.REF.Minimum,
            refMax: httpMS_Stationary_UL.Moderate.REF.Maximum,
            dutMean: httpMS_Stationary_UL.Moderate.DUT.Mean,
            refMean: httpMS_Stationary_UL.Moderate.REF.Mean,
        },
        Poor: {
            dutMin: httpMS_Stationary_UL.Poor.DUT.Minimum,
            dutMax: httpMS_Stationary_UL.Poor.DUT.Maximum,
            refMin: httpMS_Stationary_UL.Poor.REF.Minimum,
            refMax: httpMS_Stationary_UL.Poor.REF.Maximum,
            dutMean: httpMS_Stationary_UL.Poor.DUT.Mean,
            refMean: httpMS_Stationary_UL.Poor.REF.Mean,
        },
        Overall: {
            dutMin: calculateOverallMin(httpMS_Stationary_UL, 'DUT'),
            dutMax: calculateOverallMax(httpMS_Stationary_UL, 'DUT'),
            refMin: calculateOverallMin(httpMS_Stationary_UL, 'REF'),
            refMax: calculateOverallMax(httpMS_Stationary_UL, 'REF'),
            dutMean: calculateOverallMean(httpMS_Stationary_UL, 'DUT'),
            refMean: calculateOverallMean(httpMS_Stationary_UL, 'REF'),
        },
    };

    const dlHistogramData = [
        { name: 'Good', DUT: httpMS_Stationary_DL.Good.DUT.Mean, REF: httpMS_Stationary_DL.Good.REF.Mean },
        { name: 'Moderate', DUT: httpMS_Stationary_DL.Moderate.DUT.Mean, REF: httpMS_Stationary_DL.Moderate.REF.Mean },
        { name: 'Poor', DUT: httpMS_Stationary_DL.Poor.DUT.Mean, REF: httpMS_Stationary_DL.Poor.REF.Mean },
        {
            name: 'Overall',
            DUT: calculateOverallMean(httpMS_Stationary_DL, 'DUT'),
            REF: calculateOverallMean(httpMS_Stationary_DL, 'REF')
        },
    ];

    const ulHistogramData = [
        { name: 'Good', DUT: httpMS_Stationary_UL.Good.DUT.Mean, REF: httpMS_Stationary_UL.Good.REF.Mean },
        { name: 'Moderate', DUT: httpMS_Stationary_UL.Moderate.DUT.Mean, REF: httpMS_Stationary_UL.Moderate.REF.Mean },
        { name: 'Poor', DUT: httpMS_Stationary_UL.Poor.DUT.Mean, REF: httpMS_Stationary_UL.Poor.REF.Mean },
        {
            name: 'Overall',
            DUT: calculateOverallMean(httpMS_Stationary_UL, 'DUT'),
            REF: calculateOverallMean(httpMS_Stationary_UL, 'REF')
        },
    ];

    const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];
    const combinedOverallTableData = [
        ["Average (Mbps)", "DUT", calculateOverallMean(httpMS_Stationary_DL, 'DUT').toFixed(2), calculateOverallMean(httpMS_Stationary_UL, 'DUT').toFixed(2)],
        ["Average (Mbps)", "REF", calculateOverallMean(httpMS_Stationary_DL, 'REF').toFixed(2), calculateOverallMean(httpMS_Stationary_UL, 'REF').toFixed(2)],
        ["Standard Deviation (Mbps)", "DUT", calculateOverallMean(httpMS_Stationary_DL, 'DUT', 'Standard Deviation').toFixed(2), calculateOverallMean(httpMS_Stationary_UL, 'DUT', 'Standard Deviation').toFixed(2)],
        ["Standard Deviation (Mbps)", "REF", calculateOverallMean(httpMS_Stationary_DL, 'REF', 'Standard Deviation').toFixed(2), calculateOverallMean(httpMS_Stationary_UL, 'REF', 'Standard Deviation').toFixed(2)],
        ["Maximum (Mbps)", "DUT", calculateOverallMax(httpMS_Stationary_DL, 'DUT').toFixed(2), calculateOverallMax(httpMS_Stationary_UL, 'DUT').toFixed(2)],
        ["Maximum (Mbps)", "REF", calculateOverallMax(httpMS_Stationary_DL, 'REF').toFixed(2), calculateOverallMax(httpMS_Stationary_UL, 'REF').toFixed(2)],
        ["Minimum (Mbps)", "DUT", calculateOverallMin(httpMS_Stationary_DL, 'DUT').toFixed(2), calculateOverallMin(httpMS_Stationary_UL, 'DUT').toFixed(2)],
        ["Minimum (Mbps)", "REF", calculateOverallMin(httpMS_Stationary_DL, 'REF').toFixed(2), calculateOverallMin(httpMS_Stationary_UL, 'REF').toFixed(2)],
    ];


    const barKeys = [
        { key: 'DUT', fill: CHART_COLOR_DUT },
        { key: 'REF', fill: CHART_COLOR_REF },
    ];

    return (
        <>
            <div className='page-content'>
                <DynamicHeader level={2}>HTTP Multi Stream Test Download & Upload - 5G Auto - {city}</DynamicHeader>
                <h4>Http Multi Stream Overview</h4>
                <DpThroughputOverallTable
                    tableHeader={overallTableHeader}
                    tableData={combinedOverallTableData}
                    kpiRule="Throughput"
                    kpiTargetCells={[
                        {
                            rowIndex: 0,
                            colIndex: 2,
                            dutValue: calculateOverallMean(httpMS_Stationary_DL, 'DUT').toFixed(2),
                            refValue: calculateOverallMean(httpMS_Stationary_DL, 'REF').toFixed(2),
                        },
                        {
                            rowIndex: 0,
                            colIndex: 3,
                            dutValue: calculateOverallMean(httpMS_Stationary_UL, 'DUT').toFixed(2),
                            refValue: calculateOverallMean(httpMS_Stationary_UL, 'REF').toFixed(2),
                        },
                    ]}
                />
                <DpDetailsTableLoc3
                    data={httpMS_Stationary_DL}
                    tableName="Http Multi Stream DL Details"
                    kpiRule="Throughput"
                    kpiTargetCells={[
                        {
                            dutValue: calculateOverallMean(httpMS_Stationary_DL, 'DUT'),
                            refValue: calculateOverallMean(httpMS_Stationary_DL, 'REF'),
                        },
                    ]}
                />

            </div>

            <div className='page-content'>
                <DpHistogramComponent
                    data={dlHistogramData}
                    title="Http Multi Stream Download Throughput"
                    yAxisLabel="Throughput (Mbps)"
                    barKeys={barKeys}
                />
                <DpRangeChart
                    data={dlRangeChartData}
                    chartTitle="Http Multi Stream Download Throughput Range"
                    yAxisTitle="Throughput (Mbps)"
                />
            </div>
            <div className='page-content'>
                <DpDetailsTableLoc3
                    data={httpMS_Stationary_UL}
                    tableName="Http Multi Stream UL Details"
                    kpiRule="Throughput"
                    kpiTargetCells={[
                        {
                            dutValue: calculateOverallMean(httpMS_Stationary_UL, 'DUT'),
                            refValue: calculateOverallMean(httpMS_Stationary_UL, 'REF'),
                        },
                    ]}
                />

                <DpHistogramComponent
                    data={ulHistogramData}
                    title="Http Multi Stream Upload Throughput"
                    yAxisLabel="Throughput (Mbps)"
                    barKeys={barKeys}
                />
            </div>

            <div className='page-content'>
                <DpRangeChart
                    data={ulRangeChartData}
                    chartTitle="Http Multi Stream Upload Throughput Range"
                    yAxisTitle="Throughput (Mbps)"
                />
            </div>
        </>

    );
};

export default Dp_httpMS_Component;