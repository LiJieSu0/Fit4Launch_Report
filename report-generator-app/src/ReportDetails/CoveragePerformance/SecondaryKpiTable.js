import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

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

                        const dutBler = segmentData.DUT?.bler;
                        const refBler = segmentData.REF?.bler;
                        const blerColor = getKpiCellColor('SecondaryBler', dutBler, refBler);

                        const dutDlMcs = segmentData.DUT?.dlMcs;
                        const refDlMcs = segmentData.REF?.dlMcs;
                        const dlMcsColor = getKpiCellColor('SecondaryMcs', dutDlMcs, refDlMcs);

                        const dutUlMcs = segmentData.DUT?.ulMcs;
                        const refUlMcs = segmentData.REF?.ulMcs;
                        const ulMcsColor = getKpiCellColor('SecondaryMcs', dutUlMcs, refUlMcs);

                        return (
                            <tr
                                key={`${runIndex}-${segmentIndex}`}
                                className={segmentIndex === totalSegments - 1 ? 'run-divider' : ''}
                            >
                                {segmentIndex === 0 && (
                                    <td className="run-divider" rowSpan={totalSegments}>{runData.run}</td>
                                )}
                                <td>{segmentData.segment}</td>
                                <td style={{ backgroundColor: blerColor ? `color-mix(in srgb, ${blerColor}, white var(--secondary-kpi-lightness))` : '', color: blerColor ? 'black' : '' }}>
                                    {typeof dutBler === 'number' ? dutBler.toFixed(2) : '0.00'}
                                </td>
                                <td>{typeof refBler === 'number' ? refBler.toFixed(2) : '0.00'}</td>
                                <td style={{ backgroundColor: dlMcsColor ? `color-mix(in srgb, ${dlMcsColor}, white var(--secondary-kpi-lightness))` : '', color: dlMcsColor ? 'black' : '' }}>
                                    {typeof dutDlMcs === 'number' ? dutDlMcs.toFixed(2) : '0.00'}
                                </td>
                                <td>{typeof refDlMcs === 'number' ? refDlMcs.toFixed(2) : '0.00'}</td>
                                <td style={{ backgroundColor: ulMcsColor ? `color-mix(in srgb, ${ulMcsColor}, white var(--secondary-kpi-lightness))` : '', color: ulMcsColor ? 'black' : '' }}>
                                    {typeof dutUlMcs === 'number' ? dutUlMcs.toFixed(2) : '0.00'}
                                </td>
                                <td>{typeof refUlMcs === 'number' ? refUlMcs.toFixed(2) : '0.00'}</td>

                                {segmentIndex === 0 && (
                                    <>
                                        {(() => {
                                            const dutTx = runData.txPower?.DUT;
                                            const refTx = runData.txPower?.REF;
                                            const txColor = getKpiCellColor('SecondaryTxPower', dutTx, refTx);
                                            return (
                                                <>
                                                    <td className="run-divider" rowSpan={totalSegments} style={{ backgroundColor: txColor ? `color-mix(in srgb, ${txColor}, white var(--secondary-kpi-lightness))` : '', color: txColor ? 'black' : '' }}>
                                                        {typeof dutTx === 'number' ? dutTx.toFixed(2) : '0.00'}
                                                    </td>
                                                    <td className="run-divider" rowSpan={totalSegments}>
                                                        {typeof refTx === 'number' ? refTx.toFixed(2) : '0.00'}
                                                    </td>
                                                </>
                                            );
                                        })()}
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

