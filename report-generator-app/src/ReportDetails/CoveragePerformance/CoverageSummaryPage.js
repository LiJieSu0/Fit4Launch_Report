import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

function CoverageSummaryPage() {
  return (
    <PageBreak id="summary-page">
      <DynamicHeader level={1}>Coverage Test Overview</DynamicHeader>
      <CoverageSummaryTable />
      {/* Secondary KPI Summary Table */}
    </PageBreak>
  );
}

export default CoverageSummaryPage;