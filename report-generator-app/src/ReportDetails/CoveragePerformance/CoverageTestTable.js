import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const CoverageTestTable = ({ tableData, status }) => {
    // Get all run keys from the first row of data (e.g., run1, run2, ...)
    const runKeys = tableData.length > 0
        ? Object.keys(tableData[0]).filter(key => key.startsWith('run')).sort((a, b) => {
            const numA = parseInt(a.replace('run', ''));
            const numB = parseInt(b.replace('run', ''));
            return numA - numB;
        })
        : [];

    return (
        <table className="general-table-style">
            <thead>
                <tr>
                    <th>Device Name (m)</th>
                    {runKeys.map(key => (
                        <th key={key}>Run{key.replace('run', '')}</th>
                    ))}
                    <th>Average</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, index) => {
                    const isDUT = row.device === 'DUT';
                    const averageClassName = isDUT ? (status === 'Pass' ? 'average-pass' : 'average-fail') : '';
                    return (
                        <tr key={index}>
                            <td>{row.device}</td>
                            {runKeys.map(key => (
                                <td key={key}>{row[key]?.toFixed(2) || '0.00'}</td>
                            ))}
                            <td className={averageClassName}>{row.average.toFixed(2)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CoverageTestTable;