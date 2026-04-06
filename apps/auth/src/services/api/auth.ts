/**
 * Auth API Service
 * Handles authentication - login, validate token, logout
 */
import { apiFetch, API_CONFIG } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'sales_rep' | 'viewer';
  department: string;
  avatar?: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface ValidateResponse {
  valid: boolean;
  user?: User;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * Validate current token
 */
export async function validateToken(): Promise<ValidateResponse> {
  const token = localStorage.getItem('crm_token');
  if (!token) {
    return { valid: false, message: 'No token found' };
  }
  
  return apiFetch<ValidateResponse>('/api/auth/validate', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

/**
 * Logout and clear token
 */
export async function logout(): Promise<LogoutResponse> {
  const token = localStorage.getItem('crm_token');
  
  try {
    const response = await apiFetch<LogoutResponse>('/api/auth/logout', {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    return response;
  } catch {
    return { success: true, message: 'Logged out locally' };
  }
}

/**
 * Store auth data in localStorage
 */
export function setAuthData(token: string, user: User): void {
  localStorage.setItem('crm_token', token);
  localStorage.setItem('crm_user', JSON.stringify(user));
}

/**
 * Get stored user from localStorage
 */
export function getStoredUser(): User | null {
  const userStr = localStorage.getItem('crm_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Get stored token
 */
export function getStoredToken(): string | null {
  return localStorage.getItem('crm_token');
}

/**
 * Clear auth data from localStorage
 */
export function clearAuthData(): void {
  localStorage.removeItem('crm_token');
  localStorage.removeItem('crm_user');
}