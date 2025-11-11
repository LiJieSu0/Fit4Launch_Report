import React, { useState, useEffect } from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";
import udpDataRaw from '../../../DataFiles/SA/DpMHSResults/UDP.json'; // Direct import of JSON

function Dp_MHS_Udp_Component() {
  const dummyData = [
    {
      metric: "DL Throughput",
      idealThroughput: ">= 100 Mbps",
      deviceName: "Device 1",
      location: {
        good: 120.50,
        moderate: 90.25,
      },
    },
    {
      metric: "DL Throughput",
      idealThroughput: ">= 100 Mbps",
      deviceName: "Device 2",
      location: {
        good: 110.75,
        moderate: 85.10,
      },
    },
    {
      metric: "DL Throughput",
      idealThroughput: ">= 50 Mbps",
      deviceName: "Device 1",
      location: {
        good: 70.10,
        moderate: 45.30,
      },
    },
    {
      metric: "DL Throughput",
      idealThroughput: ">= 50 Mbps",
      deviceName: "Device 2",
      location: {
        good: 65.80,
        moderate: 40.90,
      },
    },
    {
      metric: "UL Throughput",
      idealThroughput: ">= 20 Mbps",
      deviceName: "Device 1",
      location: {
        good: 25.30,
        moderate: 18.70,
      },
    },
    {
      metric: "UL Throughput",
      idealThroughput: ">= 20 Mbps",
      deviceName: "Device 2",
      location: {
        good: 22.10,
        moderate: 15.50,
      },
    },
  ];
  const udp_Stationary_DL = [
    // Mean Throughput - 200 Mbps
    
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean,
      },
    },
    // Mean Throughput - 400 Mbps
    
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean,
      },
    },
    // Max Throughput - 200 Mbps
    
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Throughput.Maximum,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Throughput.Maximum,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Maximum,
      },
    },
    // Max Throughput - 400 Mbps
    
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Throughput.Maximum,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Throughput.Maximum,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Maximum,
      },
    },
    // Mean Jitter - 200 Mbps
    
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean,
      },
    },
    // Mean Jitter - 400 Mbps
    
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean,
      },
    },
    // Packet Failure Rate - 200 Mbps
    
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean,
      },
    },
    // Packet Failure Rate - 400 Mbps
    
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udpDataRaw.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udpDataRaw.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean,
      },
    }
  ];
  return (
    <div className='page-content'>
      <h2>MHS-UDP Component</h2>
      {/* MHS UDP DL Table  */}
      <DpMHSUdpTable data={dummyData} tableName="MHS UDP DL Table" />
      {/* MHS UDP UL Table  */}

    </div>
  );
}

export default Dp_MHS_Udp_Component;