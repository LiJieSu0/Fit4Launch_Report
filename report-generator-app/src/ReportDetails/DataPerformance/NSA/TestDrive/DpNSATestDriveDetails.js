import React from 'react';
import DpNSATestDriveTable from './DpNSATestDriveTable';
import TestDriveData from '../../../../DataFiles/NSA/DpMobilityResults/Test Drive.json';

function DpNSATestDriveDetails() {
  return (
    <div>
      <h2>NSA Test Drive Data Performance Details</h2>
      <DpNSATestDriveTable data={TestDriveData} tableName="Test Drive" />
      {/* NSA test drive histogram */}
    </div>
  );
}

export default DpNSATestDriveDetails;