import React from 'react';
import DpUdpTableLoc3 from './Table/DpUdpTableLoc3';
import DpHistogramComponent from '../DpHistogramComponent';
import udp_Stationary_Data from '../../../DataFiles/SA/DpStationaryResults/UDP.json';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import '../../../StyleScript/Restricted_Report_Style.css';

function Dp_Udp_Component() {
  // Extract DL Mean Throughput data
  const dlMeanThroughput200_DUT = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput200_REF = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput400_DUT = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput400_REF = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean;

  const dlMeanThroughput200_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean;
  const dlMeanThroughput200_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean;
  const dlMeanThroughput400_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean;
  const dlMeanThroughput400_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean;

  const dlMeanThroughput200_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const dlMeanThroughput200_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const dlMeanThroughput400_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const dlMeanThroughput400_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;


  // Calculate average for each location (Good, Moderate, Poor) for DL
  const dlGoodDUT = (dlMeanThroughput200_DUT + dlMeanThroughput400_DUT) / 2;
  const dlModerateDUT = (dlMeanThroughput200_DUT_Moderate + dlMeanThroughput400_DUT_Moderate) / 2;
  const dlPoorDUT = (dlMeanThroughput200_DUT_Poor + dlMeanThroughput400_DUT_Poor) / 2;

  const dlGoodREF = (dlMeanThroughput200_REF + dlMeanThroughput400_REF) / 2;
  const dlModerateREF = (dlMeanThroughput200_REF_Moderate + dlMeanThroughput400_REF_Moderate) / 2;
  const dlPoorREF = (dlMeanThroughput200_REF_Poor + dlMeanThroughput400_REF_Poor) / 2;

  const dlHistogramData = [
    { name: 'Good', DUT: dlGoodDUT, REF: dlGoodREF },
    { name: 'Moderate', DUT: dlModerateDUT, REF: dlModerateREF },
    { name: 'Poor', DUT: dlPoorDUT, REF: dlPoorREF },
    { name: 'Overall',
      DUT: (dlGoodDUT + dlModerateDUT + dlPoorDUT) / 3,
      REF: (dlGoodREF + dlModerateREF + dlPoorREF) / 3
    },
  ];

  // Extract UL Throughput data
  const ulThroughput10_DUT = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulThroughput10_REF = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulThroughput20_DUT = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulThroughput20_REF = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;

  const ulThroughput10_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Throughput.Mean;
  const ulThroughput10_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Throughput.Mean;
  const ulThroughput20_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean;
  const ulThroughput20_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean;

  const ulThroughput10_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const ulThroughput10_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const ulThroughput20_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean;
  const ulThroughput20_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean;


  // Calculate average for each location (Good, Moderate, Poor) for UL
  const ulGoodDUT = (ulThroughput10_DUT + ulThroughput20_DUT) / 2;
  const ulModerateDUT = (ulThroughput10_DUT_Moderate + ulThroughput20_DUT_Moderate) / 2;
  const ulPoorDUT = (ulThroughput10_DUT_Poor + ulThroughput20_DUT_Poor) / 2;

  const ulGoodREF = (ulThroughput10_REF + ulThroughput20_REF) / 2;
  const ulModerateREF = (ulThroughput10_REF_Moderate + ulThroughput20_REF_Moderate) / 2;
  const ulPoorREF = (ulThroughput10_REF_Poor + ulThroughput20_REF_Poor) / 2;

  const ulHistogramData = [
    { name: 'Good', DUT: ulGoodDUT, REF: ulGoodREF },
    { name: 'Moderate', DUT: ulModerateDUT, REF: ulModerateREF },
    { name: 'Poor', DUT: ulPoorDUT, REF: ulPoorREF },
    { name: 'Overall',
      DUT: (ulGoodDUT + ulModerateDUT + ulPoorDUT) / 3,
      REF: (ulGoodREF + ulModerateREF + ulPoorREF) / 3
    },
  ];

  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  const udp_Stationary_DL = [
    // Mean Throughput - 200 Mbps
    
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
      },
    },
    // Mean Throughput - 400 Mbps
    
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
      },
    },
    {
      metric: "Mean Throughput",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
      },
    },
    // Max Throughput - 200 Mbps
    
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Throughput.Maximum,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Maximum,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Throughput.Maximum,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Maximum,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
      },
    },
    // Max Throughput - 400 Mbps
    
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Throughput.Maximum,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Maximum,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
      },
    },
    {
      metric: "Max Throughput",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Throughput.Maximum,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Maximum,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
      },
    },
    // Mean Jitter - 200 Mbps
    
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
      },
    },
    // Mean Jitter - 400 Mbps
    
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
      },
    },
    {
      metric: "Mean Jitter",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
      },
    },
    // Packet Failure Rate - 200 Mbps
    
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "200000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
      },
    },
    // Packet Failure Rate - 400 Mbps
    
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "DUT",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
      },
    },
    {
      metric: "Packet Failure Rate",
      idealThroughput: "400000",
      deviceName: "REF",
      location: {
        good: udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean,
        moderate: udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean,
        poor: udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
      },
    }
  ];
  const udp_Stationary_UL = [
    {
        metric: "Throughput",
        idealThroughput: "10000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Throughput",
        idealThroughput: "10000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Throughput",
        idealThroughput: "20000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Throughput",
        idealThroughput: "20000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Max Throughput",
        idealThroughput: "10000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Maximum,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Throughput.Maximum,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
        },
    },
    {
        metric: "Max Throughput",
        idealThroughput: "10000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Maximum,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Throughput.Maximum,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
        },
    },
    {
        metric: "Max Throughput",
        idealThroughput: "20000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Maximum,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Maximum,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Maximum,
        },
    },
    {
        metric: "Max Throughput",
        idealThroughput: "20000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Maximum,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Maximum,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Maximum,
        },
    },
    {
        metric: "Mean Jitter",
        idealThroughput: "10000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Jitter.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
        },
    },
    {
        metric: "Mean Jitter",
        idealThroughput: "10000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Jitter.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
        },
    },
    {
        metric: "Mean Jitter",
        idealThroughput: "20000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Jitter.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Jitter.Mean,
        },
    },
    {
        metric: "Mean Jitter",
        idealThroughput: "20000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Jitter.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Jitter.Mean,
        },
    },
    {
        metric: "Packet Failure Rate",
        idealThroughput: "10000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"]["Error Ratio"].Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
        },
    },
    {
        metric: "Packet Failure Rate",
        idealThroughput: "10000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"]["Error Ratio"].Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
        },
    },
    {
        metric: "Packet Failure Rate",
        idealThroughput: "20000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"]["Error Ratio"].Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"]["Error Ratio"].Mean,
        },
    },
    {
        metric: "Packet Failure Rate",
        idealThroughput: "20000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"]["Error Ratio"].Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"]["Error Ratio"].Mean,
        },
    },
  ];

  return (
    <>
      <div className='page-content'>
        <h2>UDP test - 5G NR</h2>
        <DpUdpTableLoc3 data={udp_Stationary_DL} tableName="UDP DL" />
        <DpHistogramComponent
          data={dlHistogramData}
          title="UDP Download Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>
      <div className='page-content'>
        <DpUdpTableLoc3 data={udp_Stationary_UL} tableName="UDP UL" />
        <DpHistogramComponent
          data={ulHistogramData}
          title="UDP Upload Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>
    </>
  );
}

export default Dp_Udp_Component;
