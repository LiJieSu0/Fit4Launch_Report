import { createContext, useContext } from 'react';

export const ReportContext = createContext(null);

export const useReportData = () => {
  return useContext(ReportContext);
};