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

  // Extract DL Mean Jitter data
  const dlMeanJitter200_DUT = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter200_REF = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter400_DUT = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean;
  const dlMeanJitter400_REF = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"].Jitter.Mean;

  const dlMeanJitter200_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean;
  const dlMeanJitter200_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"].Jitter.Mean;
  const dlMeanJitter400_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean;
  const dlMeanJitter400_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"].Jitter.Mean;

  const dlMeanJitter200_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const dlMeanJitter200_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const dlMeanJitter400_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const dlMeanJitter400_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;

  const dlJitterGoodDUT = (dlMeanJitter200_DUT + dlMeanJitter400_DUT) / 2;
  const dlJitterModerateDUT = (dlMeanJitter200_DUT_Moderate + dlMeanJitter400_DUT_Moderate) / 2;
  const dlJitterPoorDUT = (dlMeanJitter200_DUT_Poor + dlMeanJitter400_DUT_Poor) / 2;

  const dlJitterGoodREF = (dlMeanJitter200_REF + dlMeanJitter400_REF) / 2;
  const dlJitterModerateREF = (dlMeanJitter200_REF_Moderate + dlMeanJitter400_REF_Moderate) / 2;
  const dlJitterPoorREF = (dlMeanJitter200_REF_Poor + dlMeanJitter400_REF_Poor) / 2;

  const dlJitterHistogramData = [
    { name: 'Good', DUT: dlJitterGoodDUT, REF: dlJitterGoodREF },
    { name: 'Moderate', DUT: dlJitterModerateDUT, REF: dlJitterModerateREF },
    { name: 'Poor', DUT: dlJitterPoorDUT, REF: dlJitterPoorREF },
    { name: 'Overall',
      DUT: (dlJitterGoodDUT + dlJitterModerateDUT + dlJitterPoorDUT) / 3,
      REF: (dlJitterGoodREF + dlJitterModerateREF + dlJitterPoorREF) / 3
    },
  ];

  // Extract DL Packet Failure Rate data
  const dlPFR200_DUT = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR200_REF = udp_Stationary_Data.Good["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP DL 200M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR400_DUT = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean;
  const dlPFR400_REF = udp_Stationary_Data.Good["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP DL 400M 10sec_Good"]["Error Ratio"].Mean;

  const dlPFR200_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean;
  const dlPFR200_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10"]["Error Ratio"].Mean;
  const dlPFR400_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean;
  const dlPFR400_REF_Moderate = udp_Stationary_Data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds"]["Error Ratio"].Mean;

  const dlPFR200_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const dlPFR200_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 200 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 200 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const dlPFR400_DUT_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["dut_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const dlPFR400_REF_Poor = udp_Stationary_Data.Poor["UDP Download Task at 400 Mbps for 10 seconds"]["ref_5G auto_UDP Download Task at 400 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;

  const dlPFRGoodDUT = (dlPFR200_DUT + dlPFR400_DUT) / 2;
  const dlPFRModerateDUT = (dlPFR200_DUT_Moderate + dlPFR400_DUT_Moderate) / 2;
  const dlPFRPoorDUT = (dlPFR200_DUT_Poor + dlPFR400_DUT_Poor) / 2;

  const dlPFRGoodREF = (dlPFR200_REF + dlPFR400_REF) / 2;
  const dlPFRModerateREF = (dlPFR200_REF_Moderate + dlPFR400_REF_Moderate) / 2;
  const dlPFRPoorREF = (dlPFR200_REF_Poor + dlPFR400_REF_Poor) / 2;

  const dlPFRHistogramData = [
    { name: 'Good', DUT: dlPFRGoodDUT, REF: dlPFRGoodREF },
    { name: 'Moderate', DUT: dlPFRModerateDUT, REF: dlPFRModerateREF },
    { name: 'Poor', DUT: dlPFRPoorDUT, REF: dlPFRPoorREF },
    { name: 'Overall',
      DUT: (dlPFRGoodDUT + dlPFRModerateDUT + dlPFRPoorDUT) / 3,
      REF: (dlPFRGoodREF + dlPFRModerateREF + dlPFRPoorREF) / 3
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

  // Extract UL Mean Jitter data
  const ulMeanJitter10_DUT = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter10_REF = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_DUT = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_REF = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"].Jitter.Mean;

  const ulMeanJitter10_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"].Jitter.Mean;
  const ulMeanJitter10_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"].Jitter.Mean;
  const ulMeanJitter20_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Jitter.Mean;
  const ulMeanJitter20_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"].Jitter.Mean;

  const ulMeanJitter10_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter10_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Jitter.Mean;
  const ulMeanJitter20_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"].Jitter.Mean;

  const ulJitterGoodDUT = (ulMeanJitter10_DUT + ulMeanJitter20_DUT) / 2;
  const ulJitterModerateDUT = (ulMeanJitter10_DUT_Moderate + ulMeanJitter20_DUT_Moderate) / 2;
  const ulJitterPoorDUT = (ulMeanJitter10_DUT_Poor + ulMeanJitter20_DUT_Poor) / 2;

  const ulJitterGoodREF = (ulMeanJitter10_REF + ulMeanJitter20_REF) / 2;
  const ulJitterModerateREF = (ulMeanJitter10_REF_Moderate + ulMeanJitter20_REF_Moderate) / 2;
  const ulJitterPoorREF = (ulMeanJitter10_REF_Poor + ulMeanJitter20_REF_Poor) / 2;

  const ulJitterHistogramData = [
    { name: 'Good', DUT: ulJitterGoodDUT, REF: ulJitterGoodREF },
    { name: 'Moderate', DUT: ulJitterModerateDUT, REF: ulJitterModerateREF },
    { name: 'Poor', DUT: ulJitterPoorDUT, REF: ulJitterPoorREF },
    { name: 'Overall',
      DUT: (ulJitterGoodDUT + ulJitterModerateDUT + ulJitterPoorDUT) / 3,
      REF: (ulJitterGoodREF + ulJitterModerateREF + ulJitterPoorREF) / 3
    },
  ];

  // Extract UL Packet Failure Rate data
  const ulPFR10_DUT = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR10_REF = udp_Stationary_Data.Good["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_DUT = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_REF = udp_Stationary_Data.Good["UDP Upload Task at 20 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 20 Mbps for 10 seconds_Good Coverage_DA Test"]["Error Ratio"].Mean;

  const ulPFR10_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_DUT_"]["Error Ratio"].Mean;
  const ulPFR10_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_REF_"]["Error Ratio"].Mean;
  const ulPFR20_DUT_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT_5G auto_UDP Upload Task at 20 Mbps for 10 sec"]["Error Ratio"].Mean;
  const ulPFR20_REF_Moderate = udp_Stationary_Data.Moderate["UDP Upload Task at 20 Mbps for 10 seconds"]["REF_5G auto_UDP Upload Task at 20 Mbps for 10 sec"]["Error Ratio"].Mean;

  const ulPFR10_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH01_TMO-dut_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR10_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"]["_CH02_TMO-ref_5G auto_UDP Upload Task at 10 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_DUT_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["DUT UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"]["Error Ratio"].Mean;
  const ulPFR20_REF_Poor = udp_Stationary_Data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"]["REF UDP Upload Task at 20 Mbps for 10 seconds_poor Coverage_DA Test"]["Error Ratio"].Mean;

  const ulPFRGoodDUT = (ulPFR10_DUT + ulPFR20_DUT) / 2;
  const ulPFRModerateDUT = (ulPFR10_DUT_Moderate + ulPFR20_DUT_Moderate) / 2;
  const ulPFRPoorDUT = (ulPFR10_DUT_Poor + ulPFR20_DUT_Poor) / 2;

  const ulPFRGoodREF = (ulPFR10_REF + ulPFR20_REF) / 2;
  const ulPFRModerateREF = (ulPFR10_REF_Moderate + ulPFR20_REF_Moderate) / 2;
  const ulPFRPoorREF = (ulPFR10_REF_Poor + ulPFR20_REF_Poor) / 2;

  const ulPFRHistogramData = [
    { name: 'Good', DUT: ulPFRGoodDUT, REF: ulPFRGoodREF },
    { name: 'Moderate', DUT: ulPFRModerateDUT, REF: ulPFRModerateREF },
    { name: 'Poor', DUT: ulPFRPoorDUT, REF: ulPFRPoorREF },
    { name: 'Overall',
      DUT: (ulPFRGoodDUT + ulPFRModerateDUT + ulPFRPoorDUT) / 3,
      REF: (ulPFRGoodREF + ulPFRModerateREF + ulPFRPoorREF) / 3
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
        <DpHistogramComponent
          data={dlJitterHistogramData}
          title="UDP Download Mean Jitter"
          yAxisLabel="Jitter (s)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={dlPFRHistogramData}
          title="UDP Download Packet Failure Rate"
          yAxisLabel="Packet Failure Rate (%)"
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
        <DpHistogramComponent
          data={ulJitterHistogramData}
          title="UDP Upload Mean Jitter"
          yAxisLabel="Jitter (ms)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={ulPFRHistogramData}
          title="UDP Upload Packet Failure Rate"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={barKeys}
        />
      </div>
    </>
  );
}

export default Dp_Udp_Component;
