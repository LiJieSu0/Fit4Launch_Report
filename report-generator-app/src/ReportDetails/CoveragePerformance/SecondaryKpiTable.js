import React from 'react';

const SecondaryKpiTable = ({ data }) => (
    <table className="general-table-style">
        <thead>
            <tr>
                <th rowSpan="2">Run</th>
                <th rowSpan="2">Segment</th>
                <th colSpan="2">AVG BLER</th>
                <th colSpan="2">AVG DL MCS</th>
                <th colSpan="2">AVG UL MCS</th>
                <th colSpan="2">AVG TxPower (dBm)</th>
            </tr>
            <tr>
                <th>DUT</th>
                <th>REF</th>
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
                    {runData.segments.map((segmentData, segmentIndex) => {
                        const totalSegments = runData.segments.length;
                        const isFirst30 = segmentIndex < Math.ceil(totalSegments * 0.3);
                        const isLast30 = segmentIndex >= totalSegments - Math.ceil(totalSegments * 0.3);
                        const highlightClass = (isFirst30 || isLast30) ? 'highlight-beige' : '';

                        return (
                            <tr
                                key={`${runIndex}-${segmentIndex}`}
                                className={segmentIndex === totalSegments - 1 ? 'run-divider' : ''}
                            >
                                {segmentIndex === 0 && (
                                    <td className="run-divider" rowSpan={totalSegments}>{runData.run}</td>
                                )}
                                <td className={highlightClass}>{segmentData.segment}</td>
                                <td className={highlightClass}>{segmentData.DUT && typeof segmentData.DUT.bler === 'number' ? segmentData.DUT.bler.toFixed(2) : '0.00'}</td>
                                <td className={highlightClass}>{segmentData.REF && typeof segmentData.REF.bler === 'number' ? segmentData.REF.bler.toFixed(2) : '0.00'}</td>
                                <td className={highlightClass}>{segmentData.DUT && typeof segmentData.DUT.dlMcs === 'number' ? segmentData.DUT.dlMcs.toFixed(2) : '0.00'}</td>
                                <td className={highlightClass}>{segmentData.REF && typeof segmentData.REF.dlMcs === 'number' ? segmentData.REF.dlMcs.toFixed(2) : '0.00'}</td>
                                <td className={highlightClass}>{segmentData.DUT && typeof segmentData.DUT.ulMcs === 'number' ? segmentData.DUT.ulMcs.toFixed(2) : '0.00'}</td>
                                <td className={highlightClass}>{segmentData.REF && typeof segmentData.REF.ulMcs === 'number' ? segmentData.REF.ulMcs.toFixed(2) : '0.00'}</td>

                                {/* Render TxPower only on the first row of the run, spanning all segments */}
                                {segmentIndex === 0 && (
                                    <>
                                        <td className="run-divider" rowSpan={totalSegments}>
                                            {runData.txPower && typeof runData.txPower.DUT === 'number' ? runData.txPower.DUT.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="run-divider" rowSpan={totalSegments}>
                                            {runData.txPower && typeof runData.txPower.REF === 'number' ? runData.txPower.REF.toFixed(2) : '0.00'}
                                        </td>
                                    </>
                                )}
                            </tr>
                        );
                    })}
                </React.Fragment>
            ))}
        </tbody>
    </table>
);

export default SecondaryKpiTable;

