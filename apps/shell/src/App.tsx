import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/Layout';
import { PageLoader } from './components/PageLoader';

// Global store is available via useStore from '@crm/store'
const Dashboard = React.lazy(() => import('dashboard/App'));
const Auth = React.lazy(() => import('auth/App'));

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <Auth />
              </React.Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route
                    path="dashboard/*"
                    element={
                      <React.Suspense fallback={<PageLoader />}>
                        <Dashboard />
                      </React.Suspense>
                    }
                  />
                  <Route path="*" element={<div className="p-8">404 — Page not found</div>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
