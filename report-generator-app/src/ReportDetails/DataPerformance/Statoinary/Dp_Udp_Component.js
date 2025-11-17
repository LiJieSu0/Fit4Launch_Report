import React from 'react';
import DpUdpTableLoc3 from './Table/DpUdpTableLoc3';
import DpHistogramComponent from '../DpHistogramComponent';
import DpUdpOverallTable from '../DpUdpOverallTable';
import udp_Stationary_Data from '../../../DataFiles/SA/DpStationaryResults/UDP.json';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import '../../../StyleScript/Restricted_Report_Style.css';

function Dp_Udp_Component() {
  // DL Mean Throughput for 200 Mbps
  const dlMeanThroughput200_DUT_Good = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput200_REF_Good = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput200_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean;
  const dlMeanThroughput200_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Throughput.Mean;
  const dlMeanThroughput200_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const dlMeanThroughput200_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;

  const dlMeanThroughput200HistogramData = [
    { name: 'Good', DUT: dlMeanThroughput200_DUT_Good, REF: dlMeanThroughput200_REF_Good },
    { name: 'Moderate', DUT: dlMeanThroughput200_DUT_Moderate, REF: dlMeanThroughput200_REF_Moderate },
    { name: 'Poor', DUT: dlMeanThroughput200_DUT_Poor, REF: dlMeanThroughput200_REF_Poor },
    { name: 'Overall',
      DUT: (dlMeanThroughput200_DUT_Good + dlMeanThroughput200_DUT_Moderate + dlMeanThroughput200_DUT_Poor) / 3,
      REF: (dlMeanThroughput200_REF_Good + dlMeanThroughput200_REF_Moderate + dlMeanThroughput200_REF_Poor) / 3
    },
  ];

  // DL Mean Throughput for 400 Mbps
  const dlMeanThroughput400_DUT_Good = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput400_REF_Good = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Throughput.Mean;
  const dlMeanThroughput400_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean;
  const dlMeanThroughput400_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Throughput.Mean;
  const dlMeanThroughput400_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const dlMeanThroughput400_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;

  const dlMeanThroughput400HistogramData = [
    { name: 'Good', DUT: dlMeanThroughput400_DUT_Good, REF: dlMeanThroughput400_REF_Good },
    { name: 'Moderate', DUT: dlMeanThroughput400_DUT_Moderate, REF: dlMeanThroughput400_REF_Moderate },
    { name: 'Poor', DUT: dlMeanThroughput400_DUT_Poor, REF: dlMeanThroughput400_REF_Poor },
    { name: 'Overall',
      DUT: (dlMeanThroughput400_DUT_Good + dlMeanThroughput400_DUT_Moderate + dlMeanThroughput400_DUT_Poor) / 3,
      REF: (dlMeanThroughput400_REF_Good + dlMeanThroughput400_REF_Moderate + dlMeanThroughput400_REF_Poor) / 3
    },
  ];

  // DL Mean Jitter for 200 Mbps
  const dlMeanJitter200_DUT_Good = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter200_REF_Good = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter200_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean;
  const dlMeanJitter200_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean;
  const dlMeanJitter200_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const dlMeanJitter200_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;

  const dlMeanJitter200HistogramData = [
    { name: 'Good', DUT: dlMeanJitter200_DUT_Good, REF: dlMeanJitter200_REF_Good },
    { name: 'Moderate', DUT: dlMeanJitter200_DUT_Moderate, REF: dlMeanJitter200_REF_Moderate },
    { name: 'Poor', DUT: dlMeanJitter200_DUT_Poor, REF: dlMeanJitter200_REF_Poor },
    { name: 'Overall',
      DUT: (dlMeanJitter200_DUT_Good + dlMeanJitter200_DUT_Moderate + dlMeanJitter200_DUT_Poor) / 3,
      REF: (dlMeanJitter200_REF_Good + dlMeanJitter200_REF_Moderate + dlMeanJitter200_REF_Poor) / 3
    },
  ];

  // DL Mean Jitter for 400 Mbps
  const dlMeanJitter400_DUT_Good = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter400_REF_Good = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter400_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean;
  const dlMeanJitter400_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean;
  const dlMeanJitter400_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const dlMeanJitter400_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;

  const dlMeanJitter400HistogramData = [
    { name: 'Good', DUT: dlMeanJitter400_DUT_Good, REF: dlMeanJitter400_REF_Good },
    { name: 'Moderate', DUT: dlMeanJitter400_DUT_Moderate, REF: dlMeanJitter400_REF_Moderate },
    { name: 'Poor', DUT: dlMeanJitter400_DUT_Poor, REF: dlMeanJitter400_REF_Poor },
    { name: 'Overall',
      DUT: (dlMeanJitter400_DUT_Good + dlMeanJitter400_DUT_Moderate + dlMeanJitter400_DUT_Poor) / 3,
      REF: (dlMeanJitter400_REF_Good + dlMeanJitter400_REF_Moderate + dlMeanJitter400_REF_Poor) / 3
    },
  ];

  // DL Packet Failure Rate for 200 Mbps
  const dlPFR200_DUT_Good = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR200_REF_Good = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR200_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean;
  const dlPFR200_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean;
  const dlPFR200_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const dlPFR200_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;

  const dlPFR200HistogramData = [
    { name: 'Good', DUT: dlPFR200_DUT_Good, REF: dlPFR200_REF_Good },
    { name: 'Moderate', DUT: dlPFR200_DUT_Moderate, REF: dlPFR200_REF_Moderate },
    { name: 'Poor', DUT: dlPFR200_DUT_Poor, REF: dlPFR200_REF_Poor },
    { name: 'Overall',
      DUT: (dlPFR200_DUT_Good + dlPFR200_DUT_Moderate + dlPFR200_DUT_Poor) / 3,
      REF: (dlPFR200_REF_Good + dlPFR200_REF_Moderate + dlPFR200_REF_Poor) / 3
    },
  ];

  // DL Packet Failure Rate for 400 Mbps
  const dlPFR400_DUT_Good = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR400_REF_Good = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR400_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean;
  const dlPFR400_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean;
  const dlPFR400_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const dlPFR400_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;

  const dlPFR400HistogramData = [
    { name: 'Good', DUT: dlPFR400_DUT_Good, REF: dlPFR400_REF_Good },
    { name: 'Moderate', DUT: dlPFR400_DUT_Moderate, REF: dlPFR400_REF_Moderate },
    { name: 'Poor', DUT: dlPFR400_DUT_Poor, REF: dlPFR400_REF_Poor },
    { name: 'Overall',
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
        metric: "Mean Throughput",
        idealThroughput: "10000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Mean Throughput",
        idealThroughput: "10000",
        deviceName: "REF",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Mean Throughput",
        idealThroughput: "20000",
        deviceName: "DUT",
        location: {
            good: udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean,
            moderate: udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean,
            poor: udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean,
        },
    },
    {
        metric: "Mean Throughput",
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
  const ulMeanThroughput10_DUT_Good = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulMeanThroughput10_REF_Good = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulMeanThroughput10_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Throughput.Mean;
  const ulMeanThroughput10_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Throughput.Mean;
  const ulMeanThroughput10_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;
  const ulMeanThroughput10_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean;

  // UL Mean Throughput for 20 Mbps
  const ulMeanThroughput20_DUT_Good = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulMeanThroughput20_REF_Good = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Throughput.Mean;
  const ulMeanThroughput20_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean;
  const ulMeanThroughput20_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Throughput.Mean;
  const ulMeanThroughput20_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean;
  const ulMeanThroughput20_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Throughput.Mean;

  const ulMeanThroughput10HistogramData = [
    { name: 'Good', DUT: ulMeanThroughput10_DUT_Good, REF: ulMeanThroughput10_REF_Good },
    { name: 'Moderate', DUT: ulMeanThroughput10_DUT_Moderate, REF: ulMeanThroughput10_REF_Moderate },
    { name: 'Poor', DUT: ulMeanThroughput10_DUT_Poor, REF: ulMeanThroughput10_REF_Poor },
    { name: 'Overall',
      DUT: (ulMeanThroughput10_DUT_Good + ulMeanThroughput10_DUT_Moderate + ulMeanThroughput10_DUT_Poor) / 3,
      REF: (ulMeanThroughput10_REF_Good + ulMeanThroughput10_REF_Moderate + ulMeanThroughput10_REF_Poor) / 3
    },
  ];

  const ulMeanThroughput20HistogramData = [
    { name: 'Good', DUT: ulMeanThroughput20_DUT_Good, REF: ulMeanThroughput20_REF_Good },
    { name: 'Moderate', DUT: ulMeanThroughput20_DUT_Moderate, REF: ulMeanThroughput20_REF_Moderate },
    { name: 'Poor', DUT: ulMeanThroughput20_DUT_Poor, REF: ulMeanThroughput20_REF_Poor },
    { name: 'Overall',
      DUT: (ulMeanThroughput20_DUT_Good + ulMeanThroughput20_DUT_Moderate + ulMeanThroughput20_DUT_Poor) / 3,
      REF: (ulMeanThroughput20_REF_Good + ulMeanThroughput20_REF_Moderate + ulMeanThroughput20_REF_Poor) / 3
    },
  ];

  // UL Mean Jitter for 10 Mbps
  const ulMeanJitter10_DUT_Good = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter10_REF_Good = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter10_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Jitter.Mean;
  const ulMeanJitter10_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Jitter.Mean;
  const ulMeanJitter10_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter10_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;

  const ulMeanJitter10HistogramData = [
    { name: 'Good', DUT: ulMeanJitter10_DUT_Good, REF: ulMeanJitter10_REF_Good },
    { name: 'Moderate', DUT: ulMeanJitter10_DUT_Moderate, REF: ulMeanJitter10_REF_Moderate },
    { name: 'Poor', DUT: ulMeanJitter10_DUT_Poor, REF: ulMeanJitter10_REF_Poor },
    { name: 'Overall',
      DUT: (ulMeanJitter10_DUT_Good + ulMeanJitter10_DUT_Moderate + ulMeanJitter10_DUT_Poor) / 3,
      REF: (ulMeanJitter10_REF_Good + ulMeanJitter10_REF_Moderate + ulMeanJitter10_REF_Poor) / 3
    },
  ];

  // UL Mean Jitter for 20 Mbps
  const ulMeanJitter20_DUT_Good = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_REF_Good = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Jitter.Mean;
  const ulMeanJitter20_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Jitter.Mean;
  const ulMeanJitter20_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Jitter.Mean;

  const ulMeanJitter20HistogramData = [
    { name: 'Good', DUT: ulMeanJitter20_DUT_Good, REF: ulMeanJitter20_REF_Good },
    { name: 'Moderate', DUT: ulMeanJitter20_DUT_Moderate, REF: ulMeanJitter20_REF_Moderate },
    { name: 'Poor', DUT: ulMeanJitter20_DUT_Poor, REF: ulMeanJitter20_REF_Poor },
    { name: 'Overall',
      DUT: (ulMeanJitter20_DUT_Good + ulMeanJitter20_DUT_Moderate + ulMeanJitter20_DUT_Poor) / 3,
      REF: (ulMeanJitter20_REF_Good + ulMeanJitter20_REF_Moderate + ulMeanJitter20_REF_Poor) / 3
    },
  ];

  // UL Packet Failure Rate for 10 Mbps
  const ulPFR10_DUT_Good = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR10_REF_Good = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR10_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"]["Error Ratio"].Mean;
  const ulPFR10_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"]["Error Ratio"].Mean;
  const ulPFR10_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR10_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;

  const ulPFR10HistogramData = [
    { name: 'Good', DUT: ulPFR10_DUT_Good, REF: ulPFR10_REF_Good },
    { name: 'Moderate', DUT: ulPFR10_DUT_Moderate, REF: ulPFR10_REF_Moderate },
    { name: 'Poor', DUT: ulPFR10_DUT_Poor, REF: ulPFR10_REF_Poor },
    { name: 'Overall',
      DUT: (ulPFR10_DUT_Good + ulPFR10_DUT_Moderate + ulPFR10_DUT_Poor) / 3,
      REF: (ulPFR10_REF_Good + ulPFR10_REF_Moderate + ulPFR10_REF_Poor) / 3
    },
  ];

  // UL Packet Failure Rate for 20 Mbps
  const ulPFR20_DUT_Good = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_REF_Good = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"]["Error Ratio"].Mean;
  const ulPFR20_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"]["Error Ratio"].Mean;
  const ulPFR20_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"]["Error Ratio"].Mean;

  const ulPFR20HistogramData = [
    { name: 'Good', DUT: ulPFR20_DUT_Good, REF: ulPFR20_REF_Good },
    { name: 'Moderate', DUT: ulPFR20_DUT_Moderate, REF: ulPFR20_REF_Moderate },
    { name: 'Poor', DUT: ulPFR20_DUT_Poor, REF: ulPFR20_REF_Poor },
    { name: 'Overall',
      DUT: (ulPFR20_DUT_Good + ulPFR20_DUT_Moderate + ulPFR20_DUT_Poor) / 3,
      REF: (ulPFR20_REF_Good + ulPFR20_REF_Moderate + ulPFR20_REF_Poor) / 3
    },
  ];

  return (
    <>
      <div className='page-content'>
        <h2>UDP test - 5G NR</h2>
        {/* dp udp overall  table */}
        <DpUdpTableLoc3 data={udp_Stationary_DL} tableName="UDP DL" />

        {/* histograms */}
        <div> 
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
        {/* histograms */}

      </div>
      <div className='page-content'>
        <DpUdpTableLoc3 data={udp_Stationary_UL} tableName="UDP UL" />
        
        {/* histograms */}
        <div>
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
        {/* histograms */}

      </div>
    </>
  );
}

export default Dp_Udp_Component;
