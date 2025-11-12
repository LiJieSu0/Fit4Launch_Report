const processPingData = (pingRawData) => {
  const moderateDUT = pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"][Object.keys(pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"])[0]]["Ping RTT"];
  const moderateREF = pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"][Object.keys(pingRawData.Moderate["5G NSA_25x64 bytes PING_moderate"])[1]]["Ping RTT"];
  const poorDUT = pingRawData.Poor["25x64 bytes PING (ICMP)"][Object.keys(pingRawData.Poor["25x64 bytes PING (ICMP)"])[0]]["Ping RTT"];
  const poorREF = pingRawData.Poor["25x64 bytes PING (ICMP)"][Object.keys(pingRawData.Poor["25x64 bytes PING (ICMP)"])[1]]["Ping RTT"];

  const calculateOverall = (valModerate, valPoor) => (valModerate + valPoor) / 2;

  return {
    average: {
      DUT: {
        Overall: calculateOverall(moderateDUT.avg, poorDUT.avg),
        Moderate: moderateDUT.avg,
        Poor: poorDUT.avg,
      },
      REF: {
        Overall: calculateOverall(moderateREF.avg, poorREF.avg),
        Moderate: moderateREF.avg,
        Poor: poorREF.avg,
      },
    },
    std_dev: {
      DUT: {
        Overall: calculateOverall(moderateDUT.std_dev, poorDUT.std_dev),
        Moderate: moderateDUT.std_dev,
        Poor: poorDUT.std_dev,
      },
      REF: {
        Overall: calculateOverall(moderateREF.std_dev, poorREF.std_dev),
        Moderate: moderateREF.std_dev,
        Poor: poorREF.std_dev,
      },
    },
    max: {
      DUT: {
        Overall: calculateOverall(moderateDUT.max, poorDUT.max),
        Moderate: moderateDUT.max,
        Poor: poorDUT.max,
      },
      REF: {
        Overall: calculateOverall(moderateREF.max, poorREF.max),
        Moderate: moderateREF.max,
        Poor: poorREF.max,
      },
    },
    min: {
      DUT: {
        Overall: calculateOverall(moderateDUT.min, poorDUT.min),
        Moderate: moderateDUT.min,
        Poor: poorDUT.min,
      },
      REF: {
        Overall: calculateOverall(moderateREF.min, poorREF.min),
        Moderate: moderateREF.min,
        Poor: poorREF.min,
      },
    },
  };
};

export default processPingData;