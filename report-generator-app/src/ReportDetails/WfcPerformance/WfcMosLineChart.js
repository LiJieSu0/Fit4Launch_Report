import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const WfcMosLineChart = ({ tc, city = 'Seattle' }) => {
    const [chartData, setChartData] = useState([]);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Filename format: wfc_mos_statistics_tc150.json
                const response = await fetch(`/AnalyzeResults/${city}/wfc_linechart_data/wfc_mos_statistics_${tc.toLowerCase()}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const wfcMosStatistics = await response.json();

                // Get categories from the first entity (e.g., "DUT MO")
                const firstEntityKey = Object.keys(wfcMosStatistics)[0];
                if (!firstEntityKey) {
                    throw new Error("No data entities found in JSON");
                }

                const mosCategories = Object.keys(wfcMosStatistics[firstEntityKey]);

                const processedData = mosCategories.map(category => {
                    const dataPoint = { category: category };
                    Object.keys(wfcMosStatistics).forEach(entity => {
                        dataPoint[entity] = wfcMosStatistics[entity][category]?.percentage || 0;
                    });
                    return dataPoint;
                });

                setChartData(processedData);

                const entityConfig = {
                    "DUT MO": { color: '#0a18e2ff' },
                    "DUT MT": { color: '#0de70dff' },
                    "REF MO": { color: '#e6141eff' },
                    "REF MT": { color: '#ff39e5ff' }
                };

                const loadedEntities = Object.keys(wfcMosStatistics).map(entity => {
                    return {
                        key: entity,
                        color: entityConfig[entity]?.color || '#8884d8'
                    };
                });
                setEntities(loadedEntities);

            } catch (error) {
                console.error("Error loading data for WfcMosLineChart:", error);
                setChartData([]);
                setEntities([]);
            } finally {
                setLoading(false);
            }
        };

        if (tc) {
            loadData();
        }
    }, [tc, city]);

    const formatYAxis = (tick) => `${tick}%`;

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading chart data...</div>;
    }

    if (chartData.length === 0) {
        return null; // Return null if no data to avoid clashing with the layout
    }

    return (
        <div style={{ width: '50%', height: 300, marginTop: '5px' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>MOS Distribution</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="category"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        tickFormatter={formatYAxis}
                        label={{ value: 'Percentage', angle: -90, position: 'insideLeft', offset: 0 }}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {entities.map((entity) => (
                        <Line
                            key={entity.key}
                            type="monotone"
                            dataKey={entity.key}
                            stroke={entity.color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                            name={entity.key}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WfcMosLineChart;
