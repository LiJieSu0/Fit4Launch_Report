import React from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";

function Dp_MHS_Udp_Component() {
  // Placeholder for data fetching or state management
  const data = [
    { metric: "Throughput", idealThroughput: "High", deviceName: "DUT", location: { good: 0, moderate: 0, poor: 0 } },
    { metric: "Throughput", idealThroughput: "High", deviceName: "REF", location: { good: 0, moderate: 0, poor: 0 } },
    { metric: "Throughput", idealThroughput: "Medium", deviceName: "DUT", location: { good: 0, moderate: 0, poor: 0 } },
    { metric: "Throughput", idealThroughput: "Medium", deviceName: "REF", location: { good: 0, moderate: 0, poor: 0 } },
    { metric: "Throughput", idealThroughput: "Low", deviceName: "DUT", location: { good: 0, moderate: 0, poor: 0 } },
    { metric: "Throughput", idealThroughput: "Low", deviceName: "REF", location: { good: 0, moderate: 0, poor: 0 } },
  ];

  return (
    <div className='page-content'>
      <h2>MHS-UDP Component</h2>
      <DpMHSUdpTable data={data} tableName="MHS UDP Throughput" />
    </div>
  );
}

export default Dp_MHS_Udp_Component;