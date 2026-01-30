import React, { useContext } from "react";
import DpMHSPingTable from "./Table/DpMHSPingTable";
import DpPingOverallTable from "../Statoinary/Table/DpPingOverallTable";
import { ReportContext } from '../../../Contexts/ReportContext';
import DpHistogramComponent from "../DpHistogramComponent";
import { CHART_COLOR_DUT, CHART_COLOR_REF } from "../../../Constants/ChartColors";
import DynamicHeader from "../../../CommonPage/DynamicHeader";

import { useEffect } from 'react';

function Dp_MHS_Ping_Component({ city: propCity }) {
  const { city: globalCity, allReportData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = allReportData[city];

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
  const modDUT = getPingMetrics("Moderate", "DUT");
  const modREF = getPingMetrics("Moderate", "REF");
  const poorDUT = getPingMetrics("Poor", "DUT");
  const poorREF = getPingMetrics("Poor", "REF");


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
        Moderate: modDUT.avg,
        Poor: poorDUT.avg,
        Overall: calculateOverall(modDUT.avg, poorDUT.avg),
      },
      REF: {
        Moderate: modREF.avg,
        Poor: poorREF.avg,
        Overall: calculateOverall(modREF.avg, poorREF.avg),
      },
    },
    std_dev: {
      DUT: {
        Moderate: modDUT.std_dev,
        Poor: poorDUT.std_dev,
        Overall: calculateOverall(modDUT.std_dev, poorDUT.std_dev),
      },
      REF: {
        Moderate: modREF.std_dev,
        Poor: poorREF.std_dev,
        Overall: calculateOverall(modREF.std_dev, poorREF.std_dev),
      },
    },
    max: {
      DUT: {
        Moderate: modDUT.max,
        Poor: poorDUT.max,
        Overall: calculateOverall(modDUT.max, poorDUT.max),
      },
      REF: {
        Moderate: modREF.max,
        Poor: poorREF.max,
        Overall: calculateOverall(modREF.max, poorREF.max),
      },
    },
    min: {
      DUT: {
        Moderate: modDUT.min,
        Poor: poorDUT.min,
        Overall: calculateOverall(modDUT.min, poorDUT.min),
      },
      REF: {
        Moderate: modREF.min,
        Poor: poorREF.min,
        Overall: calculateOverall(modREF.min, poorREF.min),
      },
    },
  };

  const histogramData = [
    { name: "Moderate", DUT: data.average.DUT.Moderate, REF: data.average.REF.Moderate },
    { name: "Poor", DUT: data.average.DUT.Poor, REF: data.average.REF.Poor },
    { name: "Overall", DUT: data.average.DUT.Overall, REF: data.average.REF.Overall },
  ];

  const barKeys = [
    { key: "DUT", fill: CHART_COLOR_DUT },
    { key: "REF", fill: CHART_COLOR_REF },
  ];

  return (
    <>
      <div className="page-content">
        <DynamicHeader level={3}>Ping Test - Mobile Hotspot - 5G Auto - {city}</DynamicHeader>
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