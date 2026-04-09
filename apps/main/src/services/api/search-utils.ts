/**
 * Search API Utilities
 * Centralized search logic for fetching and filtering data
 */
import { SearchResult, SearchResults } from './search';

const API_BASE = 'http://localhost:3005';

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function transformAccount(a: any): SearchResult {
  return {
    id: a.id,
    type: 'account',
    title: a.name,
    subtitle: a.industry || 'No industry',
    icon: 'building',
    url: `/accounts?id=${a.id}`,
    status: a.status,
  };
}

function transformContact(c: any): SearchResult {
  return {
    id: c.id,
    type: 'contact',
    title: c.name,
    subtitle: `${c.title} at ${c.account}`,
    icon: 'user',
    url: `/contacts?id=${c.id}`,
    status: c.role,
  };
}

function transformOpportunity(o: any): SearchResult {
  return {
    id: o.id,
    type: 'opportunity',
    title: o.name,
    subtitle: `${o.account} • ${o.amount}`,
    icon: 'target',
    url: `/opportunities?id=${o.id}`,
    status: o.stage,
  };
}

function transformTask(t: any): SearchResult {
  return {
    id: t.id,
    type: 'task',
    title: t.subject,
    subtitle: `Due: ${t.dueDate} • ${t.priority}`,
    icon: 'check',
    url: `/tasks?id=${t.id}`,
    status: t.status,
  };
}

function transformEmployee(e: any): SearchResult {
  return {
    id: e.id,
    type: 'employee',
    title: e.name,
    subtitle: `${e.role} • ${e.department}`,
    icon: 'users',
    url: `/directory?id=${e.id}`,
    status: e.status,
  };
}

export async function searchAll(query: string): Promise<SearchResults> {
  const empty = { accounts: [], contacts: [], opportunities: [], tasks: [], quotes: [], employees: [], total: 0 };
  if (!query.trim()) return empty;

  const searchLower = query.toLowerCase();
  const [accounts, contacts, opportunities, tasks, employees] = await Promise.all([
    fetchCollection<any>('/api/accounts'),
    fetchCollection<any>('/api/contacts'),
    fetchCollection<any>('/api/opportunities'),
    fetchCollection<any>('/api/tasks'),
    fetchCollection<any>('/api/employees'),
  ]);

  return {
    accounts: accounts.filter(a => a.name?.toLowerCase().includes(searchLower) || a.website?.toLowerCase().includes(searchLower)).slice(0, 5).map(transformAccount),
    contacts: contacts.filter(c => c.name?.toLowerCase().includes(searchLower) || c.email?.toLowerCase().includes(searchLower)).slice(0, 5).map(transformContact),
    opportunities: opportunities.filter(o => o.name?.toLowerCase().includes(searchLower) || o.account?.toLowerCase().includes(searchLower)).slice(0, 5).map(transformOpportunity),
    tasks: tasks.filter(t => t.subject?.toLowerCase().includes(searchLower) || t.description?.toLowerCase().includes(searchLower)).slice(0, 5).map(transformTask),
    quotes: [],
    employees: employees.filter(e => e.name?.toLowerCase().includes(searchLower) || e.email?.toLowerCase().includes(searchLower) || e.department?.toLowerCase().includes(searchLower)).slice(0, 5).map(transformEmployee),
    total: 0,
  };
}

export function calculateTotal(results: SearchResults): number {
  return results.accounts.length + results.contacts.length + results.opportunities.length + results.tasks.length + results.employees.length;
}