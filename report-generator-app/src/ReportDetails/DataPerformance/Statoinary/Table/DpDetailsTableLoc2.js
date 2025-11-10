import React from 'react';

function DpDetailsTableLoc2() {
  // Placeholder data for now
  const tableData = [
    {
      category: "Average",
      deviceName: "DUT",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Average",
      deviceName: "REF",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Standard Deviation",
      deviceName: "DUT",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Standard Deviation",
      deviceName: "REF",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Maximum",
      deviceName: "DUT",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Maximum",
      deviceName: "REF",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Minimum",
      deviceName: "DUT",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Minimum",
      deviceName: "REF",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
  ];

  return (
    <div className="">
      <table className="general-table-style dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
          </tr>
          <tr>
            <th>Site 1</th>
            <th>Site 2</th>
            <th>Site 3</th>
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

export default DpDetailsTableLoc2;