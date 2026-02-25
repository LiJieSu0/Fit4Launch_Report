import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import SecondaryKpiSummaryTable from './SecondaryKpiSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

function CoverageSummaryPage() {
  return (
    <PageBreak id="summary-page">
      <DynamicHeader level={1}>Coverage Test Overview</DynamicHeader>
      <CoverageSummaryTable />
      <SecondaryKpiSummaryTable />
    </PageBreak>
  );
}

export default CoverageSummaryPage;