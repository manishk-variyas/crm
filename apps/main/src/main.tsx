/**
 * Main App Entry Point - CRM Dashboard and all pages
 * 
 * For standalone development: mounts directly to #root
 * For production: loaded by Shell via Module Federation (exposed as 'main/App')
 * 
 * @see apps/shell/src/App.tsx - Where this is lazy-loaded
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
