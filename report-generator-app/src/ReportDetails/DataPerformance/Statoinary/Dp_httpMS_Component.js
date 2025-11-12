import React from 'react';
import '../../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './Table/DpDetailsTableLoc3';
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

    const barKeys = [
        { key: 'DUT', fill: CHART_COLOR_DUT },
        { key: 'REF', fill: CHART_COLOR_REF },
    ];

    return (
        <div className='page-content'>
            <h2>HTTP Multi Stream test - 5G NR</h2>
            <DpDetailsTableLoc3 data={httpMS_Stationary_DL} tableName="Multi Stream HTTP Download for 30 seconds" />
            <DpHistogramComponent
                data={dlHistogramData}
                title="Multi Stream HTTP Download Throughput"
                yAxisLabel="Throughput (Mbps)"
                barKeys={barKeys}
            />
            <DpDetailsTableLoc3 data={httpMS_Stationary_UL} tableName="Multi Stream HTTP Upload for 30 seconds" />
            <DpHistogramComponent
                data={ulHistogramData}
                title="Multi Stream HTTP Upload Throughput"
                yAxisLabel="Throughput (Mbps)"
                barKeys={barKeys}
            />
        </div>
    );
};

export default Dp_httpMS_Component;