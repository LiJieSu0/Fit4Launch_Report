import React from 'react';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const CoverageKpiPage = () => {
  return (
    <div className='page-content'>
      <DynamicHeader level={1}>KPI Page</DynamicHeader>
      <img src="/Kpi/Co/coverage_criteria.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />
    </div>
  );
};

export default CoverageKpiPage;