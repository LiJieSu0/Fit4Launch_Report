const processPingData = (pingRawData) => {
  const moderateDUT = pingRawData?.Moderate?.DUT?.["Ping RTT"] || {};
  const moderateREF = pingRawData?.Moderate?.REF?.["Ping RTT"] || {};
  const poorDUT = pingRawData?.Poor?.DUT?.["Ping RTT"] || {};
  const poorREF = pingRawData?.Poor?.REF?.["Ping RTT"] || {};

  const calculateOverall = (valModerate, valPoor) => {
    const vals = [valModerate, valPoor].filter(v => v !== undefined && v !== null && typeof v === 'number');
    if (vals.length === 0) return "N/A";
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
  };

  return {
    average: {
      DUT: {
        Overall: calculateOverall(moderateDUT.Mean, poorDUT.Mean),
        Moderate: moderateDUT.Mean !== undefined ? moderateDUT.Mean.toFixed(2) : "N/A",
        Poor: poorDUT.Mean !== undefined ? poorDUT.Mean.toFixed(2) : "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.Mean, poorREF.Mean),
        Moderate: moderateREF.Mean !== undefined ? moderateREF.Mean.toFixed(2) : "N/A",
        Poor: poorREF.Mean !== undefined ? poorREF.Mean.toFixed(2) : "N/A",
      },
    },
    std_dev: {
      DUT: {
        Overall: calculateOverall(moderateDUT["Standard Deviation"], poorDUT["Standard Deviation"]),
        Moderate: moderateDUT["Standard Deviation"] !== undefined ? moderateDUT["Standard Deviation"].toFixed(2) : "N/A",
        Poor: poorDUT["Standard Deviation"] !== undefined ? poorDUT["Standard Deviation"].toFixed(2) : "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF["Standard Deviation"], poorREF["Standard Deviation"]),
        Moderate: moderateREF["Standard Deviation"] !== undefined ? moderateREF["Standard Deviation"].toFixed(2) : "N/A",
        Poor: poorREF["Standard Deviation"] !== undefined ? poorREF["Standard Deviation"].toFixed(2) : "N/A",
      },
    },
    max: {
      DUT: {
        Overall: calculateOverall(moderateDUT.Maximum, poorDUT.Maximum),
        Moderate: moderateDUT.Maximum !== undefined ? moderateDUT.Maximum.toFixed(2) : "N/A",
        Poor: poorDUT.Maximum !== undefined ? poorDUT.Maximum.toFixed(2) : "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.Maximum, poorREF.Maximum),
        Moderate: moderateREF.Maximum !== undefined ? moderateREF.Maximum.toFixed(2) : "N/A",
        Poor: poorREF.Maximum !== undefined ? poorREF.Maximum.toFixed(2) : "N/A",
      },
    },
    min: {
      DUT: {
        Overall: calculateOverall(moderateDUT.Minimum, poorDUT.Minimum),
        Moderate: moderateDUT.Minimum !== undefined ? moderateDUT.Minimum.toFixed(2) : "N/A",
        Poor: poorDUT.Minimum !== undefined ? poorDUT.Minimum.toFixed(2) : "N/A",
      },
      REF: {
        Overall: calculateOverall(moderateREF.Minimum, poorREF.Minimum),
        Moderate: moderateREF.Minimum !== undefined ? moderateREF.Minimum.toFixed(2) : "N/A",
        Poor: poorREF.Minimum !== undefined ? poorREF.Minimum.toFixed(2) : "N/A",
      },
    },
  };
};

export default processPingData;