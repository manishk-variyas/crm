/**
 * Search Service - Handles global search across multiple entities
 * Centralizes fetching and filtering logic for the SearchModal
 */
import { SearchResults } from '@crm/ui';

const getBaseUrl = () => {
  // Use relative paths in the browser to rely on Vite's proxy/internal routing.
  if (typeof window !== 'undefined') {
    return '';
  }
  return 'http://localhost:3005';
};

const API_BASE = getBaseUrl();

// Simple in-memory cache for search results
const searchCache = new Map<string, { data: SearchResults; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes cache

/**
 * Perform a global search across all entities (Accounts, Contacts, Opportunities, etc.)
 * Optimized with caching, partial result handling, and request cancellation.
 */
export const globalSearch = async (query: string, signal?: AbortSignal): Promise<SearchResults> => {
  const cleanQuery = query.trim().toLowerCase();
  
  // 1. API SAFETY: Don't search for empty or single-character queries to save server bandwidth
  if (cleanQuery.length < 2) {
    return { accounts: [], contacts: [], opportunities: [], tasks: [], quotes: [], employees: [], total: 0 };
  }

  // 2. SPEED: Return from cache if we searched for this exact term recently
  const cached = searchCache.get(cleanQuery);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const results: SearchResults = { accounts: [], contacts: [], opportunities: [], tasks: [], quotes: [], employees: [], total: 0 };

  try {
    // 3. ERROR RESILIENCE: Fetch all sections in parallel. 
    // Individual failures (e.g., tasksRes fails) won't take down the entire search.
    const fetchOptions = { signal };
    const [accountsRes, contactsRes, oppsRes, tasksRes, empRes] = await Promise.all([
      fetch(`${API_BASE}/api/accounts`, fetchOptions).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API_BASE}/api/contacts`, fetchOptions).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API_BASE}/api/opportunities`, fetchOptions).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API_BASE}/api/tasks`, fetchOptions).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API_BASE}/api/employees`, fetchOptions).then(r => r.ok ? r.json() : []).catch(() => []),
    ]);

    // Accounts transformation
    results.accounts = (Array.isArray(accountsRes) ? accountsRes : [])
      .filter((a: any) => a.name?.toLowerCase().includes(cleanQuery) || a.website?.toLowerCase().includes(cleanQuery))
      .slice(0, 5)
      .map((a: any) => ({
        id: a.id, type: 'account', title: a.name, subtitle: a.industry || 'No industry',
        icon: 'building', url: `/accounts?id=${a.id}`, status: a.status
      }));

    // Contacts transformation
    results.contacts = (Array.isArray(contactsRes) ? contactsRes : [])
      .filter((c: any) => c.name?.toLowerCase().includes(cleanQuery) || c.email?.toLowerCase().includes(cleanQuery))
      .slice(0, 5)
      .map((c: any) => ({
        id: c.id, type: 'contact', title: c.name, subtitle: `${c.title} at ${c.account}`,
        icon: 'user', url: `/contacts?id=${c.id}`, status: c.role
      }));

    // Opportunities transformation
    results.opportunities = (Array.isArray(oppsRes) ? oppsRes : [])
      .filter((o: any) => o.name?.toLowerCase().includes(cleanQuery) || o.account?.toLowerCase().includes(cleanQuery))
      .slice(0, 5)
      .map((o: any) => ({
        id: o.id, type: 'opportunity', title: o.name, subtitle: `${o.account} • ${o.amount}`,
        icon: 'target', url: `/opportunities?id=${o.id}`, status: o.stage
      }));

    // Tasks transformation
    results.tasks = (Array.isArray(tasksRes) ? tasksRes : [])
      .filter((t: any) => t.subject?.toLowerCase().includes(cleanQuery) || t.description?.toLowerCase().includes(cleanQuery))
      .slice(0, 5)
      .map((t: any) => ({
        id: t.id, type: 'task', title: t.subject, subtitle: `Due: ${t.dueDate} • ${t.priority}`,
        icon: 'check', url: `/tasks?id=${t.id}`, status: t.status
      }));

    // Employees transformation
    results.employees = (Array.isArray(empRes) ? empRes : [])
      .filter((e: any) => e.name?.toLowerCase().includes(cleanQuery) || e.email?.toLowerCase().includes(cleanQuery))
      .slice(0, 5)
      .map((e: any) => ({
        id: e.id, type: 'employee', title: e.name, subtitle: `${e.role} • ${e.department}`,
        icon: 'users', url: `/directory?id=${e.id}`, status: e.status
      }));

    results.quotes = [];
    results.total = results.accounts.length + results.contacts.length + results.opportunities.length + results.tasks.length + results.employees.length;

    // 4. Update cache
    searchCache.set(cleanQuery, { data: results, timestamp: Date.now() });
    
  } catch (e: any) {
    if (e.name === 'AbortError') return results;
    console.error('CRITICAL: Unexpected error in globalSearch', e);
  }

  return results;
};
