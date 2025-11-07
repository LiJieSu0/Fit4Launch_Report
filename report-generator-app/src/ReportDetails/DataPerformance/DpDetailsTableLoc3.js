import React from 'react';

function DpDetailsTableLoc3({ data }) {
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: ((data.Good.DUT.Mean + data.Moderate.DUT.Mean + data.Poor.DUT.Mean) / 3).toFixed(2),
      site1: data.Good.DUT.Mean.toFixed(2),
      site2: data.Moderate.DUT.Mean.toFixed(2),
      site3: data.Poor.DUT.Mean.toFixed(2)
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: ((data.Good.REF.Mean + data.Moderate.REF.Mean + data.Poor.REF.Mean) / 3).toFixed(2),
      site1: data.Good.REF.Mean.toFixed(2),
      site2: data.Moderate.REF.Mean.toFixed(2),
      site3: data.Poor.REF.Mean.toFixed(2)
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: ((data.Good.DUT["Standard Deviation"] + data.Moderate.DUT["Standard Deviation"] + data.Poor.DUT["Standard Deviation"]) / 3).toFixed(2),
      site1: data.Good.DUT["Standard Deviation"].toFixed(2),
      site2: data.Moderate.DUT["Standard Deviation"].toFixed(2),
      site3: data.Poor.DUT["Standard Deviation"].toFixed(2)
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: ((data.Good.REF["Standard Deviation"] + data.Moderate.REF["Standard Deviation"] + data.Poor.REF["Standard Deviation"]) / 3).toFixed(2),
      site1: data.Good.REF["Standard Deviation"].toFixed(2),
      site2: data.Moderate.REF["Standard Deviation"].toFixed(2),
      site3: data.Poor.REF["Standard Deviation"].toFixed(2)
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: ((data.Good.DUT.Maximum + data.Moderate.DUT.Maximum + data.Poor.DUT.Maximum) / 3).toFixed(2),
      site1: data.Good.DUT.Maximum.toFixed(2),
      site2: data.Moderate.DUT.Maximum.toFixed(2),
      site3: data.Poor.DUT.Maximum.toFixed(2)
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: ((data.Good.REF.Maximum + data.Moderate.REF.Maximum + data.Poor.REF.Maximum) / 3).toFixed(2),
      site1: data.Good.REF.Maximum.toFixed(2),
      site2: data.Moderate.REF.Maximum.toFixed(2),
      site3: data.Poor.REF.Maximum.toFixed(2)
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: ((data.Good.DUT.Minimum + data.Moderate.DUT.Minimum + data.Poor.DUT.Minimum) / 3).toFixed(2),
      site1: data.Good.DUT.Minimum.toFixed(2),
      site2: data.Moderate.DUT.Minimum.toFixed(2),
      site3: data.Poor.DUT.Minimum.toFixed(2)
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: ((data.Good.REF.Minimum + data.Moderate.REF.Minimum + data.Poor.REF.Minimum) / 3).toFixed(2),
      site1: data.Good.REF.Minimum.toFixed(2),
      site2: data.Moderate.REF.Minimum.toFixed(2),
      site3: data.Poor.REF.Minimum.toFixed(2)
    },
  ];

  return (
    <div className="">
      <h3>Table Name here</h3>
      <table className="device-info-table dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan="3">Location</th>
          </tr>
          <tr>
            <th>Good</th>
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
              <td>{row.site3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DpDetailsTableLoc3;