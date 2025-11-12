import React from "react";
import DpMHSHttpMSTable from "./Table/DpMHSHttpMSTable";
import DpHistogramComponent from "../DpHistogramComponent";
import MultiStreamHTTPData from "../../../DataFiles/SA/DpMHSResults/Multi Stream HTTP.json";
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';


function Dp_MHS_httpMS_Component() {
  const goodDownloadData = MultiStreamHTTPData.Good["Multi Stream HTTP Download for 30 seconds"];
  const moderateDownloadData = MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"];

  const data = {
    Good: {
      DUT: goodDownloadData["DUT MS HTTP DL for 30 seconds"].Throughput,
      REF: goodDownloadData["REF MS HTTP DL for 30 seconds"].Throughput,
    },
    Moderate: {
      DUT: moderateDownloadData["DUT MS HTTP DL 30s"].Throughput,
      REF: moderateDownloadData["REF MS HTTP DL 30s"].Throughput,
    },
  };

  const overallDownloadDUTMean = (data.Good.DUT["Mean"] + data.Moderate.DUT["Mean"]) / 2;
  const overallDownloadREFMean = (data.Good.REF["Mean"] + data.Moderate.REF["Mean"]) / 2;

  const uploadGoodData = MultiStreamHTTPData.Good["Multi Stream HTTP Upload for 30 seconds"];
  const uploadModerateData = MultiStreamHTTPData.Moderate["Multi Stream HTTP Upload for 30 seconds"];

  const dataUL = {
    Good: {
      DUT: uploadGoodData["_20250915_120237_CH01_TMO-DUT_5G MHS_Multi Stream HTTP Upload for 30 seconds_Good Coverage_DA Test"].Throughput,
      REF: uploadGoodData["_20250915_120237_CH02_TMO-Ref_5G MHS_Multi Stream HTTP Upload for 30 seconds_Good Coverage_DA Test"].Throughput,
    },
    Moderate: {
      DUT: uploadModerateData["DUT MS HTTP UL 30S"].Throughput,
      REF: uploadModerateData["REF MS HTTP UL 30S"].Throughput,
    },
  };

  const overallUploadDUTMean = (dataUL.Good.DUT["Mean"] + dataUL.Moderate.DUT["Mean"]) / 2;
  const overallUploadREFMean = (dataUL.Good.REF["Mean"] + dataUL.Moderate.REF["Mean"]) / 2;

  return (
    <div className='page-content'>
      <h2>MHS-httpMS Component</h2>
      <DpMHSHttpMSTable data={data} tableName="MHS Multi Stream HTTP Download Throughput" />
      <DpHistogramComponent
        data={[
          { name: 'Good', DUT: data.Good.DUT["Mean"], REF: data.Good.REF["Mean"] },
          { name: 'Moderate', DUT: data.Moderate.DUT["Mean"], REF: data.Moderate.REF["Mean"] },
          { name: 'Overall', DUT: overallDownloadDUTMean, REF: overallDownloadREFMean },
        ]}
        title="MHS Multi Stream HTTP Download Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
      <DpMHSHttpMSTable data={dataUL} tableName="MHS Multi Stream HTTP Upload Throughput" />
      <DpHistogramComponent
        data={[
          { name: 'Good', DUT: dataUL.Good.DUT["Mean"], REF: dataUL.Good.REF["Mean"] },
          { name: 'Moderate', DUT: dataUL.Moderate.DUT["Mean"], REF: dataUL.Moderate.REF["Mean"] },
          { name: 'Overall', DUT: overallUploadDUTMean, REF: overallUploadREFMean },
        ]}
        title="MHS Multi Stream HTTP Upload Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
    </div>
  );
}



export default Dp_MHS_httpMS_Component;