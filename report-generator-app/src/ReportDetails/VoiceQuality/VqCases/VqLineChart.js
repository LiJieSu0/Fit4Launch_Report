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

const VqLineChart = ({ dataSource }) => {
  const [chartData, setChartData] = useState([]);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataModule = await import(`../../../DataFiles/Vq/${dataSource}.json`);
        const vqMosStatistics = dataModule.default;

        const mosCategories = Object.keys(vqMosStatistics.DUT1);

        const processedData = mosCategories.map(category => {
          const dataPoint = { category: category };
          Object.keys(vqMosStatistics).forEach(entity => {
            dataPoint[entity] = vqMosStatistics[entity][category]?.percentage || 0;
          });
          return dataPoint;
        });

        setChartData(processedData);

        const loadedEntities = Object.keys(vqMosStatistics).map((entity, index) => {
          const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300']; // Define colors for entities
          return { key: entity, color: colors[index % colors.length] };
        });
        setEntities(loadedEntities);

      } catch (error) {
        console.error("Error loading data for VqLineChart:", error);
        setChartData([]);
        setEntities([]);
      }
    };

    if (dataSource) {
      loadData();
    }
  }, [dataSource]);

  const formatYAxis = (tick) => `${tick}%`;

  if (chartData.length === 0) {
    return <div>No data available for the selected source.</div>;
  }

  return (
    <div style={{ width: '80%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis
            domain={[0, 50]}
            tickFormatter={formatYAxis}
            label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          {entities.map((entity) => (
            <Line
              key={entity.key}
              type="monotone"
              dataKey={entity.key}
              stroke={entity.color}
              strokeWidth={3}
              dot={false}
              name={entity.key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VqLineChart;