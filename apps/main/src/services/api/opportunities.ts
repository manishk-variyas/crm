/**
 * Opportunities API Service
 * Handles all opportunity-related API calls
 */
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from './client';

export interface Opportunity {
  id: string;
  oppId: string;
  name: string;
  subTitle: string;
  account: string;
  amount: string;
  stage: string;
  expectedClosure: string;
  lastContact: string;
  createdOn: string;
  email: string;
  phone: string;
  owner: string;
  productInterest?: string;
  description?: string;
  comments?: string;
  industry?: string;
  emdAmount?: string;
  source?: string;
  sourceName?: string;
  reverseAuction?: 'Yes' | 'No';
}

export interface CreateOpportunityPayload {
  name: string;
  subTitle?: string;
  account?: string;
  amount?: string;
  stage?: string;
  expectedClosure?: string;
  email?: string;
  phone?: string;
  owner?: string;
  productInterest?: string;
  description?: string;
  comments?: string;
  industry?: string;
  emdAmount?: string;
  source?: string;
  sourceName?: string;
}

/**
 * Get all opportunities
 */
export async function getOpportunities(): Promise<Opportunity[]> {
  return apiGet<Opportunity[]>(API_ENDPOINTS.opportunities);
}

/**
 * Get single opportunity by ID
 */
export async function getOpportunity(id: string): Promise<Opportunity> {
  return apiGet<Opportunity>(`${API_ENDPOINTS.opportunities}/${id}`);
}

/**
 * Create new opportunity
 */
export async function createOpportunity(data: CreateOpportunityPayload): Promise<Opportunity> {
  return apiPost<Opportunity>(API_ENDPOINTS.opportunities, data);
}

/**
 * Update existing opportunity
 */
export async function updateOpportunity(id: string, data: Partial<CreateOpportunityPayload>): Promise<Opportunity> {
  return apiPut<Opportunity>(`${API_ENDPOINTS.opportunities}/${id}`, data);
}

/**
 * Delete opportunity
 */
export async function deleteOpportunity(id: string): Promise<{ success: boolean; message: string }> {
  return apiDelete<{ success: boolean; message: string }>(`${API_ENDPOINTS.opportunities}/${id}`);
}