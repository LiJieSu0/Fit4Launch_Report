import React, { useState, useEffect } from 'react';
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
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const chartWidth = isPrinting ? 700 : (data.length === 1 ? 300 : 500);
  return (
    <div>

      <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h4>
      {/* <div style={{ width: '100%', height: '400px', minHeight: '250px' }}> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart
          width={chartWidth}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {Array.isArray(barKeys) && barKeys.map((bar, index) => (
            <Bar key={index} dataKey={bar.key} fill={bar.fill} barSize={60}>
            </Bar>
          ))}
        </BarChart>
      </div>
    </div>

  );
};

export default DpHistogramComponent;
