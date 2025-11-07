import React from 'react';
import DpDetailsTableLoc3 from './DpDetailsTableLoc3';
import httpMS_Stationary_Data from '../../DataFiles/SA/DpStationaryResults/Multi Stream HTTP.json';

const Dp_httpMS_Component = () => {
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
    return (
        <div className='page-content'>
        <h2>HTTP Multi Stream test - 5G NR</h2>
        <DpDetailsTableLoc3 data={httpMS_Stationary_DL} tableName="Multi Stream HTTP Download for 30 seconds"  />
        <DpDetailsTableLoc3 data={httpMS_Stationary_UL} tableName="Multi Stream HTTP Upload for 30 seconds"  />
        </div>
    );
};

export default Dp_httpMS_Component;