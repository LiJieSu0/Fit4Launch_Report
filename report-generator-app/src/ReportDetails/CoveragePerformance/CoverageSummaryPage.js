import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';

function CoverageSummaryPage() {
  return (
    <div className='page-content'>
      <h2>1. Coverage Test Overview</h2>
      <CoverageSummaryTable />
    </div>
  );
}

export default CoverageSummaryPage;