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

  if (!reportData) {
    return <div className="page-content">Loading {city} data...</div>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  // Update to use dataPerformance from the fetched JSON
  // Path: ["Data Performance"]["5G AUTO DP"]["Udp Test"]
  const udp_Data_Source = reportData.dataPerformance["Data Performance"]["5G AUTO DP"]["Udp Test"] || { DL: {}, UL: {} };

  // Helper for safe access
  const getUdpMetric = (dir, task, category, device, metric) => {
    return udp_Data_Source?.[dir]?.[task]?.[category]?.[device]?.[metric]?.Mean || 0;
  };

  const getThroughputMetric = (dir, task, category, device, field = 'Mean') => {
    return udp_Data_Source?.[dir]?.[task]?.[category]?.[device]?.Throughput?.[field] || 0;
  };

  // DL Mean Throughput for 200 Mbps
  const dl200TaskName = "UDP Download Task at 200 Mbps for 10 seconds";
  const dlMeanThroughput200_DUT_Good = getThroughputMetric('DL', dl200TaskName, 'Good', 'DUT');
  const dlMeanThroughput200_REF_Good = getThroughputMetric('DL', dl200TaskName, 'Good', 'REF');
  const dlMeanThroughput200_DUT_Moderate = getThroughputMetric('DL', dl200TaskName, 'Moderate', 'DUT');
  const dlMeanThroughput200_REF_Moderate = getThroughputMetric('DL', dl200TaskName, 'Moderate', 'REF');
  const dlMeanThroughput200_DUT_Poor = getThroughputMetric('DL', dl200TaskName, 'Poor', 'DUT');
  const dlMeanThroughput200_REF_Poor = getThroughputMetric('DL', dl200TaskName, 'Poor', 'REF');

  const calculateAverage = (vals) => {
    const activeVals = vals.filter(v => v > 0);
    return activeVals.length > 0 ? activeVals.reduce((a, b) => a + b, 0) / activeVals.length : 0;
  };

  const dlMeanThroughput200HistogramData = [
    { name: 'Good', DUT: dlMeanThroughput200_DUT_Good, REF: dlMeanThroughput200_REF_Good },
    { name: 'Moderate', DUT: dlMeanThroughput200_DUT_Moderate, REF: dlMeanThroughput200_REF_Moderate },
    { name: 'Poor', DUT: dlMeanThroughput200_DUT_Poor, REF: dlMeanThroughput200_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([dlMeanThroughput200_DUT_Good, dlMeanThroughput200_DUT_Moderate, dlMeanThroughput200_DUT_Poor]),
      REF: calculateAverage([dlMeanThroughput200_REF_Good, dlMeanThroughput200_REF_Moderate, dlMeanThroughput200_REF_Poor])
    },
  ];

  // DL Mean Throughput for 400 Mbps
  const dl400TaskName = "UDP Download Task at 400 Mbps for 10 seconds";
  const dlMeanThroughput400_DUT_Good = getThroughputMetric('DL', dl400TaskName, 'Good', 'DUT');
  const dlMeanThroughput400_REF_Good = getThroughputMetric('DL', dl400TaskName, 'Good', 'REF');
  const dlMeanThroughput400_DUT_Moderate = getThroughputMetric('DL', dl400TaskName, 'Moderate', 'DUT');
  const dlMeanThroughput400_REF_Moderate = getThroughputMetric('DL', dl400TaskName, 'Moderate', 'REF');
  const dlMeanThroughput400_DUT_Poor = getThroughputMetric('DL', dl400TaskName, 'Poor', 'DUT');
  const dlMeanThroughput400_REF_Poor = getThroughputMetric('DL', dl400TaskName, 'Poor', 'REF');

  const dlMeanThroughput400HistogramData = [
    { name: 'Good', DUT: dlMeanThroughput400_DUT_Good, REF: dlMeanThroughput400_REF_Good },
    { name: 'Moderate', DUT: dlMeanThroughput400_DUT_Moderate, REF: dlMeanThroughput400_REF_Moderate },
    { name: 'Poor', DUT: dlMeanThroughput400_DUT_Poor, REF: dlMeanThroughput400_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([dlMeanThroughput400_DUT_Good, dlMeanThroughput400_DUT_Moderate, dlMeanThroughput400_DUT_Poor]),
      REF: calculateAverage([dlMeanThroughput400_REF_Good, dlMeanThroughput400_REF_Moderate, dlMeanThroughput400_REF_Poor])
    },
  ];

  // DL Mean Jitter for 200 Mbps
  const dlMeanJitter200_DUT_Good = getUdpMetric('DL', dl200TaskName, 'Good', 'DUT', 'Jitter');
  const dlMeanJitter200_REF_Good = getUdpMetric('DL', dl200TaskName, 'Good', 'REF', 'Jitter');
  const dlMeanJitter200_DUT_Moderate = getUdpMetric('DL', dl200TaskName, 'Moderate', 'DUT', 'Jitter');
  const dlMeanJitter200_REF_Moderate = getUdpMetric('DL', dl200TaskName, 'Moderate', 'REF', 'Jitter');
  const dlMeanJitter200_DUT_Poor = getUdpMetric('DL', dl200TaskName, 'Poor', 'DUT', 'Jitter');
  const dlMeanJitter200_REF_Poor = getUdpMetric('DL', dl200TaskName, 'Poor', 'REF', 'Jitter');

  const dlMeanJitter200HistogramData = [
    { name: 'Good', DUT: dlMeanJitter200_DUT_Good, REF: dlMeanJitter200_REF_Good },
    { name: 'Moderate', DUT: dlMeanJitter200_DUT_Moderate, REF: dlMeanJitter200_REF_Moderate },
    { name: 'Poor', DUT: dlMeanJitter200_DUT_Poor, REF: dlMeanJitter200_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([dlMeanJitter200_DUT_Good, dlMeanJitter200_DUT_Moderate, dlMeanJitter200_DUT_Poor]),
      REF: calculateAverage([dlMeanJitter200_REF_Good, dlMeanJitter200_REF_Moderate, dlMeanJitter200_REF_Poor])
    },
  ];

  // DL Mean Jitter for 400 Mbps
  const dlMeanJitter400_DUT_Good = getUdpMetric('DL', dl400TaskName, 'Good', 'DUT', 'Jitter');
  const dlMeanJitter400_REF_Good = getUdpMetric('DL', dl400TaskName, 'Good', 'REF', 'Jitter');
  const dlMeanJitter400_DUT_Moderate = getUdpMetric('DL', dl400TaskName, 'Moderate', 'DUT', 'Jitter');
  const dlMeanJitter400_REF_Moderate = getUdpMetric('DL', dl400TaskName, 'Moderate', 'REF', 'Jitter');
  const dlMeanJitter400_DUT_Poor = getUdpMetric('DL', dl400TaskName, 'Poor', 'DUT', 'Jitter');
  const dlMeanJitter400_REF_Poor = getUdpMetric('DL', dl400TaskName, 'Poor', 'REF', 'Jitter');

  const dlMeanJitter400HistogramData = [
    { name: 'Good', DUT: dlMeanJitter400_DUT_Good, REF: dlMeanJitter400_REF_Good },
    { name: 'Moderate', DUT: dlMeanJitter400_DUT_Moderate, REF: dlMeanJitter400_REF_Moderate },
    { name: 'Poor', DUT: dlMeanJitter400_DUT_Poor, REF: dlMeanJitter400_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([dlMeanJitter400_DUT_Good, dlMeanJitter400_DUT_Moderate, dlMeanJitter400_DUT_Poor]),
      REF: calculateAverage([dlMeanJitter400_REF_Good, dlMeanJitter400_REF_Moderate, dlMeanJitter400_REF_Poor])
    },
  ];

  // DL Packet Failure Rate for 200 Mbps
  const dlPFR200_DUT_Good = getUdpMetric('DL', dl200TaskName, 'Good', 'DUT', 'Error Ratio');
  const dlPFR200_REF_Good = getUdpMetric('DL', dl200TaskName, 'Good', 'REF', 'Error Ratio');
  const dlPFR200_DUT_Moderate = getUdpMetric('DL', dl200TaskName, 'Moderate', 'DUT', 'Error Ratio');
  const dlPFR200_REF_Moderate = getUdpMetric('DL', dl200TaskName, 'Moderate', 'REF', 'Error Ratio');
  const dlPFR200_DUT_Poor = getUdpMetric('DL', dl200TaskName, 'Poor', 'DUT', 'Error Ratio');
  const dlPFR200_REF_Poor = getUdpMetric('DL', dl200TaskName, 'Poor', 'REF', 'Error Ratio');

  const dlPFR200HistogramData = [
    { name: 'Good', DUT: dlPFR200_DUT_Good, REF: dlPFR200_REF_Good },
    { name: 'Moderate', DUT: dlPFR200_DUT_Moderate, REF: dlPFR200_REF_Moderate },
    { name: 'Poor', DUT: dlPFR200_DUT_Poor, REF: dlPFR200_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([dlPFR200_DUT_Good, dlPFR200_DUT_Moderate, dlPFR200_DUT_Poor]),
      REF: calculateAverage([dlPFR200_REF_Good, dlPFR200_REF_Moderate, dlPFR200_REF_Poor])
    },
  ];

  // DL Packet Failure Rate for 400 Mbps
  const dlPFR400_DUT_Good = getUdpMetric('DL', dl400TaskName, 'Good', 'DUT', 'Error Ratio');
  const dlPFR400_REF_Good = getUdpMetric('DL', dl400TaskName, 'Good', 'REF', 'Error Ratio');
  const dlPFR400_DUT_Moderate = getUdpMetric('DL', dl400TaskName, 'Moderate', 'DUT', 'Error Ratio');
  const dlPFR400_REF_Moderate = getUdpMetric('DL', dl400TaskName, 'Moderate', 'REF', 'Error Ratio');
  const dlPFR400_DUT_Poor = getUdpMetric('DL', dl400TaskName, 'Poor', 'DUT', 'Error Ratio');
  const dlPFR400_REF_Poor = getUdpMetric('DL', dl400TaskName, 'Poor', 'REF', 'Error Ratio');

  const dlPFR400HistogramData = [
    { name: 'Good', DUT: dlPFR400_DUT_Good, REF: dlPFR400_REF_Good },
    { name: 'Moderate', DUT: dlPFR400_DUT_Moderate, REF: dlPFR400_REF_Moderate },
    { name: 'Poor', DUT: dlPFR400_DUT_Poor, REF: dlPFR400_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([dlPFR400_DUT_Good, dlPFR400_DUT_Moderate, dlPFR400_DUT_Poor]),
      REF: calculateAverage([dlPFR400_REF_Good, dlPFR400_REF_Moderate, dlPFR400_REF_Poor])
    },
  ];


  const ul10TaskName = "UDP Upload Task at 10 Mbps for 10 seconds";
  const ul20TaskName = "UDP Upload Task at 20 Mbps for 10 seconds";

  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  const udp_Stationary_DL = [
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('DL', dl200TaskName, 'Good', 'DUT'),
        moderate: getThroughputMetric('DL', dl200TaskName, 'Moderate', 'DUT'),
        poor: getThroughputMetric('DL', dl200TaskName, 'Poor', 'DUT'),
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('DL', dl200TaskName, 'Good', 'REF'),
        moderate: getThroughputMetric('DL', dl200TaskName, 'Moderate', 'REF'),
        poor: getThroughputMetric('DL', dl200TaskName, 'Poor', 'REF'),
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('DL', dl400TaskName, 'Good', 'DUT'),
        moderate: getThroughputMetric('DL', dl400TaskName, 'Moderate', 'DUT'),
        poor: getThroughputMetric('DL', dl400TaskName, 'Poor', 'DUT'),
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('DL', dl400TaskName, 'Good', 'REF'),
        moderate: getThroughputMetric('DL', dl400TaskName, 'Moderate', 'REF'),
        poor: getThroughputMetric('DL', dl400TaskName, 'Poor', 'REF'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('DL', dl200TaskName, 'Good', 'DUT', 'Maximum'),
        moderate: getThroughputMetric('DL', dl200TaskName, 'Moderate', 'DUT', 'Maximum'),
        poor: getThroughputMetric('DL', dl200TaskName, 'Poor', 'DUT', 'Maximum'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('DL', dl200TaskName, 'Good', 'REF', 'Maximum'),
        moderate: getThroughputMetric('DL', dl200TaskName, 'Moderate', 'REF', 'Maximum'),
        poor: getThroughputMetric('DL', dl200TaskName, 'Poor', 'REF', 'Maximum'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('DL', dl400TaskName, 'Good', 'DUT', 'Maximum'),
        moderate: getThroughputMetric('DL', dl400TaskName, 'Moderate', 'DUT', 'Maximum'),
        poor: getThroughputMetric('DL', dl400TaskName, 'Poor', 'DUT', 'Maximum'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('DL', dl400TaskName, 'Good', 'REF', 'Maximum'),
        moderate: getThroughputMetric('DL', dl400TaskName, 'Moderate', 'REF', 'Maximum'),
        poor: getThroughputMetric('DL', dl400TaskName, 'Poor', 'REF', 'Maximum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('DL', dl200TaskName, 'Good', 'DUT', 'Minimum'),
        moderate: getThroughputMetric('DL', dl200TaskName, 'Moderate', 'DUT', 'Minimum'),
        poor: getThroughputMetric('DL', dl200TaskName, 'Poor', 'DUT', 'Minimum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('DL', dl200TaskName, 'Good', 'REF', 'Minimum'),
        moderate: getThroughputMetric('DL', dl200TaskName, 'Moderate', 'REF', 'Minimum'),
        poor: getThroughputMetric('DL', dl200TaskName, 'Poor', 'REF', 'Minimum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('DL', dl400TaskName, 'Good', 'DUT', 'Minimum'),
        moderate: getThroughputMetric('DL', dl400TaskName, 'Moderate', 'DUT', 'Minimum'),
        poor: getThroughputMetric('DL', dl400TaskName, 'Poor', 'DUT', 'Minimum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('DL', dl400TaskName, 'Good', 'REF', 'Minimum'),
        moderate: getThroughputMetric('DL', dl400TaskName, 'Moderate', 'REF', 'Minimum'),
        poor: getThroughputMetric('DL', dl400TaskName, 'Poor', 'REF', 'Minimum'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('DL', dl200TaskName, 'Good', 'DUT', 'Jitter'),
        moderate: getUdpMetric('DL', dl200TaskName, 'Moderate', 'DUT', 'Jitter'),
        poor: getUdpMetric('DL', dl200TaskName, 'Poor', 'DUT', 'Jitter'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: getUdpMetric('DL', dl200TaskName, 'Good', 'REF', 'Jitter'),
        moderate: getUdpMetric('DL', dl200TaskName, 'Moderate', 'REF', 'Jitter'),
        poor: getUdpMetric('DL', dl200TaskName, 'Poor', 'REF', 'Jitter'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('DL', dl400TaskName, 'Good', 'DUT', 'Jitter'),
        moderate: getUdpMetric('DL', dl400TaskName, 'Moderate', 'DUT', 'Jitter'),
        poor: getUdpMetric('DL', dl400TaskName, 'Poor', 'DUT', 'Jitter'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: getUdpMetric('DL', dl400TaskName, 'Good', 'REF', 'Jitter'),
        moderate: getUdpMetric('DL', dl400TaskName, 'Moderate', 'REF', 'Jitter'),
        poor: getUdpMetric('DL', dl400TaskName, 'Poor', 'REF', 'Jitter'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "200",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('DL', dl200TaskName, 'Good', 'DUT', 'Error Ratio'),
        moderate: getUdpMetric('DL', dl200TaskName, 'Moderate', 'DUT', 'Error Ratio'),
        poor: getUdpMetric('DL', dl200TaskName, 'Poor', 'DUT', 'Error Ratio'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "200",
      deviceName: "REF",
      location: {
        good: getUdpMetric('DL', dl200TaskName, 'Good', 'REF', 'Error Ratio'),
        moderate: getUdpMetric('DL', dl200TaskName, 'Moderate', 'REF', 'Error Ratio'),
        poor: getUdpMetric('DL', dl200TaskName, 'Poor', 'REF', 'Error Ratio'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "400",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('DL', dl400TaskName, 'Good', 'DUT', 'Error Ratio'),
        moderate: getUdpMetric('DL', dl400TaskName, 'Moderate', 'DUT', 'Error Ratio'),
        poor: getUdpMetric('DL', dl400TaskName, 'Poor', 'DUT', 'Error Ratio'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "400",
      deviceName: "REF",
      location: {
        good: getUdpMetric('DL', dl400TaskName, 'Good', 'REF', 'Error Ratio'),
        moderate: getUdpMetric('DL', dl400TaskName, 'Moderate', 'REF', 'Error Ratio'),
        poor: getUdpMetric('DL', dl400TaskName, 'Poor', 'REF', 'Error Ratio'),
      },
    }
  ];

  const udp_Stationary_UL = [
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('UL', ul10TaskName, 'Good', 'DUT'),
        moderate: getThroughputMetric('UL', ul10TaskName, 'Moderate', 'DUT'),
        poor: getThroughputMetric('UL', ul10TaskName, 'Poor', 'DUT'),
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('UL', ul10TaskName, 'Good', 'REF'),
        moderate: getThroughputMetric('UL', ul10TaskName, 'Moderate', 'REF'),
        poor: getThroughputMetric('UL', ul10TaskName, 'Poor', 'REF'),
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('UL', ul20TaskName, 'Good', 'DUT'),
        moderate: getThroughputMetric('UL', ul20TaskName, 'Moderate', 'DUT'),
        poor: getThroughputMetric('UL', ul20TaskName, 'Poor', 'DUT'),
      },
    },
    {
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('UL', ul20TaskName, 'Good', 'REF'),
        moderate: getThroughputMetric('UL', ul20TaskName, 'Moderate', 'REF'),
        poor: getThroughputMetric('UL', ul20TaskName, 'Poor', 'REF'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('UL', ul10TaskName, 'Good', 'DUT', 'Maximum'),
        moderate: getThroughputMetric('UL', ul10TaskName, 'Moderate', 'DUT', 'Maximum'),
        poor: getThroughputMetric('UL', ul10TaskName, 'Poor', 'DUT', 'Maximum'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('UL', ul10TaskName, 'Good', 'REF', 'Maximum'),
        moderate: getThroughputMetric('UL', ul10TaskName, 'Moderate', 'REF', 'Maximum'),
        poor: getThroughputMetric('UL', ul10TaskName, 'Poor', 'REF', 'Maximum'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('UL', ul20TaskName, 'Good', 'DUT', 'Maximum'),
        moderate: getThroughputMetric('UL', ul20TaskName, 'Moderate', 'DUT', 'Maximum'),
        poor: getThroughputMetric('UL', ul20TaskName, 'Poor', 'DUT', 'Maximum'),
      },
    },
    {
      metric: "Max Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('UL', ul20TaskName, 'Good', 'REF', 'Maximum'),
        moderate: getThroughputMetric('UL', ul20TaskName, 'Moderate', 'REF', 'Maximum'),
        poor: getThroughputMetric('UL', ul20TaskName, 'Poor', 'REF', 'Maximum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('UL', ul10TaskName, 'Good', 'DUT', 'Minimum'),
        moderate: getThroughputMetric('UL', ul10TaskName, 'Moderate', 'DUT', 'Minimum'),
        poor: getThroughputMetric('UL', ul10TaskName, 'Poor', 'DUT', 'Minimum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('UL', ul10TaskName, 'Good', 'REF', 'Minimum'),
        moderate: getThroughputMetric('UL', ul10TaskName, 'Moderate', 'REF', 'Minimum'),
        poor: getThroughputMetric('UL', ul10TaskName, 'Poor', 'REF', 'Minimum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: getThroughputMetric('UL', ul20TaskName, 'Good', 'DUT', 'Minimum'),
        moderate: getThroughputMetric('UL', ul20TaskName, 'Moderate', 'DUT', 'Minimum'),
        poor: getThroughputMetric('UL', ul20TaskName, 'Poor', 'DUT', 'Minimum'),
      },
    },
    {
      metric: "Min Throughput (Mbps)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: getThroughputMetric('UL', ul20TaskName, 'Good', 'REF', 'Minimum'),
        moderate: getThroughputMetric('UL', ul20TaskName, 'Moderate', 'REF', 'Minimum'),
        poor: getThroughputMetric('UL', ul20TaskName, 'Poor', 'REF', 'Minimum'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('UL', ul10TaskName, 'Good', 'DUT', 'Jitter'),
        moderate: getUdpMetric('UL', ul10TaskName, 'Moderate', 'DUT', 'Jitter'),
        poor: getUdpMetric('UL', ul10TaskName, 'Poor', 'DUT', 'Jitter'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: getUdpMetric('UL', ul10TaskName, 'Good', 'REF', 'Jitter'),
        moderate: getUdpMetric('UL', ul10TaskName, 'Moderate', 'REF', 'Jitter'),
        poor: getUdpMetric('UL', ul10TaskName, 'Poor', 'REF', 'Jitter'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('UL', ul20TaskName, 'Good', 'DUT', 'Jitter'),
        moderate: getUdpMetric('UL', ul20TaskName, 'Moderate', 'DUT', 'Jitter'),
        poor: getUdpMetric('UL', ul20TaskName, 'Poor', 'DUT', 'Jitter'),
      },
    },
    {
      metric: "Mean Jitter (ms)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: getUdpMetric('UL', ul20TaskName, 'Good', 'REF', 'Jitter'),
        moderate: getUdpMetric('UL', ul20TaskName, 'Moderate', 'REF', 'Jitter'),
        poor: getUdpMetric('UL', ul20TaskName, 'Poor', 'REF', 'Jitter'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "10",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('UL', ul10TaskName, 'Good', 'DUT', 'Error Ratio'),
        moderate: getUdpMetric('UL', ul10TaskName, 'Moderate', 'DUT', 'Error Ratio'),
        poor: getUdpMetric('UL', ul10TaskName, 'Poor', 'DUT', 'Error Ratio'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "10",
      deviceName: "REF",
      location: {
        good: getUdpMetric('UL', ul10TaskName, 'Good', 'REF', 'Error Ratio'),
        moderate: getUdpMetric('UL', ul10TaskName, 'Moderate', 'REF', 'Error Ratio'),
        poor: getUdpMetric('UL', ul10TaskName, 'Poor', 'REF', 'Error Ratio'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "20",
      deviceName: "DUT",
      location: {
        good: getUdpMetric('UL', ul20TaskName, 'Good', 'DUT', 'Error Ratio'),
        moderate: getUdpMetric('UL', ul20TaskName, 'Moderate', 'DUT', 'Error Ratio'),
        poor: getUdpMetric('UL', ul20TaskName, 'Poor', 'DUT', 'Error Ratio'),
      },
    },
    {
      metric: "Packet Failure Rate (%)",
      idealThroughput: "20",
      deviceName: "REF",
      location: {
        good: getUdpMetric('UL', ul20TaskName, 'Good', 'REF', 'Error Ratio'),
        moderate: getUdpMetric('UL', ul20TaskName, 'Moderate', 'REF', 'Error Ratio'),
        poor: getUdpMetric('UL', ul20TaskName, 'Poor', 'REF', 'Error Ratio'),
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
  const ulMeanThroughput10_DUT_Good = getThroughputMetric('UL', ul10TaskName, 'Good', 'DUT');
  const ulMeanThroughput10_REF_Good = getThroughputMetric('UL', ul10TaskName, 'Good', 'REF');
  const ulMeanThroughput10_DUT_Moderate = getThroughputMetric('UL', ul10TaskName, 'Moderate', 'DUT');
  const ulMeanThroughput10_REF_Moderate = getThroughputMetric('UL', ul10TaskName, 'Moderate', 'REF');
  const ulMeanThroughput10_DUT_Poor = getThroughputMetric('UL', ul10TaskName, 'Poor', 'DUT');
  const ulMeanThroughput10_REF_Poor = getThroughputMetric('UL', ul10TaskName, 'Poor', 'REF');

  // UL Mean Throughput for 20 Mbps
  const ulMeanThroughput20_DUT_Good = getThroughputMetric('UL', ul20TaskName, 'Good', 'DUT');
  const ulMeanThroughput20_REF_Good = getThroughputMetric('UL', ul20TaskName, 'Good', 'REF');
  const ulMeanThroughput20_DUT_Moderate = getThroughputMetric('UL', ul20TaskName, 'Moderate', 'DUT');
  const ulMeanThroughput20_REF_Moderate = getThroughputMetric('UL', ul20TaskName, 'Moderate', 'REF');
  const ulMeanThroughput20_DUT_Poor = getThroughputMetric('UL', ul20TaskName, 'Poor', 'DUT');
  const ulMeanThroughput20_REF_Poor = getThroughputMetric('UL', ul20TaskName, 'Poor', 'REF');

  const ulMeanThroughput10HistogramData = [
    { name: 'Good', DUT: ulMeanThroughput10_DUT_Good, REF: ulMeanThroughput10_REF_Good },
    { name: 'Moderate', DUT: ulMeanThroughput10_DUT_Moderate, REF: ulMeanThroughput10_REF_Moderate },
    { name: 'Poor', DUT: ulMeanThroughput10_DUT_Poor, REF: ulMeanThroughput10_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([ulMeanThroughput10_DUT_Good, ulMeanThroughput10_DUT_Moderate, ulMeanThroughput10_DUT_Poor]),
      REF: calculateAverage([ulMeanThroughput10_REF_Good, ulMeanThroughput10_REF_Moderate, ulMeanThroughput10_REF_Poor])
    },
  ];

  const ulMeanThroughput20HistogramData = [
    { name: 'Good', DUT: ulMeanThroughput20_DUT_Good, REF: ulMeanThroughput20_REF_Good },
    { name: 'Moderate', DUT: ulMeanThroughput20_DUT_Moderate, REF: ulMeanThroughput20_REF_Moderate },
    { name: 'Poor', DUT: ulMeanThroughput20_DUT_Poor, REF: ulMeanThroughput20_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([ulMeanThroughput20_DUT_Good, ulMeanThroughput20_DUT_Moderate, ulMeanThroughput20_DUT_Poor]),
      REF: calculateAverage([ulMeanThroughput20_REF_Good, ulMeanThroughput20_REF_Moderate, ulMeanThroughput20_REF_Poor])
    },
  ];

  // UL Mean Jitter for 10 Mbps
  const ulMeanJitter10_DUT_Good = getUdpMetric('UL', ul10TaskName, 'Good', 'DUT', 'Jitter');
  const ulMeanJitter10_REF_Good = getUdpMetric('UL', ul10TaskName, 'Good', 'REF', 'Jitter');
  const ulMeanJitter10_DUT_Moderate = getUdpMetric('UL', ul10TaskName, 'Moderate', 'DUT', 'Jitter');
  const ulMeanJitter10_REF_Moderate = getUdpMetric('UL', ul10TaskName, 'Moderate', 'REF', 'Jitter');
  const ulMeanJitter10_DUT_Poor = getUdpMetric('UL', ul10TaskName, 'Poor', 'DUT', 'Jitter');
  const ulMeanJitter10_REF_Poor = getUdpMetric('UL', ul10TaskName, 'Poor', 'REF', 'Jitter');

  const ulMeanJitter10HistogramData = [
    { name: 'Good', DUT: ulMeanJitter10_DUT_Good, REF: ulMeanJitter10_REF_Good },
    { name: 'Moderate', DUT: ulMeanJitter10_DUT_Moderate, REF: ulMeanJitter10_REF_Moderate },
    { name: 'Poor', DUT: ulMeanJitter10_DUT_Poor, REF: ulMeanJitter10_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([ulMeanJitter10_DUT_Good, ulMeanJitter10_DUT_Moderate, ulMeanJitter10_DUT_Poor]),
      REF: calculateAverage([ulMeanJitter10_REF_Good, ulMeanJitter10_REF_Moderate, ulMeanJitter10_REF_Poor])
    },
  ];

  // UL Mean Jitter for 20 Mbps
  const ulMeanJitter20_DUT_Good = getUdpMetric('UL', ul20TaskName, 'Good', 'DUT', 'Jitter');
  const ulMeanJitter20_REF_Good = getUdpMetric('UL', ul20TaskName, 'Good', 'REF', 'Jitter');
  const ulMeanJitter20_DUT_Moderate = getUdpMetric('UL', ul20TaskName, 'Moderate', 'DUT', 'Jitter');
  const ulMeanJitter20_REF_Moderate = getUdpMetric('UL', ul20TaskName, 'Moderate', 'REF', 'Jitter');
  const ulMeanJitter20_DUT_Poor = getUdpMetric('UL', ul20TaskName, 'Poor', 'DUT', 'Jitter');
  const ulMeanJitter20_REF_Poor = getUdpMetric('UL', ul20TaskName, 'Poor', 'REF', 'Jitter');

  const ulMeanJitter20HistogramData = [
    { name: 'Good', DUT: ulMeanJitter20_DUT_Good, REF: ulMeanJitter20_REF_Good },
    { name: 'Moderate', DUT: ulMeanJitter20_DUT_Moderate, REF: ulMeanJitter20_REF_Moderate },
    { name: 'Poor', DUT: ulMeanJitter20_DUT_Poor, REF: ulMeanJitter20_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([ulMeanJitter20_DUT_Good, ulMeanJitter20_DUT_Moderate, ulMeanJitter20_DUT_Poor]),
      REF: calculateAverage([ulMeanJitter20_REF_Good, ulMeanJitter20_REF_Moderate, ulMeanJitter20_REF_Poor])
    },
  ];

  // UL Packet Failure Rate for 10 Mbps
  const ulPFR10_DUT_Good = getUdpMetric('UL', ul10TaskName, 'Good', 'DUT', 'Error Ratio');
  const ulPFR10_REF_Good = getUdpMetric('UL', ul10TaskName, 'Good', 'REF', 'Error Ratio');
  const ulPFR10_DUT_Moderate = getUdpMetric('UL', ul10TaskName, 'Moderate', 'DUT', 'Error Ratio');
  const ulPFR10_REF_Moderate = getUdpMetric('UL', ul10TaskName, 'Moderate', 'REF', 'Error Ratio');
  const ulPFR10_DUT_Poor = getUdpMetric('UL', ul10TaskName, 'Poor', 'DUT', 'Error Ratio');
  const ulPFR10_REF_Poor = getUdpMetric('UL', ul10TaskName, 'Poor', 'REF', 'Error Ratio');

  const ulPFR10HistogramData = [
    { name: 'Good', DUT: ulPFR10_DUT_Good, REF: ulPFR10_REF_Good },
    { name: 'Moderate', DUT: ulPFR10_DUT_Moderate, REF: ulPFR10_REF_Moderate },
    { name: 'Poor', DUT: ulPFR10_DUT_Poor, REF: ulPFR10_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([ulPFR10_DUT_Good, ulPFR10_DUT_Moderate, ulPFR10_DUT_Poor]),
      REF: calculateAverage([ulPFR10_REF_Good, ulPFR10_REF_Moderate, ulPFR10_REF_Poor])
    },
  ];

  // UL Packet Failure Rate for 20 Mbps
  const ulPFR20_DUT_Good = getUdpMetric('UL', ul20TaskName, 'Good', 'DUT', 'Error Ratio');
  const ulPFR20_REF_Good = getUdpMetric('UL', ul20TaskName, 'Good', 'REF', 'Error Ratio');
  const ulPFR20_DUT_Moderate = getUdpMetric('UL', ul20TaskName, 'Moderate', 'DUT', 'Error Ratio');
  const ulPFR20_REF_Moderate = getUdpMetric('UL', ul20TaskName, 'Moderate', 'REF', 'Error Ratio');
  const ulPFR20_DUT_Poor = getUdpMetric('UL', ul20TaskName, 'Poor', 'DUT', 'Error Ratio');
  const ulPFR20_REF_Poor = getUdpMetric('UL', ul20TaskName, 'Poor', 'REF', 'Error Ratio');

  const ulPFR20HistogramData = [
    { name: 'Good', DUT: ulPFR20_DUT_Good, REF: ulPFR20_REF_Good },
    { name: 'Moderate', DUT: ulPFR20_DUT_Moderate, REF: ulPFR20_REF_Moderate },
    { name: 'Poor', DUT: ulPFR20_DUT_Poor, REF: ulPFR20_REF_Poor },
    {
      name: 'Overall',
      DUT: calculateAverage([ulPFR20_DUT_Good, ulPFR20_DUT_Moderate, ulPFR20_DUT_Poor]),
      REF: calculateAverage([ulPFR20_REF_Good, ulPFR20_REF_Moderate, ulPFR20_REF_Poor])
    },
  ];

  return (
    <>
      <div className='page-content'>
        <DynamicHeader level={2}>UDP Test - 5G Auto - {city}</DynamicHeader>
        <DynamicHeader level={3}>UDP Download Details - 5G Auto - {city}</DynamicHeader>
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
        <DynamicHeader level={3}>UDP Upload Details - 5G Auto - {city}</DynamicHeader>
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
