import React from 'react';
import DpHistogramComponent from '../../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';
import DpNSAUDPDLTable from './Table/DpNSAUDPDLTable';
import DpNSAUDPULTable from './Table/DpNSAUDPULTable';
import DpUdpOverallTable from '../../DpUdpOverallTable';
import UDPData from '../../../../DataFiles/NSA/DpStationaryResults/UDP.json';
import '../../../../StyleScript/Restricted_Report_Style.css';

function DpNSAUDPComponent() {

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

  // Helper to extract data for a specific metric and idealThroughput, structured for location comparison
  const extractHistogramDataByLocation = (dataArray, metricName, idealThroughputValue) => {
    const filteredData = dataArray.filter(
      (item) => item.metric === metricName && item.idealThroughput === idealThroughputValue
    );

    const moderateData = { name: 'Moderate' };
    const poorData = { name: 'Poor' };

    filteredData.forEach((item) => {
      if (item.deviceName === "DUT") {
        moderateData["DUT"] = item.location.moderate;
        poorData["DUT"] = item.location.poor;
      } else if (item.deviceName === "REF") {
        moderateData["REF"] = item.location.moderate;
        poorData["REF"] = item.location.poor;
      }
    });
    return [moderateData, poorData];
  };

  const histogramBarKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  const dlOverallTableData = udp_Stationary_DL.map(item => {
    const moderateVal = parseFloat(item.location.moderate);
    const poorVal = parseFloat(item.location.poor);
    const overallValue = (isNaN(moderateVal) || isNaN(poorVal)) ? "N/A" : ((moderateVal + poorVal) / 2).toFixed(2);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue,
    };
  });

  const dlOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  const ulOverallTableData = udp_Stationary_UL.map(item => {
    const moderateVal = parseFloat(item.location.moderate);
    const poorVal = parseFloat(item.location.poor);
    const overallValue = (isNaN(moderateVal) || isNaN(poorVal)) ? "N/A" : ((moderateVal + poorVal) / 2).toFixed(2);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue,
    };
  });

  const ulOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  return (
    <>
      <div className='page-content'>
        <h2>UDP test - 5G NSA</h2>
        <h3>NSA UDP DL Overall results</h3>
        <DpUdpOverallTable data={dlOverallTableData} headers={dlOverallTableHeaders} />
      </div>
      <div className='page-content'>
        <h3>NSA UDP UL Overall results</h3>
        <DpUdpOverallTable data={ulOverallTableData} headers={ulOverallTableHeaders} />
      </div>

      <div className='page-content'>
        <DpNSAUDPDLTable data={udp_Stationary_DL} tableName="UDP Download Stationary" />
      </div>

      
        {/* UDP DL overall  */}
        <div className='page-content'>
          {["200000", "400000"].map((idealThroughput) => (
            <DpHistogramComponent
              key={`dl-throughput-${idealThroughput}`}
              data={extractHistogramDataByLocation(udp_Stationary_DL, "Throughput (kbps)", idealThroughput)}
              title={`Throughput (kbps) - UDP Download Stationary (${parseInt(idealThroughput / 1000)} Mbps)`}
              yAxisLabel="Throughput (kbps)"
              barKeys={histogramBarKeys}
            />
          ))}
        </div>

        {/* Mean Jitter (s) - UDP Download Stationary */}
        <div className='page-content'>
          {["200000", "400000"].map((idealThroughput) => (
            <DpHistogramComponent
              key={`dl-jitter-${idealThroughput}`}
              data={extractHistogramDataByLocation(udp_Stationary_DL, "Mean Jitter (s)", idealThroughput)}
              title={`Mean Jitter (s) - UDP Download Stationary (${parseInt(idealThroughput / 1000)} Mbps)`}
              yAxisLabel="Mean Jitter (s)"
              barKeys={histogramBarKeys}
            />
          ))}
        </div>

        {/* Packet Failure Rate (%) - UDP Download Stationary */}
        <div className='page-content'>
          {["200000", "400000"].map((idealThroughput) => (
            <DpHistogramComponent
              key={`dl-packet-failure-${idealThroughput}`}
              data={extractHistogramDataByLocation(udp_Stationary_DL, "Packet Failure Rate (%)", idealThroughput)}
              title={`Packet Failure Rate (%) - UDP Download Stationary (${parseInt(idealThroughput / 1000)} Mbps)`}
              yAxisLabel="Packet Failure Rate (%)"
              barKeys={histogramBarKeys}
            />
          ))}
        </div>


      <div className='page-content'>
        <DpNSAUDPULTable data={udp_Stationary_UL} tableName="UDP Upload Stationary" />
      </div>
        {/* UDP UL overall  */}
        <div className='page-content'>
          {["10000", "20000"].map((idealThroughput) => (
            <DpHistogramComponent
              key={`ul-throughput-${idealThroughput}`}
              data={extractHistogramDataByLocation(udp_Stationary_UL, "Throughput (kbps)", idealThroughput)}
              title={`Throughput (kbps) - UDP Upload Stationary (${parseInt(idealThroughput / 1000)} Mbps)`}
              yAxisLabel="Throughput (kbps)"
              barKeys={histogramBarKeys}
            />
          ))}
        </div>

        {/* Mean Jitter (s) - UDP Upload Stationary */}
        <div className='page-content'>
          {["10000", "20000"].map((idealThroughput) => (
            <DpHistogramComponent
              key={`ul-jitter-${idealThroughput}`}
              data={extractHistogramDataByLocation(udp_Stationary_UL, "Mean Jitter (s)", idealThroughput)}
              title={`Mean Jitter (s) - UDP Upload Stationary (${parseInt(idealThroughput / 1000)} Mbps)`}
              yAxisLabel="Mean Jitter (s)"
              barKeys={histogramBarKeys}
            />
          ))}
        </div>

        {/* Packet Failure Rate (%) - UDP Upload Stationary */}
        <div className='page-content'>
          {["10000", "20000"].map((idealThroughput) => (
            <DpHistogramComponent
              key={`ul-packet-failure-${idealThroughput}`}
              data={extractHistogramDataByLocation(udp_Stationary_UL, "Packet Failure Rate (%)", idealThroughput)}
              title={`Packet Failure Rate (%) - UDP Upload Stationary (${parseInt(idealThroughput / 1000)} Mbps)`}
              yAxisLabel="Packet Failure Rate (%)"
              barKeys={histogramBarKeys}
            />
          ))}
        </div>
    </>
  );
}

export default DpNSAUDPComponent;