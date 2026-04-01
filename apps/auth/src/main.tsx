/**
 * Auth App Entry Point - Login and authentication
 * 
 * For standalone development: mounts directly to #root
 * For production: loaded by Shell via Module Federation (exposed as 'auth/App')
 * 
 * @see apps/shell/src/App.tsx - Where this is lazy-loaded on /login route
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
