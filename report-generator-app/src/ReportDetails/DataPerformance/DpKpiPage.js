import React from 'react';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const DpKpiPage = () => {
  return (
    <>
      <div className='page-content'>
        <DynamicHeader level={1}>KPI Page</DynamicHeader>
        <img src="/Kpi/Dp/data_performance_criteria1.png" alt="dp" style={{ maxWidth: '100%', height: '50%' }} />
        <img src="/Kpi/Dp/data_performance_criteria2.png" alt="dp" style={{ maxWidth: '100%', height: '50%' }} />
      </div>
      <div className='page-content'>
        <div style={{ marginBottom: 20 }}></div>
        <img src="/Kpi/Dp/data_performance_criteria3.png" alt="dp" style={{ maxWidth: '100%', height: '50%' }} />
        <img src="/Kpi/Dp/data_performance_criteria4.png" alt="dp" style={{ maxWidth: '100%', height: '50%' }} />
      </div>
    </>
  );
};

export default DpKpiPage;