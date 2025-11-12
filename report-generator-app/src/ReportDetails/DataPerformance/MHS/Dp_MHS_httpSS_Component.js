import React from "react";
import DpMHSHttpSSTable from "./Table/DpMHSHttpSSTable";
import SingleStreamHTTPData from "../../../DataFiles/SA/DpMHSResults/Single Stream HTTP.json";

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

  const dataUL = {
    
  };

  return (
    <div className='page-content'>
      <h2>MHS-httpSS Component</h2>
      <DpMHSHttpSSTable data={dataDL} tableName="MHS Single Stream HTTP Download Throughput" />
      <DpMHSHttpSSTable data={dataUL} tableName="MHS Single Stream HTTP Upload Throughput" />

    </div>
  );
}

export default Dp_MHS_httpSS_Component;