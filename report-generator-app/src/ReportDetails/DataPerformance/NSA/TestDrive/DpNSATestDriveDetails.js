import React from 'react';
import DpNSATestDriveTable from './DpNSATestDriveTable';
import DpNSATestDriveOverallTable from './DpNSATestDriveOverallTable';
import DpHistogramComponent from '../../DpHistogramComponent';
// import TestDriveData from '../../../../DataFiles/NSA/DpMobilityResults/Test Drive.json'; // Removed direct import
import { ReportContext } from '../../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';
import DynamicHeader from '../../../../CommonPage/DynamicHeader';

// Define additional colors for the histogram bars
function DpNSATestDriveDetails() {
  const { reportData } = useContext(ReportContext);

  if (!reportData || !reportData.dataPerformance) {
    return <div className="page-content">Loading...</div>;
  }

  const mobilityData = reportData.dataPerformance['Data Performance']?.['5G NSA DP']?.['Mobility Test'];

  if (!mobilityData) {
    return <div className="page-content">No NSA Test Drive Data available</div>;
  }

  const dutDriveTest = mobilityData['DUT'];
  const refDriveTest = mobilityData['REF'];

  const getHistogramData = (metricKey) => {
    let dutVal, refVal;
    if (metricKey === "Ping RTT") {
      dutVal = dutDriveTest?.[metricKey]?.avg || 0;
      refVal = refDriveTest?.[metricKey]?.avg || 0;
    } else {
      dutVal = dutDriveTest?.[metricKey]?.Mean || 0;
      refVal = refDriveTest?.[metricKey]?.Mean || 0;
    }
    return [{
      name: "Mobility Test",
      [`${metricKey} DUT`]: parseFloat(dutVal.toFixed(2)),
      [`${metricKey} REF`]: parseFloat(refVal.toFixed(2)),
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
        <DynamicHeader level={2}>Mobility Test - 5G NSA</DynamicHeader>
        <DpNSATestDriveOverallTable data={formattedTestDriveData} tableName="Drive Test Overview" />
        <DpNSATestDriveTable data={formattedTestDriveData} tableName="Drive Test Details" />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={throughputData}
          title="Drive Test Throughput"
          yAxisLabel="Mbps"
          barKeys={barKeysThroughput}
        />
        <DpHistogramComponent
          data={jitterData}
          title="Drive Test Jitter"
          yAxisLabel="s"
          barKeys={barKeysJitter}
        />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={errorRatioData}
          title="Packet Failure Rate"
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