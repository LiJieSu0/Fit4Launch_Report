import React from 'react';

function DpNSAHttpMSTable({ data, tableName }) {
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean + data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Mean) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean.toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Mean.toFixed(2),
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean + data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Mean) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Mean.toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Mean.toFixed(2),
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput["Standard Deviation"] + data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput["Standard Deviation"]) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput["Standard Deviation"].toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput["Standard Deviation"].toFixed(2),
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput["Standard Deviation"] + data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput["Standard Deviation"]) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput["Standard Deviation"].toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput["Standard Deviation"].toFixed(2),
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Maximum + data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Maximum) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Maximum.toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Maximum.toFixed(2),
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Maximum + data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Maximum) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Maximum.toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Maximum.toFixed(2),
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Minimum + data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Minimum) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["DUT_Multi Stream HTTP Download for 30 seconds"].Throughput.Minimum.toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["DUT HTTP DL"].Throughput.Minimum.toFixed(2),
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: ((data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Minimum + data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Minimum) / 2).toFixed(2),
      site1: data.Moderate["Multi Stream HTTP Download for 30 seconds"]["REF_Multi Stream HTTP Download for 30 seconds"].Throughput.Minimum.toFixed(2),
      site2: data.Poor["Multi Stream HTTP Download for 30 seconds"]["REF HTTP DL"].Throughput.Minimum.toFixed(2),
    },
  ];

  return (
    <div className="">
      <h3>{tableName}</h3>
      <table className="general-table-style dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput</th>
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
          {tableData.map((row, index) => (
            <tr key={index}>
              {row.deviceName === "DUT" && (
                <td rowSpan="2">{row.category}</td>
              )}
              <td>{row.deviceName}</td>
              <td>{row.overall}</td>
              <td>{row.site1}</td>
              <td>{row.site2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DpNSAHttpMSTable;