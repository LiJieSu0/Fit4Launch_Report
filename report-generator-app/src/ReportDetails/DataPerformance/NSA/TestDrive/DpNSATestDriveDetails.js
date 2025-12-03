import React from 'react';
import DpNSATestDriveTable from './DpNSATestDriveTable';
import DpNSATestDriveOverallTable from './DpNSATestDriveOverallTable';
import DpHistogramComponent from '../../DpHistogramComponent';
import TestDriveData from '../../../../DataFiles/NSA/DpMobilityResults/Test Drive.json';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';

// Define additional colors for the histogram bars
function DpNSATestDriveDetails() {
  const processHistogramData = (data, metricKey) => {
    const aggregatedData = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const deviceData = data[key];
        const deviceType = deviceData["Device Type"]; // "DUT" or "REF"
        const name = key.replace(/ (DUT|REF)\d+_Data Test Drive/g, ''); // Extract common name like "UDP DL"

        let value;
        if (metricKey === "Ping RTT") {
          value = deviceData[metricKey] ? deviceData[metricKey].avg : 0;
        } else {
          value = deviceData[metricKey] ? deviceData[metricKey].Mean : 0;
        }

        if (!aggregatedData[name]) {
          aggregatedData[name] = { name: name };
        }
        aggregatedData[name][`${metricKey} ${deviceType}`] = parseFloat(value.toFixed(2));
      }
    }
    return Object.values(aggregatedData);
  };

  const throughputData = processHistogramData(TestDriveData, "Throughput");
  const jitterData = processHistogramData(TestDriveData, "Jitter");
  const errorRatioData = processHistogramData(TestDriveData, "Error Ratio");
  const pingRttData = processHistogramData(TestDriveData, "Ping RTT");

  const barKeysThroughput = [
    { key: "Throughput DUT", fill: CHART_COLOR_DUT },
    { key: "Throughput REF", fill: CHART_COLOR_REF }
  ];
  const barKeysJitter = [
    { key: "Jitter DUT", fill: CHART_COLOR_DUT },
    { key: "Jitter REF", fill: CHART_COLOR_REF }
  ];
  const barKeysErrorRatio = [
    { key: "Error Ratio DUT", fill: CHART_COLOR_DUT },
    { key: "Error Ratio REF", fill: CHART_COLOR_REF }
  ];
  const barKeysPingRtt = [
    { key: "Ping RTT DUT", fill: CHART_COLOR_DUT },
    { key: "Ping RTT REF", fill: CHART_COLOR_REF }
  ];

  return (
    <>
    <div className='page-content'>
      <h2>NSA Test Drive Data Performance Details</h2>
      <DpNSATestDriveOverallTable data={TestDriveData} tableName="Test Drive Overall Data" />
      <DpNSATestDriveTable data={TestDriveData} tableName="Test Drive" />
      </div>

    <div className='page-content'>

      <DpHistogramComponent
        data={throughputData}
        title="Mean Throughput (Mbps)"
        yAxisLabel="Mbps"
        barKeys={barKeysThroughput}
      />
      <DpHistogramComponent
        data={jitterData}
        title="Jitter (s)"
        yAxisLabel="s"
        barKeys={barKeysJitter}
      />
      </div>

    <div className='page-content'>

      <DpHistogramComponent
        data={errorRatioData}
        title="Error Ratio (%)"
        yAxisLabel="%"
        barKeys={barKeysErrorRatio}
      />
      <DpHistogramComponent
        data={pingRttData}
        title="Ping RTT (ms)"
        yAxisLabel="ms"
        barKeys={barKeysPingRtt}
      />
      </div>
    </>
    
  );
}

export default DpNSATestDriveDetails;