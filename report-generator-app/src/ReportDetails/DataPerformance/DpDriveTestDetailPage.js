import React from 'react';
import DpDriveTestTable from './DpDriveTestTable';
import TestDriveData from '../../DataFiles/SA/DpMobilityResults/Test Drive.json';
import TestDriveMHSData from '../../DataFiles/SA/DpMobilityMHSResults/MHS Test Drive.json';

const DpDriveTestDetailPage = () => {
    return (
    <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test Drive</h2>
       <DpDriveTestTable data={TestDriveData} />
    </div>      
    );
};

export default DpDriveTestDetailPage;