import React from 'react';
import CoverageSummaryTable from './CoverageSummaryTable';
import SecondaryKpiSummaryTable from './SecondaryKpiSummaryTable';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import PageBreak from '../../CommonPage/PageBreak';

function CoverageSummaryPage() {
  const DataOnlyDevice = true;
  return (
    <>
      <PageBreak id="summary-page">
        <DynamicHeader level={1}>Coverage Test Overview</DynamicHeader>
        <CoverageSummaryTable dataOnlyDevice={DataOnlyDevice} />
        <p style={{ marginTop: '620px' }}>All testing were performed after walking 120 steps with DUT after rebooting according to the requirement of customer.</p>
      </PageBreak>
      <PageBreak>
        <SecondaryKpiSummaryTable />
        <p style={{ marginTop: '300px' }}>ATMC Labs (ATMCL) believes that the physical location where testing is executed is largely unimportant. A full range of test services are available to clients using a combination of facilities including our state-of-the-art accredited test laboratory in Seattle along with facilities of our various partner facilities including other 3rd party test labs. With this network of providers along with US-based project management and advanced test management tools and systems, ATMCL can offer a virtual “one-stop shop” for all wireless device testing and certification needs with a higher efficiency, quality and cost-effectiveness compared to traditional test houses.</p>
      </PageBreak>
    </>

  );
}

export default CoverageSummaryPage;