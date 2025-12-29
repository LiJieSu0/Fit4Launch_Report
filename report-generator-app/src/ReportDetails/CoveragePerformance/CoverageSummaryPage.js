import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';

function CoverageSummaryPage() {
  return (
    <div className='page-content'>
      <h1>1. Coverage Test Overview</h1>
      <CoverageSummaryTable />
    </div>
  );
}

export default CoverageSummaryPage;