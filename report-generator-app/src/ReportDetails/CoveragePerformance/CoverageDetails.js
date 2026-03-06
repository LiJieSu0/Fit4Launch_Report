import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import VonrCoverageSection from './VonrCoverageSection';
import HpueCoverageSection from './HpueCoverageSection';
import LteCoverageSection from './LteCoverageSection';

function CoverageDetails() {
  const DataOnlyDevice = false;
  return (
    <div>
      <VonrCoverageSection city="Seattle" firstSection={true} dataOnlyDevice={DataOnlyDevice} />
      <VonrCoverageSection city="New York" dataOnlyDevice={DataOnlyDevice} />
      {/* LTE Coverage section */}
      <LteCoverageSection city="Seattle" firstSection={true} dataOnlyDevice={DataOnlyDevice} />
      <LteCoverageSection city="New York" dataOnlyDevice={DataOnlyDevice} />
      {/* HPUE Coverage section */}
      <HpueCoverageSection city="Seattle" firstSection={true} />
      <HpueCoverageSection city="New York" />
    </div>
  );
}
export default CoverageDetails;
