import React from 'react';
import DpNSATestDriveTable from './DpNSATestDriveTable';
import DpNSATestDriveOverallTable from './DpNSATestDriveOverallTable';
import DpHistogramComponent from '../../DpHistogramComponent';
import { ReportContext } from '../../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';
import DynamicHeader from '../../../../CommonPage/DynamicHeader';

import { useEffect } from 'react';

// Define additional colors for the histogram bars
function DpNSATestDriveDetails({ city: propCity }) {
  const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData) {
    return <div className="page-content">Loading {city} NSA Test Drive data...</div>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  // Try both possible data structures: direct access and nested under "Data Performance"
  const nsaData = reportData.dataPerformance?.['5G NSA DP'] || reportData.dataPerformance?.['Data Performance']?.['5G NSA DP'];
  const mobilityData = nsaData?.['Mobility Test'];

  if (!mobilityData) {
    return null; // Hide if no data available
  }

  const dutDriveTest = mobilityData['DUT'];
  const refDriveTest = mobilityData['REF'];

  // Helper to get DL value for throughput, jitter, and error ratio
  const getDlValue = (device, metricPrefix) => {
    return device?.[`DL ${metricPrefix}`]?.Mean || 0;
  };

  const getHistogramData = (metricType) => {
    let dutVal, refVal;

    if (metricType === "Ping RTT") {
      dutVal = dutDriveTest?.['Ping RTT']?.['Mean'] || dutDriveTest?.['Ping RTT']?.['avg'] || 0;
      refVal = refDriveTest?.['Ping RTT']?.['Mean'] || refDriveTest?.['Ping RTT']?.['avg'] || 0;
    } else {
      // For Throughput, Jitter, and Error Ratio, use DL value
      dutVal = getDlValue(dutDriveTest, metricType);
      refVal = getDlValue(refDriveTest, metricType);
    }

    return [{
      name: "Mobility Test",
      [`${metricType} DUT`]: parseFloat(dutVal.toFixed(2)),
      [`${metricType} REF`]: parseFloat(refVal.toFixed(2)),
    }];
  };

  const throughputData = getHistogramData("Throughput");
  const jitterData = getHistogramData("Jitter");
  const errorRatioData = getHistogramData("Error Ratio");
  const pingRttData = getHistogramData("Ping RTT");

  const formattedTestDriveData = {
    DUT: dutDriveTest,
    REF: refDriveTest,
  };

  const barKeysThroughput = [{ key: "Throughput DUT", fill: CHART_COLOR_DUT }, { key: "Throughput REF", fill: CHART_COLOR_REF }];
  const barKeysJitter = [{ key: "Jitter DUT", fill: CHART_COLOR_DUT }, { key: "Jitter REF", fill: CHART_COLOR_REF }];
  const barKeysErrorRatio = [{ key: "Error Ratio DUT", fill: CHART_COLOR_DUT }, { key: "Error Ratio REF", fill: CHART_COLOR_REF }];
  const barKeysPingRtt = [{ key: "Ping RTT DUT", fill: CHART_COLOR_DUT }, { key: "Ping RTT REF", fill: CHART_COLOR_REF }];

  return (
    <>
      <div className='page-content'>
        <DynamicHeader level={2}>Mobility Test - 5G NSA - {city}</DynamicHeader>
        <DpNSATestDriveOverallTable data={formattedTestDriveData} tableName="Drive Test Overview" />
        <DpNSATestDriveTable data={formattedTestDriveData} tableName="Drive Test Details" />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={throughputData}
          title="Drive Test DL Throughput"
          yAxisLabel="Mbps"
          barKeys={barKeysThroughput}
        />
        <DpHistogramComponent
          data={jitterData}
          title="Drive Test DL Jitter"
          yAxisLabel="s"
          barKeys={barKeysJitter}
        />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={errorRatioData}
          title="DL Packet Failure Rate"
          yAxisLabel="%"
          barKeys={barKeysErrorRatio}
        />
        <DpHistogramComponent
          data={pingRttData}
          title="Ping RTT"
          yAxisLabel="ms"
          barKeys={barKeysPingRtt}
        />
      </div>
    </>
  );
}

export default DpNSATestDriveDetails;