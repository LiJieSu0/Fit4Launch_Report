import React, { useContext } from "react";
import DpMHSPingTable from "./Table/DpMHSPingTable";
import DpPingOverallTable from "../Statoinary/Table/DpPingOverallTable";
import { ReportContext } from '../../../Contexts/ReportContext';
import DpHistogramComponent from "../DpHistogramComponent";
import { CHART_COLOR_DUT, CHART_COLOR_REF } from "../../../Constants/ChartColors";
import DynamicHeader from "../../../CommonPage/DynamicHeader";

import { useEffect } from 'react';

function Dp_MHS_Ping_Component({ city: propCity }) {
  const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData) {
    return <div className="page-content">Loading {city} data...</div>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  const pingDataRaw = reportData.dataPerformance?.['Data Performance']?.['5G AUTO DP']?.['Mobile Hotspot Test']?.['Ping'];

  if (!pingDataRaw) {
    return <div className="page-content">No MHS Ping Data available</div>;
  }

  const getPingMetrics = (coverage, device) => {
    const metrics = pingDataRaw?.[coverage]?.[device]?.["Ping RTT"];
    return metrics || { min: 0, max: 0, avg: 0, std_dev: 0 };
  };

  // MHS Ping data only has Moderate and Poor in the JSON
  // MHS Ping data only has Moderate and Poor in the JSON
  const goodDUT = getPingMetrics("Moderate", "DUT");
  const goodREF = getPingMetrics("Moderate", "REF");
  const modDUT = getPingMetrics("Poor", "DUT");
  const modREF = getPingMetrics("Poor", "REF");
  const poorDUT = { min: 0, max: 0, avg: 0, std_dev: 0 };
  const poorREF = { min: 0, max: 0, avg: 0, std_dev: 0 };


  const calculateOverall = (val1, val2, val3) => {
    const values = [val1, val2, val3].map(v => parseFloat(v || 0)).filter(v => v > 0);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(2);
  };

  const data = {
    average: {
      DUT: {
        Good: goodDUT.avg,
        Moderate: modDUT.avg,
        Poor: poorDUT.avg,
        Overall: calculateOverall(goodDUT.avg, modDUT.avg, poorDUT.avg),
      },
      REF: {
        Good: goodREF.avg,
        Moderate: modREF.avg,
        Poor: poorREF.avg,
        Overall: calculateOverall(goodREF.avg, modREF.avg, poorREF.avg),
      },
    },
    std_dev: {
      DUT: {
        Good: goodDUT.std_dev,
        Moderate: modDUT.std_dev,
        Poor: poorDUT.std_dev,
        Overall: calculateOverall(goodDUT.std_dev, modDUT.std_dev, poorDUT.std_dev),
      },
      REF: {
        Good: goodREF.std_dev,
        Moderate: modREF.std_dev,
        Poor: poorREF.std_dev,
        Overall: calculateOverall(goodREF.std_dev, modREF.std_dev, poorREF.std_dev),
      },
    },
    max: {
      DUT: {
        Good: goodDUT.max,
        Moderate: modDUT.max,
        Poor: poorDUT.max,
        Overall: calculateOverall(goodDUT.max, modDUT.max, poorDUT.max),
      },
      REF: {
        Good: goodREF.max,
        Moderate: modREF.max,
        Poor: poorREF.max,
        Overall: calculateOverall(goodREF.max, modREF.max, poorREF.max),
      },
    },
    min: {
      DUT: {
        Good: goodDUT.min,
        Moderate: modDUT.min,
        Poor: poorDUT.min,
        Overall: calculateOverall(goodDUT.min, modDUT.min, poorDUT.min),
      },
      REF: {
        Good: goodREF.min,
        Moderate: modREF.min,
        Poor: poorREF.min,
        Overall: calculateOverall(goodREF.min, modREF.min, poorREF.min),
      },
    },
  };

  const histogramData = [];
  if (data.average.DUT.Good || data.average.REF.Good) {
    histogramData.push({ name: "Good", DUT: data.average.DUT.Good, REF: data.average.REF.Good });
  }
  if (data.average.DUT.Moderate || data.average.REF.Moderate) {
    histogramData.push({ name: "Moderate", DUT: data.average.DUT.Moderate, REF: data.average.REF.Moderate });
  }
  if (data.average.DUT.Poor || data.average.REF.Poor) {
    histogramData.push({ name: "Poor", DUT: data.average.DUT.Poor, REF: data.average.REF.Poor });
  }
  histogramData.push({ name: "Overall", DUT: data.average.DUT.Overall, REF: data.average.REF.Overall });

  const barKeys = [
    { key: "DUT", fill: CHART_COLOR_DUT },
    { key: "REF", fill: CHART_COLOR_REF },
  ];

  return (
    <>
      <div className="page-content">
        <DynamicHeader level={3}>Ping Test - Mobile Hotspot - {city}</DynamicHeader>
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