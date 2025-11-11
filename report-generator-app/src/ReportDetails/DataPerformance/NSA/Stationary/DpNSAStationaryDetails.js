import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import DpNSAUDPTable from './Table/DpNSAUDPTable';

import MultiStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';
import SingleStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import PingData from '../../../../DataFiles/NSA/DpStationaryResults/Ping.json';
import UDPData from '../../../../DataFiles/NSA/DpStationaryResults/UDP.json';

function DpNSAStationaryDetails() {
  return (
    <div>
      <h2>NSA Stationary Data Performance Details</h2>
      <DpNSAHttpMSTable data={MultiStreamHTTPData} tableName="Multi Stream HTTP Stationary" />
      <DpNSAHttpSSTable data={SingleStreamHTTPData} tableName="Single Stream HTTP Stationary" />
      <DpNSAPingTable data={PingData} tableName="Ping Stationary" />
      <DpNSAUDPTable data={UDPData} tableName="UDP Stationary" />
    </div>
  );
}

export default DpNSAStationaryDetails;