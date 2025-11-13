import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import DpThroughputOverallTable from '../../DpThroughputOverallTable';
import processPingData from './NSAPingData';
import DpHistogramComponent from '../../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';
import MultiStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Multi Stream HTTP.json';
import SingleStreamHTTPData from '../../../../DataFiles/NSA/DpStationaryResults/Single Stream HTTP.json';
import PingData from '../../../../DataFiles/NSA/DpStationaryResults/Ping.json';
import DpNSAUDPComponent from './DpNSAUDPComponent';

function DpNSAStationaryDetails() {
  const pingData = processPingData(PingData);

  const ssHttpDlHistogramData = [
    { name: 'Moderate', DUT: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput.Mean, REF: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput.Mean },
    { name: 'Poor', DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput.Mean, REF: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput.Mean },
  ];

  const ssHttpUlHistogramData = [
    { name: 'Moderate', DUT: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Mean, REF: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Mean },
    { name: 'Poor', DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Mean, REF: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Mean },
  ];

  const msHttpDlHistogramData = [
    { name: 'Moderate', DUT: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean, REF: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean },
    { name: 'Poor', DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Mean, REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Mean },
  ];

  const msHttpUlHistogramData = [
    { name: 'Moderate', DUT: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Mean, REF: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Mean },
    { name: 'Poor', DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput.Mean, REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput.Mean },
  ];

  const pingHistogramData = [
    { name: 'Moderate', DUT: pingData.average.DUT.Moderate, REF: pingData.average.REF.Moderate },
    { name: 'Poor', DUT: pingData.average.DUT.Poor, REF: pingData.average.REF.Poor },
  ];

  const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];

  const ssHttpDlOverallMean = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput.Mean + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput.Mean) / 2;
  const ssHttpDlOverallRefMean = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput.Mean + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput.Mean) / 2;
  const ssHttpUlOverallMean = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Mean + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Mean) / 2;
  const ssHttpUlOverallRefMean = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Mean + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Mean) / 2;

  const ssHttpDlOverallStdDev = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput["Standard Deviation"] + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput["Standard Deviation"]) / 2;
  const ssHttpDlOverallRefStdDev = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput["Standard Deviation"] + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput["Standard Deviation"]) / 2;
  const ssHttpUlOverallStdDev = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput["Standard Deviation"] + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput["Standard Deviation"]) / 2;
  const ssHttpUlOverallRefStdDev = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput["Standard Deviation"] + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput["Standard Deviation"]) / 2;

  const ssHttpDlOverallMax = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput.Maximum + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput.Maximum) / 2;
  const ssHttpDlOverallRefMax = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput.Maximum + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput.Maximum) / 2;
  const ssHttpUlOverallMax = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Maximum + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Maximum) / 2;
  const ssHttpUlOverallRefMax = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Maximum + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Maximum) / 2;

  const ssHttpDlOverallMin = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput.Minimum + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput.Minimum) / 2;
  const ssHttpDlOverallRefMin = (SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput.Minimum + SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput.Minimum) / 2;
  const ssHttpUlOverallMin = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Minimum + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Minimum) / 2;
  const ssHttpUlOverallRefMin = (SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput.Minimum + SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput.Minimum) / 2;


  const combinedOverallSsHttpTableData = [
    ["Average", "DUT", ssHttpDlOverallMean.toFixed(2), ssHttpUlOverallMean.toFixed(2)],
    ["Average", "REF", ssHttpDlOverallRefMean.toFixed(2), ssHttpUlOverallRefMean.toFixed(2)],
    ["Standard Deviation", "DUT", ssHttpDlOverallStdDev.toFixed(2), ssHttpUlOverallStdDev.toFixed(2)],
    ["Standard Deviation", "REF", ssHttpDlOverallRefStdDev.toFixed(2), ssHttpUlOverallRefStdDev.toFixed(2)],
    ["Maximum", "DUT", ssHttpDlOverallMax.toFixed(2), ssHttpUlOverallMax.toFixed(2)],
    ["Maximum", "REF", ssHttpDlOverallRefMax.toFixed(2), ssHttpUlOverallRefMax.toFixed(2)],
    ["Minimum", "DUT", ssHttpDlOverallMin.toFixed(2), ssHttpUlOverallMin.toFixed(2)],
    ["Minimum", "REF", ssHttpDlOverallRefMin.toFixed(2), ssHttpUlOverallRefMin.toFixed(2)],
  ];

  const msHttpDlOverallMean = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Mean) / 2;
  const msHttpDlOverallRefMean = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Mean) / 2;
  const msHttpUlOverallMean = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Mean + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput.Mean) / 2;
  const msHttpUlOverallRefMean = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Mean + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput.Mean) / 2;

  const msHttpDlOverallStdDev = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput["Standard Deviation"] + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput["Standard Deviation"]) / 2;
  const msHttpDlOverallRefStdDev = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput["Standard Deviation"] + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput["Standard Deviation"]) / 2;
  const msHttpUlOverallStdDev = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput["Standard Deviation"] + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput["Standard Deviation"]) / 2;
  const msHttpUlOverallRefStdDev = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput["Standard Deviation"] + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput["Standard Deviation"]) / 2;

  const msHttpDlOverallMax = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Maximum + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Maximum) / 2;
  const msHttpDlOverallRefMax = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Maximum + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Maximum) / 2;
  const msHttpUlOverallMax = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Maximum + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput.Maximum) / 2;
  const msHttpUlOverallRefMax = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Maximum + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput.Maximum) / 2;

  const msHttpDlOverallMin = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Minimum + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Minimum) / 2;
  const msHttpDlOverallRefMin = (MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Minimum + MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Minimum) / 2;
  const msHttpUlOverallMin = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Minimum + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput.Minimum) / 2;
  const msHttpUlOverallRefMin = (MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput.Minimum + MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput.Minimum) / 2;

  const combinedOverallMsHttpTableData = [
    ["Average", "DUT", msHttpDlOverallMean.toFixed(2), msHttpUlOverallMean.toFixed(2)],
    ["Average", "REF", msHttpDlOverallRefMean.toFixed(2), msHttpUlOverallRefMean.toFixed(2)],
    ["Standard Deviation", "DUT", msHttpDlOverallStdDev.toFixed(2), msHttpUlOverallStdDev.toFixed(2)],
    ["Standard Deviation", "REF", msHttpDlOverallRefStdDev.toFixed(2), msHttpUlOverallRefStdDev.toFixed(2)],
    ["Maximum", "DUT", msHttpDlOverallMax.toFixed(2), msHttpUlOverallMax.toFixed(2)],
    ["Maximum", "REF", msHttpDlOverallRefMax.toFixed(2), msHttpUlOverallRefMax.toFixed(2)],
    ["Minimum", "DUT", msHttpDlOverallMin.toFixed(2), msHttpUlOverallMin.toFixed(2)],
    ["Minimum", "REF", msHttpDlOverallRefMin.toFixed(2), msHttpUlOverallRefMin.toFixed(2)],
  ];

  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  return (
    <div className='page-content'>
      <h2>NSA Stationary Data Performance Details</h2>

      <h3>Overall Single Stream HTTP</h3>
      <DpThroughputOverallTable
        tableHeader={overallTableHeader}
        tableData={combinedOverallSsHttpTableData}
        kpiRule="Throughput"
        kpiTargetCells={[
          {
            rowIndex: 0,
            colIndex: 2,
            dutValue: ssHttpDlOverallMean,
            refValue: ssHttpDlOverallRefMean,
          },
          {
            rowIndex: 0,
            colIndex: 3,
            dutValue: ssHttpUlOverallMean,
            refValue: ssHttpUlOverallRefMean,
          },
        ]}
      />

      <DpNSAHttpSSTable
        data={{
          Moderate: {
            DUT: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["DUT_Single Stream HTTP Download for 60 seconds"].Throughput,
            REF: SingleStreamHTTPData.Moderate["Single Stream HTTP Download for 60 seconds"]["REF Single Stream HTTP Download for 60 seconds"].Throughput,
          },
          Poor: {
            DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["DUT HTTP DL"].Throughput,
            REF: SingleStreamHTTPData.Poor["Single Stream HTTP Download for 60 seconds"]["REF HTTP DL"].Throughput,
          },
        }}
        tableName="Single Stream HTTP Download"
      />
      <DpHistogramComponent
        data={ssHttpDlHistogramData}
        title="Single Stream HTTP Download Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={barKeys}
      />

      <DpNSAHttpSSTable
        data={{
          Moderate: {
            DUT: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
            REF: SingleStreamHTTPData.Moderate["5G NSA_Single Stream HTTP Upload of a 15 MB file"]["_20250925_125722_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_location2_DA Test"].Throughput,
          },
          Poor: {
            DUT: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH01_TMO-dut_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput,
            REF: SingleStreamHTTPData.Poor["Single Stream HTTP Upload of a 15 MB file"]["_CH02_TMO-ref_5G NSA_Single Stream HTTP Upload of a 15 MB file_Poor Coverage_DA Test"].Throughput,
          },
        }}
        tableName="Single Stream HTTP Upload"
      />
      <DpHistogramComponent
        data={ssHttpUlHistogramData}
        title="Single Stream HTTP Upload Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={barKeys}
      />


      <h3>Overall Multi Stream HTTP</h3>
            <DpThroughputOverallTable
              tableHeader={overallTableHeader}
              tableData={combinedOverallMsHttpTableData}
              kpiRule="Throughput"
              kpiTargetCells={[
                {
                  rowIndex: 0,
                  colIndex: 2,
                  dutValue: msHttpDlOverallMean,
                  refValue: msHttpDlOverallRefMean,
                },
                {
                  rowIndex: 0,
                  colIndex: 3,
                  dutValue: msHttpUlOverallMean,
                  refValue: msHttpUlOverallRefMean,
                },
              ]}
            />
      <DpNSAHttpMSTable
        data={{
          Moderate: {
            DUT: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput,
            REF: MultiStreamHTTPData.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput,
          },
          Poor: {
            DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput,
            REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput,
          },
        }}
        tableName="Multi Stream HTTP Download"
      />
      <DpHistogramComponent
        data={msHttpDlHistogramData}
        title="Multi Stream HTTP Download Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={barKeys}
      />

      

      <DpNSAHttpMSTable
        data={{
          Moderate: {
            DUT: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["DUT 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput,
            REF: MultiStreamHTTPData.Moderate["5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate"]["REF 5G NSA_Multi Stream HTTP Upload for 30 seconds_moderate_"].Throughput,
          },
          Poor: {
            DUT: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH01_TMO-dut_5G NSA_Multi Stream HTTP Upload for 30 seconds_Poor Coverage_DA Test"].Throughput,
            REF: MultiStreamHTTPData.Poor["Multi Stream HTTP Upload for 30 seconds"]["_CH02_TMO-ref_5G NSA_UDP UMulti Stream HTTP Upload for 30 second_Poor Coverage_DA Test"].Throughput,
          },
        }}
        tableName="Multi Stream HTTP Upload"
      />
      <DpHistogramComponent
        data={msHttpUlHistogramData}
        title="Multi Stream HTTP Upload Throughput Histogram"
        yAxisLabel="Throughput"
        barKeys={barKeys}
      />

      <DpNSAPingTable data={pingData} tableName="Ping RTT" />
      <DpHistogramComponent
        data={pingHistogramData}
        title="Ping RTT Histogram"
        yAxisLabel="Latency (ms)"
        barKeys={barKeys}
      />
      <DpNSAUDPComponent />
    </div>
  );
}

export default DpNSAStationaryDetails;