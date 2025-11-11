import React from "react";
import DpMHSPingTable from "./Table/DpMHSPingTable";
import PingData from "../../../DataFiles/SA/DpMHSResults/Ping.json";

function Dp_MHS_Ping_Component() {
  const goodPingData = PingData.Good["25x64 bytes PING (ICMP)"];
  const moderatePingData = PingData.Moderate["25x64 bytes PING (ICMP)"];

  const getPingValue = (locationData, deviceType, metric) => {
    const key = Object.keys(locationData).find(k => locationData[k]["Device Type"] === deviceType);
    return key ? locationData[key]["Ping RTT"][metric] : 0;
  };

  const calculateOverall = (goodValue, moderateValue) => {
    if (goodValue === 0 && moderateValue === 0) return 0;
    if (goodValue === 0) return moderateValue;
    if (moderateValue === 0) return goodValue;
    return ((goodValue + moderateValue) / 2).toFixed(2);
  };

  const data = {
    average: {
      DUT: {
        Good: getPingValue(goodPingData, "DUT", "avg"),
        Moderate: getPingValue(moderatePingData, "DUT", "avg"),
        Overall: calculateOverall(getPingValue(goodPingData, "DUT", "avg"), getPingValue(moderatePingData, "DUT", "avg")),
      },
      REF: {
        Good: getPingValue(goodPingData, "REF", "avg"),
        Moderate: getPingValue(moderatePingData, "REF", "avg"),
        Overall: calculateOverall(getPingValue(goodPingData, "REF", "avg"), getPingValue(moderatePingData, "REF", "avg")),
      },
    },
    std_dev: {
      DUT: {
        Good: getPingValue(goodPingData, "DUT", "std_dev"),
        Moderate: getPingValue(moderatePingData, "DUT", "std_dev"),
        Overall: calculateOverall(getPingValue(goodPingData, "DUT", "std_dev"), getPingValue(moderatePingData, "DUT", "std_dev")),
      },
      REF: {
        Good: getPingValue(goodPingData, "REF", "std_dev"),
        Moderate: getPingValue(moderatePingData, "REF", "std_dev"),
        Overall: calculateOverall(getPingValue(goodPingData, "REF", "std_dev"), getPingValue(moderatePingData, "REF", "std_dev")),
      },
    },
    max: {
      DUT: {
        Good: getPingValue(goodPingData, "DUT", "max"),
        Moderate: getPingValue(moderatePingData, "DUT", "max"),
        Overall: calculateOverall(getPingValue(goodPingData, "DUT", "max"), getPingValue(moderatePingData, "DUT", "max")),
      },
      REF: {
        Good: getPingValue(goodPingData, "REF", "max"),
        Moderate: getPingValue(moderatePingData, "REF", "max"),
        Overall: calculateOverall(getPingValue(goodPingData, "REF", "max"), getPingValue(moderatePingData, "REF", "max")),
      },
    },
    min: {
      DUT: {
        Good: getPingValue(goodPingData, "DUT", "min"),
        Moderate: getPingValue(moderatePingData, "DUT", "min"),
        Overall: calculateOverall(getPingValue(goodPingData, "DUT", "min"), getPingValue(moderatePingData, "DUT", "min")),
      },
      REF: {
        Good: getPingValue(goodPingData, "REF", "min"),
        Moderate: getPingValue(moderatePingData, "REF", "min"),
        Overall: calculateOverall(getPingValue(goodPingData, "REF", "min"), getPingValue(moderatePingData, "REF", "min")),
      },
    },
  };

  return (
    <div className='page-content'>
      <h2>MHS-Ping Component</h2>
      <DpMHSPingTable data={data} />
    </div>
  );
}

export default Dp_MHS_Ping_Component;