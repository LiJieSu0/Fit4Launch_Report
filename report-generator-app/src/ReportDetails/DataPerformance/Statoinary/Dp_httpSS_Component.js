import React from 'react';
import DpDetailsTableLoc3 from './Table/DpDetailsTableLoc3';
import OverallTable from '../../../CommonPage/OverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import httpSS_Stationary_DL_Data from '../../../DataFiles/SA/DpStationaryResults/Single Stream HTTP.json';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';

function Dp_httpSS_Component() {
  const httpSS_Stationary_DL = {
    Good: {
      DUT: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_SS HTTP DL_Good"].Throughput,
      REF: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_SS HTTP DL_Good"].Throughput,
    },
    Moderate: {
      DUT: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_Single Stream HTTP Download for 60 seconds"].Throughput,
      REF: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_Single Stream HTTP Download for 60 seconds"].Throughput,
    },
    Poor: {
      DUT: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_Single Stream HTTP Download for 60 seconds_Poor"].Throughput,
      REF: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_Single Stream HTTP Download for 60 seconds_Poor"].Throughput,
    },
  };

  const httpSS_Stationary_UL = {
    Good: {
      DUT: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G auto_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G auto_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
    },
    Moderate: {
      DUT: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Upload of a 15 MB file"]["_20250919_110731_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Upload of a 15 MB file"]["_20250919_110731_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
    },
    Poor: {
      DUT: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Upload of a 15 MB file"]["dut_5g auto_Single Stream HTTP Upload of a 15 MB file_poor Coverage_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Upload of a 15 MB file"]["ref_5g auto_Single Stream HTTP Upload of a 15 MB file_poor Coverage_DA Test"].Throughput,
    },
  };

  const dlHistogramData = [
    { name: 'Good', DUT: httpSS_Stationary_DL.Good.DUT.Mean, REF: httpSS_Stationary_DL.Good.REF.Mean },
    { name: 'Moderate', DUT: httpSS_Stationary_DL.Moderate.DUT.Mean, REF: httpSS_Stationary_DL.Moderate.REF.Mean },
    { name: 'Poor', DUT: httpSS_Stationary_DL.Poor.DUT.Mean, REF: httpSS_Stationary_DL.Poor.REF.Mean },
    { name: 'Overall',
      DUT: (httpSS_Stationary_DL.Good.DUT.Mean + httpSS_Stationary_DL.Moderate.DUT.Mean + httpSS_Stationary_DL.Poor.DUT.Mean) / 3,
      REF: (httpSS_Stationary_DL.Good.REF.Mean + httpSS_Stationary_DL.Moderate.REF.Mean + httpSS_Stationary_DL.Poor.REF.Mean) / 3
    },
  ];

  const ulHistogramData = [
    { name: 'Good', DUT: httpSS_Stationary_UL.Good.DUT.Mean, REF: httpSS_Stationary_UL.Good.REF.Mean },
    { name: 'Moderate', DUT: httpSS_Stationary_UL.Moderate.DUT.Mean, REF: httpSS_Stationary_UL.Moderate.REF.Mean },
    { name: 'Poor', DUT: httpSS_Stationary_UL.Poor.DUT.Mean, REF: httpSS_Stationary_UL.Poor.REF.Mean },
    { name: 'Overall',
      DUT: (httpSS_Stationary_UL.Good.DUT.Mean + httpSS_Stationary_UL.Moderate.DUT.Mean + httpSS_Stationary_UL.Poor.DUT.Mean) / 3,
      REF: (httpSS_Stationary_UL.Good.REF.Mean + httpSS_Stationary_UL.Moderate.REF.Mean + httpSS_Stationary_UL.Poor.REF.Mean) / 3
    },
  ];

  const dlOverallTableHeader = ["Throughput", "Device Name", "Overall"];
  const dlOverallTableData = [
    ["Average", "DUT", ((httpSS_Stationary_DL.Good.DUT.Mean + httpSS_Stationary_DL.Moderate.DUT.Mean + httpSS_Stationary_DL.Poor.DUT.Mean) / 3).toFixed(2)],
    ["Average", "REF", ((httpSS_Stationary_DL.Good.REF.Mean + httpSS_Stationary_DL.Moderate.REF.Mean + httpSS_Stationary_DL.Poor.REF.Mean) / 3).toFixed(2)],
    ["Standard Deviation", "DUT", ((httpSS_Stationary_DL.Good.DUT["Standard Deviation"] + httpSS_Stationary_DL.Moderate.DUT["Standard Deviation"] + httpSS_Stationary_DL.Poor.DUT["Standard Deviation"]) / 3).toFixed(2)],
    ["Standard Deviation", "REF", ((httpSS_Stationary_DL.Good.REF["Standard Deviation"] + httpSS_Stationary_DL.Moderate.REF["Standard Deviation"] + httpSS_Stationary_DL.Poor.REF["Standard Deviation"]) / 3).toFixed(2)],
    ["Maximum", "DUT", ((httpSS_Stationary_DL.Good.DUT.Maximum + httpSS_Stationary_DL.Moderate.DUT.Maximum + httpSS_Stationary_DL.Poor.DUT.Maximum) / 3).toFixed(2)],
    ["Maximum", "REF", ((httpSS_Stationary_DL.Good.REF.Maximum + httpSS_Stationary_DL.Moderate.REF.Maximum + httpSS_Stationary_DL.Poor.REF.Maximum) / 3).toFixed(2)],
    ["Minimum", "DUT", ((httpSS_Stationary_DL.Good.DUT.Minimum + httpSS_Stationary_DL.Moderate.DUT.Minimum + httpSS_Stationary_DL.Poor.DUT.Minimum) / 3).toFixed(2)],
    ["Minimum", "REF", ((httpSS_Stationary_DL.Good.REF.Minimum + httpSS_Stationary_DL.Moderate.REF.Minimum + httpSS_Stationary_DL.Poor.REF.Minimum) / 3).toFixed(2)],
  ];

  const ulOverallTableHeader = ["Throughput", "Device Name", "Overall"];
  const ulOverallTableData = [
    ["Average", "DUT", ((httpSS_Stationary_UL.Good.DUT.Mean + httpSS_Stationary_UL.Moderate.DUT.Mean + httpSS_Stationary_UL.Poor.DUT.Mean) / 3).toFixed(2)],
    ["Average", "REF", ((httpSS_Stationary_UL.Good.REF.Mean + httpSS_Stationary_UL.Moderate.REF.Mean + httpSS_Stationary_UL.Poor.REF.Mean) / 3).toFixed(2)],
    ["Standard Deviation", "DUT", ((httpSS_Stationary_UL.Good.DUT["Standard Deviation"] + httpSS_Stationary_UL.Moderate.DUT["Standard Deviation"] + httpSS_Stationary_UL.Poor.DUT["Standard Deviation"]) / 3).toFixed(2)],
    ["Standard Deviation", "REF", ((httpSS_Stationary_UL.Good.REF["Standard Deviation"] + httpSS_Stationary_UL.Moderate.REF["Standard Deviation"] + httpSS_Stationary_UL.Poor.REF["Standard Deviation"]) / 3).toFixed(2)],
    ["Maximum", "DUT", ((httpSS_Stationary_UL.Good.DUT.Maximum + httpSS_Stationary_UL.Moderate.DUT.Maximum + httpSS_Stationary_UL.Poor.DUT.Maximum) / 3).toFixed(2)],
    ["Maximum", "REF", ((httpSS_Stationary_UL.Good.REF.Maximum + httpSS_Stationary_UL.Moderate.REF.Maximum + httpSS_Stationary_UL.Poor.REF.Maximum) / 3).toFixed(2)],
    ["Minimum", "DUT", ((httpSS_Stationary_UL.Good.DUT.Minimum + httpSS_Stationary_UL.Moderate.DUT.Minimum + httpSS_Stationary_UL.Poor.DUT.Minimum) / 3).toFixed(2)],
    ["Minimum", "REF", ((httpSS_Stationary_UL.Good.REF.Minimum + httpSS_Stationary_UL.Moderate.REF.Minimum + httpSS_Stationary_UL.Poor.REF.Minimum) / 3).toFixed(2)],
  ];

  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];
  console.log("DUT value"+httpSS_Stationary_DL.Good.DUT);
  return (
    <div className='page-content'>
      
      <h2>HTTP Single Stream test - 5G NR</h2>
      <h3>Overall Single Stream HTTP Download for 60 seconds</h3>
      <OverallTable tableHeader={dlOverallTableHeader} tableData={dlOverallTableData} />
      <DpDetailsTableLoc3 data={httpSS_Stationary_DL} tableName="Single Stream HTTP Download for 60 seconds" />
      <DpHistogramComponent
        data={dlHistogramData}
        title="Single Stream HTTP Download Throughput"
        yAxisLabel="Throughput (Mbps)"
        barKeys={barKeys}
      />
      <h3>Overall Single Stream HTTP Upload of a 15 MB file</h3>
      <OverallTable tableHeader={ulOverallTableHeader} tableData={ulOverallTableData} />
      <DpDetailsTableLoc3 data={httpSS_Stationary_UL} tableName="Single Stream HTTP Upload of a 15 MB file"  />
      <DpHistogramComponent
        data={ulHistogramData}
        title="Single Stream HTTP Upload Throughput"
        yAxisLabel="Throughput (Mbps)"
        barKeys={barKeys}
      />
    </div>
  );
}

export default Dp_httpSS_Component;