import React, { useState, useEffect } from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";
import DpHistogramComponent from "../DpHistogramComponent";
import DpUdpOverallTable from '../DpUdpOverallTable';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import '../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import DpBoxPlot from '../Statoinary/DpBoxPlot';

function Dp_MHS_Udp_Component({ city: propCity }) {
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

  const udpDataRaw = reportData.dataPerformance?.["Data Performance"]?.["5G AUTO DP"]?.["Mobile Hotspot Test"]?.["Udp Test"] || {};


  const udp_Stationary_DL = [
    // Mean Throughput - 200 Mbps

    {
      metric: "Mean Throughput",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Mean,
        poor: undefined,
      },
    },
    // Mean Throughput - 400 Mbps

    {
      metric: "Mean Throughput",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Mean,
        poor: undefined,
      },
    },
    // Max Throughput - 200 Mbps

    {
      metric: "Max Throughput",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Maximum,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Maximum,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    // Max Throughput - 400 Mbps

    {
      metric: "Max Throughput",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Maximum,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Maximum,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    // Mean Jitter - 200 Mbps

    {
      metric: "Mean Jitter",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.DUT?.Jitter?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.DUT?.Jitter?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.REF?.Jitter?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.REF?.Jitter?.Mean,
        poor: undefined,
      },
    },
    // Mean Jitter - 400 Mbps

    {
      metric: "Mean Jitter",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.DUT?.Jitter?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.DUT?.Jitter?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.REF?.Jitter?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.REF?.Jitter?.Mean,
        poor: undefined,
      },
    },
    // Packet Failure Rate - 200 Mbps

    {
      metric: "Packet Failure Rate",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.DUT?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.DUT?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Moderate?.REF?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 200 Mbps for 10 seconds"]?.Poor?.REF?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
    // Packet Failure Rate - 400 Mbps

    {
      metric: "Packet Failure Rate",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.DUT?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.DUT?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Moderate?.REF?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.DL?.["UDP Download Task at 400 Mbps for 10 seconds"]?.Poor?.REF?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
  ];

  const getOverallMean = (goodValue, moderateValue, poorValue) => {
    let sum = 0;
    let count = 0;
    if (goodValue !== undefined) {
      sum += parseFloat(goodValue);
      count++;
    }
    if (moderateValue !== undefined) {
      sum += parseFloat(moderateValue);
      count++;
    }
    if (poorValue !== undefined) {
      sum += parseFloat(poorValue);
      count++;
    }
    return count > 0 ? (sum / count) : undefined;
  };

  const udp_Stationary_UL = [
    // Mean Throughput - 10 Mbps
    {
      metric: "Mean Throughput",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Mean,
        poor: undefined,
      },
    },
    // Mean Throughput - 20 Mbps
    {
      metric: "Mean Throughput",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Mean,
        poor: undefined,
      },
    },
    // Max Throughput - 10 Mbps
    {
      metric: "Max Throughput",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Maximum,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Maximum,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    // Max Throughput - 20 Mbps
    {
      metric: "Max Throughput",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.DUT?.Throughput?.Maximum,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.DUT?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.REF?.Throughput?.Maximum,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.REF?.Throughput?.Maximum,
        poor: undefined,
      },
    },
    // Mean Jitter - 10 Mbps
    {
      metric: "Mean Jitter",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.DUT?.Jitter?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.DUT?.Jitter?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.REF?.Jitter?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.REF?.Jitter?.Mean,
        poor: undefined,
      },
    },
    // Mean Jitter - 20 Mbps
    {
      metric: "Mean Jitter",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.DUT?.Jitter?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.DUT?.Jitter?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.REF?.Jitter?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.REF?.Jitter?.Mean,
        poor: undefined,
      },
    },
    // Packet Failure Rate - 10 Mbps
    {
      metric: "Packet Failure Rate",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.DUT?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.DUT?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Moderate?.REF?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.Poor?.REF?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
    // Packet Failure Rate - 20 Mbps
    {
      metric: "Packet Failure Rate",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.DUT?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.DUT?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Moderate?.REF?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.UL?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.Poor?.REF?.["Error Ratio"]?.Mean,
        poor: undefined,
      },
    }
  ];

  const dlOverallTableData = udp_Stationary_DL.map(item => {
    const overallValue = getOverallMean(item.location.good, item.location.moderate, item.location.poor);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue !== undefined ? overallValue.toFixed(2) : 'N/A',
    };
  });

  const dlOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  const ulOverallTableData = udp_Stationary_UL.map(item => {
    const overallValue = getOverallMean(item.location.good, item.location.moderate, item.location.poor);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue !== undefined ? overallValue.toFixed(2) : 'N/A',
    };
  });

  const ulOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  const downloadHistogramData = [];
  const downloadMetrics = [
    { metric: "Mean Throughput", idealThroughput: "200", title: "MHS UDP Download Throughput (200 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Throughput", idealThroughput: "400", title: "MHS UDP Download Throughput (400 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Jitter", idealThroughput: "200", title: "MHS UDP Download Jitter (200 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Mean Jitter", idealThroughput: "400", title: "MHS UDP Download Jitter (400 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Packet Failure Rate", idealThroughput: "200", title: "MHS UDP Download Packet Failure Rate (200 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
    { metric: "Packet Failure Rate", idealThroughput: "400", title: "MHS UDP Download Packet Failure Rate (400 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
  ];

  downloadMetrics.forEach(({ metric, idealThroughput, title, yAxisLabel }) => {
    const dutGood = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.good;
    const dutModerate = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.moderate;
    const dutPoor = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.poor;
    const refGood = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.good;
    const refModerate = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.moderate;
    const refPoor = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.poor;

    const overallDUT = getOverallMean(dutGood, dutModerate, dutPoor);
    const overallREF = getOverallMean(refGood, refModerate, refPoor);

    const histogramData = [];
    if (dutGood !== undefined || refGood !== undefined) {
      histogramData.push({ name: 'Good', DUT: dutGood, REF: refGood });
    }
    if (dutModerate !== undefined || refModerate !== undefined) {
      histogramData.push({ name: 'Moderate', DUT: dutModerate, REF: refModerate });
    }
    if (dutPoor !== undefined || refPoor !== undefined) {
      histogramData.push({ name: 'Poor', DUT: dutPoor, REF: refPoor });
    }
    // Always include overall if calculated? Or only if there was some data?
    // Based on previous code, it seems expected.
    histogramData.push({ name: 'Overall', DUT: overallDUT, REF: overallREF });

    downloadHistogramData.push({
      title: title,
      yAxisLabel: yAxisLabel,
      data: histogramData
    });
  });

  const uploadHistogramData = [];
  const uploadMetrics = [
    { metric: "Mean Throughput", idealThroughput: "10", title: "MHS UDP Upload Throughput (10 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Throughput", idealThroughput: "20", title: "MHS UDP Upload Throughput (20 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Jitter", idealThroughput: "10", title: "MHS UDP Upload Jitter (10 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Mean Jitter", idealThroughput: "20", title: "MHS UDP Upload Jitter (20 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Packet Failure Rate", idealThroughput: "10", title: "MHS UDP Upload Packet Failure Rate (10 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
    { metric: "Packet Failure Rate", idealThroughput: "20", title: "MHS UDP Upload Packet Failure Rate (20 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
  ];

  uploadMetrics.forEach(({ metric, idealThroughput, title, yAxisLabel }) => {
    const dutGood = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.good;
    const dutModerate = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.moderate;
    const dutPoor = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.poor;
    const refGood = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.good;
    const refModerate = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.moderate;
    const refPoor = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.poor;

    const overallDUT = getOverallMean(dutGood, dutModerate, dutPoor);
    const overallREF = getOverallMean(refGood, refModerate, refPoor);

    const histogramData = [];
    if (dutGood !== undefined || refGood !== undefined) {
      histogramData.push({ name: 'Good', DUT: dutGood, REF: refGood });
    }
    if (dutModerate !== undefined || refModerate !== undefined) {
      histogramData.push({ name: 'Moderate', DUT: dutModerate, REF: refModerate });
    }
    if (dutPoor !== undefined || refPoor !== undefined) {
      histogramData.push({ name: 'Poor', DUT: dutPoor, REF: refPoor });
    }
    histogramData.push({ name: 'Overall', DUT: overallDUT, REF: overallREF });

    uploadHistogramData.push({
      title: title,
      yAxisLabel: yAxisLabel,
      data: histogramData
    });
  });

  // Helper to build BoxPlot data for MHS UDP (Moderate→Good, Poor→Moderate label mapping)
  const getUdpMhsBoxPlotData = (dir, taskName) => {
    const labelMap = { Moderate: 'Good', Poor: 'Moderate' };
    const plotData = [];
    ['Moderate', 'Poor'].forEach(jsonCat => {
      ['DUT', 'REF'].forEach(dev => {
        const stats = udpDataRaw?.[dir]?.[taskName]?.[jsonCat]?.[dev]?.Throughput;
        if (!stats || !stats.Mean) return;
        let { Minimum: min, Maximum: max, Q1: q1, Median: median, Q3: q3, Outliers: outliers = [], Mean: mean, 'Standard Deviation': stdDev } = stats;
        if (q1 === undefined) {
          median = mean;
          q1 = Math.max(min, mean - 0.675 * stdDev);
          q3 = Math.min(max, mean + 0.675 * stdDev);
        }
        plotData.push({ x: `${labelMap[jsonCat]} (${dev})`, min, q1, median, q3, max, outliers });
      });
    });
    return plotData;
  };

  return (
    <>
      <div className="page-content">
        <DynamicHeader level={3}>UDP Test - Mobile Hotspot - {city}</DynamicHeader>
        <h4>MHS UDP Test DL Details - {city}</h4>
        <DpUdpOverallTable data={dlOverallTableData} headers={dlOverallTableHeaders} />
      </div>
      <div className="page-content">
        <h4>MHS UDP Test UL Details - {city}</h4>
        <DpUdpOverallTable data={ulOverallTableData} headers={ulOverallTableHeaders} />
      </div>

      <div className="page-content">
        <DpMHSUdpTable data={udp_Stationary_DL} tableName="MHS UDP Test DL Details" />
      </div>


      {downloadHistogramData.reduce((acc, histogram, index) => {
        const component = (
          <DpHistogramComponent
            key={index}
            data={histogram.data}
            title={histogram.title}
            yAxisLabel={histogram.yAxisLabel}
            barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
          />
        );
        if (index % 2 === 0) {
          acc.push([component]);
        } else {
          acc[acc.length - 1].push(component);
        }
        return acc;
      }, []).map((group, groupIndex) => (
        <div className="page-content" key={`dl-group-${groupIndex}`}>
          {group}
        </div>
      ))}
      <div className="page-content">
        <DpBoxPlot
          data={getUdpMhsBoxPlotData('DL', 'UDP Download Task at 200 Mbps for 10 seconds')}
          title="MHS UDP Download Throughput Box Plot (200 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
        <DpBoxPlot
          data={getUdpMhsBoxPlotData('DL', 'UDP Download Task at 400 Mbps for 10 seconds')}
          title="MHS UDP Download Throughput Box Plot (400 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
      </div>

      <div className="page-content">
        <DpMHSUdpTable data={udp_Stationary_UL} tableName="MHS UDP Test UL Details" />
      </div>

      {uploadHistogramData.reduce((acc, histogram, index) => {
        const component = (
          <DpHistogramComponent
            key={index}
            data={histogram.data}
            title={histogram.title}
            yAxisLabel={histogram.yAxisLabel}
            barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
          />
        );
        if (index % 2 === 0) {
          acc.push([component]);
        } else {
          acc[acc.length - 1].push(component);
        }
        return acc;
      }, []).map((group, groupIndex) => (
        <div className="page-content" key={`ul-group-${groupIndex}`}>
          {group}
        </div>
      ))}
      <div className="page-content">
        <DpBoxPlot
          data={getUdpMhsBoxPlotData('UL', 'UDP Upload Task at 10 Mbps for 10 seconds')}
          title="MHS UDP Upload Throughput Box Plot (10 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
        <DpBoxPlot
          data={getUdpMhsBoxPlotData('UL', 'UDP Upload Task at 20 Mbps for 10 seconds')}
          title="MHS UDP Upload Throughput Box Plot (20 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
      </div>
    </>
  );
}

export default Dp_MHS_Udp_Component;