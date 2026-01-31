import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import VonrCoverageSection from './VonrCoverageSection';
import HpueCoverageSection from './HpueCoverageSection';
import LteCoverageSection from './LteCoverageSection';

function CoverageDetails() {
  return (
    <div>
      <VonrCoverageSection city="Seattle" firstSection={true} />
      <VonrCoverageSection city="New York" />
      {/* LTE Coverage section */}
      <LteCoverageSection city="Seattle" firstSection={true} />
      <LteCoverageSection city="New York" />
      {/* HPUE Coverage section */}
      <HpueCoverageSection city="Seattle" firstSection={true} />
      <HpueCoverageSection city="New York" />
    </div>
  );
}
export default CoverageDetails;
