import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './Table/DpDetailsTableLoc3';
import DpThroughputOverallTable from '../DpThroughputOverallTable';
import DpBoxPlot from './DpBoxPlot';
import DpHistogramComponent from '../DpHistogramComponent';
import DpCDF_Chart from '../DpCDF_Chart';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';

import { useEffect } from 'react';

function Dp_httpMS_Component({ city: propCity }) {
    const { city: globalCity, projectData, project, loadCityData } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = projectData[city];

    // Update to use dataPerformance from the fetched JSON
    if (!reportData) {
        return <PageBreak>Loading {city} data...</PageBreak>;
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
        const values = [dataObj.Good[device][field], dataObj.Moderate[device][field], dataObj.Poor[device][field]].filter(v => typeof v === 'number' && v > 0);
        return values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : "N/A";
    };

    const calculateOverallMin = (dataObj, device) => {
        const values = [dataObj.Good[device].Minimum, dataObj.Moderate[device].Minimum, dataObj.Poor[device].Minimum].filter(v => typeof v === 'number' && v > 0);
        return values.length > 0 ? Math.min(...values).toFixed(2) : "N/A";
    };

    const calculateOverallMax = (dataObj, device) => {
        const values = [dataObj.Good[device].Maximum, dataObj.Moderate[device].Maximum, dataObj.Poor[device].Maximum].filter(v => typeof v === 'number' && v > 0);
        return values.length > 0 ? Math.max(...values).toFixed(2) : "N/A";
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

    const getBoxPlotData = (dataSource) => {
        const categories = ['Good', 'Moderate', 'Poor'];
        const plotData = [];

        categories.forEach(cat => {
            ['DUT', 'REF'].forEach(dev => {
                const stats = dataSource[cat][dev];
                // Skip if mean is 0 (likely no data)
                if (!stats || stats.Mean === 0) return;

                let min = stats.Minimum;
                let max = stats.Maximum;
                let q1 = stats.Q1;
                let median = stats.Median;
                let q3 = stats.Q3;
                // Use empty array if Outliers is missing
                let outliers = stats.Outliers || [];

                // Fallback estimation if Q1 is missing
                if (q1 === undefined) {
                    const mean = stats.Mean;
                    const stdDev = stats['Standard Deviation'];
                    median = mean;
                    q1 = mean - 0.675 * stdDev;
                    q3 = mean + 0.675 * stdDev;

                    // Ensure Q1/Q3 are within Min/Max
                    q1 = Math.max(min, q1);
                    q3 = Math.min(max, q3);
                }

                plotData.push({
                    x: `${cat} (${dev})`,
                    min: min,
                    q1: q1,
                    median: median,
                    q3: q3,
                    max: max,
                    outliers: outliers
                });
            });
        });
        return plotData;
    };

    const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];
    const combinedOverallTableData = [
        ["Average (Mbps)", "DUT", calculateOverallMean(httpMS_Stationary_DL, 'DUT'), calculateOverallMean(httpMS_Stationary_UL, 'DUT')],
        ["Average (Mbps)", "REF", calculateOverallMean(httpMS_Stationary_DL, 'REF'), calculateOverallMean(httpMS_Stationary_UL, 'REF')],
        ["Standard Deviation (Mbps)", "DUT", calculateOverallMean(httpMS_Stationary_DL, 'DUT', 'Standard Deviation'), calculateOverallMean(httpMS_Stationary_UL, 'DUT', 'Standard Deviation')],
        ["Standard Deviation (Mbps)", "REF", calculateOverallMean(httpMS_Stationary_DL, 'REF', 'Standard Deviation'), calculateOverallMean(httpMS_Stationary_UL, 'REF', 'Standard Deviation')],
        ["Maximum (Mbps)", "DUT", calculateOverallMax(httpMS_Stationary_DL, 'DUT'), calculateOverallMax(httpMS_Stationary_UL, 'DUT')],
        ["Maximum (Mbps)", "REF", calculateOverallMax(httpMS_Stationary_DL, 'REF'), calculateOverallMax(httpMS_Stationary_UL, 'REF')],
        ["Minimum (Mbps)", "DUT", calculateOverallMin(httpMS_Stationary_DL, 'DUT'), calculateOverallMin(httpMS_Stationary_UL, 'DUT')],
        ["Minimum (Mbps)", "REF", calculateOverallMin(httpMS_Stationary_DL, 'REF'), calculateOverallMin(httpMS_Stationary_UL, 'REF')],
    ];


    const barKeys = [
        { key: 'DUT', fill: CHART_COLOR_DUT },
        { key: 'REF', fill: CHART_COLOR_REF },
    ];

    return (
        <>
            <PageBreak>
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
                            dutValue: calculateOverallMean(httpMS_Stationary_DL, 'DUT'),
                            refValue: calculateOverallMean(httpMS_Stationary_DL, 'REF'),
                        },
                        {
                            rowIndex: 0,
                            colIndex: 3,
                            dutValue: calculateOverallMean(httpMS_Stationary_UL, 'DUT'),
                            refValue: calculateOverallMean(httpMS_Stationary_UL, 'REF'),
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

            </PageBreak>

            <PageBreak>
                <DpHistogramComponent
                    data={dlHistogramData}
                    title="Http Multi Stream Download Throughput"
                    yAxisLabel="Throughput (Mbps)"
                    barKeys={barKeys}
                />
                <DpBoxPlot
                    data={getBoxPlotData(httpMS_Stationary_DL)}
                    title="Http Multi Stream Download Throughput Box Plot"
                    yAxisLabel="Throughput (Mbps)"
                />
            </PageBreak>

            <PageBreak>
                <DpCDF_Chart
                    project={project}
                    city={city}
                    dutFilename="5g_auto_dp_http_multi_stream_dl_good_dut.json"
                    refFilename="5g_auto_dp_http_multi_stream_dl_good_ref.json"
                    title="HTTP MS DL Good CDF (DUT vs REF)"
                />
                <DpCDF_Chart
                    project={project}
                    city={city}
                    dutFilename="5g_auto_dp_http_multi_stream_dl_moderate_dut.json"
                    refFilename="5g_auto_dp_http_multi_stream_dl_moderate_ref.json"
                    title="HTTP MS DL Moderate CDF (DUT vs REF)"
                />
                <DpCDF_Chart
                    project={project}
                    city={city}
                    dutFilename="5g_auto_dp_http_multi_stream_dl_poor_dut.json"
                    refFilename="5g_auto_dp_http_multi_stream_dl_poor_ref.json"
                    title="HTTP MS DL Poor CDF (DUT vs REF)"
                />
            </PageBreak>
            <PageBreak>
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
            </PageBreak>

            <PageBreak>
                <DpBoxPlot
                    data={getBoxPlotData(httpMS_Stationary_UL)}
                    title="Http Multi Stream Upload Throughput Box Plot"
                    yAxisLabel="Throughput (Mbps)"
                />
            </PageBreak>

            <PageBreak>
                <DpCDF_Chart
                    project={project}
                    city={city}
                    dutFilename="5g_auto_dp_http_multi_stream_ul_good_dut.json"
                    refFilename="5g_auto_dp_http_multi_stream_ul_good_ref.json"
                    title="HTTP MS UL Good CDF (DUT vs REF)"
                />
                <DpCDF_Chart
                    project={project}
                    city={city}
                    dutFilename="5g_auto_dp_http_multi_stream_ul_moderate_dut.json"
                    refFilename="5g_auto_dp_http_multi_stream_ul_moderate_ref.json"
                    title="HTTP MS UL Moderate CDF (DUT vs REF)"
                />
                <DpCDF_Chart
                    project={project}
                    city={city}
                    dutFilename="5g_auto_dp_http_multi_stream_ul_poor_dut.json"
                    refFilename="5g_auto_dp_http_multi_stream_ul_poor_ref.json"
                    title="HTTP MS UL Poor CDF (DUT vs REF)"
                />
            </PageBreak>
        </>

    );
};

export default Dp_httpMS_Component;