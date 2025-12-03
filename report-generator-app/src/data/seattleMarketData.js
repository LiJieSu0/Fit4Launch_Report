import { useState, useEffect } from 'react';

const SEATTLE_DATA_PATH = '/AnalyzeResults/Seattle/';

const useSeattleMarketData = () => {
  const [seattleData, setSeattleData] = useState({
    callPerformance: null,
    coveragePerformance: null,
    dataPerformance: null,
    voiceQuality: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          callPerformanceRes,
          coveragePerformanceRes,
          dataPerformanceRes,
          voiceQualityRes,
        ] = await Promise.all([
          fetch(`${SEATTLE_DATA_PATH}call_performance_results.json`),
          fetch(`${SEATTLE_DATA_PATH}coverage_performance_results.json`),
          fetch(`${SEATTLE_DATA_PATH}data_performance_results.json`),
          fetch(`${SEATTLE_DATA_PATH}voice_quality_results.json`),
        ]);

        const callPerformance = await callPerformanceRes.json();
        const coveragePerformance = await coveragePerformanceRes.json();
        const dataPerformance = await dataPerformanceRes.json();
        const voiceQuality = await voiceQualityRes.json();

        setSeattleData({
          callPerformance,
          coveragePerformance,
          dataPerformance,
          voiceQuality,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to load Seattle market data:", error);
        setSeattleData((prevData) => ({
          ...prevData,
          loading: false,
          error: "Failed to load Seattle market data.",
        }));
      }
    };

    fetchData();
  }, []);

  return seattleData;
};

export default useSeattleMarketData;