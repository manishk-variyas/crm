/**
 * Contacts API Service
 * Handles all contact-related API calls
 */
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from './client';

export interface Contact {
  id: string;
  name: string;
  title: string;
  account: string;
  role: 'Influencer' | 'Decision Maker' | 'Gatekeeper' | 'End User';
  email: string;
  phone: string;
  lastActivity: string;
  avatarColor: string;
  mobile?: string;
  location?: string;
  deskNumber?: string;
  reportsTo?: string | null;
}

export interface CreateContactPayload {
  name: string;
  title?: string;
  account?: string;
  role?: 'Influencer' | 'Decision Maker' | 'Gatekeeper' | 'End User';
  email?: string;
  phone?: string;
  mobile?: string;
  location?: string;
  deskNumber?: string;
  reportsTo?: string;
}

/**
 * Get all contacts
 */
export async function getContacts(): Promise<Contact[]> {
  return apiGet<Contact[]>(API_ENDPOINTS.contacts);
}

/**
 * Get single contact by ID
 */
export async function getContact(id: string): Promise<Contact> {
  return apiGet<Contact>(`${API_ENDPOINTS.contacts}/${id}`);
}

/**
 * Create new contact
 */
export async function createContact(data: CreateContactPayload): Promise<Contact> {
  return apiPost<Contact>(API_ENDPOINTS.contacts, data);
}

/**
 * Update existing contact
 */
export async function updateContact(id: string, data: Partial<CreateContactPayload>): Promise<Contact> {
  return apiPut<Contact>(`${API_ENDPOINTS.contacts}/${id}`, data);
}

/**
 * Delete contact
 */
export async function deleteContact(id: string): Promise<{ success: boolean; message: string }> {
  return apiDelete<{ success: boolean; message: string }>(`${API_ENDPOINTS.contacts}/${id}`);
}