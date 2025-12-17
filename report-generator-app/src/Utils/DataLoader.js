import {
  // SA Stationary
  default as DpWebData
} from '../DataFiles/SA/DpWebResults/Web Browser.json';
import {
  default as DpUdpData
} from '../DataFiles/SA/DpStationaryResults/UDP.json';
import {
  default as DpPlayStoreData
} from '../DataFiles/SA/DpPlayStoreResults/Play Store.json';
import {
  default as DpPingData
} from '../DataFiles/SA/DpStationaryResults/Ping.json';
import {
  default as DpHttpSingleData
} from '../DataFiles/SA/DpStationaryResults/Single Stream HTTP.json';
import {
  default as DpHttpMultiData
} from '../DataFiles/SA/DpStationaryResults/Multi Stream HTTP.json';

// SA MHS
import {
  default as DpMhsPingData
} from '../DataFiles/SA/DpMHSResults/Ping.json';
import {
  default as DpMhsUdpData
} from '../DataFiles/SA/DpMHSResults/UDP.json';
import {
  default as DpMhsHttpSingleData
} from '../DataFiles/SA/DpMHSResults/Single Stream HTTP.json';
import {
  default as DpMhsHttpMultiData
} from '../DataFiles/SA/DpMHSResults/Multi Stream HTTP.json';

// NSA
import {
  default as DpNsaTestDriveData
} from '../DataFiles/NSA/DpMobilityResults/Test Drive.json';
import {
  default as DpNsaUdpData
} from '../DataFiles/NSA/DpStationaryResults/UDP.json';
import {
  default as DpNsaPingData
} from '../DataFiles/NSA/DpStationaryResults/Ping.json';
import {
  default as DpNsaHttpSingleData
} from '../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import {
  default as DpNsaHttpMultiData
} from '../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';

// Mobility (SA)
import {
  default as DpMobilityTestDriveData
} from '../DataFiles/SA/DpMobilityResults/Test Drive.json';
import {
  default as DpMobilityMhsTestDriveData
} from '../DataFiles/SA/DpMobilityMHSResults/MHS Test Drive.json';
import {
  default as DpMrabData
} from '../DataFiles/SA/DpMrabResults/Mrab.json';

const BASE_DATA_PATH = '/AnalyzeResults/';

export const loadAllData = async (city) => {
  const cityDataPath = `${BASE_DATA_PATH}${city}/`;
  try {
    const [
      callPerformanceRes,
      coveragePerformanceRes,
      dataPerformanceRes,
      voiceQualityRes,
    ] = await Promise.all([
      fetch(`${cityDataPath}call_performance_results.json`),
      fetch(`${cityDataPath}coverage_performance_results.json`),
      fetch(`${cityDataPath}data_performance_results.json`),
      fetch(`${cityDataPath}voice_quality_results.json`),
    ]);

    const callPerformance = await callPerformanceRes.json();
    const coveragePerformance = await coveragePerformanceRes.json();
    const dataPerformance = await dataPerformanceRes.json();
    const voiceQuality = await voiceQualityRes.json();

    // Construct the detailed data object
    const dataPerformanceDetails = {
      SA: {
        Stationary: {
          WebBrowser: DpWebData,
          UDP: DpUdpData,
          PlayStore: DpPlayStoreData,
          Ping: DpPingData,
          HttpSingle: DpHttpSingleData,
          HttpMulti: DpHttpMultiData,
        },
        MHS: {
          Ping: DpMhsPingData,
          UDP: DpMhsUdpData,
          HttpSingle: DpMhsHttpSingleData,
          HttpMulti: DpMhsHttpMultiData,
        },
        Mobility: {
          TestDrive: DpMobilityTestDriveData,
          MhsTestDrive: DpMobilityMhsTestDriveData,
        },
        Mrab: DpMrabData,
      },
      NSA: {
        Stationary: {
          UDP: DpNsaUdpData,
          Ping: DpNsaPingData,
          HttpSingle: DpNsaHttpSingleData,
          HttpMulti: DpNsaHttpMultiData,
        },
        Mobility: {
          TestDrive: DpNsaTestDriveData,
        }
      }
    };

    return {
      callPerformance,
      coveragePerformance,
      dataPerformance,
      dataPerformanceDetails, // Add the detailed data here
      voiceQuality,
    };
  } catch (error) {
    console.error(`Failed to load all report data for ${city}:`, error);
    throw new Error(`Failed to load all report data for ${city}.`);
  }
};

export const getAvailableCities = async () => {
  return ['Seattle']; // To add data folders, need to hard coded the data path through here. 
};