import React from 'react';
import DpHistogramComponent from '../../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../../Constants/ChartColors';
import DpNSAUDPDLTable from './Table/DpNSAUDPDLTable';
import DpNSAUDPULTable from './Table/DpNSAUDPULTable';
import DpUdpOverallTable from '../../DpUdpOverallTable';
import { ReportContext } from '../../../../Contexts/ReportContext';
import { useContext } from 'react';
import '../../../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../../../CommonPage/DynamicHeader';
import DpBoxPlot from '../../Statoinary/DpBoxPlot';
import DpCDF_Chart from '../../DpCDF_Chart';
import PageBreak from '../../../../CommonPage/PageBreak';

import { useEffect } from 'react';

function DpNSAUDPComponent({ city: propCity }) {
  const { city: globalCity, projectData, project, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData) {
    return <PageBreak>Loading {city} NSA UDP data...</PageBreak>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  const udpData = reportData.dataPerformance['Data Performance']?.['5G NSA DP']?.['Udp Test'];

  if (!udpData) {
    return <PageBreak>No NSA UDP Data available</PageBreak>;
  }

  // Helper to safely extract metrics
  const getMetric = (dir, task, cov, dev, metric, subMetric = "Mean") => {
    const taskData = udpData[dir]?.[task]?.[cov]?.[dev];
    if (!taskData) return 0;
    if (metric === "Throughput") return taskData.Throughput?.[subMetric] || 0;
    if (metric === "Jitter") return taskData.Jitter?.[subMetric] || 0;
    if (metric === "Error Ratio") return taskData["Error Ratio"]?.[subMetric] || 0;
    return 0;
  };

  const tasksDL = ["UDP Download Task at 200 Mbps for 10 seconds", "UDP Download Task at 400 Mbps for 10 seconds"];
  const tasksUL = ["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds", "5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"];

  const metricsDL = [
    { name: "Throughput (Mbps)", type: "Throughput", sub: "Mean" },
    { name: "Max Throughput (Mbps)", type: "Throughput", sub: "Maximum" },
    { name: "Mean Jitter (s)", type: "Jitter", sub: "Mean" },
    { name: "Packet Failure Rate (%)", type: "Error Ratio", sub: "Mean" }
  ];

  const udp_Stationary_DL = [];
  metricsDL.forEach(m => {
    tasksDL.forEach(task => {
      const ideal = task.includes("200") ? "200" : "400";
      ["DUT", "REF"].forEach(dev => {
        udp_Stationary_DL.push({
          metric: m.name,
          idealThroughput: ideal,
          deviceName: dev,
          location: {
            moderate: getMetric("DL", task, "Moderate", dev, m.type, m.sub),
            poor: getMetric("DL", task, "Poor", dev, m.type, m.sub),
          }
        });
      });
    });
  });

  const metricsUL = [
    { name: "Throughput (Mbps)", type: "Throughput", sub: "Mean" },
    { name: "Max Throughput (Mbps)", type: "Throughput", sub: "Maximum" },
    { name: "Mean Jitter (s)", type: "Jitter", sub: "Mean" },
    { name: "Packet Failure Rate (%)", type: "Error Ratio", sub: "Mean" }
  ];

  const udp_Stationary_UL = [];
  metricsUL.forEach(m => {
    tasksUL.forEach(task => {
      const ideal = task.includes("10 Mbps") ? "10" : "20";
      ["DUT", "REF"].forEach(dev => {
        udp_Stationary_UL.push({
          metric: m.name,
          idealThroughput: ideal,
          deviceName: dev,
          location: {
            moderate: getMetric("UL", task, "Moderate", dev, m.type, m.sub),
            poor: getMetric("UL", task, "Poor", dev, m.type, m.sub),
          }
        });
      });
    });
  });


  // Helper to extract data for a specific metric and idealThroughput, structured for location comparison
  const extractHistogramDataByLocation = (dataArray, metricName, idealThroughputValue) => {
    const filteredData = dataArray.filter(
      (item) => item.metric === metricName && item.idealThroughput === idealThroughputValue
    );

    const moderateData = { name: 'Moderate' };
    const poorData = { name: 'Poor' };

    filteredData.forEach((item) => {
      if (item.deviceName === "DUT") {
        moderateData["DUT"] = item.location.moderate;
        poorData["DUT"] = item.location.poor;
      } else if (item.deviceName === "REF") {
        moderateData["REF"] = item.location.moderate;
        poorData["REF"] = item.location.poor;
      }
    });
    return [moderateData, poorData];
  };

  const histogramBarKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  const dlOverallTableData = udp_Stationary_DL
    .filter(item => item.metric !== "Max Throughput (Mbps)")
    .map(item => {
      const moderateVal = parseFloat(item.location.moderate);
      const poorVal = parseFloat(item.location.poor);
      const overallValue = (isNaN(moderateVal) || isNaN(poorVal)) ? "N/A" : ((moderateVal + poorVal) / 2).toFixed(2);
      return {
        Metric: item.metric,
        "Ideal Throughput": item.idealThroughput,
        "Device Name": item.deviceName,
        Overall: overallValue,
      };
    });

  const dlOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  const ulOverallTableData = udp_Stationary_UL
    .filter(item => item.metric !== "Max Throughput (Mbps)")
    .map(item => {
      const moderateVal = parseFloat(item.location.moderate);
      const poorVal = parseFloat(item.location.poor);
      const overallValue = (isNaN(moderateVal) || isNaN(poorVal)) ? "N/A" : ((moderateVal + poorVal) / 2).toFixed(2);
      return {
        Metric: item.metric,
        "Ideal Throughput": item.idealThroughput,
        "Device Name": item.deviceName,
        Overall: overallValue,
      };
    });

  const ulOverallTableHeaders = ["Metric", "Ideal Throughput", "Device Name", "Overall"];

  // Helper to build BoxPlot data for NSA UDP tasks (Moderate/Poor categories)
  const getNsaUdpBoxPlotData = (dir, taskName) => {
    const plotData = [];
    ['Moderate', 'Poor'].forEach(cov => {
      ['DUT', 'REF'].forEach(dev => {
        const stats = udpData?.[dir]?.[taskName]?.[cov]?.[dev]?.Throughput;
        if (!stats || !stats.Mean) return;
        let { Minimum: min, Maximum: max, Q1: q1, Median: median, Q3: q3, Outliers: outliers = [], Mean: mean, 'Standard Deviation': stdDev } = stats;
        if (q1 === undefined) {
          median = mean;
          q1 = Math.max(min, mean - 0.675 * stdDev);
          q3 = Math.min(max, mean + 0.675 * stdDev);
        }
        plotData.push({ x: `${cov} (${dev})`, min, q1, median, q3, max, outliers });
      });
    });
    return plotData;
  };

  return (
    <>
      <PageBreak>
        <DynamicHeader level={2}>UDP Test - 5G NSA - {city}</DynamicHeader>
        <DynamicHeader level={3}>NSA UDP Test DL Details - 5G NSA - {city}</DynamicHeader>
        <DpUdpOverallTable data={dlOverallTableData} headers={dlOverallTableHeaders} city={city} />
      </PageBreak>
      <PageBreak>
        <DynamicHeader level={3}>NSA UDP Test UL Details - 5G NSA - {city}</DynamicHeader>
        <DpUdpOverallTable data={ulOverallTableData} headers={ulOverallTableHeaders} city={city} />
      </PageBreak>

      <PageBreak>
        <DpNSAUDPDLTable data={udp_Stationary_DL} tableName="NSA UDP Test DL Details" />
      </PageBreak>


      {/* UDP DL overall  */}
      <PageBreak>
        {["200", "400"].map((idealThroughput) => (
          <DpHistogramComponent
            key={`dl-throughput-${idealThroughput}`}
            data={extractHistogramDataByLocation(udp_Stationary_DL, "Throughput (Mbps)", idealThroughput)}
            title={`UDP Download Throughput (${idealThroughput} Mbps)`}
            yAxisLabel="Throughput (Mbps)"
            barKeys={histogramBarKeys}
          />
        ))}
      </PageBreak>

      {/* Mean Jitter (s) - UDP Download Stationary */}
      <PageBreak>
        {["200", "400"].map((idealThroughput) => (
          <DpHistogramComponent
            key={`dl-jitter-${idealThroughput}`}
            data={extractHistogramDataByLocation(udp_Stationary_DL, "Mean Jitter (s)", idealThroughput)}
            title={`UDP Download Jitter (${idealThroughput} Mbps)`}
            yAxisLabel="Mean Jitter (s)"
            barKeys={histogramBarKeys}
          />
        ))}
      </PageBreak>

      {/* Packet Failure Rate (%) - UDP Download Stationary */}
      <PageBreak>
        {["200", "400"].map((idealThroughput) => (
          <DpHistogramComponent
            key={`dl-packet-failure-${idealThroughput}`}
            data={extractHistogramDataByLocation(udp_Stationary_DL, "Packet Failure Rate (%)", idealThroughput)}
            title={`UDP Download Packet Failure Rate (${idealThroughput} Mbps)`}
            yAxisLabel="Packet Failure Rate (%)"
            barKeys={histogramBarKeys}
          />
        ))}
      </PageBreak>
      <PageBreak>
        <DpBoxPlot
          data={getNsaUdpBoxPlotData('DL', 'UDP Download Task at 200 Mbps for 10 seconds')}
          title="NSA UDP Download Throughput Box Plot (200 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      <PageBreak>
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_200_mbps_for_10_seconds_moderate_dut.json"
          refFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_200_mbps_for_10_seconds_moderate_ref.json"
          title="NSA UDP DL 200M Moderate CDF (DUT vs REF)"
        />
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_200_mbps_for_10_seconds_poor_dut.json"
          refFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_200_mbps_for_10_seconds_poor_ref.json"
          title="NSA UDP DL 200M Poor CDF (DUT vs REF)"
        />
      </PageBreak>

      <PageBreak>
        <DpBoxPlot
          data={getNsaUdpBoxPlotData('DL', 'UDP Download Task at 400 Mbps for 10 seconds')}
          title="NSA UDP Download Throughput Box Plot (400 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      <PageBreak>
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_400_mbps_for_10_seconds_moderate_dut.json"
          refFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_400_mbps_for_10_seconds_moderate_ref.json"
          title="NSA UDP DL 400M Moderate CDF (DUT vs REF)"
        />
        <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_400_mbps_for_10_seconds_poor_dut.json"
          refFilename="5g_nsa_dp_udp_test_dl_udp_download_task_at_400_mbps_for_10_seconds_poor_ref.json"
          title="NSA UDP DL 400M Poor CDF (DUT vs REF)"
        />
      </PageBreak>

      <PageBreak>
        <DpNSAUDPULTable data={udp_Stationary_UL} tableName="NSA UDP Test UL Details" />
      </PageBreak>
      {/* UDP UL overall  */}
      <PageBreak>
        {["10", "20"].map((idealThroughput) => (
          <DpHistogramComponent
            key={`ul-throughput-${idealThroughput}`}
            data={extractHistogramDataByLocation(udp_Stationary_UL, "Throughput (Mbps)", idealThroughput)}
            title={`UDP Upload Throughput (${idealThroughput} Mbps)`}
            yAxisLabel="Throughput (Mbps)"
            barKeys={histogramBarKeys}
          />
        ))}
      </PageBreak>

      {/* Mean Jitter (s) - UDP Upload Stationary */}
      <PageBreak>
        {["10", "20"].map((idealThroughput) => (
          <DpHistogramComponent
            key={`ul-jitter-${idealThroughput}`}
            data={extractHistogramDataByLocation(udp_Stationary_UL, "Mean Jitter (s)", idealThroughput)}
            title={`UDP Upload Jitter (${idealThroughput} Mbps)`}
            yAxisLabel="Mean Jitter (s)"
            barKeys={histogramBarKeys}
          />
        ))}
      </PageBreak>

      {/* Packet Failure Rate (%) - UDP Upload Stationary */}
      <PageBreak>
        {["10", "20"].map((idealThroughput) => (
          <DpHistogramComponent
            key={`ul-packet-failure-${idealThroughput}`}
            data={extractHistogramDataByLocation(udp_Stationary_UL, "Packet Failure Rate (%)", idealThroughput)}
            title={`UDP Upload Packet Failure Rate (${idealThroughput} Mbps)`}
            yAxisLabel="Packet Failure Rate (%)"
            barKeys={histogramBarKeys}
          />
        ))}
      </PageBreak>

      <PageBreak>
        <DpBoxPlot
          data={getNsaUdpBoxPlotData('UL', '5G NSA_UDP Upload Task at 10 Mbps for 10 seconds')}
          title="NSA UDP Upload Throughput Box Plot (10 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>

      {/* Note: UL UDP CDF files for NSA were not explicitly found in search, but adding placeholders for consistency if they appear in future runs. 
          Assuming filenames follow the pattern 5g_nsa_dp_udp_test_ul_... if they exist. 
          Actually I'll check my search results again. */}

      <PageBreak>
        <DpBoxPlot
          data={getNsaUdpBoxPlotData('UL', '5G NSA_UDP Upload Task at 20 Mbps for 10 seconds')}
          title="NSA UDP Upload Throughput Box Plot (20 Mbps)"
          yAxisLabel="Throughput (Mbps)"
        />
      </PageBreak>
    </>
  );
}

export default DpNSAUDPComponent;