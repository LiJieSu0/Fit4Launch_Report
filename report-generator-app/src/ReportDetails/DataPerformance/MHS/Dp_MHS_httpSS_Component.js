import React from "react";
import DpMHSHttpSSTable from "./Table/DpMHSHttpSSTable";
import DpHistogramComponent from "../DpHistogramComponent";
import SingleStreamHTTPData from "../../../DataFiles/SA/DpMHSResults/Single Stream HTTP.json";
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';

function Dp_MHS_httpSS_Component() {
  const goodData = SingleStreamHTTPData.Good["Single Stream HTTP Download for 60 seconds"];
  const moderateData = SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"];

  const dataDL = {
    Good: {
      DUT: goodData["DUT SS HTTP DL for 60 seconds"].Throughput,
      REF: goodData["REF SS HTTP DL for 60 seconds"].Throughput,
    },
    Moderate: {
      DUT: moderateData["DUT SS HTTP DL 60S"].Throughput,
      REF: moderateData["REF SS HTTP DL 60S"].Throughput,
    },
  };

  const overallDownloadDUTMean = (dataDL.Good.DUT["Mean"] + dataDL.Moderate.DUT["Mean"]) / 2;
  const overallDownloadREFMean = (dataDL.Good.REF["Mean"] + dataDL.Moderate.REF["Mean"]) / 2;

  const uploadGoodData = SingleStreamHTTPData.Good["Single Stream HTTP Upload of a 15 MB file"];
  const uploadModerateData = SingleStreamHTTPData.Moderate["Single Stream HTTP Upload of a 15 MB file"];

  const dataUL = {
    Good: {
      DUT: uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
      REF: uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
    },
    Moderate: {
      DUT: uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput,
      REF: uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput,
    },
  };

  const overallUploadDUTMean = (dataUL.Good.DUT["Mean"] + dataUL.Moderate.DUT["Mean"]) / 2;
  const overallUploadREFMean = (dataUL.Good.REF["Mean"] + dataUL.Moderate.REF["Mean"]) / 2;

  return (
    <div className='page-content'>
      <h2>MHS-httpSS Component</h2>
      <DpMHSHttpSSTable data={dataDL} tableName="MHS Single Stream HTTP Download Throughput" />
      <DpHistogramComponent
        data={[
          { name: 'Good', DUT: dataDL.Good.DUT["Mean"], REF: dataDL.Good.REF["Mean"] },
          { name: 'Moderate', DUT: dataDL.Moderate.DUT["Mean"], REF: dataDL.Moderate.REF["Mean"] },
          { name: 'Overall', DUT: overallDownloadDUTMean, REF: overallDownloadREFMean },
        ]}
        title="MHS Single Stream HTTP Download Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
      <DpMHSHttpSSTable data={dataUL} tableName="MHS Single Stream HTTP Upload Throughput" />
      <DpHistogramComponent
        data={[
          { name: 'Good', DUT: dataUL.Good.DUT["Mean"], REF: dataUL.Good.REF["Mean"] },
          { name: 'Moderate', DUT: dataUL.Moderate.DUT["Mean"], REF: dataUL.Moderate.REF["Mean"] },
          { name: 'Overall', DUT: overallUploadDUTMean, REF: overallUploadREFMean },
        ]}
        title="MHS Single Stream HTTP Upload Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
    </div>
  );
}

export default Dp_MHS_httpSS_Component;