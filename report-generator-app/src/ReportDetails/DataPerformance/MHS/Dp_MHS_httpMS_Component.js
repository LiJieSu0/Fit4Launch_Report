import React from "react";
import DpMHSHttpMSTable from "./Table/DpMHSHttpMSTable";
import MultiStreamHTTPData from "../../../DataFiles/SA/DpMHSResults/Multi Stream HTTP.json";

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

  return (
    <div className='page-content'>
      <h2>MHS-httpMS Component</h2>
      <DpMHSHttpMSTable data={data} tableName="MHS Multi Stream HTTP Download Throughput" />
      {/* dl histogram */}
      <DpMHSHttpMSTable data={dataUL} tableName="MHS Multi Stream HTTP Upload Throughput" />
      {/* ul histogram */}
    </div>
  );
}

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

export default Dp_MHS_httpMS_Component;