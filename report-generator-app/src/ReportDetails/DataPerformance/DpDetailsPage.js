import React from 'react';
import DpRangeChart from './Statoinary/Table/DpRangeChart';
import '../../StyleScript/Restricted_Report_Style.css';
import Dp_httpSS_Component from './Statoinary/Dp_httpSS_Component';
import Dp_httpMS_Component from './Statoinary/Dp_httpMS_Component';
import Dp_Udp_Component from './Statoinary/Dp_Udp_Component';
import Dp_Ping_Component from './Statoinary/Dp_Ping_Component';
import Dp_Webbrowser_Component from './Statoinary/Dp_Webbrowser_Component';
import Dp_playStore_Component from './Statoinary/Dp_playStore_Component';

function DpDetailsPage() {
  


  return (
    <div>
      <h2>Data Performance Details Page</h2>
      <Dp_httpSS_Component />
      <Dp_httpMS_Component />
      <Dp_Udp_Component />
      <Dp_Ping_Component/>
      <Dp_Webbrowser_Component />
      <Dp_playStore_Component/>
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