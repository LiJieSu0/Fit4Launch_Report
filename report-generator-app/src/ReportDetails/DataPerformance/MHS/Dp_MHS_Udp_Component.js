import React, { useState, useEffect } from "react";
import DpMHSUdpTable from "./Table/DpMHSUdpTable";
import udpDataRaw from '../../../DataFiles/SA/DpMHSResults/UDP.json'; // Direct import of JSON

function Dp_MHS_Udp_Component() {
  const [udpData, setUdpData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setUdpData(udpDataRaw);
    } catch (e) {
      setError(e);
    }
  }, []);

  const ulIdealThroughput = [10000, 20000];
  const dlIdealThroughput = [200000, 400000];

  const ulData = [];
  const dlData = [];

  if (error) {
    return <div className='page-content'>Error: {error.message}</div>;
  }

  if (!udpData) {
    return <div className='page-content'>Loading MHS-UDP data...</div>;
  }

  // Process udpData to populate ulData and dlData
  const location1Data = udpData.Location1;

  if (location1Data) {
    // Process UL data
    const ul10Mbps = location1Data["UDP Upload Task at 10 Mbps for 10 seconds"];
    const ul20Mbps = location1Data["UDP Upload Task at 20 Mbps for 10 seconds"];

    if (ul10Mbps) {
      Object.keys(ul10Mbps).forEach(key => {
        const deviceData = ul10Mbps[key];
        if (deviceData["Analysis Direction"] === "UL") {
          ulData.push({
            Category: "Average",
            IdealThroughput: 10000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Mean.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          ulData.push({
            Category: "Standard Deviation",
            IdealThroughput: 10000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput["Standard Deviation"].toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          ulData.push({
            Category: "Maximum",
            IdealThroughput: 10000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Maximum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          ulData.push({
            Category: "Minimum",
            IdealThroughput: 10000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Minimum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
        }
      });
    }

    if (ul20Mbps) {
      Object.keys(ul20Mbps).forEach(key => {
        const deviceData = ul20Mbps[key];
        if (deviceData["Analysis Direction"] === "UL") {
          ulData.push({
            Category: "Average",
            IdealThroughput: 20000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Mean.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          ulData.push({
            Category: "Standard Deviation",
            IdealThroughput: 20000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput["Standard Deviation"].toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          ulData.push({
            Category: "Maximum",
            IdealThroughput: 20000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Maximum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          ulData.push({
            Category: "Minimum",
            IdealThroughput: 20000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Minimum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
        }
      });
    }

    // Process DL data
    const dl200Mbps = location1Data["UDP Download Task at 200 Mbps for 10 seconds"];
    const dl400Mbps = location1Data["UDP Download Task at 400 Mbps for 10 seconds"];

    if (dl200Mbps) {
      Object.keys(dl200Mbps).forEach(key => {
        const deviceData = dl200Mbps[key];
        if (deviceData["Analysis Direction"] === "DL") {
          dlData.push({
            Category: "Average",
            IdealThroughput: 200000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Mean.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          dlData.push({
            Category: "Standard Deviation",
            IdealThroughput: 200000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput["Standard Deviation"].toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          dlData.push({
            Category: "Maximum",
            IdealThroughput: 200000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Maximum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          dlData.push({
            Category: "Minimum",
            IdealThroughput: 200000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Minimum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
        }
      });
    }

    if (dl400Mbps) {
      Object.keys(dl400Mbps).forEach(key => {
        const deviceData = dl400Mbps[key];
        if (deviceData["Analysis Direction"] === "DL") {
          dlData.push({
            Category: "Average",
            IdealThroughput: 400000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Mean.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          dlData.push({
            Category: "Standard Deviation",
            IdealThroughput: 400000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput["Standard Deviation"].toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          dlData.push({
            Category: "Maximum",
            IdealThroughput: 400000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Maximum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
          dlData.push({
            Category: "Minimum",
            IdealThroughput: 400000,
            DeviceName: deviceData["Device Type"],
            Overall: deviceData.Throughput.Minimum.toFixed(2),
            Site1: "N/A",
            Site2: "N/A"
          });
        }
      });
    }
  }

  return (
    <div className='page-content'>
      <h2>MHS-UDP Component</h2>
      <DpMHSUdpTable data={ulData} IdealThroughput={ulIdealThroughput} />
      <DpMHSUdpTable data={dlData} IdealThroughput={dlIdealThroughput} />
    </div>
  );
}

export default Dp_MHS_Udp_Component;