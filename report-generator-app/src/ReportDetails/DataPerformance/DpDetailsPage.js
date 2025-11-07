import React from 'react';
import DpRangeChart from './DpRangeChart';
import '../../StyleScript/Restricted_Report_Style.css';
import DpDetailsTableLoc3 from './DpDetailsTableLoc3';
import DpUdpTableLoc3 from './DpUdpTableLoc3';
import httpSS_Stationary_DL_Data from '../../DataFiles/SA/DpStationaryResults/Single Stream HTTP.json';
import httpMS_Stationary_Data from '../../DataFiles/SA/DpStationaryResults/Multi Stream HTTP.json';
import udp_Stationary_Data from '../../DataFiles/SA/DpStationaryResults/UDP.json';

function DpDetailsPage() {
  const httpSS_Stationary_DL = {
    Good: {
      DUT: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_SS HTTP DL_Good"].Throughput,
      REF: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_SS HTTP DL_Good"].Throughput,
    },
    Moderate: {
      DUT: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_Single Stream HTTP Download for 60 seconds"].Throughput,
      REF: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_Single Stream HTTP Download for 60 seconds"].Throughput,
    },
    Poor: {
      DUT: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Download for 60 seconds"]["dut_5G auto_Single Stream HTTP Download for 60 seconds_Poor"].Throughput,
      REF: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Download for 60 seconds"]["ref_5G auto_Single Stream HTTP Download for 60 seconds_Poor"].Throughput,
    },
  };

  const httpSS_Stationary_UL = {
    Good: {
      DUT: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G auto_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Good["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G auto_Single Stream HTTP Upload of a 15 MB file_Good Coverage_DA Test"].Throughput,
    },
    Moderate: {
      DUT: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Upload of a 15 MB file"]["_20250919_110731_CH01_TMO-dut_5G Auto_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Moderate["Single Stream HTTP Upload of a 15 MB file"]["_20250919_110731_CH02_TMO-ref_5G Auto_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
    },
    Poor: {
      DUT: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Upload of a 15 MB file"]["dut_5g auto_Single Stream HTTP Upload of a 15 MB file_poor Coverage_DA Test"].Throughput,
      REF: httpSS_Stationary_DL_Data.Poor["Single Stream HTTP Upload of a 15 MB file"]["ref_5g auto_Single Stream HTTP Upload of a 15 MB file_poor Coverage_DA Test"].Throughput,
    },
  };


  const httpMS_Stationary_DL = {
    Good: {
      DUT: httpMS_Stationary_Data.Good["Multi Stream HTTP Download for 30 seconds"]["dut_5G auto_MS HTTP DL_Good"].Throughput,
      REF: httpMS_Stationary_Data.Good["Multi Stream HTTP Download for 30 seconds"]["ref_5G auto_MS HTTP DL_Good"].Throughput,
    },
    Moderate: {
      DUT: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Download for 30 seconds"]["dut_5G auto_Multi Stream HTTP Download for 30 seconds"].Throughput,
      REF: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Download for 30 seconds"]["ref_5G auto_Multi Stream HTTP Download for 30 seconds"].Throughput,
    },
    Poor: {
      DUT: httpMS_Stationary_Data.Poor["Multi Stream HTTP Download for 30 seconds"]["_CH01_TMO-dut_5G auto_Multi Stream HTTP Download for 30 seconds_Poor Coverage_DA Test"].Throughput,
      REF: httpMS_Stationary_Data.Poor["Multi Stream HTTP Download for 30 seconds"]["_CH02_TMO-ref_5G auto_Multi Stream HTTP Download for 30 seconds_Poor Coverage_DA Test"].Throughput,
    },
  };

  const httpMS_Stationary_UL = {
    Good: {
      DUT: httpMS_Stationary_Data.Good["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G auto_Multi Stream HTTP Upload for 30 seconds_Good Coverage_DA Test"].Throughput,
      REF: httpMS_Stationary_Data.Good["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G auto_Multi Stream HTTP Upload for 30 seconds_Good Coverage_DA Test"].Throughput,
    },
    Moderate: {
      DUT: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO_5G auto_Multi Stream HTTP Upload for 30 seconds_DUT_"].Throughput,
      REF: httpMS_Stationary_Data.Moderate["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO_5G auto_Multi Stream HTTP Upload for 30 seconds_REF_"].Throughput,
    },
    Poor: {
      DUT: httpMS_Stationary_Data.Poor["Multi Stream HTTP Upload for 30 seconds"]["dut_5g auto_Multi Stream HTTP Upload for 30 seconds_poor Coverage_DA Test"].Throughput,
      REF: httpMS_Stationary_Data.Poor["Multi Stream HTTP Upload for 30 seconds"]["ref_5g auto_Multi Stream HTTP Upload for 30 seconds_poor Coverage_DA Test"].Throughput,
    },
  };

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
    <div>
      <h2>Data Performance Details Page</h2>
      <div className='page-content'>
      <h2>HTTP Single Stream test - 5G NR</h2>
      {/* single stream dl overall table */}
      {/* single stream ul overall table */}
      {/* single stream dl details table */}
      <DpDetailsTableLoc3 data={httpSS_Stationary_DL} tableName="Single Stream HTTP Download for 60 seconds" />
      <DpDetailsTableLoc3 data={httpSS_Stationary_UL} tableName="Single Stream HTTP Upload of a 15 MB file"  />
      </div>
      <div className='page-content'>
      <h2>HTTP Multi Stream test - 5G NR</h2>
      <DpDetailsTableLoc3 data={httpMS_Stationary_DL} tableName="Multi Stream HTTP Download for 30 seconds"  />
      <DpDetailsTableLoc3 data={httpMS_Stationary_UL} tableName="Multi Stream HTTP Upload for 30 seconds"  />
      </div>
      <div className='page-content'>
      <h2>UDP test - 5G NR</h2>
      <DpUdpTableLoc3 data={udp_Stationary_DL} tableName="UDP DL" />
      <DpUdpTableLoc3 data={udp_Stationary_UL} tableName="UDP UL" />



      </div>
      <div className='page-content'>
      <h2>PING test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Web browser test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Play-store app download test - 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Mobile hot spot test - Seattle only- 5G NR</h2>
      </div>
      <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test Drive</h2>
      </div>      
      <div className='page-content'>
      <h2>Mobility test - 5G Auto Data Test MHS Drive</h2>
      </div>
      <div className='page-content'>
      <h2>VoNR MRAB Stationary test - 5G NR</h2>
      </div>
      {/* <DpRangeChart dataPerformanceResults={dataPerformanceResults} /> */}
      <div className='page-content'>
      <h2>Test drive- 5G NSA</h2>
      </div>

    </div>
  );
}

export default DpDetailsPage;


// const dataPerformanceResults = { //DO NOT TOUCH THIS SECTOIN
//     "5G AUTO DP": {
//       "2.1.1 5G Auto Data Test Drive": {
//         "DUT UDP DL": {
//           "Throughput": {
//             "Mean": 9.781204435636633,
//             "Minimum": 5.826606741573033,
//             "Maximum": 10.000303370786517
//           }
//         },
//         "REF UDP DL": {
//           "Throughput": {
//             "Mean": 7.4,
//             "Minimum": 6.843808988764044,
//             "Maximum": 10.000685393258427
//           }
//         }
//       }
//     }
//   };