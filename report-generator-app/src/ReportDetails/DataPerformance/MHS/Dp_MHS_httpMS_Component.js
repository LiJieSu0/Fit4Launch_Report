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
      <DpMHSHttpMSTable data={data} tableName="MHS Multi Stream HTTP Throughput" />
    </div>
  );
}

export default Dp_MHS_httpMS_Component;