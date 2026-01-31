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

const WfcRssiLineChart = ({ tc, city = 'Seattle' }) => {
    const [chartData, setChartData] = useState([]);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Filename format: wfc_rssi_statistics_tc151.json
                const response = await fetch(`/AnalyzeResults/${city}/wfc_rssi_linechart_data/wfc_rssi_statistics_${tc.toLowerCase()}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const wfcRssiStatistics = await response.json();

                // Get categories from the first entity (e.g., "DUT MO")
                const firstEntityKey = Object.keys(wfcRssiStatistics)[0];
                if (!firstEntityKey) {
                    throw new Error("No data entities found in JSON");
                }

                const rssiCategories = Object.keys(wfcRssiStatistics[firstEntityKey]);

                const processedData = rssiCategories.map(category => {
                    const dataPoint = { category: category };
                    Object.keys(wfcRssiStatistics).forEach(entity => {
                        dataPoint[entity] = wfcRssiStatistics[entity][category]?.percentage || 0;
                    });
                    return dataPoint;
                });

                setChartData(processedData);

                const entityConfig = {
                    "DUT MO": { color: '#0a18e2ff' },
                    "DUT MT": { color: '#0de70dff' },
                    "REF MO": { color: '#e6141eff' },
                    "REF MT": { color: '#ff39e5ff' },
                    "DUT": { color: '#0a18e2ff' },
                    "REF": { color: '#e6141eff' }
                };

                const loadedEntities = Object.keys(wfcRssiStatistics).map(entity => {
                    return {
                        key: entity,
                        color: entityConfig[entity]?.color || '#8884d8'
                    };
                });
                setEntities(loadedEntities);

            } catch (error) {
                console.error("Error loading data for WfcRssiLineChart:", error);
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
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading RSSI chart data...</div>;
    }

    if (chartData.length === 0) {
        return null;
    }

    return (
        <div style={{ width: '50%', height: 300, marginTop: '5px' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>RSSI Distribution</h4>
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
                        interval={3}
                        angle={-45}
                        textAnchor="end"
                        tick={{ fontSize: 10 }}
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

export default WfcRssiLineChart;
