import React from 'react';
import DpNSAHttpMSTable from './Table/DpNSAHttpMSTable';
import DpNSAHttpSSTable from './Table/DpNSAHttpSSTable';
import DpNSAPingTable from './Table/DpNSAPingTable';
import DpNSAPingOverallTable from './Table/DpNSAPingOverallTable';
import DpThroughputOverallTable from '../../DpThroughputOverallTable';
import processPingData from './NSAPingData';
import DpHistogramComponent from '../../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';
import DpNSAUDPComponent from './DpNSAUDPComponent';
import { ReportContext } from '../../../../Contexts/ReportContext';
import { useContext } from 'react';
import DynamicHeader from '../../../../CommonPage/DynamicHeader';
import DpBoxPlot from '../../Statoinary/DpBoxPlot';
import DpCDF_Chart from '../../DpCDF_Chart';
import PageBreak from '../../../../CommonPage/PageBreak';

import { useEffect } from 'react';

function DpNSAStationaryDetails({ city: propCity, firstSection = false }) {
  const { city: globalCity, projectData, project, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData) {
    return <PageBreak>Loading {city} NSA data...</PageBreak>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  const nsaStationaryData = reportData.dataPerformance['Data Performance']?.['5G NSA DP'];

  if (!nsaStationaryData) {
    return <PageBreak>No NSA Stationary Data available</PageBreak>;
  }

  const MultiStreamHTTPData = nsaStationaryData['HTTP Multi Stream'];
  const SingleStreamHTTPData = nsaStationaryData['HTTP Single Stream'];
  const PingData = nsaStationaryData['Ping'];

  // Helper to extract stats safely for HTTP Single Stream
  const getSSStats = (dir, cov, dev) => SingleStreamHTTPData?.[dir]?.[cov]?.[dev]?.Throughput || {};
  const getMSStats = (dir, cov, dev) => MultiStreamHTTPData?.[dir]?.[cov]?.[dev]?.Throughput || {};

  const ssHttpDlHistogramData = [
    { name: 'Moderate', DUT: getSSStats('DL', 'Moderate', 'DUT').Mean || 0, REF: getSSStats('DL', 'Moderate', 'REF').Mean || 0 },
    { name: 'Poor', DUT: getSSStats('DL', 'Poor', 'DUT').Mean || 0, REF: getSSStats('DL', 'Poor', 'REF').Mean || 0 },
  ];

  const ssHttpUlHistogramData = [
    { name: 'Moderate', DUT: getSSStats('UL', 'Moderate', 'DUT').Mean || 0, REF: getSSStats('UL', 'Moderate', 'REF').Mean || 0 },
    { name: 'Poor', DUT: getSSStats('UL', 'Poor', 'DUT').Mean || 0, REF: getSSStats('UL', 'Poor', 'REF').Mean || 0 },
  ];

  const msHttpDlHistogramData = [
    { name: 'Moderate', DUT: getMSStats('DL', 'Moderate', 'DUT').Mean || 0, REF: getMSStats('DL', 'Moderate', 'REF').Mean || 0 },
    { name: 'Poor', DUT: getMSStats('DL', 'Poor', 'DUT').Mean || 0, REF: getMSStats('DL', 'Poor', 'REF').Mean || 0 },
  ];

  const msHttpUlHistogramData = [
    { name: 'Moderate', DUT: getMSStats('UL', 'Moderate', 'DUT').Mean || 0, REF: getMSStats('UL', 'Moderate', 'REF').Mean || 0 },
    { name: 'Poor', DUT: getMSStats('UL', 'Poor', 'DUT').Mean || 0, REF: getMSStats('UL', 'Poor', 'REF').Mean || 0 },
  ];

  // Ping processing
  const pingData = processPingData(PingData);
  const pingHistogramData = [
    { name: 'Moderate', DUT: pingData?.average?.DUT?.Moderate || 0, REF: pingData?.average?.REF?.Moderate || 0 },
    { name: 'Poor', DUT: pingData?.average?.DUT?.Poor || 0, REF: pingData?.average?.REF?.Poor || 0 },
  ];

  const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];

  const calculateOverall = (moderate, poor) => {
    const vals = [moderate, poor].filter(v => v !== undefined && v !== null);
    if (vals.length === 0) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const ssHttpDlOverallMean = calculateOverall(getSSStats('DL', 'Moderate', 'DUT').Mean, getSSStats('DL', 'Poor', 'DUT').Mean);
  const ssHttpDlOverallRefMean = calculateOverall(getSSStats('DL', 'Moderate', 'REF').Mean, getSSStats('DL', 'Poor', 'REF').Mean);
  const ssHttpUlOverallMean = calculateOverall(getSSStats('UL', 'Moderate', 'DUT').Mean, getSSStats('UL', 'Poor', 'DUT').Mean);
  const ssHttpUlOverallRefMean = calculateOverall(getSSStats('UL', 'Moderate', 'REF').Mean, getSSStats('UL', 'Poor', 'REF').Mean);

  const ssHttpDlOverallStdDev = calculateOverall(getSSStats('DL', 'Moderate', 'DUT')['Standard Deviation'], getSSStats('DL', 'Poor', 'DUT')['Standard Deviation']);
  const ssHttpDlOverallRefStdDev = calculateOverall(getSSStats('DL', 'Moderate', 'REF')['Standard Deviation'], getSSStats('DL', 'Poor', 'REF')['Standard Deviation']);
  const ssHttpUlOverallStdDev = calculateOverall(getSSStats('UL', 'Moderate', 'DUT')['Standard Deviation'], getSSStats('UL', 'Poor', 'DUT')['Standard Deviation']);
  const ssHttpUlOverallRefStdDev = calculateOverall(getSSStats('UL', 'Moderate', 'REF')['Standard Deviation'], getSSStats('UL', 'Poor', 'REF')['Standard Deviation']);

  const ssHttpDlOverallMax = calculateOverall(getSSStats('DL', 'Moderate', 'DUT').Maximum, getSSStats('DL', 'Poor', 'DUT').Maximum);
  const ssHttpDlOverallRefMax = calculateOverall(getSSStats('DL', 'Moderate', 'REF').Maximum, getSSStats('DL', 'Poor', 'REF').Maximum);
  const ssHttpUlOverallMax = calculateOverall(getSSStats('UL', 'Moderate', 'DUT').Maximum, getSSStats('UL', 'Poor', 'DUT').Maximum);
  const ssHttpUlOverallRefMax = calculateOverall(getSSStats('UL', 'Moderate', 'REF').Maximum, getSSStats('UL', 'Poor', 'REF').Maximum);

  const ssHttpDlOverallMin = calculateOverall(getSSStats('DL', 'Moderate', 'DUT').Minimum, getSSStats('DL', 'Poor', 'DUT').Minimum);
  const ssHttpDlOverallRefMin = calculateOverall(getSSStats('DL', 'Moderate', 'REF').Minimum, getSSStats('DL', 'Poor', 'REF').Minimum);
  const ssHttpUlOverallMin = calculateOverall(getSSStats('UL', 'Moderate', 'DUT').Minimum, getSSStats('UL', 'Poor', 'DUT').Minimum);
  const ssHttpUlOverallRefMin = calculateOverall(getSSStats('UL', 'Moderate', 'REF').Minimum, getSSStats('UL', 'Poor', 'REF').Minimum);


  const combinedOverallSsHttpTableData = [
    ["Average (Mbps)", "DUT", ssHttpDlOverallMean.toFixed(2), ssHttpUlOverallMean.toFixed(2)],
    ["Average (Mbps)", "REF", ssHttpDlOverallRefMean.toFixed(2), ssHttpUlOverallRefMean.toFixed(2)],
    ["Standard Deviation (Mbps)", "DUT", ssHttpDlOverallStdDev.toFixed(2), ssHttpUlOverallStdDev.toFixed(2)],
    ["Standard Deviation (Mbps)", "REF", ssHttpDlOverallRefStdDev.toFixed(2), ssHttpUlOverallRefStdDev.toFixed(2)],
    ["Maximum (Mbps)", "DUT", ssHttpDlOverallMax.toFixed(2), ssHttpUlOverallMax.toFixed(2)],
    ["Maximum (Mbps)", "REF", ssHttpDlOverallRefMax.toFixed(2), ssHttpUlOverallRefMax.toFixed(2)],
    ["Minimum (Mbps)", "DUT", ssHttpDlOverallMin.toFixed(2), ssHttpUlOverallMin.toFixed(2)],
    ["Minimum (Mbps)", "REF", ssHttpDlOverallRefMin.toFixed(2), ssHttpUlOverallRefMin.toFixed(2)],
  ];

  const msHttpDlOverallMean = calculateOverall(getMSStats('DL', 'Moderate', 'DUT').Mean, getMSStats('DL', 'Poor', 'DUT').Mean);
  const msHttpDlOverallRefMean = calculateOverall(getMSStats('DL', 'Moderate', 'REF').Mean, getMSStats('DL', 'Poor', 'REF').Mean);
  const msHttpUlOverallMean = calculateOverall(getMSStats('UL', 'Moderate', 'DUT').Mean, getMSStats('UL', 'Poor', 'DUT').Mean);
  const msHttpUlOverallRefMean = calculateOverall(getMSStats('UL', 'Moderate', 'REF').Mean, getMSStats('UL', 'Poor', 'REF').Mean);

  const msHttpDlOverallStdDev = calculateOverall(getMSStats('DL', 'Moderate', 'DUT')['Standard Deviation'], getMSStats('DL', 'Poor', 'DUT')['Standard Deviation']);
  const msHttpDlOverallRefStdDev = calculateOverall(getMSStats('DL', 'Moderate', 'REF')['Standard Deviation'], getMSStats('DL', 'Poor', 'REF')['Standard Deviation']);
  const msHttpUlOverallStdDev = calculateOverall(getMSStats('UL', 'Moderate', 'DUT')['Standard Deviation'], getMSStats('UL', 'Poor', 'DUT')['Standard Deviation']);
  const msHttpUlOverallRefStdDev = calculateOverall(getMSStats('UL', 'Moderate', 'REF')['Standard Deviation'], getMSStats('UL', 'Poor', 'REF')['Standard Deviation']);

  const msHttpDlOverallMax = calculateOverall(getMSStats('DL', 'Moderate', 'DUT').Maximum, getMSStats('DL', 'Poor', 'DUT').Maximum);
  const msHttpDlOverallRefMax = calculateOverall(getMSStats('DL', 'Moderate', 'REF').Maximum, getMSStats('DL', 'Poor', 'REF').Maximum);
  const msHttpUlOverallMax = calculateOverall(getMSStats('UL', 'Moderate', 'DUT').Maximum, getMSStats('UL', 'Poor', 'DUT').Maximum);
  const msHttpUlOverallRefMax = calculateOverall(getMSStats('UL', 'Moderate', 'REF').Maximum, getMSStats('UL', 'Poor', 'REF').Maximum);

  const msHttpDlOverallMin = calculateOverall(getMSStats('DL', 'Moderate', 'DUT').Minimum, getMSStats('DL', 'Poor', 'DUT').Minimum);
  const msHttpDlOverallRefMin = calculateOverall(getMSStats('DL', 'Moderate', 'REF').Minimum, getMSStats('DL', 'Poor', 'REF').Minimum);
  const msHttpUlOverallMin = calculateOverall(getMSStats('UL', 'Moderate', 'DUT').Minimum, getMSStats('UL', 'Poor', 'DUT').Minimum);
  const msHttpUlOverallRefMin = calculateOverall(getMSStats('UL', 'Moderate', 'REF').Minimum, getMSStats('UL', 'Poor', 'REF').Minimum);

  const combinedOverallMsHttpTableData = [
    ["Average (Mbps)", "DUT", msHttpDlOverallMean.toFixed(2), msHttpUlOverallMean.toFixed(2)],
    ["Average (Mbps)", "REF", msHttpDlOverallRefMean.toFixed(2), msHttpUlOverallRefMean.toFixed(2)],
    ["Standard Deviation (Mbps)", "DUT", msHttpDlOverallStdDev.toFixed(2), msHttpUlOverallStdDev.toFixed(2)],
    ["Standard Deviation (Mbps)", "REF", msHttpDlOverallRefStdDev.toFixed(2), msHttpUlOverallRefStdDev.toFixed(2)],
    ["Maximum (Mbps)", "DUT", msHttpDlOverallMax.toFixed(2), msHttpUlOverallMax.toFixed(2)],
    ["Maximum (Mbps)", "REF", msHttpDlOverallRefMax.toFixed(2), msHttpUlOverallRefMax.toFixed(2)],
    ["Minimum (Mbps)", "DUT", msHttpDlOverallMin.toFixed(2), msHttpUlOverallMin.toFixed(2)],
    ["Minimum (Mbps)", "REF", msHttpDlOverallRefMin.toFixed(2), msHttpUlOverallRefMin.toFixed(2)],
  ];

  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  // Helper to build a single box plot entry from a stats object
  const getBoxPlotEntry = (label, stats) => {
    if (!stats || !stats.Mean) return null;
    let { Minimum: min, Maximum: max, Q1: q1, Median: median, Q3: q3, Outliers: outliers = [], Mean: mean, 'Standard Deviation': stdDev } = stats;
    if (q1 === undefined) {
      median = mean;
      q1 = Math.max(min, mean - 0.675 * stdDev);
      q3 = Math.min(max, mean + 0.675 * stdDev);
    }
    return { x: label, min, q1, median, q3, max, outliers };
  };

  // Build box plot data for a given direction and getStats function
  const getNsaBoxPlotData = (dir, getStatsFn) => {
    const entries = [];
    ['Moderate', 'Poor'].forEach(cov => {
      ['DUT', 'REF'].forEach(dev => {
        const entry = getBoxPlotEntry(`${cov} (${dev})`, getStatsFn(dir, cov, dev));
        if (entry) entries.push(entry);
      });
    });
    return entries;
  };

  return (
    <>
      <PageBreak>
        {firstSection && <DynamicHeader level={1}>Data Performance - 5G NSA</DynamicHeader>}
        <DynamicHeader level={2}>HTTP Single Stream Test Download & Upload - 5G NSA - {city}</DynamicHeader>
        <h4>Http Single Stream Overview </h4>
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
              DUT: getSSStats('DL', 'Moderate', 'DUT'),
              REF: getSSStats('DL', 'Moderate', 'REF'),
            },
            Poor: {
              DUT: getSSStats('DL', 'Poor', 'DUT'),
              REF: getSSStats('DL', 'Poor', 'REF'),
            },
          }}
          tableName="Http Single Stream DL Details"
        />
      </PageBreak>
      <PageBreak>
        <DpNSAHttpSSTable
          data={{
            Moderate: {
              DUT: getSSStats('UL', 'Moderate', 'DUT'),
              REF: getSSStats('UL', 'Moderate', 'REF'),
            },
            Poor: {
              DUT: getSSStats('UL', 'Poor', 'DUT'),
              REF: getSSStats('UL', 'Poor', 'REF'),
            },
          }}
          tableName="Http Single Stream UL Details"
        />
        <DpHistogramComponent
          data={ssHttpDlHistogramData}
          title="Http Single Stream Download Throughput"
          yAxisLabel="Throughput"
          barKeys={barKeys}
        />
      </PageBreak>
      <PageBreak>
        <DpHistogramComponent
          data={ssHttpUlHistogramData}
          title="Http Single Stream Upload Throughput"
          yAxisLabel="Throughput"
          barKeys={barKeys}
        />
      </PageBreak>
      <PageBreak>
        <DpBoxPlot
          data={getNsaBoxPlotData('DL', getSSStats)}
          title="Http Single Stream Download Throughput Box Plot"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      <PageBreak>
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_single_stream_dl_moderate_dut.json"
          refFilename="5g_nsa_dp_http_single_stream_dl_moderate_ref.json"
          title="NSA HTTP SS DL Moderate CDF (DUT vs REF)"
        />
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_single_stream_dl_poor_dut.json"
          refFilename="5g_nsa_dp_http_single_stream_dl_poor_ref.json"
          title="NSA HTTP SS DL Poor CDF (DUT vs REF)"
        />
      </PageBreak>

      <PageBreak>
        <DpBoxPlot
          data={getNsaBoxPlotData('UL', getSSStats)}
          title="Http Single Stream Upload Throughput Box Plot"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      <PageBreak>
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_single_stream_ul_moderate_dut.json"
          refFilename="5g_nsa_dp_http_single_stream_ul_moderate_ref.json"
          title="NSA HTTP SS UL Moderate CDF (DUT vs REF)"
        />
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_single_stream_ul_poor_dut.json"
          refFilename="5g_nsa_dp_http_single_stream_ul_poor_ref.json"
          title="NSA HTTP SS UL Poor CDF (DUT vs REF)"
        />
      </PageBreak>
      <PageBreak>
        <DynamicHeader level={2}>HTTP Multi Stream Test Download & Upload - 5G NSA - {city}</DynamicHeader>
        <h4>Http Multi Stream Overview</h4>
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
              DUT: getMSStats('DL', 'Moderate', 'DUT'),
              REF: getMSStats('DL', 'Moderate', 'REF'),
            },
            Poor: {
              DUT: getMSStats('DL', 'Poor', 'DUT'),
              REF: getMSStats('DL', 'Poor', 'REF'),
            },
          }}
          tableName="Http Multi Stream DL Details"
        />
      </PageBreak>
      <PageBreak>
        <DpNSAHttpMSTable
          data={{
            Moderate: {
              DUT: getMSStats('UL', 'Moderate', 'DUT'),
              REF: getMSStats('UL', 'Moderate', 'REF'),
            },
            Poor: {
              DUT: getMSStats('UL', 'Poor', 'DUT'),
              REF: getMSStats('UL', 'Poor', 'REF'),
            },
          }}
          tableName="Http Multi Stream UL Details"
        />
        <DpHistogramComponent
          data={msHttpDlHistogramData}
          title="Http Multi Stream Download Throughput"
          yAxisLabel="Throughput"
          barKeys={barKeys}
        />
      </PageBreak>

      <PageBreak>
        <DpHistogramComponent
          data={msHttpUlHistogramData}
          title="Http Multi Stream Upload Throughput"
          yAxisLabel="Throughput"
          barKeys={barKeys}
        />
      </PageBreak>
      <PageBreak>
        <DpBoxPlot
          data={getNsaBoxPlotData('DL', getMSStats)}
          title="Http Multi Stream Download Throughput Box Plot"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      <PageBreak>
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_multi_stream_dl_moderate_dut.json"
          refFilename="5g_nsa_dp_http_multi_stream_dl_moderate_ref.json"
          title="NSA HTTP MS DL Moderate CDF (DUT vs REF)"
        />
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_multi_stream_dl_poor_dut.json"
          refFilename="5g_nsa_dp_http_multi_stream_dl_poor_ref.json"
          title="NSA HTTP MS DL Poor CDF (DUT vs REF)"
        />
      </PageBreak>

      <PageBreak>
        <DpBoxPlot
          data={getNsaBoxPlotData('UL', getMSStats)}
          title="Http Multi Stream Upload Throughput Box Plot"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      <PageBreak>
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_multi_stream_ul_moderate_dut.json"
          refFilename="5g_nsa_dp_http_multi_stream_ul_moderate_ref.json"
          title="NSA HTTP MS UL Moderate CDF (DUT vs REF)"
        />
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_http_multi_stream_ul_poor_dut.json"
          refFilename="5g_nsa_dp_http_multi_stream_ul_poor_ref.json"
          title="NSA HTTP MS UL Poor CDF (DUT vs REF)"
        />
      </PageBreak>


      <DpNSAUDPComponent city={city} />
      <PageBreak>
        <DynamicHeader level={2}>Ping Test - 5G NSA - {city}</DynamicHeader>
        <h4>Ping Test Overview</h4>
        <DpNSAPingOverallTable data={pingData} />
        <DpNSAPingTable data={pingData} tableName="Ping Test Details" />
        <DpHistogramComponent
          data={pingHistogramData}
          title="Ping RTT"
          yAxisLabel="Latency (ms)"
          barKeys={barKeys}
        />
      </PageBreak>
    </>

  );
}

export default DpNSAStationaryDetails;