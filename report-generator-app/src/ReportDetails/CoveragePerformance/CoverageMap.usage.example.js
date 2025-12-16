// Example usage in CoverageDetails.js:

import CoverageMap from './CoverageMap';

// Define base station coordinates (you can pass this from parent or define it here)
const BASE_STATION_COORDS = [47.1287, -122.3574]; // [latitude, longitude]

// In your component's return statement, add the map component:
// For NR25 DL map:
<CoverageMap 
  bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
  metric="first_dl_tp_gt_1"
  baseStation={BASE_STATION_COORDS}
/>

// For NR25 UL map:
<CoverageMap 
  bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
  metric="first_ul_tp_gt_1"
  baseStation={BASE_STATION_COORDS}
/>

// For NR25 MOS map:
<CoverageMap 
  bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
  metric="mos_before_drop"
  baseStation={BASE_STATION_COORDS}
/>

// For NR25 Audio (Call Drop) map:
<CoverageMap 
  bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
  metric="call_drop"
  baseStation={BASE_STATION_COORDS}
/>

// Similarly for NR41 and NR71, just change 'n25' to 'n41' or 'n71'
