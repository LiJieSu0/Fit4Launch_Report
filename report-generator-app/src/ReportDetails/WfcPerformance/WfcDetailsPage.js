import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import WfcTestDetailsPage from './WfcTestDetailsPage';
const WfcDetailsPage = () => {

  return (
    <>
      <WfcTestDetailsPage tc="TC150" label="Call Performance Baseline" isFirst={true} />
      <WfcTestDetailsPage tc="TC151" label="Call Performance Baseline" />
      <WfcTestDetailsPage tc="TC152" label="Call Performance" />
      <WfcTestDetailsPage tc="TC153" label="Call Performance" />
      <WfcTestDetailsPage tc="TC154" label="Call Performance" />
      <WfcTestDetailsPage tc="TC155" label="Call Performance" />
      <WfcTestDetailsPage tc="TC156" label="Call Performance" />
      <WfcTestDetailsPage tc="TC157" label="Call Performance" />
    </>
  );
};

export default WfcDetailsPage;