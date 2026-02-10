import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReportDataProvider } from './Contexts/ReportDataProvider';
import { HeaderProvider } from './Contexts/HeaderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReportDataProvider>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </ReportDataProvider>
  </React.StrictMode>
);
