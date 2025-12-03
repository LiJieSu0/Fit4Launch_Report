import { useState, useEffect } from 'react';

const DATA_PATH = '/AnalyzeResults/'; // Changed from SEATTLE_DATA_PATH

const useDataLoader = (market) => { // Changed from useSeattleMarketData, added market parameter
  const [marketData, setMarketData] = useState({ // Changed from seattleData
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
          fetch(`${DATA_PATH}${market}/call_performance_results.json`), // Added market parameter
          fetch(`${DATA_PATH}${market}/coverage_performance_results.json`), // Added market parameter
          fetch(`${DATA_PATH}${market}/data_performance_results.json`), // Added market parameter
          fetch(`${DATA_PATH}${market}/voice_quality_results.json`), // Added market parameter
        ]);

        const callPerformance = await callPerformanceRes.json();
        const coveragePerformance = await coveragePerformanceRes.json();
        const dataPerformance = await dataPerformanceRes.json();
        const voiceQuality = await voiceQualityRes.json();

        setMarketData({ // Changed from setSeattleData
          callPerformance,
          coveragePerformance,
          dataPerformance,
          voiceQuality,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error(`Failed to load ${market} market data:`, error); // Added market parameter
        setMarketData((prevData) => ({ // Changed from setSeattleData
          ...prevData,
          loading: false,
          error: `Failed to load ${market} market data.`, // Added market parameter
        }));
      }
    };

    if (market) { // Only fetch if market is provided
      fetchData();
    }
  }, [market]); // Added market to dependency array

  return marketData; // Changed from seattleData
};

export default useDataLoader; // Changed from useSeattleMarketData