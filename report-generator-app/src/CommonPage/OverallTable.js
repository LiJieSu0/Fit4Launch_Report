import React from 'react';
import './OverallTable.module.css'; // Assuming a CSS module for styling

const OverallTable = ({ tableHeader, tableData }) => {
  if (!tableHeader || tableHeader.length === 0 || !tableData) {
    return <p>No table data available.</p>;
  }

  return (
    <table className="general-table-style">
      <thead>
        <tr>
          {tableHeader.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OverallTable;