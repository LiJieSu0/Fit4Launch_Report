import React from "react";
import DpMHSHttpSSTable from "./Table/DpMHSHttpSSTable";
import DpHistogramComponent from "../DpHistogramComponent";
import DpRangeChart from "../DpRangeChart";
import DpThroughputOverallTable from "../DpThroughputOverallTable";
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

  const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];
  const combinedOverallTableData = [
    ["Average", "DUT", overallDownloadDUTMean.toFixed(2), overallUploadDUTMean.toFixed(2)],
    ["Average", "REF", overallDownloadREFMean.toFixed(2), overallUploadREFMean.toFixed(2)],
    ["Standard Deviation", "DUT", ((goodData["DUT SS HTTP DL for 60 seconds"].Throughput["Standard Deviation"] + moderateData["DUT SS HTTP DL 60S"].Throughput["Standard Deviation"]) / 2).toFixed(2), ((uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput["Standard Deviation"] + uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput["Standard Deviation"]) / 2).toFixed(2)],
    ["Standard Deviation", "REF", ((goodData["REF SS HTTP DL for 60 seconds"].Throughput["Standard Deviation"] + moderateData["REF SS HTTP DL 60S"].Throughput["Standard Deviation"]) / 2).toFixed(2), ((uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput["Standard Deviation"] + uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput["Standard Deviation"]) / 2).toFixed(2)],
    ["Maximum", "DUT", ((goodData["DUT SS HTTP DL for 60 seconds"].Throughput.Maximum + moderateData["DUT SS HTTP DL 60S"].Throughput.Maximum) / 2).toFixed(2), ((uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Maximum + uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Maximum) / 2).toFixed(2)],
    ["Maximum", "REF", ((goodData["REF SS HTTP DL for 60 seconds"].Throughput.Maximum + moderateData["REF SS HTTP DL 60S"].Throughput.Maximum) / 2).toFixed(2), ((uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Maximum + uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Maximum) / 2).toFixed(2)],
    ["Minimum", "DUT", ((goodData["DUT SS HTTP DL for 60 seconds"].Throughput.Minimum + moderateData["DUT SS HTTP DL 60S"].Throughput.Minimum) / 2).toFixed(2), ((uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Minimum + uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Minimum) / 2).toFixed(2)],
    ["Minimum", "REF", ((goodData["REF SS HTTP DL for 60 seconds"].Throughput.Minimum + moderateData["REF SS HTTP DL 60S"].Throughput.Minimum) / 2).toFixed(2), ((uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Minimum + uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Minimum) / 2).toFixed(2)],
  ];

  const downloadRangeChartData = {
    Good: {
      dutMin: goodData["DUT SS HTTP DL for 60 seconds"].Throughput.Minimum,
      dutMax: goodData["DUT SS HTTP DL for 60 seconds"].Throughput.Maximum,
      dutMean: goodData["DUT SS HTTP DL for 60 seconds"].Throughput.Mean,
      refMin: goodData["REF SS HTTP DL for 60 seconds"].Throughput.Minimum,
      refMax: goodData["REF SS HTTP DL for 60 seconds"].Throughput.Maximum,
      refMean: goodData["REF SS HTTP DL for 60 seconds"].Throughput.Mean,
    },
    Moderate: {
      dutMin: moderateData["DUT SS HTTP DL 60S"].Throughput.Minimum,
      dutMax: moderateData["DUT SS HTTP DL 60S"].Throughput.Maximum,
      dutMean: moderateData["DUT SS HTTP DL 60S"].Throughput.Mean,
      refMin: moderateData["REF SS HTTP DL 60S"].Throughput.Minimum,
      refMax: moderateData["REF SS HTTP DL 60S"].Throughput.Maximum,
      refMean: moderateData["REF SS HTTP DL 60S"].Throughput.Mean,
    },
  };

  const overallDownloadDUTMin = (downloadRangeChartData.Good.dutMin + downloadRangeChartData.Moderate.dutMin) / 2;
  const overallDownloadDUTMax = (downloadRangeChartData.Good.dutMax + downloadRangeChartData.Moderate.dutMax) / 2;
  const overallDownloadREFMin = (downloadRangeChartData.Good.refMin + downloadRangeChartData.Moderate.refMin) / 2;
  const overallDownloadREFMax = (downloadRangeChartData.Good.refMax + downloadRangeChartData.Moderate.refMax) / 2;

  downloadRangeChartData.Overall = {
    dutMin: overallDownloadDUTMin,
    dutMax: overallDownloadDUTMax,
    dutMean: overallDownloadDUTMean,
    refMin: overallDownloadREFMin,
    refMax: overallDownloadREFMax,
    refMean: overallDownloadREFMean,
  };

  const uploadRangeChartData = {
    Good: {
      dutMin: uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Minimum,
      dutMax: uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Maximum,
      dutMean: uploadGoodData["_20250915_115630_CH01_TMO-DUT_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Mean,
      refMin: uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Minimum,
      refMax: uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Maximum,
      refMean: uploadGoodData["_20250915_115630_CH02_TMO-Ref_5G MHS_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput.Mean,
    },
    Moderate: {
      dutMin: uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Minimum,
      dutMax: uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Maximum,
      dutMean: uploadModerateData["_20250918_124924_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Mean,
      refMin: uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Minimum,
      refMax: uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Maximum,
      refMean: uploadModerateData["_20250918_124924_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_Moderate Coverage_DA Test"].Throughput.Mean,
    },
  };

  const overallUploadDUTMin = (uploadRangeChartData.Good.dutMin + uploadRangeChartData.Moderate.dutMin) / 2;
  const overallUploadDUTMax = (uploadRangeChartData.Good.dutMax + uploadRangeChartData.Moderate.dutMax) / 2;
  const overallUploadREFMin = (uploadRangeChartData.Good.refMin + uploadRangeChartData.Moderate.refMin) / 2;
  const overallUploadREFMax = (uploadRangeChartData.Good.refMax + uploadRangeChartData.Moderate.refMax) / 2;

  uploadRangeChartData.Overall = {
    dutMin: overallUploadDUTMin,
    dutMax: overallUploadDUTMax,
    dutMean: overallUploadDUTMean,
    refMin: overallUploadREFMin,
    refMax: overallUploadREFMax,
    refMean: overallUploadREFMean,
  };

  return (
    <>
      <div className='page-content'>
        <h2>MHS-httpSS Component</h2>
        <h3>Overall Single Stream HTTP</h3>
        <DpThroughputOverallTable
          tableHeader={overallTableHeader}
          tableData={combinedOverallTableData}
          kpiRule="Throughput"
          kpiTargetCells={[
            {
              rowIndex: 0,
              colIndex: 2,
              dutValue: overallDownloadDUTMean.toFixed(2),
              refValue: overallDownloadREFMean.toFixed(2),
            },
            {
              rowIndex: 0,
              colIndex: 3,
              dutValue: overallUploadDUTMean.toFixed(2),
              refValue: overallUploadREFMean.toFixed(2),
            },
          ]}
        />
        <DpMHSHttpSSTable data={dataDL} tableName="MHS Single Stream HTTP Download Throughput" kpiRule="Throughput" />
      </div>

      <div className='page-content'>
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
        <DpRangeChart
          data={downloadRangeChartData}
          chartTitle="MHS Single Stream HTTP Download Throughput Range"
          yAxisTitle="Throughput"
        />
      </div>

      <div className='page-content'>
        <DpMHSHttpSSTable data={dataUL} tableName="MHS Single Stream HTTP Upload Throughput" kpiRule="Throughput" />
      </div>
      <div className='page-content'>
        
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
        <DpRangeChart
          data={uploadRangeChartData}
          chartTitle="MHS Single Stream HTTP Upload Throughput Range"
          yAxisTitle="Throughput"
        />
      </div>

    </>
  );
}

export default Dp_MHS_httpSS_Component;