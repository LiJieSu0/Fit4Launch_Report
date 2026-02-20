import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import WfcBaselineDetails from './WfcBaselineDetails';
import PageBreak from '../../CommonPage/PageBreak';
import WfcCallPerformance from './WfcCallPerformance';
import DynamicHeader from '../../CommonPage/DynamicHeader';
const WfcDetailsPage = () => {

  return (
    <>
      {/* <WfcBaselineDetails tc="TC150" label="Call Performance Baseline" sectionNumber={1} />
      <WfcBaselineDetails tc="TC151" label="Call Performance Baseline" />
      <WfcBaselineDetails tc="TC152" label="Call Performance" />
      <WfcBaselineDetails tc="TC153" label="Call Performance" />
      <WfcBaselineDetails tc="TC154" label="Call Performance" />
      <WfcBaselineDetails tc="TC155" label="Call Performance" />
      <WfcBaselineDetails tc="TC156" label="Call Performance" />
      <WfcBaselineDetails tc="TC157" label="Call Performance" />
      <WfcBaselineDetails tc="TC158" label="Call Performance" />
      <WfcBaselineDetails tc="TC159" label="Call Performance" />
      <WfcBaselineDetails tc="TC160" label="Call Performance" />
      <WfcBaselineDetails tc="TC161" label="Call Performance" />

      <WfcBaselineDetails tc="TC164" label="Multi Handovers" sectionNumber={2} />
      <WfcBaselineDetails tc="TC167" label="Multi Handovers" />
      <WfcBaselineDetails tc="TC170" label="Multi Handovers" />
      <WfcBaselineDetails tc="TC172" label="IP Impairments" />
      <WfcBaselineDetails tc="TC175" label="In of WFC Coverage" /> */}
      {/* <WfcBaselineDetails tc="TC178" label="Out of WFC Coverage" /> */}

      {/* Baseline Celluar and wfc call performance */}
      <WfcBaselineDetails tc="TC150" label="Call Performance Baseline"
        caseTitle="Cellular Call Performance and Audio Quality Baseline" sectionNumber={1} />
      <WfcBaselineDetails tc="TC151" label="Call Performance Baseline"
        caseTitle="Cellular Call Performance and Audio Quality Baseline (LinkSys Hydra Pro 6E)" />



      {/* WFC Call Performance */}
      {/* WFC call overall performance table, total call numbers*/}
      <PageBreak>
        <DynamicHeader level={1}>Wifi Call Performance Overview</DynamicHeader>
      </PageBreak>

      {/* No impairment */}
      {/* TC152 */}

      {/* LinkSys Hydra Pro 6E */}
      <WfcCallPerformance title="LinkSys Hydra Pro 6E" tc="TC153 TC154 TC155" />
      {/* TC153 ETSI-B*/}
      {/* TC154 NSD-A*/}
      {/* TC155 NSD-C*/}
      <WfcCallPerformance title="ASUS RT-AC68U" tc="TC156 TC157 TC158" />
      {/* ASUS RT-AC68U */}
      {/* TC156 ETSI-B*/}
      {/* TC157 NSD-A*/}
      {/* TC158 NSD-C*/}
      <WfcCallPerformance title="Google Nest AP AC2200" tc="TC159 TC160 TC161" />
      {/* Google Nest AP AC2200 */}
      {/* TC159 ETSI-B*/}
      {/* TC160 NSD-A*/}
      {/* TC161 NSD-C*/}



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
      {/* TC180 */}





    </>
  );
};

export default WfcDetailsPage;
