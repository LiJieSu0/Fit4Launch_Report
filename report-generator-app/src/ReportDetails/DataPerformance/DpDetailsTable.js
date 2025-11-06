import React from 'react';

function DpDetailsTable() {
  // Placeholder data for now
  const tableData = [
    {
      category: "Average",
      deviceName: "Reference(5G)",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Average",
      deviceName: "Wingtech Plunkett",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Standard Deviation",
      deviceName: "Reference(5G)",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Standard Deviation",
      deviceName: "Wingtech Plunkett",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Maximum",
      deviceName: "Reference(5G)",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Maximum",
      deviceName: "Wingtech Plunkett",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Minimum",
      deviceName: "Reference(5G)",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
    {
      category: "Minimum",
      deviceName: "Wingtech Plunkett",
      overall: "",
      site1: "",
      site2: "",
      site3: ""
    },
  ];

  return (
    <div className="page-content">
      <table className="device-info-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput (kbps)</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan="3">Stationary</th>
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
              {row.deviceName === "Reference(5G)" && (
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

export default DpDetailsTable;