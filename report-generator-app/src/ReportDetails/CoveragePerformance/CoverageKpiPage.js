import React from 'react';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

const CoverageKpiPage = () => {
  return (
    <PageBreak>
      <DynamicHeader level={1}>KPI Page</DynamicHeader>
      <img src="/Kpi/Co/coverage_criteria.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />
    </PageBreak>
  );
};

export default CoverageKpiPage;