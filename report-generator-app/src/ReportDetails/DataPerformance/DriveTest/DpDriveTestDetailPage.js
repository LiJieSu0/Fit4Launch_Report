import React from 'react';
import DpDriveTestTable from './DpDriveTestTable';
import DpMHSTestDriveTable from '../MHS/Table/DpMHSTestDriveTable';
import DpDriveTestOverallTable from './DpDriveTestOverallTable';
import DpMHSTestDriveOverallTable from '../MHS/Table/DpMHSTestDriveOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import DpBoxPlot from '../Statoinary/DpBoxPlot';
import PageBreak from '../../../CommonPage/PageBreak';

import { useEffect } from 'react';

const DpDriveTestDetailPage = ({ city: propCity, firstSection = false }) => {
  const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData) {
    return <PageBreak>Loading {city} data...</PageBreak>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  // Access Mobility Test data from the new JSON structure
  const mobilityTestData = reportData.dataPerformance?.['Data Performance']?.['5G AUTO DP']?.['Mobility Test'];

  if (!mobilityTestData) {
    return <PageBreak>No Mobility Test Data available</PageBreak>;
  }

  // Get the 5G Auto Data Test Drive data - handle both nested and flat structures
  const testDriveData = mobilityTestData?.['5G Auto Data Test Drive'] || mobilityTestData;
  const dutDriveTest = testDriveData?.['DUT'];
  const refDriveTest = testDriveData?.['REF'];

  const getDriveTestMetricData = (metricName, dutValue, refValue) => {
    return [{ name: metricName, DUT: dutValue || 0, REF: refValue || 0 }];
  };

  // Prepare data for tables and charts - handle the new simpler structure
  const driveTestThroughputData = getDriveTestMetricData(
    "Throughput",
    dutDriveTest?.['DL Throughput']?.Mean,
    refDriveTest?.['DL Throughput']?.Mean
  );
  const driveTestJitterData = getDriveTestMetricData(
    "Jitter",
    dutDriveTest?.['DL Jitter']?.Mean,
    refDriveTest?.['DL Jitter']?.Mean
  );
  const driveTestErrorRatioData = getDriveTestMetricData(
    "Error Ratio",
    dutDriveTest?.['DL Error Ratio']?.Mean,
    refDriveTest?.['DL Error Ratio']?.Mean
  );

  // Format the TestDriveData for the table components (matching expected structure)
  const formattedTestDriveData = {
    "DUT UDP DL": {
      Throughput: {
        Mean: dutDriveTest?.['DL Throughput']?.Mean || 0,
        Minimum: dutDriveTest?.['DL Throughput']?.Minimum || 0,
        Maximum: dutDriveTest?.['DL Throughput']?.Maximum || 0,
        'Standard Deviation': dutDriveTest?.['DL Throughput']?.['Standard Deviation'] || 0,
      },
      Jitter: {
        Mean: dutDriveTest?.['DL Jitter']?.Mean || 0,
      },
      'Error Ratio': {
        Mean: dutDriveTest?.['DL Error Ratio']?.Mean || 0,
      },
      'Ping RTT': {
        avg: dutDriveTest?.['Ping RTT']?.Mean || 0,
        min: dutDriveTest?.['Ping RTT']?.Min || 0,
        max: dutDriveTest?.['Ping RTT']?.Max || 0,
        std_dev: dutDriveTest?.['Ping RTT']?.['Std Dev'] || 0,
      },
    },
    "REF UDP DL": {
      Throughput: {
        Mean: refDriveTest?.['DL Throughput']?.Mean || 0,
        Minimum: refDriveTest?.['DL Throughput']?.Minimum || 0,
        Maximum: refDriveTest?.['DL Throughput']?.Maximum || 0,
        'Standard Deviation': refDriveTest?.['DL Throughput']?.['Standard Deviation'] || 0,
      },
      Jitter: {
        Mean: refDriveTest?.['DL Jitter']?.Mean || 0,
      },
      'Error Ratio': {
        Mean: refDriveTest?.['DL Error Ratio']?.Mean || 0,
      },
      'Ping RTT': {
        avg: refDriveTest?.['Ping RTT']?.Mean || 0,
        min: refDriveTest?.['Ping RTT']?.Min || 0,
        max: refDriveTest?.['Ping RTT']?.Max || 0,
        std_dev: refDriveTest?.['Ping RTT']?.['Std Dev'] || 0,
      },
    },
  };

  // Check if MHS Test Drive data exists - check for multiple possible keys
  const mhsTestDriveData = mobilityTestData?.['5G Auto Data Test MHS Drive'] || mobilityTestData?.['Mobility Test'];
  const dutMHS = mhsTestDriveData?.['DUT'];
  const refMHS = mhsTestDriveData?.['REF'];
  const hasMhsData = dutMHS && refMHS;

  // Format MHS data for table components (matching expected structure)
  const formattedMhsTestDriveData = hasMhsData ? {
    "DUT UDP DL": {
      Throughput: {
        DL: {
          Mean: dutMHS?.['DL Throughput']?.Mean || 0,
          Minimum: dutMHS?.['DL Throughput']?.Minimum || 0,
          Maximum: dutMHS?.['DL Throughput']?.Maximum || 0,
          'Standard Deviation': dutMHS?.['DL Throughput']?.['Standard Deviation'] || 0,
        },
        UL: {
          Mean: dutMHS?.['UL Throughput']?.Mean || 0,
          Minimum: dutMHS?.['UL Throughput']?.Minimum || 0,
          Maximum: dutMHS?.['UL Throughput']?.Maximum || 0,
          'Standard Deviation': dutMHS?.['UL Throughput']?.['Standard Deviation'] || 0,
        },
      },
      Jitter: {
        'DL Mean': dutMHS?.['DL Jitter']?.Mean || 0,
        'UL Mean': dutMHS?.['UL Jitter']?.Mean || 0,
      },
      'Error Ratio': {
        'DL Mean': dutMHS?.['DL Error Ratio']?.Mean || 0,
        'UL Mean': dutMHS?.['UL Error Ratio']?.Mean || 0,
      },
      'Ping RTT': {
        avg: dutMHS?.['Ping RTT']?.Mean || 0,
        min: dutMHS?.['Ping RTT']?.Min || 0,
        max: dutMHS?.['Ping RTT']?.Max || 0,
        std_dev: dutMHS?.['Ping RTT']?.['Std Dev'] || 0,
      },
    },
    "REF UDP DL": {
      Throughput: {
        DL: {
          Mean: refMHS?.['DL Throughput']?.Mean || 0,
          Minimum: refMHS?.['DL Throughput']?.Minimum || 0,
          Maximum: refMHS?.['DL Throughput']?.Maximum || 0,
          'Standard Deviation': refMHS?.['DL Throughput']?.['Standard Deviation'] || 0,
        },
        UL: {
          Mean: refMHS?.['UL Throughput']?.Mean || 0,
          Minimum: refMHS?.['UL Throughput']?.Minimum || 0,
          Maximum: refMHS?.['UL Throughput']?.Maximum || 0,
          'Standard Deviation': refMHS?.['UL Throughput']?.['Standard Deviation'] || 0,
        },
      },
      Jitter: {
        'DL Mean': refMHS?.['DL Jitter']?.Mean || 0,
        'UL Mean': refMHS?.['UL Jitter']?.Mean || 0,
      },
      'Error Ratio': {
        'DL Mean': refMHS?.['DL Error Ratio']?.Mean || 0,
        'UL Mean': refMHS?.['UL Error Ratio']?.Mean || 0,
      },
      'Ping RTT': {
        avg: refMHS?.['Ping RTT']?.Mean || 0,
        min: refMHS?.['Ping RTT']?.Min || 0,
        max: refMHS?.['Ping RTT']?.Max || 0,
        std_dev: refMHS?.['Ping RTT']?.['Std Dev'] || 0,
      },
    },
  } : null;

  // MHS histogram data
  const mhsDLThroughputData = hasMhsData ? getDriveTestMetricData(
    "DL Throughput",
    dutMHS?.['DL Throughput']?.Mean,
    refMHS?.['DL Throughput']?.Mean
  ) : [];
  const mhsDLJitterData = hasMhsData ? getDriveTestMetricData(
    "DL Jitter",
    dutMHS?.['DL Jitter']?.Mean,
    refMHS?.['DL Jitter']?.Mean
  ) : [];
  const mhsDLErrorRatioData = hasMhsData ? getDriveTestMetricData(
    "DL Error Ratio",
    dutMHS?.['DL Error Ratio']?.Mean,
    refMHS?.['DL Error Ratio']?.Mean
  ) : [];
  const mhsPingRttData = hasMhsData ? getDriveTestMetricData(
    "Ping RTT",
    dutMHS?.['Ping RTT']?.Mean,
    refMHS?.['Ping RTT']?.Mean
  ) : [];

  // Helper to build BoxPlot data from a stats object (no category, just DUT/REF)
  const buildBoxEntry = (label, stats) => {
    if (!stats || !stats.Mean) return null;
    let { Minimum: min, Maximum: max, Q1: q1, Median: median, Q3: q3, Outliers: outliers = [], Mean: mean, 'Standard Deviation': stdDev } = stats;
    if (q1 === undefined) {
      median = mean;
      q1 = Math.max(min, mean - 0.675 * stdDev);
      q3 = Math.min(max, mean + 0.675 * stdDev);
    }
    return { x: label, min, q1, median, q3, max, outliers };
  };

  const driveTestDLBoxPlotData = [
    buildBoxEntry('DUT', dutDriveTest?.['DL Throughput']),
    buildBoxEntry('REF', refDriveTest?.['DL Throughput']),
  ].filter(Boolean);

  const mhsDriveTestDLBoxPlotData = hasMhsData ? [
    buildBoxEntry('DUT DL', dutMHS?.['DL Throughput']),
    buildBoxEntry('REF DL', refMHS?.['DL Throughput']),
    buildBoxEntry('DUT UL', dutMHS?.['UL Throughput']),
    buildBoxEntry('REF UL', refMHS?.['UL Throughput']),
  ].filter(Boolean) : [];

  return (
    <>
      <PageBreak>
        {firstSection && <DynamicHeader level={2}>Mobility Test - 5G Auto</DynamicHeader>}
        <DynamicHeader level={3}>Mobility Test - 5G Auto - {city}</DynamicHeader>
        <DpDriveTestOverallTable data={formattedTestDriveData} tableName={`Mobility Test Drive Overview - ${city}`} />
        <DpDriveTestTable data={formattedTestDriveData} tableName={`Mobility Test Drive Details - ${city}`} />
      </PageBreak>
      <PageBreak>
        <DpHistogramComponent
          data={driveTestThroughputData}
          title="Mobility Test Drive Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpHistogramComponent
          data={driveTestJitterData}
          title="Mobility Test Drive Jitter"
          yAxisLabel="Jitter (s)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
      </PageBreak>
      <PageBreak>
        <DpHistogramComponent
          data={driveTestErrorRatioData}
          title="Mobility Test Drive Packet Failure Rate"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
      </PageBreak>

      <PageBreak>
        <DpBoxPlot
          data={driveTestDLBoxPlotData}
          title="Mobility Test Drive DL Throughput Box Plot"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      {hasMhsData ? (
        <>
          <PageBreak>
            <DynamicHeader level={3}>Mobility Test - Mobile Hotspot - {city}</DynamicHeader>
            <DpMHSTestDriveOverallTable data={formattedMhsTestDriveData} tableName={`Mobility Test Drive Overview - ${city}`} />
            <DpMHSTestDriveTable data={formattedMhsTestDriveData} tableName="MHS Test Drive Data" />
          </PageBreak>
          <PageBreak>
            <DpHistogramComponent
              data={mhsDLThroughputData}
              title="MHS Test Drive - DL Throughput"
              yAxisLabel="Throughput (Mbps)"
              barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
            />
            <DpHistogramComponent
              data={mhsDLJitterData}
              title="MHS Test Drive - DL Jitter"
              yAxisLabel="Jitter (ms)"
              barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
            />
          </PageBreak>
          <PageBreak>
            <DpHistogramComponent
              data={mhsDLErrorRatioData}
              title="MHS Test Drive - DL Packet Failure Rate"
              yAxisLabel="Packet Failure Rate (%)"
              barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
            />
            <DpHistogramComponent
              data={mhsPingRttData}
              title="MHS Test Drive - Mean Ping RTT"
              yAxisLabel="RTT (ms)"
              barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
            />
          </PageBreak>
          <PageBreak>
            <DpBoxPlot
              data={mhsDriveTestDLBoxPlotData}
              title="MHS Mobility Test Drive Throughput Box Plot"
              yAxisLabel="Throughput (Mbps)"
            />
          </PageBreak>
        </>
      ) : (
        <div></div>
        // <PageBreak>
        //   <DynamicHeader level={3}>Mobility Test - Mobile Hotspot</DynamicHeader>
        //   <p>No MHS Test Drive Data available</p>
        // </PageBreak>
      )}
    </>
  );
};

export default DpDriveTestDetailPage;

