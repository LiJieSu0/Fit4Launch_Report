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
      {/* new data from here */}
      <WfcTestDetailsPage tc="TC158" label="Call Performance" />
      <WfcTestDetailsPage tc="TC159" label="Call Performance" />
      <WfcTestDetailsPage tc="TC160" label="Call Performance" />
      <WfcTestDetailsPage tc="TC161" label="Call Performance" />

      <WfcTestDetailsPage tc="TC164" label="Multi Handovers" />
      <WfcTestDetailsPage tc="TC167" label="Multi Handovers" />
      <WfcTestDetailsPage tc="TC170" label="Multi Handovers" />
      <WfcTestDetailsPage tc="TC172" label="IP Impairments" />
      <WfcTestDetailsPage tc="TC175" label="In of WFC Coverage" />
      <WfcTestDetailsPage tc="TC178" label="Out of WFC Coverage" />





    </>
  );
};

export default WfcDetailsPage;