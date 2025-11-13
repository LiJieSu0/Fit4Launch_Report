import React from 'react';

const DpUdpOverallTable = ({ data, headers }) => {
  if (!data || data.length === 0 || !headers || headers.length === 0) {
    return <div>No data or headers available for UDP Overall Table.</div>;
  }

  return (
    <table className="general-table-style">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DpUdpOverallTable;