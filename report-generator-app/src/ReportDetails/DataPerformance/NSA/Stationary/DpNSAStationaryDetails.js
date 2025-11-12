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
      metric: "Throughput (kbps)",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (kbps)",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    // Mean Throughput - 400 Mbps
    {
      metric: "Throughput (kbps)",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (kbps)",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL"]?.Throughput?.Mean,
      },
    },
    // Max Throughput - 200 Mbps
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Throughput?.Maximum,
      },
    },
    // Max Throughput - 400 Mbps
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL"]?.Throughput?.Maximum,
      },
    },
    // Mean Jitter - 200 Mbps
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.Jitter?.Mean,
      },
    },
    // Mean Jitter - 400 Mbps
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL"]?.Jitter?.Mean,
      },
    },
    // Packet Failure Rate - 200 Mbps
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 200 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]?.["Error Ratio"]?.Mean,
      },
    },
    // Packet Failure Rate - 400 Mbps
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL 400 M 10s"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["DUT UDP DL"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL 400 M 10s"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Download Task at 400 Mbps for 10 seconds"]?.["REF UDP DL"]?.["Error Ratio"]?.Mean,
      },
    },
  ];

  const udp_Stationary_UL = [
    // Mean Throughput - 10 Mbps
    {
      metric: "Throughput (kbps)",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (kbps)",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Throughput?.Mean,
      },
    },
    // Mean Throughput - 20 Mbps
    {
      metric: "Throughput (kbps)",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Throughput?.Mean,
      },
    },
    {
      metric: "Throughput (kbps)",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Throughput?.Mean,
      },
    },
    // Max Throughput - 10 Mbps
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Throughput?.Maximum,
      },
    },
    // Max Throughput - 20 Mbps
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Throughput?.Maximum,
      },
    },
    {
      metric: "Max Throughput (kbps)",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Throughput?.Maximum,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Throughput?.Maximum,
      },
    },
    // Mean Jitter - 10 Mbps
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.Jitter?.Mean,
      },
    },
    // Mean Jitter - 20 Mbps
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Jitter?.Mean,
      },
    },
    {
      metric: "Mean Jitter (s)",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.Jitter?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.Jitter?.Mean,
      },
    },
    // Packet Failure Rate - 10 Mbps
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "10000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "10000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]?.["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 10 Mbps for 10 seconds"]?.["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]?.["Error Ratio"]?.Mean,
      },
    },
    // Packet Failure Rate - 20 Mbps
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "20000",
      deviceName: "DUT",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.["Error Ratio"]?.Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "20000",
      deviceName: "REF",
      location: {
        moderate: UDPData.Moderate?.["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]?.["Error Ratio"]?.Mean,
        poor: UDPData.Poor?.["UDP Upload Task at 20 Mbps for 10 seconds"]?.["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]?.["Error Ratio"]?.Mean,
      },
    },
  ];

  return (
    <div className='page-content'>
      <h2>NSA Stationary Data Performance Details</h2>

      <DpNSAUDPDLTable data={udp_Stationary_DL} tableName="UDP Download Stationary" />
      {/* NSA dl histogram 200000 */}
      {/* NSA dl histogram 400000 */}

      <DpNSAUDPULTable data={udp_Stationary_UL} tableName="UDP Upload Stationary" />
      {/* NSA ul histogram 200000 */}
      {/* NSA ul histogram 400000 */}
    </div>
  );
}

export default DpNSAStationaryDetails;