/**
 * Shell Application - Host/Container for all microfrontends
 * 
 * This is the main entry point that orchestrates:
 * 1. Browser routing (URL management)
 * 2. Module Federation (loading remote microfrontends)
 * 3. Theme provider (global styling)
 * 4. React Query (data fetching state)
 * 
 * Route Flow:
 * - /login -> Auth MFE (remote)
 * - /* -> Main MFE (remote) wrapped in Layout
 * - / -> Redirect to /dashboard
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/Layout';
import { PageLoader } from './components/PageLoader';
import { ThemeProvider } from '@crm/ui';

/**
 * Lazy-loaded remote microfrontends
 * These are loaded via Module Federation from ports 3001 (main) and 3002 (auth)
 * React.Suspense handles loading states
 */
const MainApp = React.lazy(() => import('main/App'));
const Auth = React.lazy(() => import('auth/App'));

/**
 * React Query client for managing server state
 * Shared across all microfrontends via the shell
 */
const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
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
                      path="/*"
                      element={
                        <React.Suspense fallback={<PageLoader />}>
                          <MainApp />
                        </React.Suspense>
                      }
                    />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
