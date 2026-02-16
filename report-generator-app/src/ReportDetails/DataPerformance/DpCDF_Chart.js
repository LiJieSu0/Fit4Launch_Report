import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
    ReferenceLine
} from 'recharts';
import { loadCdfData } from '../../Utils/CdfLoader';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../Constants/ChartColors';

const DpCDF_Chart = ({ project, city, dutFilename, refFilename, title }) => {
    const [data, setData] = useState({ dut: null, ref: null });
    const [loading, setLoading] = useState(true);

    const findValueAtPercent = (dataset, targetPercent) => {
        if (!dataset || dataset.length === 0) return 'N/A';
        // Ensure dataset is sorted by cumulative_percent
        // Usually CDF data is sorted by bin_end, and cumulative_percent is monotonic.

        // Find the first point >= targetPercent
        const index = dataset.findIndex(p => p.cumulative_percent >= targetPercent);

        if (index === -1) return dataset[dataset.length - 1].bin_end; // Should not happen if data goes to 100%
        if (index === 0) return dataset[0].bin_end;

        // Linear interpolation
        const p1 = dataset[index - 1];
        const p2 = dataset[index];

        const slope = (p2.bin_end - p1.bin_end) / (p2.cumulative_percent - p1.cumulative_percent);
        const interpolatedValue = p1.bin_end + slope * (targetPercent - p1.cumulative_percent);

        return interpolatedValue.toFixed(2);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [dutRes, refRes] = await Promise.all([
                dutFilename ? loadCdfData(project, city, dutFilename) : null,
                refFilename ? loadCdfData(project, city, refFilename) : null
            ]);

            const processCdf = (res) => {
                if (res && res.cdf) {
                    return [{ bin_end: res.min, cumulative_percent: 0 }, ...res.cdf];
                }
                return null;
            };

            setData({
                dut: processCdf(dutRes),
                ref: processCdf(refRes)
            });
            setLoading(false);
        };

        if (project && city && (dutFilename || refFilename)) {
            fetchData();
        }
    }, [project, city, dutFilename, refFilename]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading CDF Chart...</div>;
    }

    if (!data.dut && !data.ref) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>No CDF data available.</div>;
    }

    return (
        <div className="cdf-chart-container" style={{ margin: '20px 0', padding: '0px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '0px' }}>{title || 'Throughput CDF Comparison'}</h4>
            <div style={{ width: '50%', height: '250px' }}>
                <ResponsiveContainer>
                    <LineChart
                        margin={{
                            top: 5,
                            right: 150, // Increased right margin to accommodate labels
                            left: 20,
                            bottom: 25,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis
                            type="number"
                            dataKey="bin_end"
                            domain={['auto', 'auto']}
                            label={{ value: 'Throughput (Mbps)', position: 'bottom', offset: 0 }}
                        />
                        <YAxis
                            domain={[0, 100]}
                            label={{ value: 'Cumulative Percent (%)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                            formatter={(value) => [`${value}%`, 'Cumulative']}
                            labelFormatter={(label) => `Throughput: ${label} Mbps`}
                        />
                        <Legend verticalAlign="top" height={36} />

                        {/* Reference Lines at 5%, 25%, 50%, 75%, 95% */}
                        <ReferenceLine
                            y={5}
                            stroke="#db1b1bff"
                            strokeDasharray="5 5"
                            label={{
                                value: '5',
                                position: 'left',
                                fill: '#666',
                                fontSize: 15,
                                dy: -8
                            }}
                        />
                        {/* Custom Label for values at 5% */}
                        <ReferenceLine y={5} stroke="none" label={{
                            value: `DUT: ${findValueAtPercent(data.dut, 5)} | REF: ${findValueAtPercent(data.ref, 5)}`,
                            position: 'right',
                            fill: '#666',
                            fontSize: 12,
                            dy: -8
                        }} />

                        <ReferenceLine y={25} stroke="#ccc" strokeDasharray="5 5" />
                        <ReferenceLine y={50} stroke="#ccc" strokeDasharray="5 5" />
                        <ReferenceLine y={75} stroke="#ccc" strokeDasharray="5 5" />

                        <ReferenceLine
                            y={95}
                            stroke="#1548d4ff"
                            strokeDasharray="5 5"
                            label={{
                                value: '95',
                                position: 'left',
                                fill: '#666',
                                fontSize: 15,
                                dy: 8
                            }}
                        />
                        {/* Custom Label for values at 95% */}
                        <ReferenceLine y={95} stroke="none" label={{
                            value: `DUT: ${findValueAtPercent(data.dut, 95)} | REF: ${findValueAtPercent(data.ref, 95)}`,
                            position: 'right',
                            fill: '#666',
                            fontSize: 12,
                            dy: 8
                        }} />

                        {data.dut && (
                            <Line
                                name="DUT"
                                type="monotone"
                                data={data.dut}
                                dataKey="cumulative_percent"
                                stroke={CHART_COLOR_DUT}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 8 }}
                                baseLine={0}
                            />
                        )}
                        {data.ref && (
                            <Line
                                name="REF"
                                type="monotone"
                                data={data.ref}
                                dataKey="cumulative_percent"
                                stroke={CHART_COLOR_REF}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 8 }}
                                baseLine={0}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DpCDF_Chart;
