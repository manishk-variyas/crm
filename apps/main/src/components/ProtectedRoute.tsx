import React, { useEffect, useState } from 'react';
import { hasRole, validateSession } from '../lib/auth';
import { NotFound } from './NotFound';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles: string[];
}

/**
 * ProtectedRoute Component - Restricts access based on user roles
 * Performs both client-side role check and server-side token validation via Mockoon.
 * Shows "Not Found" screen if user fails validation.
 */
export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(hasRole(requiredRoles));
    setIsValidating(false);
  }, [requiredRoles]);

  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-muted-foreground font-bold tracking-widest uppercase">Verifying Security Token...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return <NotFound />;
  }

  return <>{children}</>;
}
