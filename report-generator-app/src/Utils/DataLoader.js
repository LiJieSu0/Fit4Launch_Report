import { ReportContext } from '../Contexts/ReportContext';
import { useContext } from 'react';

const BASE_DATA_PATH = '/AnalyzeResults/';

export const loadAllData = async (city) => {
  const cityDataPath = `${BASE_DATA_PATH}${city}/`;
  try {
    const [
      callPerformanceRes,
      coveragePerformanceRes,
      dataPerformanceRes,
      voiceQualityRes,
      wfcPerformanceRes,
    ] = await Promise.all([
      fetch(`${cityDataPath}call_performance_results.json`),
      fetch(`${cityDataPath}coverage_performance_results.json`),
      fetch(`${cityDataPath}data_performance_results.json`),
      fetch(`${cityDataPath}voice_quality_results.json`),
      fetch(`${cityDataPath}wfc_performance_results.json`),
    ]);

    const callPerformance = await callPerformanceRes.json();
    const coveragePerformance = await coveragePerformanceRes.json();
    const dataPerformance = await dataPerformanceRes.json();
    const voiceQuality = await voiceQualityRes.json();
    const wfcPerformance = await wfcPerformanceRes.json();

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
