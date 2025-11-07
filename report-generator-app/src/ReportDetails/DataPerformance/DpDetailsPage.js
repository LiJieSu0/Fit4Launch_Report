import React from 'react';
import DpRangeChart from './DpRangeChart';
import '../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './DpDetailsTable';

function DpDetailsPage() {
  const dataPerformanceResults = {
    "5G AUTO DP": {
      "2.1.1 5G Auto Data Test Drive": {
        "DUT UDP DL": {
          "Throughput": {
            "Mean": 9.781204435636633,
            "Minimum": 5.826606741573033,
            "Maximum": 10.000303370786517
          }
        },
        "REF UDP DL": {
          "Throughput": {
            "Mean": 7.4,
            "Minimum": 6.843808988764044,
            "Maximum": 10.000685393258427
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>Data Performance Details Page</h2>
      <div className='page-content'>
      <h2>HTTP Single Stream test - 5G NR</h2>
      {/* single stream dl overall table */}
      {/* single stream ul overall table */}
      {/* single stream dl details table */}
      <DpDetailsTableLoc3 />

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