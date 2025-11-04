import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';

function CoverageSummaryPage() {
  return (
    <div className='page-content'>
      <h2>Coverage Summary Page</h2>
      <CoverageSummaryTable />
    </div>
  );
}

export default CoverageSummaryPage;