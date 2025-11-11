import React from 'react';

function DpMHSUdpTable({ data, IdealThroughput }) {
  const categories = ["Average", "Standard Deviation", "Maximum", "Minimum"];

  const tableData = [];

  categories.forEach((category) => {
    IdealThroughput.forEach((throughput) => {
      const dutData = data.find(
        (item) =>
          item.Category === category &&
          item.IdealThroughput === throughput &&
          item.DeviceName === "DUT"
      );
      const refData = data.find(
        (item) =>
          item.Category === category &&
          item.IdealThroughput === throughput &&
          item.DeviceName === "REF"
      );

      tableData.push({
        category: category,
        idealThroughput: throughput,
        deviceName: "DUT",
        overall: dutData ? dutData.Overall : "",
        site1: dutData ? dutData.Site1 : "",
        site2: dutData ? dutData.Site2 : "",
      });
      tableData.push({
        category: category,
        idealThroughput: throughput,
        deviceName: "REF",
        overall: refData ? refData.Overall : "",
        site1: refData ? refData.Site1 : "",
        site2: refData ? refData.Site2 : "",
      });
    });
  });

  return (
    <div className="">
      <table className="general-table-style dp-details-table">
        <thead>
          <tr>
            <th rowSpan="2">Throughput</th>
            <th rowSpan="2">Ideal Throughput</th>
            <th rowSpan="2">Device Name</th>
            <th rowSpan="2">Overall</th>
            <th colSpan="2">Location</th>
          </tr>
          <tr>
            <th>Site 1</th>
            <th>Site 2</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {row.deviceName === "DUT" && index % 4 === 0 && (
                <td rowSpan="4">{row.category}</td>
              )}
              {row.deviceName === "DUT" && (index % 4 === 0 || index % 4 === 2) && (
                <td rowSpan="2">{row.idealThroughput}</td>
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

export default DpMHSUdpTable;