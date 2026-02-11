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

const DpCDF_Chart = ({ project, city, filename, title }) => {
    const [cdfData, setCdfData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await loadCdfData(project, city, filename);
            if (data && data.cdf) {
                // Add a 0,0 point for better visual start if min is not already 0
                const plotData = [{ bin_end: data.min, cumulative_percent: 0 }, ...data.cdf];
                setCdfData(plotData);
            } else {
                setCdfData(null);
            }
            setLoading(false);
        };

        if (project && city && filename) {
            fetchData();
        }
    }, [project, city, filename]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading CDF Chart...</div>;
    }

    if (!cdfData || cdfData.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>No CDF data available for {filename}</div>;
    }

    return (
        <div className="cdf-chart-container" style={{ margin: '20px 0', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>{title || 'Throughput CDF'}</h4>
            <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveContainer>
                    <LineChart
                        data={cdfData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 25,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis
                            dataKey="bin_end"
                            type="number"
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

                        {/* Reference Lines at 25%, 50%, 75% */}
                        <ReferenceLine y={25} stroke="#ccc" strokeDasharray="5 5" />
                        <ReferenceLine y={50} stroke="#ccc" strokeDasharray="5 5" />
                        <ReferenceLine y={75} stroke="#ccc" strokeDasharray="5 5" />

                        <Line
                            name="Throughput CDF"
                            type="monotone"
                            dataKey="cumulative_percent"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 8 }}
                            baseLine={0}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DpCDF_Chart;
