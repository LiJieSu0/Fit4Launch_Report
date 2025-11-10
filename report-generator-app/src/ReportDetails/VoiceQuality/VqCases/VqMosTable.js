import React, { useState, useEffect } from 'react';

const VqMosTable = ({ dataSource }) => {
  const [tableData, setTableData] = useState([]);
  const [mosCategories, setMosCategories] = useState([]);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataModule = await import(`../../../DataFiles/Vq/${dataSource}.json`);
        const vqMosStatistics = dataModule.default;

        const categories = Object.keys(vqMosStatistics.DUT1);
        setMosCategories(categories);

        const loadedEntities = Object.keys(vqMosStatistics);
        setEntities(loadedEntities);

        const processedData = categories.map(category => {
          const rowData = { category: category };
          loadedEntities.forEach(entity => {
            rowData[`${entity}_count`] = vqMosStatistics[entity][category]?.count || 0;
            rowData[`${entity}_percentage`] = vqMosStatistics[entity][category]?.percentage || 0;
          });
          return rowData;
        });
        setTableData(processedData);

      } catch (error) {
        console.error("Error loading data for VqMosTable:", error);
        setTableData([]);
        setMosCategories([]);
        setEntities([]);
      }
    };

    if (dataSource) {
      loadData();
    }
  }, [dataSource]);

  if (tableData.length === 0) {
    return <div>No data available for the selected source.</div>;
  }

  return (
    <div style={{ width: '80%', marginLeft: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6em' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '1px' }}></th>
            {mosCategories.map(category => (
              <th key={category} style={{ border: '1px solid black', padding: '1px' }}>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entities.map(entity => (
            <tr key={entity}>
              <td style={{ border: '1px solid black', padding: '1px' }}>{entity}</td>
              {mosCategories.map(category => {
                const rowData = tableData.find(row => row.category === category);
                return (
                  <td key={`${entity}-${category}-percentage`} style={{ border: '1px solid black', padding: '1px' }}>{rowData?.[`${entity}_percentage`] || 0}%</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VqMosTable;