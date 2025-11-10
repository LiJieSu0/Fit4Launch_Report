import React from 'react';
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
import vqMosStatistics from '../../../DataFiles/Vq/vq_mos_statistics.json';

const VqLineChart = () => {
  // Process data from vq_mos_statistics.json
  const mosCategories = Object.keys(vqMosStatistics.DUT1); // Assuming all entities have the same MOS categories

  const data = mosCategories.map(category => {
    const dataPoint = { category: category };
    Object.keys(vqMosStatistics).forEach(entity => {
      dataPoint[entity] = vqMosStatistics[entity][category]?.percentage || 0;
    });
    return dataPoint;
  });

  const entities = [
    { key: 'DUT1', color: '#8884d8' },
    { key: 'DUT2', color: '#82ca9d' },
    { key: 'REF1', color: '#ffc658' },
    { key: 'REF2', color: '#ff7300' },
  ];

  // Custom Y-axis tick formatter to display percentages
  const formatYAxis = (tick) => `${tick}%`;

  return (
    <div style={{ width: '50%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
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