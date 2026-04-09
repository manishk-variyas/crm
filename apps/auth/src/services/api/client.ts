/**
 * Auth API Configuration
 */
const getBaseUrl = () => {
  // Use relative paths in the browser to rely on Vite's proxy/internal routing.
  // This allows the app to work across cloud firewalls by using a single open port.
  if (typeof window !== 'undefined') {
    return '';
  }
  return 'http://localhost:3005';
};

const API_BASE_URL = import.meta.env.VITE_API_URL || getBaseUrl();

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}