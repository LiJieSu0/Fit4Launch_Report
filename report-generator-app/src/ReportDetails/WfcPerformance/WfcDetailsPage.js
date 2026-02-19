import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import WfcTestDetailsPage from './WfcTestDetailsPage';
const WfcDetailsPage = () => {

  return (
    <>
      {/* <WfcTestDetailsPage tc="TC150" label="Call Performance Baseline" sectionNumber={1} />
      <WfcTestDetailsPage tc="TC151" label="Call Performance Baseline" />
      <WfcTestDetailsPage tc="TC152" label="Call Performance" />
      <WfcTestDetailsPage tc="TC153" label="Call Performance" />
      <WfcTestDetailsPage tc="TC154" label="Call Performance" />
      <WfcTestDetailsPage tc="TC155" label="Call Performance" />
      <WfcTestDetailsPage tc="TC156" label="Call Performance" />
      <WfcTestDetailsPage tc="TC157" label="Call Performance" />
      <WfcTestDetailsPage tc="TC158" label="Call Performance" />
      <WfcTestDetailsPage tc="TC159" label="Call Performance" />
      <WfcTestDetailsPage tc="TC160" label="Call Performance" />
      <WfcTestDetailsPage tc="TC161" label="Call Performance" />

      <WfcTestDetailsPage tc="TC164" label="Multi Handovers" sectionNumber={2} />
      <WfcTestDetailsPage tc="TC167" label="Multi Handovers" />
      <WfcTestDetailsPage tc="TC170" label="Multi Handovers" />
      <WfcTestDetailsPage tc="TC172" label="IP Impairments" />
      <WfcTestDetailsPage tc="TC175" label="In of WFC Coverage" /> */}
      {/* <WfcTestDetailsPage tc="TC178" label="Out of WFC Coverage" /> */}

      {/* Baseline Celluar and wfc call performance */}
      <WfcTestDetailsPage tc="TC150" label="Call Performance Baseline"
        caseTitle="Cellular Call Performance and Audio Quality Baseline" sectionNumber={1} />
      <WfcTestDetailsPage tc="TC151" label="Call Performance Baseline"
        caseTitle="Cellular Call Performance and Audio Quality Baseline (LinkSys Hydra Pro 6E)" />



      {/* WFC Call Performance */}
      {/* WFC call overall performance */}


      {/* LinkSys Hydra Pro 6E */}
      {/* TC153 */}
      {/* TC154 */}
      {/* TC155 */}

      {/* ASUS RT-AC68U */}
      {/* TC156 */}
      {/* TC157 */}
      {/* TC158 */}

      {/* Google Nest AP AC2200 */}
      {/* TC159 */}
      {/* TC160 */}
      {/* TC161 */}



      {/* Multi Handover */}
      {/* Profile 1 */}
      {/* TC162 */}
      {/* TC163 */}
      {/* TC164 */}
      {/* Profile 2 */}
      {/* TC165 */}
      {/* TC166 */}
      {/* TC167 */}
      {/* Profile 3 */}
      {/* TC168 */}
      {/* TC169 */}
      {/* TC170 */}

      {/* IP Impairments */}
      {/* TC171 */}
      {/* TC172 */}
      {/* TC173 */}

      {/* In of WFC Coverage */}
      {/* TC174 */}
      {/* TC175 */}
      {/* TC176 */}

      {/* Out of WFC Coverage */}
      {/* TC177 */}
      {/* TC178 */}
      {/* TC179 */}


      {/* haven't classified yet */}
      {/* TC152 */}
      {/* TC180 */}





    </>
  );
};

export default WfcDetailsPage;