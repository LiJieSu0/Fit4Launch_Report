import React from 'react';
import DpDriveTestTable from './DpDriveTestTable';
import DpMHSTestDriveTable from '../MHS/Table/DpMHSTestDriveTable';
import DpDriveTestOverallTable from './DpDriveTestOverallTable';
import DpMHSTestDriveOverallTable from '../MHS/Table/DpMHSTestDriveOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
// import TestDriveData from '../../../DataFiles/SA/DpMobilityResults/Test Drive.json'; // Removed direct import
// import TestDriveMHSData from '../../../DataFiles/SA/DpMobilityMHSResults/MHS Test Drive.json'; // Removed direct import
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';

const DpDriveTestDetailPage = () => {
  const { reportData } = useContext(ReportContext);

  if (!reportData || !reportData.dataPerformanceDetails) {
    return <div className="page-content">Loading...</div>;
  }

  const TestDriveData = reportData.dataPerformanceDetails.SA.Mobility.TestDrive;
  const TestDriveMHSData = reportData.dataPerformanceDetails.SA.Mobility.MhsTestDrive;

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
      {/* TODO add 2.8.1 */}
      <div className='page-content'>
        <h2 style={{ textAlign: 'center' }}>2.8 Mobility Test</h2>
        <h3>2.8.1 Mobility Test - 5G Auto</h3>
        <div id='2.8.1'></div>
        <DpDriveTestOverallTable data={TestDriveData} tableName="Mobility Test Drive Overview" />
        <DpDriveTestTable data={TestDriveData} tableName="Mobility Test Drive Details" />
      </div>
      <div className='page-content'>

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
      </div>
      <div className='page-content'>

        <DpHistogramComponent
          data={driveTestErrorRatioData}
          title="Mobility Test Drive Packet Failure Rate"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpHistogramComponent
          data={driveTestPingRttData}
          title="Mobility Test Drive Ping RTT"
          yAxisLabel="RTT (ms)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
      </div>
      <div className='page-content'>
        <h3>2.8.2 Mobility Test - Mobile Hotspot</h3>
        <div id='2.8.2'></div>
        <DpMHSTestDriveOverallTable data={TestDriveMHSData} tableName="MHS Test Drive Overall Data" />
        <DpMHSTestDriveTable data={TestDriveMHSData} tableName="MHS Test Drive Data" />
      </div>
      <div className='page-content'>
        <DpHistogramComponent
          data={mhsThroughputData}
          title="MHS Test Drive - Mean Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpHistogramComponent
          data={mhsJitterData}
          title="MHS Test Drive - Mean Jitter"
          yAxisLabel="Jitter (ms)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
      </div>
      <div className='page-content'>

        <DpHistogramComponent
          data={mhsErrorRatioData}
          title="MHS Test Drive - Packet Failure Rate"
          yAxisLabel="Packet Failure Rate (%)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpHistogramComponent
          data={mhsPingRttData}
          title="MHS Test Drive - Mean Ping RTT"
          yAxisLabel="RTT (ms)"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
      </div>

    </>
  );
};

export default DpDriveTestDetailPage;
