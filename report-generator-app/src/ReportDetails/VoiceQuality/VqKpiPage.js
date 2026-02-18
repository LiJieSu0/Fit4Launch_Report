import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

const VqKpiPage = () => {
  return (
    <>
      <PageBreak>
        <DynamicHeader level={1}>KPI Page</DynamicHeader>
        <img src="/Kpi/Vq/voice_quality_criteria1.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />
        <img src="/Kpi/Vq/voice_quality_criteria3.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />
        <img src="/Kpi/Vq/voice_quality_criteria4.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />
      </PageBreak>
      <PageBreak>
        <img src="/Kpi/Vq/voice_quality_criteria2.png" alt="cp" style={{ maxWidth: '100%', height: '50%' }} />
      </PageBreak>

    </>
  );
};

export default VqKpiPage;