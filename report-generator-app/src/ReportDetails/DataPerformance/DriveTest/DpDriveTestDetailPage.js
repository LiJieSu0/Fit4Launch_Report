import React from 'react';
import DpDriveTestTable from './DpDriveTestTable';
import DpMHSTestDriveTable from '../MHS/Table/DpMHSTestDriveTable';
import DpDriveTestOverallTable from './DpDriveTestOverallTable';
import DpMHSTestDriveOverallTable from '../MHS/Table/DpMHSTestDriveOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import TestDriveData from '../../../DataFiles/SA/DpMobilityResults/Test Drive.json';
import TestDriveMHSData from '../../../DataFiles/SA/DpMobilityMHSResults/MHS Test Drive.json';

const DpDriveTestDetailPage = () => {
    const getDriveTestMetricData = (metricName, dutValue, refValue) => {
        return [{ name: metricName, DUT: dutValue, REF: refValue }];
    };

    const dutDriveTest = TestDriveData["DUT UDP DL"];
    const refDriveTest = TestDriveData["REF UDP DL"];

    const driveTestThroughputData = getDriveTestMetricData("Throughput", dutDriveTest.Throughput.Mean, refDriveTest.Throughput.Mean);
    const driveTestJitterData = getDriveTestMetricData("Jitter", dutDriveTest.Jitter.Mean, refDriveTest.Jitter.Mean);
    const driveTestErrorRatioData = getDriveTestMetricData("Error Ratio", dutDriveTest['Error Ratio'].Mean, refDriveTest['Error Ratio'].Mean);
    const driveTestPingRttData = getDriveTestMetricData("Ping RTT", dutDriveTest['Ping RTT'].avg, refDriveTest['Ping RTT'].avg);

    const dutMHS = TestDriveMHSData["DUT UDP DL"];
    const refMHS = TestDriveMHSData["REF UDP DL"];

    const mhsThroughputData = getDriveTestMetricData("Throughput", dutMHS.Throughput.DL.Mean, refMHS.Throughput.DL.Mean);
    const mhsJitterData = getDriveTestMetricData("Jitter", dutMHS.Jitter["DL Mean"], refMHS.Jitter["DL Mean"]);
    const mhsErrorRatioData = getDriveTestMetricData("Error Ratio", dutMHS['Error Ratio']["DL Mean"], refMHS['Error Ratio']["DL Mean"]);
    const mhsPingRttData = getDriveTestMetricData("Ping RTT", dutMHS['Ping RTT'].avg, refMHS['Ping RTT'].avg);

    return (
    <>
      <div className='page-content'>
       <DpDriveTestOverallTable data={TestDriveData} tableName="Mobility Test Drive Overall Data" />
       <DpDriveTestTable data={TestDriveData} tableName="Mobility Test Drive Data" />
      </div>
      <div className='page-content'>

       <DpHistogramComponent
         data={driveTestThroughputData}
         title="Mobility Test Drive - Mean Throughput Histogram"
         yAxisLabel="Throughput (Mbps)"
         barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
       />
       <DpHistogramComponent
         data={driveTestJitterData}
         title="Mobility Test Drive - Mean Jitter Histogram"
         yAxisLabel="Jitter (s)"
         barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
       />
       </div>
      <div className='page-content'>

       <DpHistogramComponent
         data={driveTestErrorRatioData}
         title="Mobility Test Drive - Mean Error Ratio Histogram"
         yAxisLabel="Error Ratio (%)"
         barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
       />
       <DpHistogramComponent
         data={driveTestPingRttData}
         title="Mobility Test Drive - Avg Ping RTT Histogram"
         yAxisLabel="RTT (ms)"
         barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
       />
      </div>
      <div className='page-content'>
        <h2>Mobility test - 5G Auto Data Test MHS Drive</h2>
        <DpMHSTestDriveOverallTable data={TestDriveMHSData} tableName="MHS Test Drive Overall Data" />
        <DpMHSTestDriveTable data={TestDriveMHSData} tableName="MHS Test Drive Data" />
      </div>
      <div className='page-content'>
      <DpHistogramComponent
        data={mhsThroughputData}
        title="MHS Test Drive - Mean Throughput Histogram"
        yAxisLabel="Throughput (Mbps)"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
      <DpHistogramComponent
        data={mhsJitterData}
        title="MHS Test Drive - Mean Jitter Histogram"
        yAxisLabel="Jitter (ms)"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
      </div>
      <div className='page-content'>

      <DpHistogramComponent
        data={mhsErrorRatioData}
        title="MHS Test Drive - Mean Error Ratio Histogram"
        yAxisLabel="Error Ratio (%)"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
      <DpHistogramComponent
        data={mhsPingRttData}
        title="MHS Test Drive - Avg Ping RTT Histogram"
        yAxisLabel="RTT (ms)"
        barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
      />
      </div>

    </>
    );
};

export default DpDriveTestDetailPage;
