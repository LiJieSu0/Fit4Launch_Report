import React from 'react';
import callPerformanceData from '../../DataFiles/CallPerformanceResults.json';
import CpCaseTable from './CpCaseTable'; // Import the new component
import '../../StyleScript/Restricted_Report_Style.css'; // Import the restricted report style

const CallPerformanceDetails = () => {
    return (
        <div>
            {Object.entries(callPerformanceData).map(([title, data], index) => (
                <CpCaseTable key={index} title={title} data={data} />
            ))}
        </div>
    );
};

export default CallPerformanceDetails;