import React from 'react';
import DpRangeChart from './DpRangeChart';
import '../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './DpDetailsTableLoc3';
import httpSS_Stationary_DL_Data from '../../DataFiles/SA/DpStationaryResults/Single Stream HTTP.json';

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

  const httpSS_Stationary_UL ={}


  return (
    <div>
      <h2>Data Performance Details Page</h2>
      <div className='page-content'>
      <h2>HTTP Single Stream test - 5G NR</h2>
      {/* single stream dl overall table */}
      {/* single stream ul overall table */}
      {/* single stream dl details table */}
      <DpDetailsTableLoc3 data={httpSS_Stationary_DL} tableName="Single Stream HTTP Download for 60 seconds" />
      {/* <DpDetailsTableLoc3 data={httpSS_Stationary_UL} /> */}

      </div>
      <div className='page-content'>
      <h2>HTTP Multi Stream test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>UDP test - 5G NR</h2>
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