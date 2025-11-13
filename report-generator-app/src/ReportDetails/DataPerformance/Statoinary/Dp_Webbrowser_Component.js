import React from "react";
import DpWebTable from "./Table/DpWebTable";
import DpWebOverallTable from "./Table/DpWebOverallTable";
import DpHistogramComponent from "../DpHistogramComponent";
import WebBrowserData from '../../../DataFiles/SA/DpWebResults/Web Browser.json';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';

function Dp_Webbrowser_Component(){
    const dutKey = "_CH01_TMO-dut_5G auto_ETSI Kepler web page hosted on Spirent mediaserver_Good Coverage_DA Test";
    const refKey = "_CH02_TMO-ref_5G auto_ETSI Kepler web page hosted on Spirent mediaserver_Good Coverage_DA Test";

    const dutData = WebBrowserData[dutKey];
    const refData = WebBrowserData[refKey];

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
    
    return(
        <div className='page-content'>
            <h2>Web browser test - 5G NR</h2>
            <DpWebOverallTable data={overallTableData} />
            <DpWebTable data={Dp_WebData} />
            <DpHistogramComponent
                data={histogramData}
                title="Web Page Load Time - Mean"
                yAxisLabel="Time (s)"
                barKeys={barKeys}
            />
        </div>
    )
};

export default Dp_Webbrowser_Component;
