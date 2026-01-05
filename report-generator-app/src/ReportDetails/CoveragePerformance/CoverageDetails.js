import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import VonrCoverageSection from './VonrCoverageSection';
import HpueCoverageSection from './HpueCoverageSection';

function CoverageDetails() {
  return (
    <div>
      <DynamicHeader level={1}>Coverage Test - All Networks</DynamicHeader>
      <VonrCoverageSection city="Seattle" />
      <HpueCoverageSection city="Seattle" />
    </div>
  );
}
export default CoverageDetails;
