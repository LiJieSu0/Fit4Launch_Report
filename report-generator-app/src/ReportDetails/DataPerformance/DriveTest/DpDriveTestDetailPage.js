import React from 'react';
import DpDriveTestTable from './DpDriveTestTable';
import DpMHSTestDriveTable from '../MHS/Table/DpMHSTestDriveTable';
import TestDriveData from '../../../DataFiles/SA/DpMobilityResults/Test Drive.json';
import TestDriveMHSData from '../../../DataFiles/SA/DpMobilityMHSResults/MHS Test Drive.json';

const DpDriveTestDetailPage = () => {
    return (
    <div>
      <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test Drive</h2>
       <DpDriveTestTable data={TestDriveData} tableName="Mobility Test Drive Data" />
      </div>      
      <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test MHS Drive</h2>
      <DpMHSTestDriveTable data={TestDriveMHSData} tableName="MHS Test Drive Data" />
      </div>

    </div>

    );
};

export default DpDriveTestDetailPage;