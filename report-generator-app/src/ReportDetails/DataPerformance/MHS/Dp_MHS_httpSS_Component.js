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

  return (
    <div className='page-content'>
      <h2>MHS-httpSS Component</h2>
      <DpMHSHttpSSTable data={dataDL} tableName="MHS Single Stream HTTP Download Throughput" />
      {/* dl histogram */}
      <DpMHSHttpSSTable data={dataUL} tableName="MHS Single Stream HTTP Upload Throughput" />
      {/* ul histogram  */}
    </div>
  );
}

export default Dp_MHS_httpSS_Component;