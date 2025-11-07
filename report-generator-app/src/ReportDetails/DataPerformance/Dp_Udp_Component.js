import React from 'react';
import DpUdpTableLoc3 from './DpUdpTableLoc3';
import udp_Stationary_Data from '../../DataFiles/SA/DpStationaryResults/UDP.json';
import '../../StyleScript/Restricted_Report_Style.css';

function Dp_Udp_Component() {
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
      </div>
      <div className='page-content'>
        <DpUdpTableLoc3 data={udp_Stationary_UL} tableName="UDP UL" />
      </div>
    </>
  );
}

export default Dp_Udp_Component;
