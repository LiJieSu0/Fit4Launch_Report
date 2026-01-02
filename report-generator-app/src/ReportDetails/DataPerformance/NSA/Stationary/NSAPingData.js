const processPingData = (pingRawData) => {
  const moderateDUT = pingRawData?.Moderate?.DUT?.["Ping RTT"] || {};
  const moderateREF = pingRawData?.Moderate?.REF?.["Ping RTT"] || {};
  const poorDUT = pingRawData?.Poor?.DUT?.["Ping RTT"] || {};
  const poorREF = pingRawData?.Poor?.REF?.["Ping RTT"] || {};

  const calculateOverall = (valModerate, valPoor) => {
    const vals = [valModerate, valPoor].filter(v => v !== undefined && v !== null);
    if (vals.length === 0) return "0.00";
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
  };

  return {
    average: {
      DUT: {
        Overall: calculateOverall(moderateDUT.avg, poorDUT.avg),
        Moderate: moderateDUT.avg?.toFixed(2) || "N/A",
        Poor: poorDUT.avg?.toFixed(2) || "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.avg, poorREF.avg),
        Moderate: moderateREF.avg?.toFixed(2) || "N/A",
        Poor: poorREF.avg?.toFixed(2) || "N/A",
      },
    },
    std_dev: {
      DUT: {
        Overall: calculateOverall(moderateDUT.std_dev, poorDUT.std_dev),
        Moderate: moderateDUT.std_dev?.toFixed(2) || "N/A",
        Poor: poorDUT.std_dev?.toFixed(2) || "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.std_dev, poorREF.std_dev),
        Moderate: moderateREF.std_dev?.toFixed(2) || "N/A",
        Poor: poorREF.std_dev?.toFixed(2) || "N/A",
      },
    },
    max: {
      DUT: {
        Overall: calculateOverall(moderateDUT.max, poorDUT.max),
        Moderate: moderateDUT.max?.toFixed(2) || "N/A",
        Poor: poorDUT.max?.toFixed(2) || "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.max, poorREF.max),
        Moderate: moderateREF.max?.toFixed(2) || "N/A",
        Poor: poorREF.max?.toFixed(2) || "N/A",
      },
    },
    min: {
      DUT: {
        Overall: calculateOverall(moderateDUT.min, poorDUT.min),
        Moderate: moderateDUT.min?.toFixed(2) || "N/A",
        Poor: poorDUT.min?.toFixed(2) || "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.min, poorREF.min),
        Moderate: moderateREF.min?.toFixed(2) || "N/A",
        Poor: poorREF.min?.toFixed(2) || "N/A",
      },
    },
  };
};

export default processPingData;