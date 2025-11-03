import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const CpCaseTable = ({ title, data }) => {
    const dut = data.DUT;
    const ref = data.REF;

    // Calculate percentages
    const dutSuccessfulInitiationsPercentage = (dut.total_initiation_successes / dut.total_attempts * 100).toFixed(2);
    const dutFailedInitiationsPercentage = (dut.total_initiation_failures / dut.total_attempts * 100).toFixed(2);
    const refSuccessfulInitiationsPercentage = (ref.total_initiation_successes / ref.total_attempts * 100).toFixed(2);
    const refFailedInitiationsPercentage = (ref.total_initiation_failures / ref.total_attempts * 100).toFixed(2);

    return (
        <div className="">
            <h2>{title}</h2>
            <table className="performance-table">
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Connection Attempts</th>
                        <th>Mean Setup Time (s)</th>
                        <th>Successful Initiations</th>
                        <th>Successful Initiations (%)</th>
                        <th>Failed Initiations</th>
                        <th>Failed Initiations (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>REF</td>
                        <td>{ref.total_attempts}</td>
                        <td>{ref.mean_setup_time.toFixed(2)}</td>
                        <td>{ref.total_initiation_successes}</td>
                        <td>{refSuccessfulInitiationsPercentage}%</td>
                        <td>{ref.total_initiation_failures}</td>
                        <td>{refFailedInitiationsPercentage}%</td>
                    </tr>
                    <tr>
                        <td>DUT</td>
                        <td>{dut.total_attempts}</td>
                        <td>{dut.mean_setup_time.toFixed(2)}</td>
                        <td>{dut.total_initiation_successes}</td>
                        <td>{dutSuccessfulInitiationsPercentage}%</td>
                        <td>{dut.total_initiation_failures}</td>
                        <td>{dutFailedInitiationsPercentage}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CpCaseTable;