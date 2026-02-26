import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import WfcBaselineDetails from './WfcBaselineDetails';
import PageBreak from '../../CommonPage/PageBreak';
import WfcCallPerformance from './WfcCallPerformance';
import WfcMultiHandover from './WfcMultiHandover';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import WfcIpImpairment from './WfcIpImpairment';
import WfcCoverage from './WfcCoverage';
import WfcCallOverviewTable from './WfcCallOverviewTable';
import WfcMultiHandoverOverviewTable from './WfcMultiHandoverOverviewTable';
import WfcIpImpairmentOverviewTable from './WfcIpImpairmentOverviewTable';
import WfcCoverageOverviewTable from './WfcCoverageOverviewTable';
import WfcBaselineOverviewTable from './WfcBaselineOverviewTable';

const WfcDetailsPage = () => {

  {/* 
  
  REF Device
TCL Goldfinch or TCL 50XL 5G
SW Version: 5EAY
HW Version: 03
IMEI:016519000016882
Serial Number: 8PPVGA5TQ46XUWWO
IMEI:016519000016080
Serial Number: JFAQWSG6HMZLXC89
DUT
Samsung Xcover
Please use any device information you already
have for the DUT.
  */}


  return (
    <>
      {/* Baseline Celluar and wfc call performance */}
      <PageBreak>
        <h3>Baseline Cellular and WFC Call Performance Overview</h3>
        <WfcBaselineOverviewTable />
      </PageBreak>

      <PageBreak>
        <h3>Wifi Call Performance Overview</h3>
        <WfcCallOverviewTable />
      </PageBreak>

      <PageBreak>
        <h3>Multi Handovers Overview</h3>
        <WfcMultiHandoverOverviewTable />
      </PageBreak>

      <PageBreak>
        <h3>IP Impairments Overview</h3>
        <WfcIpImpairmentOverviewTable />
      </PageBreak>

      <PageBreak>
        <h3>Walk in/out of WFC Coverage Overview</h3>
        <WfcCoverageOverviewTable />
      </PageBreak>



      <WfcBaselineDetails tc="TC150" label="Call Performance Baseline"
        caseTitle="Cellular Call Performance and Audio Quality Baseline" sectionNumber={1} />
      <WfcBaselineDetails tc="TC151" label="Call Performance Baseline"
        caseTitle="Cellular Call Performance and Audio Quality Baseline (LinkSys Hydra Pro 6E)" />



      {/* WFC Call Performance */}

      <WfcCallPerformance title="LinkSys Hydra Pro 6E" tc="TC153 TC154 TC155" sectionNumber={1} />
      <WfcCallPerformance title="Google Nest AP AC2200" tc="TC159 TC160 TC161" />
      <WfcCallPerformance title="ASUS RT-AC68U" tc="TC156 TC157 TC158" />
      {/* No impairment */}
      {/* TC152 */}

      {/* LinkSys Hydra Pro 6E */}


      {/* TC153 ETSI-B*/}
      {/* TC154 NSD-A*/}
      {/* TC155 NSD-C*/}
      {/* ASUS RT-AC68U */}
      {/* TC156 ETSI-B*/}
      {/* TC157 NSD-A*/}
      {/* TC158 NSD-C*/}
      {/* Google Nest AP AC2200 */}
      {/* TC159 ETSI-B*/}
      {/* TC160 NSD-A*/}
      {/* TC161 NSD-C*/}

      <WfcMultiHandover title="T-Mobile HINT Gateway" tc="TC162 TC163 TC164" sectionNumber={1} />
      <WfcMultiHandover title="ASUS RT-AC68U" tc="TC165 TC166 TC167" />
      <WfcMultiHandover title="LinkSys Hydra Pro 6E" tc="TC168 TC169 TC170" />
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



      {/* IP Impairments Component*/}
      <WfcIpImpairment />
      {/* TC171 ASUS RT-AC68U*/}
      {/* TC172 LinkSys Hydra Pro 6E*/}
      {/* TC173 Google Nest AP AC2200*/}



      <WfcCoverage title="ASUS RT-AC68U" tc="TC174 TC177" section={1} />
      <WfcCoverage title="LinkSys Hydra Pro 6E" tc="TC175 TC178" />
      <WfcCoverage title="T-Mobile HINT Gateway" tc="TC176 TC179" />


      {/* haven't classified yet */}
      {/* TC180 */}





    </>
  );
};

export default WfcDetailsPage;
