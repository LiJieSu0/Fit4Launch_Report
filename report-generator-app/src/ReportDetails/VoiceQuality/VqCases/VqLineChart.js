// NOTE: This component intentionally uses dynamic imports to load JSON data directly. 
// It is an exception to the standard DataLoader/ReportContext pattern.
import React, { useState, useEffect, useContext } from 'react';
import { ReportContext } from '../../../Contexts/ReportContext';
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

const VqLineChart = ({ dataSource, city }) => {
  const { project } = useContext(ReportContext);
  const [chartData, setChartData] = useState(null);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const folderName = typeof project === 'object' ? project.dataFolderName : project;
        const projectPath = folderName ? `${encodeURIComponent(folderName)}/` : '';
        const response = await fetch(`/AnalyzeResults/${projectPath}${encodeURIComponent(city)}/vq_linechart_data/vq_mos_statistics_5g_auto_${dataSource}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vqMosStatistics = await response.json();

        const firstEntity = Object.keys(vqMosStatistics)[0];
        if (!firstEntity) {
          setChartData([]);
          return;
        }
        const mosCategories = Object.keys(vqMosStatistics[firstEntity]);

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

    if (dataSource && city && project) {
      loadData();
    }
  }, [dataSource, city, project]);

  const formatYAxis = (tick) => `${tick}%`;

  if (chartData === null) {
    return <div>Loading data...</div>;
  }

  if (chartData.length === 0) {
    return <div>No data available for the selected source.</div>;
  }

  return (
    <div style={{ width: '45%', height: 300 }}>
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