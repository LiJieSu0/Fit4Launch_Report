import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import VonrCoverageSection from './VonrCoverageSection';
import HpueCoverageSection from './HpueCoverageSection';

function CoverageDetails() {
  return (
    <div>
      <VonrCoverageSection city="Seattle" firstSection={true} />
      <VonrCoverageSection city="New York" />
      <HpueCoverageSection city="Seattle" />
      <HpueCoverageSection city="New York" />
    </div>
  );
}
export default CoverageDetails;
