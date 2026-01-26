import { ReportContext } from '../Contexts/ReportContext';
import { useContext } from 'react';

const BASE_DATA_PATH = '/AnalyzeResults/';

const safeFetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`File not found or error loading: ${url}`);
      return {};
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching ${url}:`, error);
    return {};
  }
};

export const loadAllData = async (city) => {
  const cityDataPath = `${BASE_DATA_PATH}${city}/`;
  try {
    const [
      callPerformance,
      coveragePerformance,
      dataPerformance,
      voiceQuality,
      wfcPerformance,
    ] = await Promise.all([
      safeFetchJson(`${cityDataPath}call_performance_results.json`),
      safeFetchJson(`${cityDataPath}coverage_performance_results.json`),
      safeFetchJson(`${cityDataPath}data_performance_results.json`),
      safeFetchJson(`${cityDataPath}voice_quality_results.json`),
      safeFetchJson(`${cityDataPath}wfc_performance_results.json`),
    ]);

    return {
      callPerformance,
      coveragePerformance,
      dataPerformance,
      voiceQuality,
      wfcPerformance,
    };
  } catch (error) {
    console.error(`Failed to load all report data for ${city}:`, error);
    throw new Error(`Failed to load all report data for ${city}.`);
  }
};

export const getAvailableCities = async () => {
  return ['Seattle', 'New York']; // To add data folders, need to hard coded the data path through here. 
};
