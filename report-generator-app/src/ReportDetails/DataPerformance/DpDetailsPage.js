import React from 'react';
import DpRangeChart from './DpRangeChart';
import '../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './DpDetailsTableLoc3';
import DpUdpTable from './DpUdpTable';
import httpSS_Stationary_DL_Data from '../../DataFiles/SA/DpStationaryResults/Single Stream HTTP.json';
import httpMS_Stationary_Data from '../../DataFiles/SA/DpStationaryResults/Multi Stream HTTP.json';
import udp_Stationary_Data from '../../DataFiles/SA/DpStationaryResults/UDP.json';

function DpDetailsPage() {
  const httpSS_Stationary_DL = {
    Good: {
      DUT: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_SS HTTP DL_Good"].Throughput,
      REF: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_SS HTTP DL_Good"].Throughput,
    },
    Moderate: {
      DUT: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_Single Stream HTTP Download for 60 seconds"].Throughput,
      REF: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_Single Stream HTTP Download for 60 seconds"].Throughput,
    },
    Poor: {
      DUT: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_Single Stream HTTP Download for 60 seconds_Poor"].Throughput,
      REF: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_Single Stream HTTP Download for 60 seconds_Poor"].Throughput,
    },
  };

  const httpSS_Stationary_UL = {
    Good: {
      DUT: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G auto_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G auto_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
    },
    Moderate: {
      DUT: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Upload of a 15 MB file"]["_20250919_110731_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Upload of a 15 MB file"]["_20250919_110731_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
    },
    Poor: {
      DUT: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Upload of a 15 MB file"]["dut_5g auto_Single Stream HTTP Upload of a 15 MB file_poor Coverage_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Upload of a 15 MB file"]["ref_5g auto_Single Stream HTTP Upload of a 15 MB file_poor Coverage_DA Test"].Throughput,
    },
  };


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
    <div>
      <h2>Data Performance Details Page</h2>
      <div className='page-content'>
      <h2>HTTP Single Stream test - 5G NR</h2>
      {/* single stream dl overall table */}
      {/* single stream ul overall table */}
      {/* single stream dl details table */}
      <DpDetailsTableLoc3 data={httpSS_Stationary_DL} tableName="Single Stream HTTP Download for 60 seconds" />
      <DpDetailsTableLoc3 data={httpSS_Stationary_UL} tableName="Single Stream HTTP Upload of a 15 MB file"  />
      </div>
      <div className='page-content'>
      <h2>HTTP Multi Stream test - 5G NR</h2>
      <DpDetailsTableLoc3 data={httpMS_Stationary_DL} tableName="Multi Stream HTTP Download for 30 seconds"  />
      <DpDetailsTableLoc3 data={httpMS_Stationary_UL} tableName="Multi Stream HTTP Upload for 30 seconds"  />
      </div>
      <div className='page-content'>
      <h2>UDP test - 5G NR</h2>
      <DpUdpTable data={udp_Stationary_Data} tableName="UDP Test" />
      </div>
      <div className='page-content'>
      <h2>PING test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Web browser test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Play-store app download test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Mobile hot spot test - Seattle only- 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test Drive</h2>
      </div>      
      <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test MHS Drive</h2>
      </div>
      <div className='page-content'>
      <h2>VoNR MRAB Stationary test - 5G NR</h2>
      </div>
      {/* <DpRangeChart dataPerformanceResults={dataPerformanceResults} /> */}
      <div className='page-content'>
      <h2>Test drive- 5G NSA</h2>
      </div>

    </div>
  );
}

export default DpDetailsPage;


// const dataPerformanceResults = { //DO NOT TOUCH THIS SECTOIN
//     "5G AUTO DP": {
//       "2.1.1 5G Auto Data Test Drive": {
//         "DUT UDP DL": {
//           "Throughput": {
//             "Mean": 9.781204435636633,
//             "Minimum": 5.826606741573033,
//             "Maximum": 10.000303370786517
//           }
//         },
//         "REF UDP DL": {
//           "Throughput": {
//             "Mean": 7.4,
//             "Minimum": 6.843808988764044,
//             "Maximum": 10.000685393258427
//           }
//         }
//       }
//     }
//   };