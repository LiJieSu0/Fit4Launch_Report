import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const CoverageTestTable = ({ tableData, status }) => {

    return (
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Device Name</th>
                        <th>Run1</th>
                        <th>Run2</th>
                        <th>Run3</th>
                        <th>Run4</th>
                        <th>Run5</th>
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
                                <td>{row.run1.toFixed(2)}</td>
                                <td>{row.run2.toFixed(2)}</td>
                                <td>{row.run3.toFixed(2)}</td>
                                <td>{row.run4.toFixed(2)}</td>
                                <td>{row.run5.toFixed(2)}</td>
                                <td className={averageClassName}>{row.average.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    );
};

export default CoverageTestTable;