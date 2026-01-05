import React from 'react';
import DpUdpTableLoc3 from './Table/DpUdpTableLoc3';
import DpHistogramComponent from '../DpHistogramComponent';
import DpUdpOverallTable from '../DpUdpOverallTable';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import '../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

import { useEffect } from 'react';

function Dp_Udp_Component({ city: propCity }) {
  const { city: globalCity, allReportData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = allReportData[city];

  if (!reportData || !reportData.dataPerformance) {
    return <div className="page-content">Loading {city} data...</div>;
  }

  // Update to use dataPerformance from the fetched JSON
  // Path: ["Data Performance"]["5G AUTO DP"]["Udp Test"]
  const udp_Data_Source = reportData.dataPerformance["Data Performance"]["5G AUTO DP"]["Udp Test"];

  // Helper objects for tasks
  const dl200Task = udp_Data_Source.DL["UDP Download Task at 200 Mbps for 10 seconds"];
  const dl400Task = udp_Data_Source.DL["UDP Download Task at 400 Mbps for 10 seconds"];
  // Note: UL Task names from JSON
  const ul10Task = udp_Data_Source.UL["UDP Upload Task at 10 Mbps for 10 seconds"];
  const ul20Task = udp_Data_Source.UL["UDP Upload Task at 20 Mbps for 10 seconds"];

  // DL Mean Throughput for 200 Mbps
  const dlMeanThroughput200_DUT_Good = dl200Task.Good.DUT.Throughput.Mean;
  const dlMeanThroughput200_REF_Good = dl200Task.Good.REF.Throughput.Mean;
  const dlMeanThroughput200_DUT_Moderate = dl200Task.Moderate.DUT.Throughput.Mean;
  const dlMeanThroughput200_REF_Moderate = dl200Task.Moderate.REF.Throughput.Mean;
  const dlMeanThroughput200_DUT_Poor = dl200Task.Poor.DUT.Throughput.Mean;
  const dlMeanThroughput200_REF_Poor = dl200Task.Poor.REF.Throughput.Mean;

  const dlMeanThroughput200HistogramData = [
    { name: 'Good', DUT: dlMeanThroughput200_DUT_Good, REF: dlMeanThroughput200_REF_Good },
    { name: 'Moderate', DUT: dlMeanThroughput200_DUT_Moderate, REF: dlMeanThroughput200_REF_Moderate },
    { name: 'Poor', DUT: dlMeanThroughput200_DUT_Poor, REF: dlMeanThroughput200_REF_Poor },
    {
      name: 'Overall',
      DUT: (dlMeanThroughput200_DUT_Good + dlMeanThroughput200_DUT_Moderate + dlMeanThroughput200_DUT_Poor) / 3,
      REF: (dlMeanThroughput200_REF_Good + dlMeanThroughput200_REF_Moderate + dlMeanThroughput200_REF_Poor) / 3
    },
  ];

  // DL Mean Throughput for 400 Mbps
  const dlMeanThroughput400_DUT_Good = dl400Task.Good.DUT.Throughput.Mean;
  const dlMeanThroughput400_REF_Good = dl400Task.Good.REF.Throughput.Mean;
  const dlMeanThroughput400_DUT_Moderate = dl400Task.Moderate.DUT.Throughput.Mean;
  const dlMeanThroughput400_REF_Moderate = dl400Task.Moderate.REF.Throughput.Mean;
  const dlMeanThroughput400_DUT_Poor = dl400Task.Poor.DUT.Throughput.Mean;
  const dlMeanThroughput400_REF_Poor = dl400Task.Poor.REF.Throughput.Mean;

  const dlMeanThroughput400HistogramData = [
    { name: 'Good', DUT: dlMeanThroughput400_DUT_Good, REF: dlMeanThroughput400_REF_Good },
    { name: 'Moderate', DUT: dlMeanThroughput400_DUT_Moderate, REF: dlMeanThroughput400_REF_Moderate },
    { name: 'Poor', DUT: dlMeanThroughput400_DUT_Poor, REF: dlMeanThroughput400_REF_Poor },
    {
      name: 'Overall',
      DUT: (dlMeanThroughput400_DUT_Good + dlMeanThroughput400_DUT_Moderate + dlMeanThroughput400_DUT_Poor) / 3,
      REF: (dlMeanThroughput400_REF_Good + dlMeanThroughput400_REF_Moderate + dlMeanThroughput400_REF_Poor) / 3
    },
  ];

  // DL Mean Jitter for 200 Mbps
  const dlMeanJitter200_DUT_Good = dl200Task.Good.DUT.Jitter.Mean;
  const dlMeanJitter200_REF_Good = dl200Task.Good.REF.Jitter.Mean;
  const dlMeanJitter200_DUT_Moderate = dl200Task.Moderate.DUT.Jitter.Mean;
  const dlMeanJitter200_REF_Moderate = dl200Task.Moderate.REF.Jitter.Mean;
  const dlMeanJitter200_DUT_Poor = dl200Task.Poor.DUT.Jitter.Mean;
  const dlMeanJitter200_REF_Poor = dl200Task.Poor.REF.Jitter.Mean;

  const dlMeanJitter200HistogramData = [
    { name: 'Good', DUT: dlMeanJitter200_DUT_Good, REF: dlMeanJitter200_REF_Good },
    { name: 'Moderate', DUT: dlMeanJitter200_DUT_Moderate, REF: dlMeanJitter200_REF_Moderate },
    { name: 'Poor', DUT: dlMeanJitter200_DUT_Poor, REF: dlMeanJitter200_REF_Poor },
    {
      name: 'Overall',
      DUT: (dlMeanJitter200_DUT_Good + dlMeanJitter200_DUT_Moderate + dlMeanJitter200_DUT_Poor) / 3,
      REF: (dlMeanJitter200_REF_Good + dlMeanJitter200_REF_Moderate + dlMeanJitter200_REF_Poor) / 3
    },
  ];

  // DL Mean Jitter for 400 Mbps
  const dlMeanJitter400_DUT_Good = dl400Task.Good.DUT.Jitter.Mean;
  const dlMeanJitter400_REF_Good = dl400Task.Good.REF.Jitter.Mean;
  const dlMeanJitter400_DUT_Moderate = dl400Task.Moderate.DUT.Jitter.Mean;
  const dlMeanJitter400_REF_Moderate = dl400Task.Moderate.REF.Jitter.Mean;
  const dlMeanJitter400_DUT_Poor = dl400Task.Poor.DUT.Jitter.Mean;
  const dlMeanJitter400_REF_Poor = dl400Task.Poor.REF.Jitter.Mean;

  const dlMeanJitter400HistogramData = [
    { name: 'Good', DUT: dlMeanJitter400_DUT_Good, REF: dlMeanJitter400_REF_Good },
    { name: 'Moderate', DUT: dlMeanJitter400_DUT_Moderate, REF: dlMeanJitter400_REF_Moderate },
    { name: 'Poor', DUT: dlMeanJitter400_DUT_Poor, REF: dlMeanJitter400_REF_Poor },
    {
      name: 'Overall',
      DUT: (dlMeanJitter400_DUT_Good + dlMeanJitter400_DUT_Moderate + dlMeanJitter400_DUT_Poor) / 3,
      REF: (dlMeanJitter400_REF_Good + dlMeanJitter400_REF_Moderate + dlMeanJitter400_REF_Poor) / 3
    },
  ];

  // DL Packet Failure Rate for 200 Mbps
  // Note: JSON key is "Error Ratio"
  const dlPFR200_DUT_Good = dl200Task.Good.DUT["Error Ratio"].Mean;
  const dlPFR200_REF_Good = dl200Task.Good.REF["Error Ratio"].Mean;
  const dlPFR200_DUT_Moderate = dl200Task.Moderate.DUT["Error Ratio"].Mean;
  const dlPFR200_REF_Moderate = dl200Task.Moderate.REF["Error Ratio"].Mean;
  const dlPFR200_DUT_Poor = dl200Task.Poor.DUT["Error Ratio"].Mean;
  const dlPFR200_REF_Poor = dl200Task.Poor.REF["Error Ratio"].Mean;

  const dlPFR200HistogramData = [
    { name: 'Good', DUT: dlPFR200_DUT_Good, REF: dlPFR200_REF_Good },
    { name: 'Moderate', DUT: dlPFR200_DUT_Moderate, REF: dlPFR200_REF_Moderate },
    { name: 'Poor', DUT: dlPFR200_DUT_Poor, REF: dlPFR200_REF_Poor },
    {
      name: 'Overall',
      DUT: (dlPFR200_DUT_Good + dlPFR200_DUT_Moderate + dlPFR200_DUT_Poor) / 3,
      REF: (dlPFR200_REF_Good + dlPFR200_REF_Moderate + dlPFR200_REF_Poor) / 3
    },
  ];

  // DL Packet Failure Rate for 400 Mbps
  const dlPFR400_DUT_Good = dl400Task.Good.DUT["Error Ratio"].Mean;
  const dlPFR400_REF_Good = dl400Task.Good.REF["Error Ratio"].Mean;
  const dlPFR400_DUT_Moderate = dl400Task.Moderate.DUT["Error Ratio"].Mean;
  const dlPFR400_REF_Moderate = dl400Task.Moderate.REF["Error Ratio"].Mean;
  const dlPFR400_DUT_Poor = dl400Task.Poor.DUT["Error Ratio"].Mean;
  const dlPFR400_REF_Poor = dl400Task.Poor.REF["Error Ratio"].Mean;

  const dlPFR400HistogramData = [
    { name: 'Good', DUT: dlPFR400_DUT_Good, REF: dlPFR400_REF_Good },
    { name: 'Moderate', DUT: dlPFR400_DUT_Moderate, REF: dlPFR400_REF_Moderate },
    { name: 'Poor', DUT: dlPFR400_DUT_Poor, REF: dlPFR400_REF_Poor },
    {
      name: 'Overall',
      DUT: (dlPFR400_DUT_Good + dlPFR400_DUT_Moderate + dlPFR400_DUT_Poor) / 3,
      REF: (dlPFR400_REF_Good + dlPFR400_REF_Moderate + dlPFR400_REF_Poor) / 3
    },
  ];


  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  const udp_Stationary_DL = [
    // Mean Throughput - 200 Mbps

    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: dl200Task.Good.DUT.Throughput.Mean,
        moderate: dl200Task.Moderate.DUT.Throughput.Mean,
        poor: dl200Task.Poor.DUT.Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: dl200Task.Good.REF.Throughput.Mean,
        moderate: dl200Task.Moderate.REF.Throughput.Mean,
        poor: dl200Task.Poor.REF.Throughput.Mean,
      },
    },
    // Mean Throughput - 400 Mbps

    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: dl400Task.Good.DUT.Throughput.Mean,
        moderate: dl400Task.Moderate.DUT.Throughput.Mean,
        poor: dl400Task.Poor.DUT.Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: dl400Task.Good.REF.Throughput.Mean,
        moderate: dl400Task.Moderate.REF.Throughput.Mean,
        poor: dl400Task.Poor.REF.Throughput.Mean,
      },
    },
    // Max Throughput - 200 Mbps

    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: dl200Task.Good.DUT.Throughput.Maximum,
        moderate: dl200Task.Moderate.DUT.Throughput.Maximum,
        poor: dl200Task.Poor.DUT.Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: dl200Task.Good.REF.Throughput.Maximum,
        moderate: dl200Task.Moderate.REF.Throughput.Maximum,
        poor: dl200Task.Poor.REF.Throughput.Maximum,
      },
    },

    // Max Throughput - 400 Mbps

    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: dl400Task.Good.DUT.Throughput.Maximum,
        moderate: dl400Task.Moderate.DUT.Throughput.Maximum,
        poor: dl400Task.Poor.DUT.Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: dl400Task.Good.REF.Throughput.Maximum,
        moderate: dl400Task.Moderate.REF.Throughput.Maximum,
        poor: dl400Task.Poor.REF.Throughput.Maximum,
      },
    },
    // Min Throughput - 400 Mbps
    // Min Throughput - 200 Mbps
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: dl200Task.Good.DUT.Throughput.Minimum,
        moderate: dl200Task.Moderate.DUT.Throughput.Minimum,
        poor: dl200Task.Poor.DUT.Throughput.Minimum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: dl200Task.Good.REF.Throughput.Minimum,
        moderate: dl200Task.Moderate.REF.Throughput.Minimum,
        poor: dl200Task.Poor.REF.Throughput.Minimum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: dl400Task.Good.DUT.Throughput.Minimum,
        moderate: dl400Task.Moderate.DUT.Throughput.Minimum,
        poor: dl400Task.Poor.DUT.Throughput.Minimum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: dl400Task.Good.REF.Throughput.Minimum,
        moderate: dl400Task.Moderate.REF.Throughput.Minimum,
        poor: dl400Task.Poor.REF.Throughput.Minimum,
      },
    },
    // Mean Jitter - 200 Mbps

    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: dl200Task.Good.DUT.Jitter.Mean,
        moderate: dl200Task.Moderate.DUT.Jitter.Mean,
        poor: dl200Task.Poor.DUT.Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: dl200Task.Good.REF.Jitter.Mean,
        moderate: dl200Task.Moderate.REF.Jitter.Mean,
        poor: dl200Task.Poor.REF.Jitter.Mean,
      },
    },
    // Mean Jitter - 400 Mbps

    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: dl400Task.Good.DUT.Jitter.Mean,
        moderate: dl400Task.Moderate.DUT.Jitter.Mean,
        poor: dl400Task.Poor.DUT.Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: dl400Task.Good.REF.Jitter.Mean,
        moderate: dl400Task.Moderate.REF.Jitter.Mean,
        poor: dl400Task.Poor.REF.Jitter.Mean,
      },
    },
    // Packet Failure Rate - 200 Mbps

    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: dl200Task.Good.DUT["Error Ratio"].Mean,
        moderate: dl200Task.Moderate.DUT["Error Ratio"].Mean,
        poor: dl200Task.Poor.DUT["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: dl200Task.Good.REF["Error Ratio"].Mean,
        moderate: dl200Task.Moderate.REF["Error Ratio"].Mean,
        poor: dl200Task.Poor.REF["Error Ratio"].Mean,
      },
    },
    // Packet Failure Rate - 400 Mbps

    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: dl400Task.Good.DUT["Error Ratio"].Mean,
        moderate: dl400Task.Moderate.DUT["Error Ratio"].Mean,
        poor: dl400Task.Poor.DUT["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: dl400Task.Good.REF["Error Ratio"].Mean,
        moderate: dl400Task.Moderate.REF["Error Ratio"].Mean,
        poor: dl400Task.Poor.REF["Error Ratio"].Mean,
      },
    }
  ];

  const udp_Stationary_UL = [
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: ul10Task.Good.DUT.Throughput.Mean,
        moderate: ul10Task.Moderate.DUT.Throughput.Mean,
        poor: ul10Task.Poor.DUT.Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: ul10Task.Good.REF.Throughput.Mean,
        moderate: ul10Task.Moderate.REF.Throughput.Mean,
        poor: ul10Task.Poor.REF.Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: ul20Task.Good.DUT.Throughput.Mean,
        moderate: ul20Task.Moderate.DUT.Throughput.Mean,
        poor: ul20Task.Poor.DUT.Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: ul20Task.Good.REF.Throughput.Mean,
        moderate: ul20Task.Moderate.REF.Throughput.Mean,
        poor: ul20Task.Poor.REF.Throughput.Mean,
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: ul10Task.Good.DUT.Throughput.Maximum,
        moderate: ul10Task.Moderate.DUT.Throughput.Maximum,
        poor: ul10Task.Poor.DUT.Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: ul10Task.Good.REF.Throughput.Maximum,
        moderate: ul10Task.Moderate.REF.Throughput.Maximum,
        poor: ul10Task.Poor.REF.Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: ul20Task.Good.DUT.Throughput.Maximum,
        moderate: ul20Task.Moderate.DUT.Throughput.Maximum,
        poor: ul20Task.Poor.DUT.Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: ul20Task.Good.REF.Throughput.Maximum,
        moderate: ul20Task.Moderate.REF.Throughput.Maximum,
        poor: ul20Task.Poor.REF.Throughput.Maximum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: ul10Task.Good.DUT.Throughput.Minimum,
        moderate: ul10Task.Moderate.DUT.Throughput.Minimum,
        poor: ul10Task.Poor.DUT.Throughput.Minimum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: ul10Task.Good.REF.Throughput.Minimum,
        moderate: ul10Task.Moderate.REF.Throughput.Minimum,
        poor: ul10Task.Poor.REF.Throughput.Minimum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: ul20Task.Good.DUT.Throughput.Minimum,
        moderate: ul20Task.Moderate.DUT.Throughput.Minimum,
        poor: ul20Task.Poor.DUT.Throughput.Minimum,
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: ul20Task.Good.REF.Throughput.Minimum,
        moderate: ul20Task.Moderate.REF.Throughput.Minimum,
        poor: ul20Task.Poor.REF.Throughput.Minimum,
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: ul10Task.Good.DUT.Jitter.Mean,
        moderate: ul10Task.Moderate.DUT.Jitter.Mean,
        poor: ul10Task.Poor.DUT.Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: ul10Task.Good.REF.Jitter.Mean,
        moderate: ul10Task.Moderate.REF.Jitter.Mean,
        poor: ul10Task.Poor.REF.Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: ul20Task.Good.DUT.Jitter.Mean,
        moderate: ul20Task.Moderate.DUT.Jitter.Mean,
        poor: ul20Task.Poor.DUT.Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: ul20Task.Good.REF.Jitter.Mean,
        moderate: ul20Task.Moderate.REF.Jitter.Mean,
        poor: ul20Task.Poor.REF.Jitter.Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: ul10Task.Good.DUT["Error Ratio"].Mean,
        moderate: ul10Task.Moderate.DUT["Error Ratio"].Mean,
        poor: ul10Task.Poor.DUT["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: ul10Task.Good.REF["Error Ratio"].Mean,
        moderate: ul10Task.Moderate.REF["Error Ratio"].Mean,
        poor: ul10Task.Poor.REF["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: ul20Task.Good.DUT["Error Ratio"].Mean,
        moderate: ul20Task.Moderate.DUT["Error Ratio"].Mean,
        poor: ul20Task.Poor.DUT["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: ul20Task.Good.REF["Error Ratio"].Mean,
        moderate: ul20Task.Moderate.REF["Error Ratio"].Mean,
        poor: ul20Task.Poor.REF["Error Ratio"].Mean,
      },
    },
  ];

  const dlOverallTableData = udp_Stationary_DL.map(item => {
    const overallValue = ((item.location.good + item.location.moderate + item.location.poor) / 3).toFixed(2);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue,
    };
  });

  const dlOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  const ulOverallTableData = udp_Stationary_UL.map(item => {
    const overallValue = ((item.location.good + item.location.moderate + item.location.poor) / 3).toFixed(2);
    return {
      Metric: item.metric,
      "Ideal Throughput": item.idealThroughput,
      "Device Name": item.deviceName,
      Overall: overallValue,
    };
  });

  const ulOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  // UL Mean Throughput for 10 Mbps
  const ulMeanThroughput10_DUT_Good = ul10Task.Good.DUT.Throughput.Mean;
  const ulMeanThroughput10_REF_Good = ul10Task.Good.REF.Throughput.Mean;
  const ulMeanThroughput10_DUT_Moderate = ul10Task.Moderate.DUT.Throughput.Mean;
  const ulMeanThroughput10_REF_Moderate = ul10Task.Moderate.REF.Throughput.Mean;
  const ulMeanThroughput10_DUT_Poor = ul10Task.Poor.DUT.Throughput.Mean;
  const ulMeanThroughput10_REF_Poor = ul10Task.Poor.REF.Throughput.Mean;

  // UL Mean Throughput for 20 Mbps
  const ulMeanThroughput20_DUT_Good = ul20Task.Good.DUT.Throughput.Mean;
  const ulMeanThroughput20_REF_Good = ul20Task.Good.REF.Throughput.Mean;
  const ulMeanThroughput20_DUT_Moderate = ul20Task.Moderate.DUT.Throughput.Mean;
  const ulMeanThroughput20_REF_Moderate = ul20Task.Moderate.REF.Throughput.Mean;
  const ulMeanThroughput20_DUT_Poor = ul20Task.Poor.DUT.Throughput.Mean;
  const ulMeanThroughput20_REF_Poor = ul20Task.Poor.REF.Throughput.Mean;

  const ulMeanThroughput10HistogramData = [
    { name: 'Good', DUT: ulMeanThroughput10_DUT_Good, REF: ulMeanThroughput10_REF_Good },
    { name: 'Moderate', DUT: ulMeanThroughput10_DUT_Moderate, REF: ulMeanThroughput10_REF_Moderate },
    { name: 'Poor', DUT: ulMeanThroughput10_DUT_Poor, REF: ulMeanThroughput10_REF_Poor },
    {
      name: 'Overall',
      DUT: (ulMeanThroughput10_DUT_Good + ulMeanThroughput10_DUT_Moderate + ulMeanThroughput10_DUT_Poor) / 3,
      REF: (ulMeanThroughput10_REF_Good + ulMeanThroughput10_REF_Moderate + ulMeanThroughput10_REF_Poor) / 3
    },
  ];

  const ulMeanThroughput20HistogramData = [
    { name: 'Good', DUT: ulMeanThroughput20_DUT_Good, REF: ulMeanThroughput20_REF_Good },
    { name: 'Moderate', DUT: ulMeanThroughput20_DUT_Moderate, REF: ulMeanThroughput20_REF_Moderate },
    { name: 'Poor', DUT: ulMeanThroughput20_DUT_Poor, REF: ulMeanThroughput20_REF_Poor },
    {
      name: 'Overall',
      DUT: (ulMeanThroughput20_DUT_Good + ulMeanThroughput20_DUT_Moderate + ulMeanThroughput20_DUT_Poor) / 3,
      REF: (ulMeanThroughput20_REF_Good + ulMeanThroughput20_REF_Moderate + ulMeanThroughput20_REF_Poor) / 3
    },
  ];

  // UL Mean Jitter for 10 Mbps
  const ulMeanJitter10_DUT_Good = ul10Task.Good.DUT.Jitter.Mean;
  const ulMeanJitter10_REF_Good = ul10Task.Good.REF.Jitter.Mean;
  const ulMeanJitter10_DUT_Moderate = ul10Task.Moderate.DUT.Jitter.Mean;
  const ulMeanJitter10_REF_Moderate = ul10Task.Moderate.REF.Jitter.Mean;
  const ulMeanJitter10_DUT_Poor = ul10Task.Poor.DUT.Jitter.Mean;
  const ulMeanJitter10_REF_Poor = ul10Task.Poor.REF.Jitter.Mean;

  const ulMeanJitter10HistogramData = [
    { name: 'Good', DUT: ulMeanJitter10_DUT_Good, REF: ulMeanJitter10_REF_Good },
    { name: 'Moderate', DUT: ulMeanJitter10_DUT_Moderate, REF: ulMeanJitter10_REF_Moderate },
    { name: 'Poor', DUT: ulMeanJitter10_DUT_Poor, REF: ulMeanJitter10_REF_Poor },
    {
      name: 'Overall',
      DUT: (ulMeanJitter10_DUT_Good + ulMeanJitter10_DUT_Moderate + ulMeanJitter10_DUT_Poor) / 3,
      REF: (ulMeanJitter10_REF_Good + ulMeanJitter10_REF_Moderate + ulMeanJitter10_REF_Poor) / 3
    },
  ];

  // UL Mean Jitter for 20 Mbps
  const ulMeanJitter20_DUT_Good = ul20Task.Good.DUT.Jitter.Mean;
  const ulMeanJitter20_REF_Good = ul20Task.Good.REF.Jitter.Mean;
  const ulMeanJitter20_DUT_Moderate = ul20Task.Moderate.DUT.Jitter.Mean;
  const ulMeanJitter20_REF_Moderate = ul20Task.Moderate.REF.Jitter.Mean;
  const ulMeanJitter20_DUT_Poor = ul20Task.Poor.DUT.Jitter.Mean;
  const ulMeanJitter20_REF_Poor = ul20Task.Poor.REF.Jitter.Mean;

  const ulMeanJitter20HistogramData = [
    { name: 'Good', DUT: ulMeanJitter20_DUT_Good, REF: ulMeanJitter20_REF_Good },
    { name: 'Moderate', DUT: ulMeanJitter20_DUT_Moderate, REF: ulMeanJitter20_REF_Moderate },
    { name: 'Poor', DUT: ulMeanJitter20_DUT_Poor, REF: ulMeanJitter20_REF_Poor },
    {
      name: 'Overall',
      DUT: (ulMeanJitter20_DUT_Good + ulMeanJitter20_DUT_Moderate + ulMeanJitter20_DUT_Poor) / 3,
      REF: (ulMeanJitter20_REF_Good + ulMeanJitter20_REF_Moderate + ulMeanJitter20_REF_Poor) / 3
    },
  ];

  // UL Packet Failure Rate for 10 Mbps
  const ulPFR10_DUT_Good = ul10Task.Good.DUT["Error Ratio"].Mean;
  const ulPFR10_REF_Good = ul10Task.Good.REF["Error Ratio"].Mean;
  const ulPFR10_DUT_Moderate = ul10Task.Moderate.DUT["Error Ratio"].Mean;
  const ulPFR10_REF_Moderate = ul10Task.Moderate.REF["Error Ratio"].Mean;
  const ulPFR10_DUT_Poor = ul10Task.Poor.DUT["Error Ratio"].Mean;
  const ulPFR10_REF_Poor = ul10Task.Poor.REF["Error Ratio"].Mean;

  const ulPFR10HistogramData = [
    { name: 'Good', DUT: ulPFR10_DUT_Good, REF: ulPFR10_REF_Good },
    { name: 'Moderate', DUT: ulPFR10_DUT_Moderate, REF: ulPFR10_REF_Moderate },
    { name: 'Poor', DUT: ulPFR10_DUT_Poor, REF: ulPFR10_REF_Poor },
    {
      name: 'Overall',
      DUT: (ulPFR10_DUT_Good + ulPFR10_DUT_Moderate + ulPFR10_DUT_Poor) / 3,
      REF: (ulPFR10_REF_Good + ulPFR10_REF_Moderate + ulPFR10_REF_Poor) / 3
    },
  ];

  // UL Packet Failure Rate for 20 Mbps
  const ulPFR20_DUT_Good = ul20Task.Good.DUT["Error Ratio"].Mean;
  const ulPFR20_REF_Good = ul20Task.Good.REF["Error Ratio"].Mean;
  const ulPFR20_DUT_Moderate = ul20Task.Moderate.DUT["Error Ratio"].Mean;
  const ulPFR20_REF_Moderate = ul20Task.Moderate.REF["Error Ratio"].Mean;
  const ulPFR20_DUT_Poor = ul20Task.Poor.DUT["Error Ratio"].Mean;
  const ulPFR20_REF_Poor = ul20Task.Poor.REF["Error Ratio"].Mean;

  const ulPFR20HistogramData = [
    { name: 'Good', DUT: ulPFR20_DUT_Good, REF: ulPFR20_REF_Good },
    { name: 'Moderate', DUT: ulPFR20_DUT_Moderate, REF: ulPFR20_REF_Moderate },
    { name: 'Poor', DUT: ulPFR20_DUT_Poor, REF: ulPFR20_REF_Poor },
    {
      name: 'Overall',
      DUT: (ulPFR20_DUT_Good + ulPFR20_DUT_Moderate + ulPFR20_DUT_Poor) / 3,
      REF: (ulPFR20_REF_Good + ulPFR20_REF_Moderate + ulPFR20_REF_Poor) / 3
    },
  ];

  return (
    <>
      <div className='page-content'>
        <DynamicHeader level={2}>UDP Test - 5G Auto - {city}</DynamicHeader>
        {/* dp udp overall  table */}
        <DpUdpTableLoc3 data={udp_Stationary_DL} tableName="UDP Test DL Details" />
      </div>
      {/* histograms */}
      <div className='page-content'>
        <DpHistogramComponent
          data={dlMeanThroughput200HistogramData}
          title="UDP Download Mean Throughput (200 Mbps)"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={dlMeanThroughput400HistogramData}
          title="UDP Download Mean Throughput (400 Mbps)"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>
      <div className='page-content'>
        <DpHistogramComponent
          data={dlMeanJitter200HistogramData}
          title="UDP Download Mean Jitter (200 Mbps)"
          yAxisLabel="Jitter (s)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={dlMeanJitter400HistogramData}
          title="UDP Download Mean Jitter (400 Mbps)"
          yAxisLabel="Jitter (s)"
          barKeys={barKeys}
        />
      </div>
      <div className='page-content'>
        <DpHistogramComponent
          data={dlPFR200HistogramData}
          title="UDP Download Packet Failure Rate (200 Mbps)"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={dlPFR400HistogramData}
          title="UDP Download Packet Failure Rate (400 Mbps)"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={barKeys}
        />
      </div>


      <div className='page-content'>
        <DpUdpTableLoc3 data={udp_Stationary_UL} tableName="UDP Test UL Details" />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={ulMeanThroughput10HistogramData}
          title="UDP Upload Mean Throughput (10 Mbps)"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={ulMeanThroughput20HistogramData}
          title="UDP Upload Mean Throughput (20 Mbps)"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>

      <div className='page-content'>

        <DpHistogramComponent
          data={ulMeanJitter10HistogramData}
          title="UDP Upload Mean Jitter (10 Mbps)"
          yAxisLabel="Jitter (ms)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={ulMeanJitter20HistogramData}
          title="UDP Upload Mean Jitter (20 Mbps)"
          yAxisLabel="Jitter (ms)"
          barKeys={barKeys}
        />
      </div>

      <div className='page-content'>

        <DpHistogramComponent
          data={ulPFR10HistogramData}
          title="UDP Upload Packet Failure Rate (10 Mbps)"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={ulPFR20HistogramData}
          title="UDP Upload Packet Failure Rate (20 Mbps)"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={barKeys}
        />
      </div>
    </>
  );
}

export default Dp_Udp_Component;
