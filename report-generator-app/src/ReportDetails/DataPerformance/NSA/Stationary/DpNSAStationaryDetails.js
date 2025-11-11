import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import DpNSAUDPDLTable from './Table/DpNSAUDPDLTable';
import DpNSAUDPULTable from './Table/DpNSAUDPULTable';

import MultiStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';
import SingleStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import PingData from '../../../../DataFiles/NSA/DpStationaryResults/Ping.json';
import UDPData from '../../../../DataFiles/NSA/DpStationaryResults/UDP.json';

function DpNSAStationaryDetails() {

  const udp_Stationary_DL = [
    // Mean Throughput - 200 Mbps
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "200 Mbps",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "200 Mbps",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    // Mean Throughput - 400 Mbps
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "400 Mbps",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "400 Mbps",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL"]?.Throughput?.Mean,
      },
    },
  ];

  const udp_Stationary_UL = [
    // Mean Throughput - 10 Mbps
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "10 Mbps",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "10 Mbps",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    // Mean Throughput - 20 Mbps
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "20 Mbps",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (Mbps)",
      idealThroughput: "20 Mbps",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Throughput?.Mean,
      },
    },
  ];

  return (
    <div className='page-content'>
      <h2>NSA Stationary Data Performance Details</h2>
      {/* <DpNSAHttpMSTable data={MultiStreamHTTPData} tableName="Multi Stream HTTP Stationary" />
      <DpNSAHttpSSTable data={SingleStreamHTTPData} tableName="Single Stream HTTP Stationary" />
      <DpNSAPingTable data={PingData} tableName="Ping Stationary" /> */}
      <DpNSAUDPDLTable data={udp_Stationary_DL} tableName="UDP Download Stationary" />
      <DpNSAUDPULTable data={udp_Stationary_UL} tableName="UDP Upload Stationary" />
    </div>
  );
}

export default DpNSAStationaryDetails;