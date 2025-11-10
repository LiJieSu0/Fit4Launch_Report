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
  const data = Object.keys(vqMosStatistics).map((key) => ({
    category: key,
    percentage: vqMosStatistics[key].percentage,
  }));

  // Custom Y-axis tick formatter to display percentages
  const formatYAxis = (tick) => `${tick}%`;

  return (
    <div style={{ width: '100%', height: 400 }}>
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
            domain={[0, 100]}
            tickFormatter={formatYAxis}
            label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#8884d8"
            dot={false}
            name="MOS Percentage"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VqLineChart;