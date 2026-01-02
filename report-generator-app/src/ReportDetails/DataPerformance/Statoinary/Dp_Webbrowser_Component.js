import React from "react";
import DpWebTable from "./Table/DpWebTable";
import DpWebOverallTable from "./Table/DpWebOverallTable";
import DpHistogramComponent from "../DpHistogramComponent";
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

function Dp_Webbrowser_Component() {
    const { reportData } = useContext(ReportContext);

    if (!reportData || !reportData.dataPerformance) {
        return <div className="page-content">Loading...</div>;
    }

    // Update to use dataPerformance from the fetched JSON
    // Path: ["Data Performance"]["5G AUTO DP"]["5G Auto Data Web-Kepler"]
    const WebBrowserData = reportData.dataPerformance["Data Performance"]["5G AUTO DP"]["5G Auto Data Web-Kepler"];

    const dutData = WebBrowserData.DUT;
    const refData = WebBrowserData.REF;

    const Dp_WebData = [
        { category: "Average", dut: { device: "DUT", overall: dutData["Web Page Load Time"]["Mean"].toFixed(3) }, ref: { device: "REF", overall: refData["Web Page Load Time"]["Mean"].toFixed(3) } },
        { category: "Standard Deviation", dut: { device: "DUT", overall: dutData["Web Page Load Time"]["Standard Deviation"].toFixed(3) }, ref: { device: "REF", overall: refData["Web Page Load Time"]["Standard Deviation"].toFixed(3) } },
        { category: "Maximum", dut: { device: "DUT", overall: dutData["Web Page Load Time"]["Maximum"].toFixed(3) }, ref: { device: "REF", overall: refData["Web Page Load Time"]["Maximum"].toFixed(3) } },
        { category: "Minimum", dut: { device: "DUT", overall: dutData["Web Page Load Time"]["Minimum"].toFixed(3) }, ref: { device: "REF", overall: refData["Web Page Load Time"]["Minimum"].toFixed(3) } },
    ];

    const overallTableData = {
        average: { DUT: { Overall: dutData["Web Page Load Time"]["Mean"].toFixed(3) }, REF: { Overall: refData["Web Page Load Time"]["Mean"].toFixed(3) } },
        std_dev: { DUT: { Overall: dutData["Web Page Load Time"]["Standard Deviation"].toFixed(3) }, REF: { Overall: refData["Web Page Load Time"]["Standard Deviation"].toFixed(3) } },
        max: { DUT: { Overall: dutData["Web Page Load Time"]["Maximum"].toFixed(3) }, REF: { Overall: refData["Web Page Load Time"]["Maximum"].toFixed(3) } },
        min: { DUT: { Overall: dutData["Web Page Load Time"]["Minimum"].toFixed(3) }, REF: { Overall: refData["Web Page Load Time"]["Minimum"].toFixed(3) } },
    };

    const histogramData = [
        { name: "Mean", DUT: dutData["Web Page Load Time"]["Mean"], REF: refData["Web Page Load Time"]["Mean"] },
    ];

    const barKeys = [
        { key: "DUT", fill: CHART_COLOR_DUT },
        { key: "REF", fill: CHART_COLOR_REF },
    ];

    return (
        <div className='page-content'>
            <DynamicHeader level={2}>Web Browser Test - 5G Auto</DynamicHeader>
            <h4>Web Browser Test Overview</h4>
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
