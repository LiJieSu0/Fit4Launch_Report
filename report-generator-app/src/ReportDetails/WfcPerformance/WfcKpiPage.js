import React from 'react';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

const WfcKpiPage = () => {
    return (
        <>
            <PageBreak>
                <DynamicHeader level={1}>KPI Page</DynamicHeader>
                <img src="/Kpi/Wfc/wfc_kpi1.png" alt="wfc" style={{ maxWidth: '100%', height: '50%' }} />
            </PageBreak>
        </>
    );
};

export default WfcKpiPage;