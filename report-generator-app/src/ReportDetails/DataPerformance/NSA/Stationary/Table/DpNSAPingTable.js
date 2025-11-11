import React from 'react';
import '../../../../../StyleScript/Restricted_Report_Style.css';

const DpNSAPingTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="">
                <table className="general-table-style dp-details-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Ping RTT (ms)</th>
                            <th rowSpan="2">Device Name</th>
                            <th rowSpan="2">Overall</th>
                            <th colSpan="2">Location</th>
                        </tr>
                        <tr>
                            <th>Moderate</th>
                            <th>Poor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="5">No data available</td></tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const calculateOverall = (moderate, poor) => {
        const moderateVal = parseFloat(moderate);
        const poorVal = parseFloat(poor);
        if (isNaN(moderateVal) || isNaN(poorVal)) {
            return "N/A";
        }
        return ((moderateVal + poorVal) / 2).toFixed(2);
    };

    return (
        <div className="">
            <table className="general-table-style dp-details-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Ping RTT (ms)</th>
                        <th rowSpan="2">Device Name</th>
                        <th rowSpan="2">Overall</th>
                        <th colSpan="2">Location</th>
                    </tr>
                    <tr>
                        <th>Moderate</th>
                        <th>Poor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan="2">Average</td>
                        <td>DUT</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].avg, data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].avg)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].avg).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].avg).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].avg, data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].avg)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].avg).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].avg).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Standard Deviation</td>
                        <td>DUT</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].std_dev, data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].std_dev)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].std_dev).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].std_dev).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].std_dev, data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].std_dev)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].std_dev).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].std_dev).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Maximum</td>
                        <td>DUT</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].max, data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].max)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].max).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].max).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].max, data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].max)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].max).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].max).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">Minimum</td>
                        <td>DUT</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].min, data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].min)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH01_TMO_5G NSA_Ping_DUT_"]["Ping RTT"].min).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH01_TMO-dut_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].min).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>REF</td>
                        <td>{calculateOverall(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].min, data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].min)}</td>
                        <td>{parseFloat(data.Moderate["5G NSA_25x64 bytes PING_moderate"]["_20250911_150928_CH02_TMO_5G NSA_Ping_REF_"]["Ping RTT"].min).toFixed(2)}</td>
                        <td>{parseFloat(data.Poor["25x64 bytes PING (ICMP)"]["_CH02_TMO-ref_5G NSA_25x64 bytes PING (ICMP)_Poor Coverage_DA Test"]["Ping RTT"].min).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DpNSAPingTable;