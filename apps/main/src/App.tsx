/**
 * Main Application - CRM Dashboard Routing Configuration
 * Defines all application routes and their corresponding page components
 * Redirects root path to dashboard as the default landing page
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Accounts } from './pages/Accounts';
import { Contacts } from './pages/Contacts';
import { Employees } from './pages/Employees';
import { Opportunities } from './pages/Opportunities';
import { Quotes } from './pages/Quotes';
import { CreateQuote } from './pages/CreateQuote';
import { SalesPipeline } from './pages/SalesPipeline';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import { SalesTargetsPage } from './pages/SalesTargetsPage';
import { Automation } from './pages/Automation';
import { SystemSettings } from './pages/SystemSettings';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route 
        path="/directory" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager']}>
            <Employees />
          </ProtectedRoute>
        } 
      />
      <Route path="/pipeline" element={<SalesPipeline />} />
      <Route 
        path="/sales-targets" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager', 'executive']}>
            <SalesTargetsPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/quotes/create" element={<CreateQuote />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute requiredRoles={['admin', 'manager', 'executive']}>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route path="/settings" element={<Settings />} />
      <Route 
        path="/automation" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <Automation />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/system-settings/*" 
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <SystemSettings />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
