import React, { useState, useEffect } from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";
import DpHistogramComponent from "../DpHistogramComponent";
import DpUdpOverallTable from '../DpUdpOverallTable';
import udpDataRaw from '../../../DataFiles/SA/DpMHSResults/UDP.json'; // Direct import of JSON
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import '../../../StyleScript/Restricted_Report_Style.css';

function Dp_MHS_Udp_Component() {

  const udp_Stationary_DL = [
    // Mean Throughput - 200 Mbps
    
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200 Mbps for 10S"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200M 10s"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200 Mbps for 10S"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200M 10s"]?.Throughput?.Mean,
      },
    },
    // Mean Throughput - 400 Mbps
    
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 Mbps for 10S"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 Mbps for 10S"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Throughput?.Mean,
      },
    },
    // Max Throughput - 200 Mbps
    
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200 Mbps for 10S"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200M 10s"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200 Mbps for 10S"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200M 10s"]?.Throughput?.Maximum,
      },
    },
    // Max Throughput - 400 Mbps
    
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 Mbps for 10S"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 Mbps for 10S"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Throughput?.Maximum,
      },
    },
    // Mean Jitter - 200 Mbps
    
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200 Mbps for 10S"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200M 10s"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200 Mbps for 10S"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200M 10s"]?.Jitter?.Mean,
      },
    },
    // Mean Jitter - 400 Mbps
    
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 Mbps for 10S"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 Mbps for 10S"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Jitter?.Mean,
      },
    },
    // Packet Failure Rate - 200 Mbps
    
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200 Mbps for 10S"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["DUT UDP DL 200M 10s"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200 Mbps for 10S"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["REF UDP DL 200M 10s"]?.["Error Ratio"]?.Mean,
      },
    },
    // Packet Failure Rate - 400 Mbps
    
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 Mbps for 10S"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 Mbps for 10S"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.["Error Ratio"]?.Mean,
      },
    }
  ];

  const getOverallMean = (goodValue, moderateValue) => {
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
    return count > 0 ? (sum / count) : undefined;
  };

  const udp_Stationary_UL = [
    // Mean Throughput - 10 Mbps
    {
      metric: "Mean Throughput",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH01_TMO-DUT_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G Auto_UDP Upload Task at 10 M"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH02_TMO-Ref_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G Auto_UDP Upload Task at 10 M"]?.Throughput?.Mean,
      },
    },
    // Mean Throughput - 20 Mbps
    {
      metric: "Mean Throughput",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH01_TMO-DUT_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["DUT UDP UL 20M"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH02_TMO-Ref_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["REF UDP UL 20M"]?.Throughput?.Mean,
      },
    },
    // Max Throughput - 10 Mbps
    {
      metric: "Max Throughput",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH01_TMO-DUT_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G Auto_UDP Upload Task at 10 M"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH02_TMO-Ref_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G Auto_UDP Upload Task at 10 M"]?.Throughput?.Maximum,
      },
    },
    // Max Throughput - 20 Mbps
    {
      metric: "Max Throughput",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH01_TMO-DUT_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["DUT UDP UL 20M"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH02_TMO-Ref_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.Throughput?.Maximum,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["REF UDP UL 20M"]?.Throughput?.Maximum,
      },
    },
    // Mean Jitter - 10 Mbps
    {
      metric: "Mean Jitter",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH01_TMO-DUT_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G Auto_UDP Upload Task at 10 M"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH02_TMO-Ref_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G Auto_UDP Upload Task at 10 M"]?.Jitter?.Mean,
      },
    },
    // Mean Jitter - 20 Mbps
    {
      metric: "Mean Jitter",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH01_TMO-DUT_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["DUT UDP UL 20M"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH02_TMO-Ref_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.Jitter?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["REF UDP UL 20M"]?.Jitter?.Mean,
      },
    },
    // Packet Failure Rate - 10 Mbps
    {
      metric: "Packet Failure Rate",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH01_TMO-DUT_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G Auto_UDP Upload Task at 10 M"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250915_121852_CH02_TMO-Ref_5G MHS_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G Auto_UDP Upload Task at 10 M"]?.["Error Ratio"]?.Mean,
      },
    },
    // Packet Failure Rate - 20 Mbps
    {
      metric: "Packet Failure Rate",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH01_TMO-DUT_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["DUT UDP UL 20M"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250915_122724_CH02_TMO-Ref_5G MHS_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]?.["Error Ratio"]?.Mean,
        moderate: udpDataRaw.Moderate?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["REF UDP UL 20M"]?.["Error Ratio"]?.Mean,
      },
    }
  ];

  const dlOverallTableData = udp_Stationary_DL.map(item => {
    const overallValue = getOverallMean(item.location.good, item.location.moderate);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue !== undefined ? overallValue.toFixed(2) : 'N/A',
    };
  });

  const dlOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  const ulOverallTableData = udp_Stationary_UL.map(item => {
    const overallValue = getOverallMean(item.location.good, item.location.moderate);
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
    { metric: "Mean Throughput", idealThroughput: "200000", title: "MHS UDP Download Mean Throughput (200 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Throughput", idealThroughput: "400000", title: "MHS UDP Download Mean Throughput (400 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Jitter", idealThroughput: "200000", title: "MHS UDP Download Mean Jitter (200 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Mean Jitter", idealThroughput: "400000", title: "MHS UDP Download Mean Jitter (400 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Packet Failure Rate", idealThroughput: "200000", title: "MHS UDP Download Packet Failure Rate (200 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
    { metric: "Packet Failure Rate", idealThroughput: "400000", title: "MHS UDP Download Packet Failure Rate (400 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
  ];

  downloadMetrics.forEach(({ metric, idealThroughput, title, yAxisLabel }) => {
    const dutGood = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.good;
    const dutModerate = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.moderate;
    const refGood = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.good;
    const refModerate = udp_Stationary_DL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.moderate;

    const overallDUT = getOverallMean(dutGood, dutModerate);
    const overallREF = getOverallMean(refGood, refModerate);

    downloadHistogramData.push({
      title: title,
      yAxisLabel: yAxisLabel,
      data: [
        { name: 'Good', DUT: dutGood, REF: refGood },
        { name: 'Moderate', DUT: dutModerate, REF: refModerate },
        { name: 'Overall', DUT: overallDUT, REF: overallREF },
      ]
    });
  });

  const uploadHistogramData = [];
  const uploadMetrics = [
    { metric: "Mean Throughput", idealThroughput: "10000", title: "MHS UDP Upload Mean Throughput (10 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Throughput", idealThroughput: "20000", title: "MHS UDP Upload Mean Throughput (20 Mbps)", yAxisLabel: "Throughput (Mbps)" },
    { metric: "Mean Jitter", idealThroughput: "10000", title: "MHS UDP Upload Mean Jitter (10 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Mean Jitter", idealThroughput: "20000", title: "MHS UDP Upload Mean Jitter (20 Mbps)", yAxisLabel: "Jitter (ms)" },
    { metric: "Packet Failure Rate", idealThroughput: "10000", title: "MHS UDP Upload Packet Failure Rate (10 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
    { metric: "Packet Failure Rate", idealThroughput: "20000", title: "MHS UDP Upload Packet Failure Rate (20 Mbps)", yAxisLabel: "Packet Failure Rate (%)" },
  ];

  uploadMetrics.forEach(({ metric, idealThroughput, title, yAxisLabel }) => {
    const dutGood = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.good;
    const dutModerate = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "DUT")?.location?.moderate;
    const refGood = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.good;
    const refModerate = udp_Stationary_UL.find(d => d.metric === metric && d.idealThroughput === idealThroughput && d.deviceName === "REF")?.location?.moderate;

    const overallDUT = getOverallMean(dutGood, dutModerate);
    const overallREF = getOverallMean(refGood, refModerate);

    uploadHistogramData.push({
      title: title,
      yAxisLabel: yAxisLabel,
      data: [
        { name: 'Good', DUT: dutGood, REF: refGood },
        { name: 'Moderate', DUT: dutModerate, REF: refModerate },
        { name: 'Overall', DUT: overallDUT, REF: overallREF },
      ]
    });
  });

  return (
    <>
      <div className="page-content">
        <h2>MHS-UDP Component</h2>
        <h3>MHS UDP DL Overall table</h3>
        <DpUdpOverallTable data={dlOverallTableData} headers={dlOverallTableHeaders} />
      </div>
      <div className="page-content">
        <h3>MHS UDP UL Overall table</h3>
        <DpUdpOverallTable data={ulOverallTableData} headers={ulOverallTableHeaders} />
      </div>

      <div className="page-content">
        <DpMHSUdpTable data={udp_Stationary_DL} tableName="MHS UDP DL Table" />
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
          <DpMHSUdpTable data={udp_Stationary_UL} tableName="MHS UDP UL Table" />
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
    </>
  );
}

export default Dp_MHS_Udp_Component;