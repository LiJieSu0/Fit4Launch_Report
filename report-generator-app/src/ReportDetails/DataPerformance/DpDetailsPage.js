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
function DpDetailsPage() {
  return (
    <div>
      <DynamicHeader level={1} style={{ textAlign: 'center' }}>Data Performance - 5G Auto </DynamicHeader>
      <Dp_httpSS_Component city="Seattle" />
      <Dp_httpSS_Component city="New York" />
      <Dp_httpMS_Component city="Seattle" />
      <Dp_httpMS_Component city="New York" />
      <Dp_Udp_Component city="Seattle" />
      <Dp_Udp_Component city="New York" />
      <Dp_Ping_Component city="Seattle" />
      <Dp_Ping_Component city="New York" />
      <Dp_Webbrowser_Component city="Seattle" />
      <Dp_Webbrowser_Component city="New York" />
      <Dp_playStore_Component city="Seattle" />
      <Dp_playStore_Component city="New York" />
      <Dp_MHS_Page city="Seattle" />
      <Dp_MHS_Page city="New York" />
      <DpDriveTestDetailPage city="Seattle" />
      <DpDriveTestDetailPage city="New York" />
      <DpMrabDetailsPage city="Seattle" />
      <DpMrabDetailsPage city="New York" />
      <DynamicHeader level={1}>Data Performance - 5G NSA</DynamicHeader>
      <DpNSAStationaryDetails city="Seattle" />
      <DpNSAStationaryDetails city="New York" />
      <DpNSATestDriveDetails city="Seattle" />
      <DpNSATestDriveDetails city="New York" />

    </div>
  );
}

export default DpDetailsPage;
