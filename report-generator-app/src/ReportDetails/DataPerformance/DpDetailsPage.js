import React from 'react';
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
import DynamicHeader from '../../CommonPage/DynamicHeader';
function DpDetailsPage({ webPageUrl }) {
  return (
    // TODO MHS and Mobility bug fix
    <div>
      <Dp_httpSS_Component city="Seattle" firstSection={true} />
      <Dp_httpSS_Component city="New York" />
      <Dp_httpMS_Component city="Seattle" />
      <Dp_httpMS_Component city="New York" />
      <Dp_Udp_Component city="Seattle" />
      <Dp_Udp_Component city="New York" />
      <Dp_Ping_Component city="Seattle" />
      <Dp_Ping_Component city="New York" />
      <Dp_Webbrowser_Component city="Seattle" webPageUrl={"http://172.93.163.176/reference/kepler/mobile/"} />
      <Dp_Webbrowser_Component city="New York" webPageUrl={"http://172.93.163.176/reference/kepler/mobile/"} />
      <Dp_playStore_Component city="Seattle" />
      <Dp_playStore_Component city="New York" />
      <Dp_MHS_Page city="Seattle" />
      <DpDriveTestDetailPage city="Seattle" firstSection={true} />
      <DpDriveTestDetailPage city="New York" />
      <DpMrabDetailsPage city="Seattle" />
      <DpMrabDetailsPage city="New York" />

      <DpNSAStationaryDetails city="Seattle" firstSection={true} />
      <DpNSAStationaryDetails city="New York" />
      <DpNSATestDriveDetails city="Seattle" />
      <DpNSATestDriveDetails city="New York" />

      {/* Debug Section */}
      {/* <Dp_Udp_Component city="Seattle" />
      <Dp_MHS_Page city="Seattle" />
      <DpDriveTestDetailPage city="Seattle" firstSection={true} />
      <DpNSAStationaryDetails city="Seattle" firstSection={true} />
      <DpNSATestDriveDetails city="New York" /> */}

      {/* pages need to print this time
 11,19,33,34,35,38,46,50,55
 */}

    </div>
  );
}

export default DpDetailsPage;
