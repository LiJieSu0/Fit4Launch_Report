import React, { useState, useEffect } from 'react';
import { ReportContext } from './ReportContext';
import { loadAllData, getAvailableCities } from '../Utils/DataLoader'; // Assuming DataLoader exists

export const ReportDataProvider = ({ children }) => {
  const [city, setCity] = useState('Seattle'); // Default city
  const [availableCities, setAvailableCities] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const cities = await getAvailableCities();
        setAvailableCities(cities);
        if (cities.length > 0 && !cities.includes(city)) {
          setCity(cities[0]); // Set default city if current city is not available
        }
        const data = await loadAllData(city);
        setReportData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [city]); // Re-run effect when city changes

  // This useEffect is for initial load and when city changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadAllData(city);
        setReportData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (availableCities.length > 0) { // Only fetch data if cities are loaded
      fetchData();
    }
  }, [city, availableCities]); // Re-run effect when city or availableCities change

  if (loading) {
    return <div>Loading report data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ReportContext.Provider value={{ reportData, loading, error, city, setCity, availableCities }}>
      {children}
    </ReportContext.Provider>
  );
};