import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const HPUECoverageTable = ({ n41Data }) => {
    return (
        <div className='page-content'>
            <h2>2.2 5G n41 HPUE Coverage Test</h2>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th>Power Class</th>
                        <th>Metrics</th>
                        <th>Run1</th>
                        <th>Run2</th>
                        <th>Run3</th>
                        <th>Run4</th>
                        <th>Run5</th>
                        <th>Average</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2}>Power Class 2</td>
                        <td>UL &lt; 1Mbps Distance (km)</td>
                        <td>{n41Data.PC2.distances[0]}</td>
                        <td>{n41Data.PC2.distances[1]}</td>
                        <td>{n41Data.PC2.distances[2]}</td>
                        <td>{n41Data.PC2.distances[3]}</td>
                        <td>{n41Data.PC2.distances[4]}</td>
                        <td>{n41Data.PC2.distances[5]}</td>
                    </tr>
                    <tr>
                        <td>Tx Power (dBm)</td>
                        <td>{n41Data.PC2.txPowers[0]}</td>
                        <td>{n41Data.PC2.txPowers[1]}</td>
                        <td>{n41Data.PC2.txPowers[2]}</td>
                        <td>{n41Data.PC2.txPowers[3]}</td>
                        <td>{n41Data.PC2.txPowers[4]}</td>
                        <td>{n41Data.PC2.txPowers[5]}</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Power Class 3</td>
                        <td>UL &lt; 1Mbps Distance (km)</td>
                        <td>{n41Data.PC3.distances[0]}</td>
                        <td>{n41Data.PC3.distances[1]}</td>
                        <td>{n41Data.PC3.distances[2]}</td>
                        <td>{n41Data.PC3.distances[3]}</td>
                        <td>{n41Data.PC3.distances[4]}</td>
                        <td>{n41Data.PC3.distances[5]}</td>
                    </tr>
                    <tr>
                        <td>Tx Power (dBm)</td>
                        <td>{n41Data.PC3.txPowers[0]}</td>
                        <td>{n41Data.PC3.txPowers[1]}</td>
                        <td>{n41Data.PC3.txPowers[2]}</td>
                        <td>{n41Data.PC3.txPowers[3]}</td>
                        <td>{n41Data.PC3.txPowers[4]}</td>
                        <td>{n41Data.PC3.txPowers[5]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HPUECoverageTable;
