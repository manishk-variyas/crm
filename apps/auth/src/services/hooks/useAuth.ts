/**
 * useAuth - Custom hook for authentication state
 * Manages login, logout, token validation, and role-based access
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, logout as apiLogout, validateToken, setAuthData, getStoredUser, getStoredToken, clearAuthData, LoginRequest, User } from '../api/auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for authentication
 * Provides login, logout, and auth state management
 */
export function useAuth() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getStoredToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        // Validate token with API
        try {
          const response = await validateToken();
          if (response.valid && response.user) {
            setAuthState({
              isAuthenticated: true,
              user: response.user,
              token,
              loading: false,
              error: null,
            });
            return;
          }
        } catch {
          // Token invalid, continue to check without validation
        }
        
        // If no API validation, use stored data
        setAuthState({
          isAuthenticated: true,
          user: storedUser,
          token,
          loading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  /**
   * Login with email and password
   */
  const login = useCallback(async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiLogin(credentials);
      
      if (response.success && response.token && response.user) {
        setAuthData(response.token, response.user);
        setAuthState({
          isAuthenticated: true,
          user: response.user,
          token: response.token,
          loading: false,
          error: null,
        });
        navigate('/dashboard');
        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'Login failed',
        }));
        return { success: false, error: response.message };
      }
    } catch (err) {
      // Fallback to hardcoded credentials if API fails
      const { email, password } = credentials;
      if (email === 'admin@crm.com' && password === 'crm123') {
        const fallbackUser: User = {
          id: '1',
          email: 'admin@crm.com',
          name: 'Alex Morgan',
          role: 'admin',
          department: 'Sales'
        };
        const fallbackToken = 'fallback-token';
        setAuthData(fallbackToken, fallbackUser);
        setAuthState({
          isAuthenticated: true,
          user: fallbackUser,
          token: fallbackToken,
          loading: false,
          error: null,
        });
        navigate('/dashboard');
        return { success: true };
      }
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Login failed. Try admin@crm.com / crm123',
      }));
      return { success: false, error: 'Login failed' };
    }
  }, [navigate]);

  /**
   * Logout and clear auth
   */
  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Continue with local logout even if API fails
    }
    
    clearAuthData();
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
    
    navigate('/login');
  }, [navigate]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback((roles: string | string[]): boolean => {
    if (!authState.user) return false;
    
    const userRole = authState.user.role;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    
    return roleArray.includes(userRole);
  }, [authState.user]);

  /**
   * Check if user has permission for action
   */
  const hasPermission = useCallback((permission: string): boolean => {
    if (!authState.user) return false;
    
    const permissions: Record<string, string[]> = {
      admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
      manager: ['read', 'write', 'delete'],
      sales_rep: ['read', 'write'],
      viewer: ['read'],
    };
    
    const userPermissions = permissions[authState.user.role] || [];
    return userPermissions.includes(permission);
  }, [authState.user]);

  return {
    ...authState,
    login,
    logout,
    hasRole,
    hasPermission,
  };
}