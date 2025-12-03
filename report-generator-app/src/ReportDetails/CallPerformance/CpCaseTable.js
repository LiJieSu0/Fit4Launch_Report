import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const CpCaseTable = ({ title, data }) => {
    const dut = data?.DUT || {};
    const ref = data?.REF || {};

    // Calculate percentages, providing default values for calculations
    const dutTotalAttempts = dut.total_attempts || 0;
    const dutSuccessfulInitiations = dut.total_initiation_successes || 0;
    const dutFailedInitiations = dut.total_initiation_failures || 0;

    const refTotalAttempts = ref.total_attempts || 0;
    const refSuccessfulInitiations = ref.total_initiation_successes || 0;
    const refFailedInitiations = ref.total_initiation_failures || 0;

    const dutSuccessfulInitiationsPercentage = dutTotalAttempts > 0 ? (dutSuccessfulInitiations / dutTotalAttempts * 100).toFixed(2) : (0).toFixed(2);
    const dutFailedInitiationsPercentage = dutTotalAttempts > 0 ? (dutFailedInitiations / dutTotalAttempts * 100).toFixed(2) : (0).toFixed(2);
    const refSuccessfulInitiationsPercentage = refTotalAttempts > 0 ? (refSuccessfulInitiations / refTotalAttempts * 100).toFixed(2) : (0).toFixed(2);
    const refFailedInitiationsPercentage = refTotalAttempts > 0 ? (refFailedInitiations / refTotalAttempts * 100).toFixed(2) : (0).toFixed(2);

    return (
        <div className="">
            <h2>{title}</h2>
            <table className="performance-table general-table-style">
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
                        <td>DUT</td>
                        <td>{dutTotalAttempts}</td>
                        <td>{(dut.mean_setup_time || 0).toFixed(2)}</td>
                        <td>{dutSuccessfulInitiations}</td>
                        <td>{dutSuccessfulInitiationsPercentage}%</td>
                        <td>{dutFailedInitiations}</td>
                        <td>{dutFailedInitiationsPercentage}%</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{refTotalAttempts}</td>
                        <td>{(ref.mean_setup_time || 0).toFixed(2)}</td>
                        <td>{refSuccessfulInitiations}</td>
                        <td>{refSuccessfulInitiationsPercentage}%</td>
                        <td>{refFailedInitiations}</td>
                        <td>{refFailedInitiationsPercentage}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CpCaseTable;