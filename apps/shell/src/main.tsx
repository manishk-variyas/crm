/**
 * Shell Entry Point - Mounts the host application
 * This is the main entry for the container/shell app that orchestrates all MFEs
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
