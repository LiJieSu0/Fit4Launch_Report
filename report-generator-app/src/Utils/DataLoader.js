const DATA_PATH = '/AnalyzeResults/';

export const loadAllData = async (market) => {
  try {
    const [
      callPerformanceRes,
      coveragePerformanceRes,
      dataPerformanceRes,
      voiceQualityRes,
    ] = await Promise.all([
      fetch(`${DATA_PATH}${market}/call_performance_results.json`),
      fetch(`${DATA_PATH}${market}/coverage_performance_results.json`),
      fetch(`${DATA_PATH}${market}/data_performance_results.json`),
      fetch(`${DATA_PATH}${market}/voice_quality_results.json`),
    ]);

    const callPerformance = await callPerformanceRes.json();
    const coveragePerformance = await coveragePerformanceRes.json();
    const dataPerformance = await dataPerformanceRes.json();
    const voiceQuality = await voiceQualityRes.json();

    return {
      callPerformance,
      coveragePerformance,
      dataPerformance,
      voiceQuality,
    };
  } catch (error) {
    console.error(`Failed to load ${market} market data:`, error);
    throw new Error(`Failed to load ${market} market data.`);
  }
};