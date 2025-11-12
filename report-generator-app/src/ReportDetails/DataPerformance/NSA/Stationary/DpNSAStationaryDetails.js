import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import DpHistogramComponent from '../../DpHistogramComponent';
import MultiStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';
import SingleStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import PingData from '../../../../DataFiles/NSA/DpStationaryResults/Ping.json';
import DpNSAUDPComponent from './DpNSAUDPComponent';

function DpNSAStationaryDetails() {
  return (
    <div className='page-content'>
      <h2>NSA Stationary Data Performance Details</h2>
      {/* DpNSAhttpSS */}
      {/* DpNSAhttpMS */}
      <DpNSAUDPComponent />
      {/* DpNSAPing */}
    </div>
  );
}

export default DpNSAStationaryDetails;