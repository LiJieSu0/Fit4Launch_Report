import React from 'react';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const CpKpiPage = () => {
  return (
    <div className='page-content'>
      <DynamicHeader level={1}>KPI Page</DynamicHeader>
      <img src="/Kpi/Cp/call_performance_criteria.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />

    </div>
  );
};

export default CpKpiPage;