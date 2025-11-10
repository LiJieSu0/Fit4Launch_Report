import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

function DpSummaryTable({ tableData }) {
  return (
    <div className="">
      <table className="general-table-style">
        <thead>
          <tr>
            {tableData.headers.map((header, index) => (
              <th key={index} rowSpan={header.rowSpan}>{header.label}</th>
            ))}
          </tr>
          {tableData.subHeaders && (
            <tr>
              {tableData.subHeaders.map((subHeader, index) => (
                <th key={index}>{subHeader.label}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.cells.map((cell, cellIndex) => (
                cell === null ? null : (
                  <td
                    key={cellIndex}
                    className={cell.className}
                    rowSpan={cell.rowSpan || 1}
                    colSpan={cell.colSpan || 1}
                  >
                    {cell.link ? <a href={cell.link}>{cell.label}</a> : cell.label}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DpSummaryTable;