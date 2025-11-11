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
  return (
    <div className='page-content'>
      <h2>MHS-UDP Component</h2>
      {/* MHS UDP DL Table  */}
      <DpMHSUdpTable data={udp_Stationary_DL} tableName="MHS UDP DL Table" />
      {/* MHS UDP UL Table  */}

    </div>
  );
}

export default Dp_MHS_Udp_Component;