import React, { useContext } from "react";
import DpMHSPingTable from "./Table/DpMHSPingTable";
import DpPingOverallTable from "../Statoinary/Table/DpPingOverallTable";
import { ReportContext } from '../../../Contexts/ReportContext';
import DpHistogramComponent from "../DpHistogramComponent";
import { CHART_COLOR_DUT, CHART_COLOR_REF } from "../../../Constants/ChartColors";
import DynamicHeader from "../../../CommonPage/DynamicHeader";

function Dp_MHS_Ping_Component() {
  const { reportData } = useContext(ReportContext);

  if (!reportData || !reportData.dataPerformanceDetails) {
    return <div className="page-content">Loading...</div>;
  }

  const pingDataRaw = reportData.dataPerformanceDetails.SA?.["Mobile Hotspot Test"]?.["Ping"];

  if (!pingDataRaw) {
    return <div className="page-content">No MHS Ping Data available</div>;
  }

  const getPingMetrics = (coverage, device) => {
    const metrics = pingDataRaw?.[coverage]?.[device]?.["Ping RTT"];
    return metrics || { min: 0, max: 0, avg: 0, std_dev: 0 };
  };

  const goodDUT = getPingMetrics("Good", "DUT");
  const goodREF = getPingMetrics("Good", "REF");
  const modDUT = getPingMetrics("Moderate", "DUT");
  const modREF = getPingMetrics("Moderate", "REF");

  // Note: Previous code didn't use Poor data for calculation, sticking to existing logic for consistency
  // but if needed, Poor data is available via "Poor" key.

  const calculateOverall = (val1, val2) => {
    const v1 = parseFloat(val1 || 0);
    const v2 = parseFloat(val2 || 0);
    if (v1 === 0 && v2 === 0) return 0;
    if (v1 === 0) return v2.toFixed(2);
    if (v2 === 0) return v1.toFixed(2);
    return ((v1 + v2) / 2).toFixed(2);
  };

  const data = {
    average: {
      DUT: {
        Good: goodDUT.avg,
        Moderate: modDUT.avg,
        Overall: calculateOverall(goodDUT.avg, modDUT.avg),
      },
      REF: {
        Good: goodREF.avg,
        Moderate: modREF.avg,
        Overall: calculateOverall(goodREF.avg, modREF.avg),
      },
    },
    std_dev: {
      DUT: {
        Good: goodDUT.std_dev,
        Moderate: modDUT.std_dev,
        Overall: calculateOverall(goodDUT.std_dev, modDUT.std_dev),
      },
      REF: {
        Good: goodREF.std_dev,
        Moderate: modREF.std_dev,
        Overall: calculateOverall(goodREF.std_dev, modREF.std_dev),
      },
    },
    max: {
      DUT: {
        Good: goodDUT.max,
        Moderate: modDUT.max,
        Overall: calculateOverall(goodDUT.max, modDUT.max),
      },
      REF: {
        Good: goodREF.max,
        Moderate: modREF.max,
        Overall: calculateOverall(goodREF.max, modREF.max),
      },
    },
    min: {
      DUT: {
        Good: goodDUT.min,
        Moderate: modDUT.min,
        Overall: calculateOverall(goodDUT.min, modDUT.min),
      },
      REF: {
        Good: goodREF.min,
        Moderate: modREF.min,
        Overall: calculateOverall(goodREF.min, modREF.min),
      },
    },
  };

  const histogramData = [
    { name: "Good", DUT: data.average.DUT.Good, REF: data.average.REF.Good },
    { name: "Moderate", DUT: data.average.DUT.Moderate, REF: data.average.REF.Moderate },
    { name: "Overall", DUT: data.average.DUT.Overall, REF: data.average.REF.Overall },
  ];

  const barKeys = [
    { key: "DUT", fill: CHART_COLOR_DUT },
    { key: "REF", fill: CHART_COLOR_REF },
  ];

  return (
    <>
      <div className="page-content">
        <DynamicHeader level={3}>Ping Test - Mobile Hotspot</DynamicHeader>
        <h4>MHS Ping Test Overview</h4>
        <DpPingOverallTable data={data} />
      </div>
      <div className="page-content">
        <h4>MHS Ping Test Details</h4>
        <DpMHSPingTable data={data} />
        <DpHistogramComponent
          data={histogramData}
          title="Ping RTT"
          yAxisLabel="Latency (ms)"
          barKeys={barKeys}
        />
      </div>
    </>
  );
}

export default Dp_MHS_Ping_Component;