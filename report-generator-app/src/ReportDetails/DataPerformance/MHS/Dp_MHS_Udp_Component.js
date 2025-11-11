import React, { useState, useEffect } from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";
import udpDataRaw from '../../../DataFiles/SA/DpMHSResults/UDP.json'; // Direct import of JSON

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
  return (
    <div className='page-content'>
      <h2>MHS-UDP Component</h2>
      {/* MHS UDP DL Table  */}
      <DpMHSUdpTable data={udp_Stationary_DL} tableName="MHS UDP DL Table" />
      <DpMHSUdpTable data={udp_Stationary_UL} tableName="MHS UDP UL Table" />

    </div>
  );
}

export default Dp_MHS_Udp_Component;