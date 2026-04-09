/**
 * useGlobalSearch Hook - Reusable search logic for the CRM
 * Exposed via Module Federation for use in Shell
 */
import { useState, useCallback } from 'react';

const API_BASE = 'http://localhost:3005';

export interface SearchResult {
  id: string;
  type: 'account' | 'contact' | 'opportunity' | 'task' | 'quote' | 'employee';
  title: string;
  subtitle: string;
  icon: string;
  url: string;
  status?: string;
}

export interface SearchResults {
  accounts: SearchResult[];
  contacts: SearchResult[];
  opportunities: SearchResult[];
  tasks: SearchResult[];
  quotes: SearchResult[];
  employees: SearchResult[];
  total: number;
}

export function useGlobalSearch() {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string): Promise<SearchResults> => {
    if (!query.trim()) {
      return { accounts: [], contacts: [], opportunities: [], tasks: [], quotes: [], employees: [], total: 0 };
    }

    setLoading(true);
    const searchLower = query.toLowerCase();
    const searchResults: SearchResults = { accounts: [], contacts: [], opportunities: [], tasks: [], quotes: [], employees: [], total: 0 };

    try {
      const [accountsRes, contactsRes, oppsRes, tasksRes, empRes] = await Promise.all([
        fetch(`${API_BASE}/api/accounts`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/contacts`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/opportunities`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/tasks`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/employees`).then(r => r.json()).catch(() => []),
      ]);

      searchResults.accounts = (Array.isArray(accountsRes) ? accountsRes : [])
        .filter((a: any) => a.name?.toLowerCase().includes(searchLower) || a.website?.toLowerCase().includes(searchLower))
        .slice(0, 5).map((a: any) => ({ id: a.id, type: 'account' as const, title: a.name, subtitle: a.industry || 'No industry', icon: 'building', url: `/accounts?id=${a.id}`, status: a.status }));

      searchResults.contacts = (Array.isArray(contactsRes) ? contactsRes : [])
        .filter((c: any) => c.name?.toLowerCase().includes(searchLower) || c.email?.toLowerCase().includes(searchLower))
        .slice(0, 5).map((c: any) => ({ id: c.id, type: 'contact' as const, title: c.name, subtitle: `${c.title} at ${c.account}`, icon: 'user', url: `/contacts?id=${c.id}`, status: c.role }));

      searchResults.opportunities = (Array.isArray(oppsRes) ? oppsRes : [])
        .filter((o: any) => o.name?.toLowerCase().includes(searchLower) || o.account?.toLowerCase().includes(searchLower))
        .slice(0, 5).map((o: any) => ({ id: o.id, type: 'opportunity' as const, title: o.name, subtitle: `${o.account} • ${o.amount}`, icon: 'target', url: `/opportunities?id=${o.id}`, status: o.stage }));

      searchResults.tasks = (Array.isArray(tasksRes) ? tasksRes : [])
        .filter((t: any) => t.subject?.toLowerCase().includes(searchLower) || t.description?.toLowerCase().includes(searchLower))
        .slice(0, 5).map((t: any) => ({ id: t.id, type: 'task' as const, title: t.subject, subtitle: `Due: ${t.dueDate} • ${t.priority}`, icon: 'check', url: `/tasks?id=${t.id}`, status: t.status }));

      searchResults.employees = (Array.isArray(empRes) ? empRes : [])
        .filter((e: any) => e.name?.toLowerCase().includes(searchLower) || e.email?.toLowerCase().includes(searchLower) || e.department?.toLowerCase().includes(searchLower))
        .slice(0, 5).map((e: any) => ({ id: e.id, type: 'employee' as const, title: e.name, subtitle: `${e.role} • ${e.department}`, icon: 'users', url: `/directory?id=${e.id}`, status: e.status }));

      searchResults.total = searchResults.accounts.length + searchResults.contacts.length + searchResults.opportunities.length + searchResults.tasks.length + searchResults.employees.length;
    } catch (e) {
      console.error('Search error:', e);
    }

    setResults(searchResults);
    setLoading(false);
    return searchResults;
  }, []);

  return { search, results, loading };
}