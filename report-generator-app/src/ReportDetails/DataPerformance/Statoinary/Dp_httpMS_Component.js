import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './Table/DpDetailsTableLoc3';
import DpThroughputOverallTable from '../DpThroughputOverallTable';
import DpRangeChart from '../DpRangeChart';
import DpHistogramComponent from '../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import httpMS_Stationary_Data from '../../../DataFiles/SA/DpStationaryResults/Multi Stream HTTP.json';

function Dp_httpMS_Component() {
    const httpMS_Stationary_DL = {
        Good: {
            DUT: httpMS_Stationary_Data.Good["Multi Stream HTTP Download for 30 seconds"]["dut_5G auto_MS HTTP DL_Good"].Throughput,
            REF: httpMS_Stationary_Data.Good["Multi Stream HTTP Download for 30 seconds"]["ref_5G auto_MS HTTP DL_Good"].Throughput,
        },
        Moderate: {
            DUT: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Download for 30 seconds"]["dut_5G auto_Multi Stream HTTP Download for 30 seconds"].Throughput,
            REF: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Download for 30 seconds"]["ref_5G auto_Multi Stream HTTP Download for 30 seconds"].Throughput,
        },
        Poor: {
            DUT: httpMS_Stationary_Data.Poor["Multi Stream HTTP Download for 30 seconds"]["_CH01_TMO-dut_5G auto_Multi Stream HTTP Download for 30 seconds_Poor Coverage_DA Test"].Throughput,
            REF: httpMS_Stationary_Data.Poor["Multi Stream HTTP Download for 30 seconds"]["_CH02_TMO-ref_5G auto_Multi Stream HTTP Download for 30 seconds_Poor Coverage_DA Test"].Throughput,
        },
    };

    const httpMS_Stationary_UL = {
        Good: {
            DUT: httpMS_Stationary_Data.Good["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G auto_Multi Stream HTTP Upload for 30 seconds_Good Coverage_DA Test"].Throughput,
            REF: httpMS_Stationary_Data.Good["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G auto_Multi Stream HTTP Upload for 30 seconds_Good Coverage_DA Test"].Throughput,
        },
        Moderate: {
            DUT: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO_5G auto_Multi Stream HTTP Upload for 30 seconds_DUT_"].Throughput,
            REF: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO_5G auto_Multi Stream HTTP Upload for 30 seconds_REF_"].Throughput,
        },
        Poor: {
            DUT: httpMS_Stationary_Data.Poor["Multi Stream HTTP Upload for 30 seconds"]["dut_5g auto_Multi Stream HTTP Upload for 30 seconds_poor Coverage_DA Test"].Throughput,
            REF: httpMS_Stationary_Data.Poor["Multi Stream HTTP Upload for 30 seconds"]["ref_5g auto_Multi Stream HTTP Upload for 30 seconds_poor Coverage_DA Test"].Throughput,
        },
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
            dutMin: Math.min(httpMS_Stationary_DL.Good.DUT.Minimum, httpMS_Stationary_DL.Moderate.DUT.Minimum, httpMS_Stationary_DL.Poor.DUT.Minimum),
            dutMax: Math.max(httpMS_Stationary_DL.Good.DUT.Maximum, httpMS_Stationary_DL.Moderate.DUT.Maximum, httpMS_Stationary_DL.Poor.DUT.Maximum),
            refMin: Math.min(httpMS_Stationary_DL.Good.REF.Minimum, httpMS_Stationary_DL.Moderate.REF.Minimum, httpMS_Stationary_DL.Poor.REF.Minimum),
            refMax: Math.max(httpMS_Stationary_DL.Good.REF.Maximum, httpMS_Stationary_DL.Moderate.REF.Maximum, httpMS_Stationary_DL.Poor.REF.Maximum),
            dutMean: (httpMS_Stationary_DL.Good.DUT.Mean + httpMS_Stationary_DL.Moderate.DUT.Mean + httpMS_Stationary_DL.Poor.DUT.Mean) / 3,
            refMean: (httpMS_Stationary_DL.Good.REF.Mean + httpMS_Stationary_DL.Moderate.REF.Mean + httpMS_Stationary_DL.Poor.REF.Mean) / 3,
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
            dutMin: Math.min(httpMS_Stationary_UL.Good.DUT.Minimum, httpMS_Stationary_UL.Moderate.DUT.Minimum, httpMS_Stationary_UL.Poor.DUT.Minimum),
            dutMax: Math.max(httpMS_Stationary_UL.Good.DUT.Maximum, httpMS_Stationary_UL.Moderate.DUT.Maximum, httpMS_Stationary_UL.Poor.DUT.Maximum),
            refMin: Math.min(httpMS_Stationary_UL.Good.REF.Minimum, httpMS_Stationary_UL.Moderate.REF.Minimum, httpMS_Stationary_UL.Poor.REF.Minimum),
            refMax: Math.max(httpMS_Stationary_UL.Good.REF.Maximum, httpMS_Stationary_UL.Moderate.REF.Maximum, httpMS_Stationary_UL.Poor.REF.Maximum),
            dutMean: (httpMS_Stationary_UL.Good.DUT.Mean + httpMS_Stationary_UL.Moderate.DUT.Mean + httpMS_Stationary_UL.Poor.DUT.Mean) / 3,
            refMean: (httpMS_Stationary_UL.Good.REF.Mean + httpMS_Stationary_UL.Moderate.REF.Mean + httpMS_Stationary_UL.Poor.REF.Mean) / 3,
        },
    };

    const dlHistogramData = [
        { name: 'Good', DUT: httpMS_Stationary_DL.Good.DUT.Mean, REF: httpMS_Stationary_DL.Good.REF.Mean },
        { name: 'Moderate', DUT: httpMS_Stationary_DL.Moderate.DUT.Mean, REF: httpMS_Stationary_DL.Moderate.REF.Mean },
        { name: 'Poor', DUT: httpMS_Stationary_DL.Poor.DUT.Mean, REF: httpMS_Stationary_DL.Poor.REF.Mean },
        {
            name: 'Overall',
            DUT: (httpMS_Stationary_DL.Good.DUT.Mean + httpMS_Stationary_DL.Moderate.DUT.Mean + httpMS_Stationary_DL.Poor.DUT.Mean) / 3,
            REF: (httpMS_Stationary_DL.Good.REF.Mean + httpMS_Stationary_DL.Moderate.REF.Mean + httpMS_Stationary_DL.Poor.REF.Mean) / 3
        },
    ];

    const ulHistogramData = [
        { name: 'Good', DUT: httpMS_Stationary_UL.Good.DUT.Mean, REF: httpMS_Stationary_UL.Good.REF.Mean },
        { name: 'Moderate', DUT: httpMS_Stationary_UL.Moderate.DUT.Mean, REF: httpMS_Stationary_UL.Moderate.REF.Mean },
        { name: 'Poor', DUT: httpMS_Stationary_UL.Poor.DUT.Mean, REF: httpMS_Stationary_UL.Poor.REF.Mean },
        {
            name: 'Overall',
            DUT: (httpMS_Stationary_UL.Good.DUT.Mean + httpMS_Stationary_UL.Moderate.DUT.Mean + httpMS_Stationary_UL.Poor.DUT.Mean) / 3,
            REF: (httpMS_Stationary_UL.Good.REF.Mean + httpMS_Stationary_UL.Moderate.REF.Mean + httpMS_Stationary_UL.Poor.REF.Mean) / 3
        },
    ];

    const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];
    const combinedOverallTableData = [
        ["Average", "DUT", ((httpMS_Stationary_DL.Good.DUT.Mean + httpMS_Stationary_DL.Moderate.DUT.Mean + httpMS_Stationary_DL.Poor.DUT.Mean) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.DUT.Mean + httpMS_Stationary_UL.Moderate.DUT.Mean + httpMS_Stationary_UL.Poor.DUT.Mean) / 3).toFixed(2)],
        ["Average", "REF", ((httpMS_Stationary_DL.Good.REF.Mean + httpMS_Stationary_DL.Moderate.REF.Mean + httpMS_Stationary_DL.Poor.REF.Mean) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.REF.Mean + httpMS_Stationary_UL.Moderate.REF.Mean + httpMS_Stationary_UL.Poor.REF.Mean) / 3).toFixed(2)],
        ["Standard Deviation", "DUT", ((httpMS_Stationary_DL.Good.DUT["Standard Deviation"] + httpMS_Stationary_DL.Moderate.DUT["Standard Deviation"] + httpMS_Stationary_DL.Poor.DUT["Standard Deviation"]) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.DUT["Standard Deviation"] + httpMS_Stationary_UL.Moderate.DUT["Standard Deviation"] + httpMS_Stationary_UL.Poor.DUT["Standard Deviation"]) / 3).toFixed(2)],
        ["Standard Deviation", "REF", ((httpMS_Stationary_DL.Good.REF["Standard Deviation"] + httpMS_Stationary_DL.Moderate.REF["Standard Deviation"] + httpMS_Stationary_DL.Poor.REF["Standard Deviation"]) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.REF["Standard Deviation"] + httpMS_Stationary_UL.Moderate.REF["Standard Deviation"] + httpMS_Stationary_UL.Poor.REF["Standard Deviation"]) / 3).toFixed(2)],
        ["Maximum", "DUT", ((httpMS_Stationary_DL.Good.DUT.Maximum + httpMS_Stationary_DL.Moderate.DUT.Maximum + httpMS_Stationary_DL.Poor.DUT.Maximum) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.DUT.Maximum + httpMS_Stationary_UL.Moderate.DUT.Maximum + httpMS_Stationary_UL.Poor.DUT.Maximum) / 3).toFixed(2)],
        ["Maximum", "REF", ((httpMS_Stationary_DL.Good.REF.Maximum + httpMS_Stationary_DL.Moderate.REF.Maximum + httpMS_Stationary_DL.Poor.REF.Maximum) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.REF.Maximum + httpMS_Stationary_UL.Moderate.REF.Maximum + httpMS_Stationary_UL.Poor.REF.Maximum) / 3).toFixed(2)],
        ["Minimum", "DUT", ((httpMS_Stationary_DL.Good.DUT.Minimum + httpMS_Stationary_DL.Moderate.DUT.Minimum + httpMS_Stationary_DL.Poor.DUT.Minimum) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.DUT.Minimum + httpMS_Stationary_UL.Moderate.DUT.Minimum + httpMS_Stationary_UL.Poor.DUT.Minimum) / 3).toFixed(2)],
        ["Minimum", "REF", ((httpMS_Stationary_DL.Good.REF.Minimum + httpMS_Stationary_DL.Moderate.REF.Minimum + httpMS_Stationary_DL.Poor.REF.Minimum) / 3).toFixed(2), ((httpMS_Stationary_UL.Good.REF.Minimum + httpMS_Stationary_UL.Moderate.REF.Minimum + httpMS_Stationary_UL.Poor.REF.Minimum) / 3).toFixed(2)],
    ];

    const barKeys = [
        { key: 'DUT', fill: CHART_COLOR_DUT },
        { key: 'REF', fill: CHART_COLOR_REF },
    ];

    return (
        <>
            <div className='page-content'>
                <h2>HTTP Multi Stream test - 5G NR</h2>
                <h3>Overall Multi Stream HTTP</h3>
                <DpThroughputOverallTable
                    tableHeader={overallTableHeader}
                    tableData={combinedOverallTableData}
                    kpiRule="Throughput"
                    kpiTargetCells={[
                        {
                            rowIndex: 0,
                            colIndex: 2,
                            dutValue: ((httpMS_Stationary_DL.Good.DUT.Mean + httpMS_Stationary_DL.Moderate.DUT.Mean + httpMS_Stationary_DL.Poor.DUT.Mean) / 3).toFixed(2),
                            refValue: ((httpMS_Stationary_DL.Good.REF.Mean + httpMS_Stationary_DL.Moderate.REF.Mean + httpMS_Stationary_DL.Poor.REF.Mean) / 3).toFixed(2),
                        },
                        {
                            rowIndex: 0,
                            colIndex: 3,
                            dutValue: ((httpMS_Stationary_UL.Good.DUT.Mean + httpMS_Stationary_UL.Moderate.DUT.Mean + httpMS_Stationary_UL.Poor.DUT.Mean) / 3).toFixed(2),
                            refValue: ((httpMS_Stationary_UL.Good.REF.Mean + httpMS_Stationary_UL.Moderate.REF.Mean + httpMS_Stationary_UL.Poor.REF.Mean) / 3).toFixed(2),
                        },
                    ]}
                />
                <DpDetailsTableLoc3
                    data={httpMS_Stationary_DL}
                    tableName="Multi Stream HTTP Download for 30 seconds"
                    kpiRule="Throughput"
                    kpiTargetCells={[
                        {
                            dutValue: (httpMS_Stationary_DL.Good.DUT.Mean + httpMS_Stationary_DL.Moderate.DUT.Mean + httpMS_Stationary_DL.Poor.DUT.Mean) / 3,
                            refValue: (httpMS_Stationary_DL.Good.REF.Mean + httpMS_Stationary_DL.Moderate.REF.Mean + httpMS_Stationary_DL.Poor.REF.Mean) / 3,
                        },
                    ]}
                />
            </div>

            <div className='page-content'>

            <DpHistogramComponent
                data={dlHistogramData}
                title="Multi Stream HTTP Download Throughput"
                yAxisLabel="Throughput (Mbps)"
                barKeys={barKeys}
            />
            <DpRangeChart
                data={dlRangeChartData}
                chartTitle="Multi Stream HTTP Download Throughput Range"
                yAxisTitle="Throughput (Mbps)"
            />
            </div>

            <div className='page-content'>

            <DpDetailsTableLoc3
                data={httpMS_Stationary_UL}
                tableName="Multi Stream HTTP Upload for 30 seconds"
                kpiRule="Throughput"
                kpiTargetCells={[
                    {
                        dutValue: (httpMS_Stationary_UL.Good.DUT.Mean + httpMS_Stationary_UL.Moderate.DUT.Mean + httpMS_Stationary_UL.Poor.DUT.Mean) / 3,
                        refValue: (httpMS_Stationary_UL.Good.REF.Mean + httpMS_Stationary_UL.Moderate.REF.Mean + httpMS_Stationary_UL.Poor.REF.Mean) / 3,
                    },
                ]}
            />
            <DpHistogramComponent
                data={ulHistogramData}
                title="Multi Stream HTTP Upload Throughput"
                yAxisLabel="Throughput (Mbps)"
                barKeys={barKeys}
            />
            </div>

            <div className='page-content'>

            <DpRangeChart
                data={ulRangeChartData}
                chartTitle="Multi Stream HTTP Upload Throughput Range"
                yAxisTitle="Throughput (Mbps)"
            />
            </div>
        </>

    );
};

export default Dp_httpMS_Component;