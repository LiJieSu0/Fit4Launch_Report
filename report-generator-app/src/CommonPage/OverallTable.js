import React from 'react';
import { getKpiCellColor } from '../Utils/KpiRules';

const OverallTable = ({ tableHeader, tableData, kpiRule, kpiTargetCells }) => {
  if (!tableHeader || tableHeader.length === 0 || !tableData) {
    return <p>No table data available.</p>;
  }

  const processedTableData = [];
  for (let i = 0; i < tableData.length; i++) {
    const currentRow = tableData[i];
    const firstColumnValue = currentRow[0];
    let rowSpan = 1;

    // Check for duplicate values in the first column
    for (let j = i + 1; j < tableData.length; j++) {
      if (tableData[j][0] === firstColumnValue) {
        rowSpan++;
      } else {
        break;
      }
    }

    processedTableData.push({
      row: currentRow,
      rowSpan: rowSpan,
      isMerged: false, // Flag to indicate if this row's first cell has been merged
    });

    // Mark subsequent duplicate rows as merged
    for (let k = i + 1; k < i + rowSpan; k++) {
      processedTableData[k] = {
        row: tableData[k],
        rowSpan: 0, // Set rowSpan to 0 for merged cells
        isMerged: true,
      };
    }
    i += rowSpan - 1; // Skip the merged rows
  }

  return (
    <table className="general-table-style">
      <thead>
        <tr>
          <th rowSpan="2">{tableHeader[0]}</th>
          <th rowSpan="2">{tableHeader[1]}</th>
          <th colSpan="2">Seattle (5G NR)</th>
        </tr>
        <tr>
          <th key={2}>{tableHeader[2]}</th>
          <th key={3}>{tableHeader[3]}</th>
        </tr>
      </thead>
      <tbody>
        {processedTableData.map((processedRow, rowIndex) => (
          <tr key={rowIndex}>
            {processedRow.row.map((cell, cellIndex) => {
              if (cellIndex === 0) {
                if (!processedRow.isMerged) {
                  return (
                    <td key={cellIndex} rowSpan={processedRow.rowSpan}>
                      {cell}
                    </td>
                  );
                }
                return null; // Don't render merged cells
              }

              let cellStyle = {};
              if (kpiRule && kpiTargetCells) {
                const targetCell = kpiTargetCells.find(
                  (target) => target.rowIndex === rowIndex && target.colIndex === cellIndex
                );
                if (targetCell) {
                  const color = getKpiCellColor(kpiRule, parseFloat(targetCell.dutValue), parseFloat(targetCell.refValue));
                  if (color) {
                    cellStyle = { backgroundColor: color };
                  }
                }
              }
              return <td key={cellIndex} style={cellStyle}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OverallTable;