const processPingData = (pingRawData) => {
  const moderateDUT = pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"][Object.keys(pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"])[0]]["Ping RTT"];
  const moderateREF = pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"][Object.keys(pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"])[1]]["Ping RTT"];
  const poorDUT = pingRawData.Poor["25x64 bytes PING (ICMP)"][Object.keys(pingRawData.Poor["25x64 bytes PING (ICMP)"])[0]]["Ping RTT"];
  const poorREF = pingRawData.Poor["25x64 bytes PING (ICMP)"][Object.keys(pingRawData.Poor["25x64 bytes PING (ICMP)"])[1]]["Ping RTT"];

  const calculateOverall = (valModerate, valPoor) => ((valModerate + valPoor) / 2).toFixed(2);

  return {
    average: {
      DUT: {
        Overall: calculateOverall(moderateDUT.avg, poorDUT.avg),
        Moderate: moderateDUT.avg.toFixed(2),
        Poor: poorDUT.avg.toFixed(2),
      },
      REF: {
        Overall: calculateOverall(moderateREF.avg, poorREF.avg),
        Moderate: moderateREF.avg.toFixed(2),
        Poor: poorREF.avg.toFixed(2),
      },
    },
    std_dev: {
      DUT: {
        Overall: calculateOverall(moderateDUT.std_dev, poorDUT.std_dev),
        Moderate: moderateDUT.std_dev.toFixed(2),
        Poor: poorDUT.std_dev.toFixed(2),
      },
      REF: {
        Overall: calculateOverall(moderateREF.std_dev, poorREF.std_dev),
        Moderate: moderateREF.std_dev.toFixed(2),
        Poor: poorREF.std_dev.toFixed(2),
      },
    },
    max: {
      DUT: {
        Overall: calculateOverall(moderateDUT.max, poorDUT.max),
        Moderate: moderateDUT.max.toFixed(2),
        Poor: poorDUT.max.toFixed(2),
      },
      REF: {
        Overall: calculateOverall(moderateREF.max, poorREF.max),
        Moderate: moderateREF.max.toFixed(2),
        Poor: poorREF.max.toFixed(2),
      },
    },
    min: {
      DUT: {
        Overall: calculateOverall(moderateDUT.min, poorDUT.min),
        Moderate: moderateDUT.min.toFixed(2),
        Poor: poorDUT.min.toFixed(2),
      },
      REF: {
        Overall: calculateOverall(moderateREF.min, poorREF.min),
        Moderate: moderateREF.min.toFixed(2),
        Poor: poorREF.min.toFixed(2),
      },
    },
  };
};

export default processPingData;