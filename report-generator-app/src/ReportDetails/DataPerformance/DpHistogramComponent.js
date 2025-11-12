import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

const DpHistogramComponent = ({ data, title, yAxisLabel, barKeys }) => {
  return (
    <div>

    <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h3>
    <div style={{ width: '100%', height: '400px', minHeight: '300px' }}>
      <BarChart
        width={600}
        height={350}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        {Array.isArray(barKeys) && barKeys.map((bar, index) => (
          <Bar key={index} dataKey={bar.key} fill={bar.fill}>
          </Bar>
        ))}
      </BarChart>
    </div>
    </div>

  );
};

export default DpHistogramComponent;
