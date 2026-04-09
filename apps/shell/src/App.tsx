/**
 * Shell Application - Host/Container for all microfrontends
 * 
 * This is the main entry point that orchestrates:
 * 1. Browser routing (URL management)
 * 2. Module Federation (loading remote microfrontends)
 * 3. Theme provider (global styling)
 * 4. React Query (data fetching state)
 * 5. Auth protection
 * 
 * Route Flow:
 * - /login -> Auth MFE (remote)
 * - /* -> Main MFE (remote) wrapped in Layout (protected)
 * - / -> Redirect to /dashboard
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/Layout';
import { PageLoader } from './components/PageLoader';
import { ThemeProvider } from '@crm/ui';
import { useStore, RootStore } from '@crm/store';

/**
 * ProtectedRoute - Redirects to login if not authenticated
 * Optional role-based access control
 */
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles?: ('Admin' | 'Manager' | 'Executive' | 'Sales Rep')[] 
}) {
  const { isAuthenticated, user, loading } = useStore((state: RootStore) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: false, // Zustand persist might need a moment but we'll assume it's synchronous for now
  }));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

/**
 * Logout handler
 */
function useLogout() {
  const clearAuth = useStore((state: RootStore) => state.clearAuth);
  return () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    clearAuth();
    window.location.href = '/login';
  };
}

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
  const { isAuthenticated, setAuth } = useStore((state: RootStore) => ({
    isAuthenticated: state.isAuthenticated,
    setAuth: state.setAuth,
  }));
  const handleLogout = useLogout();

  // Unified Security Guard: Sync auth state with server on load
  useEffect(() => {
    async function syncAuth() {
      const activeToken = localStorage.getItem('crm_token');
      if (!activeToken) return;

      try {
        console.log('DIAGNOSTIC: Validating token:', activeToken);
        const response = await fetch('/api/auth/validate', {
          headers: { 
            'Authorization': `Bearer ${activeToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.valid && data.user) {
            // Success: Overwrite store with verified server data
            setAuth(data.user, activeToken);
          }
        } else if (response.status === 401) {
          // Failure: Token is invalid or spoofed. Auto-logout.
          console.warn('Security Alert: Invalid session detected. Logging out...');
          handleLogout();
        }
      } catch (e) {
        console.error('Initial auth sync connection error', e);
      }
    }
    syncAuth();
  }, []); // Run ONLY once on app boot

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : (
                  <React.Suspense fallback={<PageLoader />}>
                    <Auth />
                  </React.Suspense>
                )
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout onLogout={handleLogout}>
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
                </ProtectedRoute>
              }
            />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
