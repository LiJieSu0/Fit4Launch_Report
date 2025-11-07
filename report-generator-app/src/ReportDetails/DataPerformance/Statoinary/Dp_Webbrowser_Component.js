import React from "react";
import DpWebTable from "./Table/DpWebTable";
import WebBrowserData from '../../../DataFiles/SA/DpWebResults/Web Browser.json';

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
    
    return(
        <div className='page-content'>
            <h2>Web browser test - 5G NR</h2>
            <DpWebTable data={Dp_WebData} />
        </div>
    )
};

export default Dp_Webbrowser_Component;
