import React from 'react';

const SecondaryKpiTable = ({ data }) => (
    <table className="general-table-style">
        <thead>
            <tr>
                <th rowSpan="2">Run</th>
                <th rowSpan="2">Segment</th>
                <th colSpan="2">AVG BLER</th>
                <th colSpan="2">AVG MCS</th>
                <th colSpan="2">AVG TxPower (dBm)</th>
            </tr>
            <tr>
                <th>DUT</th>
                <th>REF</th>
                <th>DUT</th>
                <th>REF</th>
                <th>DUT</th>
                <th>REF</th>
            </tr>
        </thead>
        <tbody>
            {data.map((runData, runIndex) => (
                <React.Fragment key={runIndex}>
                    {runData.segments.map((segmentData, segmentIndex) => (
                        <tr key={`${runIndex}-${segmentIndex}`}>
                            {segmentIndex === 0 && (
                                <td rowSpan={runData.segments.length}>{runData.run}</td>
                            )}
                            <td>{segmentData.segment}</td>
                            <td>{segmentData.DUT && typeof segmentData.DUT.bler === 'number' ? segmentData.DUT.bler.toFixed(2) : '0.00'}</td>
                            <td>{segmentData.REF && typeof segmentData.REF.bler === 'number' ? segmentData.REF.bler.toFixed(2) : '0.00'}</td>
                            <td>{segmentData.DUT && typeof segmentData.DUT.mcs === 'number' ? segmentData.DUT.mcs.toFixed(2) : '0.00'}</td>
                            <td>{segmentData.REF && typeof segmentData.REF.mcs === 'number' ? segmentData.REF.mcs.toFixed(2) : '0.00'}</td>
                            <td>{segmentData.DUT && typeof segmentData.DUT.txPower === 'number' ? segmentData.DUT.txPower.toFixed(2) : '0.00'}</td>
                            <td>{segmentData.REF && typeof segmentData.REF.txPower === 'number' ? segmentData.REF.txPower.toFixed(2) : '0.00'}</td>
                        </tr>
                    ))}
                </React.Fragment>
            ))}
        </tbody>
    </table>
);

export default SecondaryKpiTable;
