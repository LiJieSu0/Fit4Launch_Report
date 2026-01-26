import React from 'react';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const WfcKpiPage = () => {
    return (
        <>
            <div className='page-content'>
                <DynamicHeader level={1}>KPI Page</DynamicHeader>
                <img src="/Kpi/Wfc/wfc_kpi1.png" alt="wfc" style={{ maxWidth: '100%', height: '50%' }} />
            </div>
        </>
    );
};

export default WfcKpiPage;