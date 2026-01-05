import React, { useState, useEffect } from 'react';
import { ReportContext } from './ReportContext';
import { loadAllData, getAvailableCities } from '../Utils/DataLoader'; // Assuming DataLoader exists

export const ReportDataProvider = ({ children }) => {
  const [city, setCity] = useState('Seattle'); // Default city
  const [availableCities, setAvailableCities] = useState([]);
  const [allReportData, setAllReportData] = useState({}); // Cache for all cities' data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCityData = async (targetCity) => {
    if (allReportData[targetCity]) return; // Already loaded

    try {
      const data = await loadAllData(targetCity);
      setAllReportData(prev => ({
        ...prev,
        [targetCity]: data
      }));
    } catch (err) {
      console.error(`Failed to load data for ${targetCity}:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        const cities = await getAvailableCities();
        setAvailableCities(cities);

        // Initial load of the default city
        const data = await loadAllData(city);
        setAllReportData({ [city]: data });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []); // Only on mount

  // effect to handle city change from global selector
  useEffect(() => {
    if (city && !allReportData[city] && !loading) {
      loadCityData(city);
    }
  }, [city]);

  if (loading && Object.keys(allReportData).length === 0) {
    return <div>Loading report data...</div>;
  }

  if (error && Object.keys(allReportData).length === 0) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ReportContext.Provider value={{
      reportData: allReportData[city], // For backward compatibility
      allReportData,
      loading,
      error,
      city,
      setCity,
      availableCities,
      loadCityData
    }}>
      {children}
    </ReportContext.Provider>
  );
};