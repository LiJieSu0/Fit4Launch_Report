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

const data = [
  {
    name: 'Drive',
    'Reference(5G)': 27,
    'Wingtech Plunkett': 29,
  },
  {
    name: 'Stationary - Overall',
    'Reference(5G)': 21,
    'Wingtech Plunkett': 27,
  },
  {
    name: 'Stationary - Site 1',
    'Reference(5G)': 23,
    'Wingtech Plunkett': 28,
  },
  {
    name: 'Stationary - Site 2',
    'Reference(5G)': 19,
    'Wingtech Plunkett': 25,
  },
];

const DpHistogramComponent = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>New York (5G NR) Ping Results</h3>
      <ResponsiveContainer>
        <BarChart
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
          <YAxis label={{ value: 'Mean Round Trip Time (ms)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Reference(5G)" fill="#4267B2">
            <LabelList dataKey="Reference(5G)" position="top" />
          </Bar>
          <Bar dataKey="Wingtech Plunkett" fill="#6AA84F">
            <LabelList dataKey="Wingtech Plunkett" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DpHistogramComponent;
