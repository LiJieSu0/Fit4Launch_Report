import React from 'react';
import DpRangeChart from './DpRangeChart';
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
  // Example data for DpRangeChart
  const chartDataForRegions = {
    good: {
      dutMin: 5,
      dutMax: 90,
      dutMean: 55,
      refMin: 15,
      refMax: 85,
      refMean: 50,
    },
    moderate: {
      dutMin: 10,
      dutMax: 80,
      dutMean: 45,
      refMin: 20,
      refMax: 75,
      refMean: 40,
    },
    poor: {
      dutMin: 2,
      dutMax: 60,
      dutMean: 30,
      refMin: 8,
      refMax: 55,
      refMean: 25,
    },
  };

  return (
    <div>
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
      <DpRangeChart
        data={chartDataForRegions}
        chartTitle="Example TPUT Performance by Region"
        yAxisTitle="Example Throughput (Mbps)"
      />
    </div>
  );
}

export default DpDetailsPage;
