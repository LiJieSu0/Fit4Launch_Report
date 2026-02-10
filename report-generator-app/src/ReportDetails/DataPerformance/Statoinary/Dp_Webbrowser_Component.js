import React from "react";
import DpWebTable from "./Table/DpWebTable";
import DpWebOverallTable from "./Table/DpWebOverallTable";
import DpHistogramComponent from "../DpHistogramComponent";
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

import { useEffect } from 'react';

function Dp_Webbrowser_Component({ city: propCity, webPageUrl }) {
    const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = projectData[city];

    if (!reportData) {
        return <div className="page-content">Loading {city} data...</div>;
    }

    if (reportData.dataPerformance === null) {
        return null; // Hide the component if the data file is missing
    }

    // Update to use dataPerformance from the fetched JSON
    // Path: ["Data Performance"]["5G AUTO DP"]["5G Auto Data Web-Kepler"]
    const WebBrowserData = reportData.dataPerformance?.["Data Performance"]?.["5G AUTO DP"]?.["5G Auto Data Web-Kepler"] || { DUT: {}, REF: {} };

    const defaultMetric = { Mean: 0, "Standard Deviation": 0, Maximum: 0, Minimum: 0 };
    const dutData = WebBrowserData.DUT?.["Web Page Load Time"] || defaultMetric;
    const refData = WebBrowserData.REF?.["Web Page Load Time"] || defaultMetric;

    const Dp_WebData = [
        { category: "Average", dut: { device: "DUT", overall: (dutData.Mean || 0).toFixed(3) }, ref: { device: "REF", overall: (refData.Mean || 0).toFixed(3) } },
        { category: "Standard Deviation", dut: { device: "DUT", overall: (dutData["Standard Deviation"] || 0).toFixed(3) }, ref: { device: "REF", overall: (refData["Standard Deviation"] || 0).toFixed(3) } },
        { category: "Maximum", dut: { device: "DUT", overall: (dutData.Maximum || 0).toFixed(3) }, ref: { device: "REF", overall: (refData.Maximum || 0).toFixed(3) } },
        { category: "Minimum", dut: { device: "DUT", overall: (dutData.Minimum || 0).toFixed(3) }, ref: { device: "REF", overall: (refData.Minimum || 0).toFixed(3) } },
    ];

    const overallTableData = {
        average: { DUT: { Overall: (dutData.Mean || 0).toFixed(3) }, REF: { Overall: (refData.Mean || 0).toFixed(3) } },
        std_dev: { DUT: { Overall: (dutData["Standard Deviation"] || 0).toFixed(3) }, REF: { Overall: (refData["Standard Deviation"] || 0).toFixed(3) } },
        max: { DUT: { Overall: (dutData.Maximum || 0).toFixed(3) }, REF: { Overall: (refData.Maximum || 0).toFixed(3) } },
        min: { DUT: { Overall: (dutData.Minimum || 0).toFixed(3) }, REF: { Overall: (refData.Minimum || 0).toFixed(3) } },
    };

    const histogramData = [
        { name: "Mean", DUT: dutData.Mean || 0, REF: refData.Mean || 0 },
    ];

    const barKeys = [
        { key: "DUT", fill: CHART_COLOR_DUT },
        { key: "REF", fill: CHART_COLOR_REF },
    ];

    return (
        <div className='page-content'>
            <DynamicHeader level={2}>Web Browser Test - 5G Auto - {city}</DynamicHeader>
            <h4>Web Browser Test Overview</h4>
            <p>Web Browser test URL: {webPageUrl}</p>
            <DpWebOverallTable data={overallTableData} />
            {/* <h3>Web Browser Test Details</h3> */}
            {/* <DpWebTable data={Dp_WebData} /> */}
            {/* <DpHistogramComponent
                data={histogramData}
                title="Web Page Load Time - Mean"
                yAxisLabel="Time (s)"
                barKeys={barKeys}
            /> */}
        </div>
    )
};

export default Dp_Webbrowser_Component;
