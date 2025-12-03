import React, { useState, useEffect } from 'react';
import { ReportContext } from './ReportContext';
import { loadAllData } from '../Utils/DataLoader'; // Assuming DataLoader exists

export const ReportDataProvider = ({ children, market }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAllData(market);
        setReportData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [market]);

  if (loading) {
    return <div>Loading report data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ReportContext.Provider value={reportData}>
      {children}
    </ReportContext.Provider>
  );
};