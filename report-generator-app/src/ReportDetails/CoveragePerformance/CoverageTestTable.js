import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const CoverageTestTable = ({ tableData }) => {

    return (
            <table className="device-info-table">
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
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.device}</td>
                            <td>{row.run1}</td>
                            <td>{row.run2}</td>
                            <td>{row.run3}</td>
                            <td>{row.run4}</td>
                            <td>{row.run5}</td>
                            <td>{row.average}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default CoverageTestTable;