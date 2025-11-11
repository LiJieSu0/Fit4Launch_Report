import React from 'react';

function DpNSAUDPTable({ data, tableName }) {
  const calculateOverallAverage = (moderate, poor) => {
    const moderateVal = parseFloat(moderate);
    const poorVal = parseFloat(poor);
    if (isNaN(moderateVal) || isNaN(poorVal)) {
        return "N/A";
    }
    return ((moderateVal + poorVal) / 2).toFixed(2);
  };

  const getRowSpan = (currentMetric, currentIdealThroughput) => {
    let count = 0;
    // This data structure is different from MHS UDP, so we need to adapt
    // For NSA UDP, the data is grouped by Moderate/Poor, then by task, then by DUT/REF
    // We need to iterate through the data to count rows for rowSpan
    // This is a simplified approach, might need refinement based on exact data structure
    // For now, assuming each metric/idealThroughput pair has 2 rows (DUT/REF)
    return 8;
  };

  const getMetricRowSpan = (currentMetric) => {
    // Similar to getRowSpan, this needs to be adapted for the NSA UDP data structure
    // For now, assuming each metric has 4 rows (2 ideal throughputs * 2 devices)
    // This will need to be dynamic based on the actual data
    return 2;
  };

  let prevMetric = null;
  let prevIdealThroughput = null;

  const tableData = [];

  // Process UDP Download Task at 200 Mbps for 10 seconds
  if (data.Moderate && data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"]) {
    const moderate200 = data.Moderate["UDP Download Task at 200 Mbps for 10 seconds"];
    const poor200 = data.Poor["UDP Download Task at 200 Mbps for 10 seconds"];

    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "200 Mbps",
      deviceName: "DUT",
      moderate: moderate200["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"].Throughput.Mean,
      poor: poor200["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"].Throughput.Mean,
    });
    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "200 Mbps",
      deviceName: "REF",
      moderate: moderate200["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"].Throughput.Mean,
      poor: poor200["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"].Throughput.Mean,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "200 Mbps",
      deviceName: "DUT",
      moderate: moderate200["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"].Throughput.Maximum,
      poor: poor200["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "200 Mbps",
      deviceName: "REF",
      moderate: moderate200["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"].Throughput.Maximum,
      poor: poor200["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "200 Mbps",
      deviceName: "DUT",
      moderate: moderate200["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"].Jitter.Mean,
      poor: poor200["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"].Jitter.Mean,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "200 Mbps",
      deviceName: "REF",
      moderate: moderate200["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"].Jitter.Mean,
      poor: poor200["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"].Jitter.Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "200 Mbps",
      deviceName: "DUT",
      moderate: moderate200["_20250919_121427_CH01_TMO-dut_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]["Error Ratio"].Mean,
      poor: poor200["dut_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]["Error Ratio"].Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "200 Mbps",
      deviceName: "REF",
      moderate: moderate200["_20250919_121427_CH02_TMO-ref_5G NSA_UDP DL 200 Mbps 10 s_location2_DA Test"]["Error Ratio"].Mean,
      poor: poor200["ref_5G NSA_UDP Download Task at 200 Mbps for 10 seconds_Poor"]["Error Ratio"].Mean,
    });
  }

  // Process UDP Download Task at 400 Mbps for 10 seconds
  if (data.Moderate && data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"]) {
    const moderate400 = data.Moderate["UDP Download Task at 400 Mbps for 10 seconds"];
    const poor400 = data.Poor["UDP Download Task at 400 Mbps for 10 seconds"];

    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "400 Mbps",
      deviceName: "DUT",
      moderate: moderate400["DUT UDP DL 400 M 10s"].Throughput.Mean,
      poor: poor400["DUT UDP DL"].Throughput.Mean,
    });
    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "400 Mbps",
      deviceName: "REF",
      moderate: moderate400["REF UDP DL 400 M 10s"].Throughput.Mean,
      poor: poor400["REF UDP DL"].Throughput.Mean,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "400 Mbps",
      deviceName: "DUT",
      moderate: moderate400["DUT UDP DL 400 M 10s"].Throughput.Maximum,
      poor: poor400["DUT UDP DL"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "400 Mbps",
      deviceName: "REF",
      moderate: moderate400["REF UDP DL 400 M 10s"].Throughput.Maximum,
      poor: poor400["REF UDP DL"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "400 Mbps",
      deviceName: "DUT",
      moderate: moderate400["DUT UDP DL 400 M 10s"].Jitter.Mean,
      poor: poor400["DUT UDP DL"].Jitter.Mean,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "400 Mbps",
      deviceName: "REF",
      moderate: moderate400["REF UDP DL 400 M 10s"].Jitter.Mean,
      poor: poor400["REF UDP DL"].Jitter.Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "400 Mbps",
      deviceName: "DUT",
      moderate: moderate400["DUT UDP DL 400 M 10s"]["Error Ratio"].Mean,
      poor: poor400["DUT UDP DL"]["Error Ratio"].Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "400 Mbps",
      deviceName: "REF",
      moderate: moderate400["REF UDP DL 400 M 10s"]["Error Ratio"].Mean,
      poor: poor400["REF UDP DL"]["Error Ratio"].Mean,
    });
  }

  // Process UDP Upload Task at 10 Mbps for 10 seconds
  if (data.Moderate && data.Moderate["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"]) {
    const moderateUL10 = data.Moderate["5G NSA_UDP Upload Task at 10 Mbps for 10 seconds"];
    const poorUL10 = data.Poor["UDP Upload Task at 10 Mbps for 10 seconds"];

    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "10 Mbps",
      deviceName: "DUT",
      moderate: moderateUL10["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"].Throughput.Mean,
      poor: poorUL10["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"].Throughput.Mean,
    });
    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "10 Mbps",
      deviceName: "REF",
      moderate: moderateUL10["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"].Throughput.Mean,
      poor: poorUL10["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"].Throughput.Mean,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "10 Mbps",
      deviceName: "DUT",
      moderate: moderateUL10["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"].Throughput.Maximum,
      poor: poorUL10["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "10 Mbps",
      deviceName: "REF",
      moderate: moderateUL10["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"].Throughput.Maximum,
      poor: poorUL10["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "10 Mbps",
      deviceName: "DUT",
      moderate: moderateUL10["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"].Jitter.Mean,
      poor: poorUL10["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"].Jitter.Mean,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "10 Mbps",
      deviceName: "REF",
      moderate: moderateUL10["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"].Jitter.Mean,
      poor: poorUL10["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"].Jitter.Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "10 Mbps",
      deviceName: "DUT",
      moderate: moderateUL10["_20250930_144823_CH01_TMO-dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]["Error Ratio"].Mean,
      poor: poorUL10["dut_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]["Error Ratio"].Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "10 Mbps",
      deviceName: "REF",
      moderate: moderateUL10["_20250930_144823_CH02_TMO-ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_location2_DA Test"]["Error Ratio"].Mean,
      poor: poorUL10["ref_5G NSA_UDP Upload Task at 10 Mbps for 10 seconds_Poor"]["Error Ratio"].Mean,
    });
  }

  // Process UDP Upload Task at 20 Mbps for 10 seconds
  if (data.Moderate && data.Moderate["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"]) {
    const moderateUL20 = data.Moderate["5G NSA_UDP Upload Task at 20 Mbps for 10 seconds"];
    const poorUL20 = data.Poor["UDP Upload Task at 20 Mbps for 10 seconds"];

    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "20 Mbps",
      deviceName: "DUT",
      moderate: moderateUL20["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"].Throughput.Mean,
      poor: poorUL20["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
    });
    tableData.push({
      metric: "Mean Throughput (Mbps)",
      idealThroughput: "20 Mbps",
      deviceName: "REF",
      moderate: moderateUL20["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"].Throughput.Mean,
      poor: poorUL20["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Mean,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "20 Mbps",
      deviceName: "DUT",
      moderate: moderateUL20["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"].Throughput.Maximum,
      poor: poorUL20["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Max Throughput (Mbps)",
      idealThroughput: "20 Mbps",
      deviceName: "REF",
      moderate: moderateUL20["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"].Throughput.Maximum,
      poor: poorUL20["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"].Throughput.Maximum,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "20 Mbps",
      deviceName: "DUT",
      moderate: moderateUL20["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"].Jitter.Mean,
      poor: poorUL20["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
    });
    tableData.push({
      metric: "Mean Jitter (ms)",
      idealThroughput: "20 Mbps",
      deviceName: "REF",
      moderate: moderateUL20["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"].Jitter.Mean,
      poor: poorUL20["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"].Jitter.Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "20 Mbps",
      deviceName: "DUT",
      moderate: moderateUL20["_20250930_145837_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]["Error Ratio"].Mean,
      poor: poorUL20["_20250914_144028_CH01_TMO-dut_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
    });
    tableData.push({
      metric: "Packet Failure Rate (Error Ratio) (%)",
      idealThroughput: "20 Mbps",
      deviceName: "REF",
      moderate: moderateUL20["_20250930_145837_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_location2_DA Test"]["Error Ratio"].Mean,
      poor: poorUL20["_20250914_144028_CH02_TMO-ref_5G NSA_UDP Upload Task at 20 Mbps for 10 seconds_Poor Coverage_DA Test"]["Error Ratio"].Mean,
    });
  }


  return (
    <div className="">
      <h3>{tableName}</h3>
      <table className="general-table-style udp-stationary-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Metric</th>
            <th rowSpan="2">Ideal Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan="2">Location</th>
          </tr>
          <tr>
            <th>Moderate</th>
            <th>Poor</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const showMetric = row.metric !== prevMetric;
            const showIdealThroughput = row.idealThroughput !== prevIdealThroughput;

            // Update for the next iteration
            prevMetric = row.metric;
            prevIdealThroughput = row.idealThroughput;

            return (
              <tr key={index}>
                {showMetric && (
                  <td rowSpan={getMetricRowSpan(row.metric)}>{row.metric}</td>
                )}
                {showIdealThroughput && (
                  <td rowSpan={getRowSpan(row.metric, row.idealThroughput)}>{row.idealThroughput}</td>
                )}
                <td>{row.deviceName}</td>
                <td>{calculateOverallAverage(row.moderate, row.poor)}</td>
                <td>{row.moderate !== undefined && row.moderate !== null ? row.moderate.toFixed(2) : 'N/A'}</td>
                <td>{row.poor !== undefined && row.poor !== null ? row.poor.toFixed(2) : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSAUDPTable;