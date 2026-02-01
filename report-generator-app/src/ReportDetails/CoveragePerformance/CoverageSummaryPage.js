import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';

function CoverageSummaryPage() {
  return (
    <div className='page-content' id="summary-page">
      <DynamicHeader level={1}>Coverage Test Overview</DynamicHeader>
      <CoverageSummaryTable />
    </div>
  );
}

export default CoverageSummaryPage;