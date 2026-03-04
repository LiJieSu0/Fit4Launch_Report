import React, { useContext } from "react";
import DpMHSPingTable from "./Table/DpMHSPingTable";
import DpPingOverallTable from "../Statoinary/Table/DpPingOverallTable";
import { ReportContext } from '../../../Contexts/ReportContext';
import DpHistogramComponent from "../DpHistogramComponent";
import { CHART_COLOR_DUT, CHART_COLOR_REF } from "../../../Constants/ChartColors";
import DynamicHeader from "../../../CommonPage/DynamicHeader";
import PageBreak from "../../../CommonPage/PageBreak";

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
    return <PageBreak>Loading {city} data...</PageBreak>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  const pingDataRaw = reportData.dataPerformance?.['Data Performance']?.['5G AUTO DP']?.['Mobile Hotspot Test']?.['Ping'];

  if (!pingDataRaw) {
    return <PageBreak>No MHS Ping Data available</PageBreak>;
  }

  const getPingMetrics = (coverage, device) => {
    const metrics = pingDataRaw?.[coverage]?.[device]?.["Ping RTT"];
    return metrics || { Minimum: 0, Maximum: 0, Mean: 0, "Standard Deviation": 0 };
  };

  // MHS Ping data only has Moderate and Poor in the JSON
  // MHS Ping data only has Moderate and Poor in the JSON
  const goodDUT = getPingMetrics("Moderate", "DUT");
  const goodREF = getPingMetrics("Moderate", "REF");
  const modDUT = getPingMetrics("Poor", "DUT");
  const modREF = getPingMetrics("Poor", "REF");
  const poorDUT = { Minimum: 0, Maximum: 0, Mean: 0, "Standard Deviation": 0 };
  const poorREF = { Minimum: 0, Maximum: 0, Mean: 0, "Standard Deviation": 0 };


  const calculateOverall = (val1, val2, val3) => {
    const values = [val1, val2, val3].map(v => parseFloat(v)).filter(v => !isNaN(v) && v > 0);
    return values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : "N/A";
  };

  const data = {
    average: {
      DUT: {
        Good: goodDUT.Mean,
        Moderate: modDUT.Mean,
        Poor: poorDUT.Mean,
        Overall: calculateOverall(goodDUT.Mean, modDUT.Mean, poorDUT.Mean),
      },
      REF: {
        Good: goodREF.Mean,
        Moderate: modREF.Mean,
        Poor: poorREF.Mean,
        Overall: calculateOverall(goodREF.Mean, modREF.Mean, poorREF.Mean),
      },
    },
    std_dev: {
      DUT: {
        Good: goodDUT["Standard Deviation"],
        Moderate: modDUT["Standard Deviation"],
        Poor: poorDUT["Standard Deviation"],
        Overall: calculateOverall(goodDUT["Standard Deviation"], modDUT["Standard Deviation"], poorDUT["Standard Deviation"]),
      },
      REF: {
        Good: goodREF["Standard Deviation"],
        Moderate: modREF["Standard Deviation"],
        Poor: poorREF["Standard Deviation"],
        Overall: calculateOverall(goodREF["Standard Deviation"], modREF["Standard Deviation"], poorREF["Standard Deviation"]),
      },
    },
    max: {
      DUT: {
        Good: goodDUT.Maximum,
        Moderate: modDUT.Maximum,
        Poor: poorDUT.Maximum,
        Overall: calculateOverall(goodDUT.Maximum, modDUT.Maximum, poorDUT.Maximum),
      },
      REF: {
        Good: goodREF.Maximum,
        Moderate: modREF.Maximum,
        Poor: poorREF.Maximum,
        Overall: calculateOverall(goodREF.Maximum, modREF.Maximum, poorREF.Maximum),
      },
    },
    min: {
      DUT: {
        Good: goodDUT.Minimum,
        Moderate: modDUT.Minimum,
        Poor: poorDUT.Minimum,
        Overall: calculateOverall(goodDUT.Minimum, modDUT.Minimum, poorDUT.Minimum),
      },
      REF: {
        Good: goodREF.Minimum,
        Moderate: modREF.Minimum,
        Poor: poorREF.Minimum,
        Overall: calculateOverall(goodREF.Minimum, modREF.Minimum, poorREF.Minimum),
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
      <PageBreak>
        <DynamicHeader level={3}>Ping Test - Mobile Hotspot - {city}</DynamicHeader>
        <h4>MHS Ping Test Overview</h4>
        <DpPingOverallTable data={data} />
      </PageBreak>
      <PageBreak>
        <h4>MHS Ping Test Details</h4>
        <DpMHSPingTable data={data} />
        <DpHistogramComponent
          data={histogramData}
          title="Ping RTT"
          yAxisLabel="Latency (ms)"
          barKeys={barKeys}
        />
      </PageBreak>
    </>
  );
}

export default Dp_MHS_Ping_Component;