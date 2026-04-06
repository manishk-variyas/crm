/**
 * Quotes API Service
 * Handles all quote/proposal-related API calls
 */
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from './client';

export interface Quote {
  id: string;
  number: string;
  version: string;
  customerName: string;
  customerCompany: string;
  date: string;
  validUntil: string;
  amount: string;
  currency: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
}

export interface CreateQuotePayload {
  number?: string;
  customerName?: string;
  customerCompany?: string;
  date?: string;
  validUntil?: string;
  amount?: string;
  currency?: string;
  status?: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
}

/**
 * Get all quotes
 */
export async function getQuotes(): Promise<Quote[]> {
  return apiGet<Quote[]>(API_ENDPOINTS.quotes || '/api/quotes');
}

/**
 * Get single quote by ID
 */
export async function getQuote(id: string): Promise<Quote> {
  return apiGet<Quote>(`/api/quotes/${id}`);
}

/**
 * Create new quote
 */
export async function createQuote(data: CreateQuotePayload): Promise<Quote> {
  return apiPost<Quote>('/api/quotes', data);
}

/**
 * Update existing quote
 */
export async function updateQuote(id: string, data: Partial<CreateQuotePayload>): Promise<Quote> {
  return apiPut<Quote>(`/api/quotes/${id}`, data);
}

/**
 * Delete quote
 */
export async function deleteQuote(id: string): Promise<{ success: boolean; message: string }> {
  return apiDelete<{ success: boolean; message: string }>(`/api/quotes/${id}`);
}