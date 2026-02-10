import React, { useState, useEffect } from 'react';
import { ReportContext } from './ReportContext';
import { loadAllData, getAvailableCities, loadAppConfig, getAvailableProjects } from '../Utils/DataLoader'; // Assuming DataLoader exists

export const ReportDataProvider = ({ children }) => {
  const [city, setCity] = useState('Seattle'); // Default city
  const [project, setProject] = useState(null); // Selected project
  const [availableCities, setAvailableCities] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [allReportData, setAllReportData] = useState({}); // Cache for all cities' data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appConfig, setAppConfig] = useState(null);

  const loadCityData = async (targetCity, targetProject = project) => {
    if (!targetProject) return;
    const folderName = typeof targetProject === 'object' ? targetProject.dataFolderName : targetProject;
    const cacheKey = `${folderName}-${targetCity}`;
    if (allReportData[cacheKey]) return; // Already loaded

    try {
      const data = await loadAllData(targetProject, targetCity);
      setAllReportData(prev => ({
        ...prev,
        [cacheKey]: data
      }));
    } catch (err) {
      console.error(`Failed to load data for ${targetProject}/${targetCity}:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        const cities = await getAvailableCities();
        setAvailableCities(cities);

        const projects = await getAvailableProjects();
        setAvailableProjects(projects);

        const config = await loadAppConfig();
        setAppConfig(config);

        // Initial load of ALL cities for the project if project is ready
        if (project) {
          const loadPromises = cities.map(c => loadAllData(project, c));
          const results = await Promise.all(loadPromises);

          const newData = {};
          cities.forEach((c, idx) => {
            if (results[idx]) {
              const folderName = typeof project === 'object' ? project.dataFolderName : project;
              newData[`${folderName}-${c}`] = results[idx];
            }
          });
          setAllReportData(prev => ({ ...prev, ...newData }));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []); // Only on mount

  // effect to handle project change: load all cities for the new project
  useEffect(() => {
    if (project && availableCities.length > 0) {
      const loadMissing = async () => {
        const folderName = typeof project === 'object' ? project.dataFolderName : project;
        const missingCities = availableCities.filter(c => !allReportData[`${folderName}-${c}`]);
        if (missingCities.length > 0) {
          const loadPromises = missingCities.map(c => loadAllData(project, c));
          const results = await Promise.all(loadPromises);

          const newData = {};
          missingCities.forEach((c, idx) => {
            if (results[idx]) {
              const folderName = typeof project === 'object' ? project.dataFolderName : project;
              newData[`${folderName}-${c}`] = results[idx];
            }
          });
          setAllReportData(prev => ({ ...prev, ...newData }));
        }
      };
      loadMissing();
    }
  }, [project, availableCities]);

  // Derived data for the current active project
  const projectData = React.useMemo(() => {
    if (!project) return {};
    const data = {};
    availableCities.forEach(c => {
      const folderName = typeof project === 'object' ? project.dataFolderName : project;
      const cacheKey = `${folderName}-${c}`;
      if (allReportData[cacheKey]) {
        data[c] = allReportData[cacheKey];
      }
    });
    return data;
  }, [allReportData, project, availableCities]);

  if (loading && Object.keys(allReportData).length === 0) {
    return <div>Loading report data...</div>;
  }

  if (error && Object.keys(allReportData).length === 0) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ReportContext.Provider value={{
      reportData: projectData[city],
      projectData,
      allReportData,
      loading,
      error,
      city,
      setCity,
      project,
      setProject,
      availableCities,
      availableProjects,
      loadCityData,
      appConfig
    }}>
      {children}
    </ReportContext.Provider>
  );
};