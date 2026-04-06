/**
 * Accounts API Service
 * Handles all account-related API calls
 */
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from './client';

export interface Account {
  id: string;
  name: string;
  website: string;
  owner: string;
  industry: string;
  status: 'active' | 'churned' | 'prospect';
  revenue: string;
  lastActivity: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  employees?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAccountPayload {
  name: string;
  website?: string;
  owner?: string;
  industry?: string;
  status?: 'active' | 'churned' | 'prospect';
  revenue?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
}

/**
 * Get all accounts
 */
export async function getAccounts(): Promise<Account[]> {
  return apiGet<Account[]>(API_ENDPOINTS.accounts);
}

/**
 * Get single account by ID
 */
export async function getAccount(id: string): Promise<Account> {
  return apiGet<Account>(`${API_ENDPOINTS.accounts}/${id}`);
}

/**
 * Create new account
 */
export async function createAccount(data: CreateAccountPayload): Promise<Account> {
  return apiPost<Account>(API_ENDPOINTS.accounts, data);
}

/**
 * Update existing account
 */
export async function updateAccount(id: string, data: Partial<CreateAccountPayload>): Promise<Account> {
  return apiPut<Account>(`${API_ENDPOINTS.accounts}/${id}`, data);
}

/**
 * Delete account
 */
export async function deleteAccount(id: string): Promise<{ success: boolean; message: string }> {
  return apiDelete<{ success: boolean; message: string }>(`${API_ENDPOINTS.accounts}/${id}`);
}