import React from 'react';
import DpRangeChart from './Statoinary/Table/DpRangeChart';
import '../../StyleScript/Restricted_Report_Style.css';
import Dp_httpSS_Component from './Statoinary/Dp_httpSS_Component';
import Dp_httpMS_Component from './Statoinary/Dp_httpMS_Component';
import Dp_Udp_Component from './Statoinary/Dp_Udp_Component';
import Dp_Ping_Component from './Statoinary/Dp_Ping_Component';
import Dp_Webbrowser_Component from './Statoinary/Dp_Webbrowser_Component';
import Dp_playStore_Component from './Statoinary/Dp_playStore_Component';
import Dp_MHS_Page from './MHS/DpMHSPage';
import DpDriveTestDetailPage from './DriveTest/DpDriveTestDetailPage';
import DpMrabDetailsPage from './DpMrabDetailsPage';
import DpNSAStationaryDetails from './NSA/Stationary/DpNSAStationaryDetails';
import DpNSATestDriveDetails from './NSA/TestDrive/DpNSATestDriveDetails';
import DpHistogramComponent from './DpHistogramComponent';

function DpDetailsPage() {
  const histogramData = [
    {
      name: 'Overall',
      'DUT': 21,
      'REF': 27,
    },
    {
      name: 'Good',
      'DUT': 23,
      'REF': 28,
    },
    {
      name: 'Moderate',
      'DUT': 19,
      'REF': 25,
    },
  ];

  const barKeys = [
    { key: 'DUT', fill: '#4267B2' },
    { key: 'REF', fill: '#6AA84F' },
  ];

  return (
    <div>
      <DpHistogramComponent
        data={histogramData}
        title="Seattle (5G NR) Ping Results"
        yAxisLabel="Throughput (kbps)"
        barKeys={barKeys}
      />
      <Dp_httpSS_Component />
      <Dp_httpMS_Component />
      <Dp_Udp_Component />
      <Dp_Ping_Component/>
      <Dp_Webbrowser_Component />
      <Dp_playStore_Component/>
      <Dp_MHS_Page/>
      
      <DpDriveTestDetailPage/>
      <DpMrabDetailsPage/>

      <DpNSAStationaryDetails/>
      <DpNSATestDriveDetails/>
      {/* <DpRangeChart dataPerformanceResults={dataPerformanceResults} /> */}

    </div>
  );
}

export default DpDetailsPage;
