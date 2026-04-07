/**
 * Global Search API Service
 * Searches across accounts, contacts, opportunities, tasks, and quotes
 */
import { API_CONFIG } from './client';

export type SearchableEntity = 'account' | 'contact' | 'opportunity' | 'task' | 'quote' | 'employee';

export interface SearchResult {
  id: string;
  type: SearchableEntity;
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

/**
 * Search all entities across the CRM
 */
export async function globalSearch(query: string): Promise<SearchResults> {
  if (!query.trim()) {
    return { accounts: [], contacts: [], opportunities: [], tasks: [], quotes: [], employees: [], total: 0 };
  }

  const results: SearchResults = {
    accounts: [],
    contacts: [],
    opportunities: [],
    tasks: [],
    quotes: [],
    employees: [],
    total: 0
  };

  const searchLower = query.toLowerCase();

  try {
    // Search accounts
    const accountsRes = await fetch(`${API_CONFIG.baseUrl}/api/accounts`);
    const accounts = await accountsRes.json();
    results.accounts = (Array.isArray(accounts) ? accounts : [])
      .filter((a: any) => 
        a.name?.toLowerCase().includes(searchLower) || 
        a.website?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map((a: any) => ({
        id: a.id,
        type: 'account' as const,
        title: a.name,
        subtitle: a.industry || 'No industry',
        icon: 'building',
        url: `/accounts?id=${a.id}`,
        status: a.status
      }));

    // Search contacts
    const contactsRes = await fetch(`${API_CONFIG.baseUrl}/api/contacts`);
    const contacts = await contactsRes.json();
    results.contacts = (Array.isArray(contacts) ? contacts : [])
      .filter((c: any) => 
        c.name?.toLowerCase().includes(searchLower) || 
        c.email?.toLowerCase().includes(searchLower) ||
        c.account?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map((c: any) => ({
        id: c.id,
        type: 'contact' as const,
        title: c.name,
        subtitle: `${c.title} at ${c.account}`,
        icon: 'user',
        url: `/contacts?id=${c.id}`,
        status: c.role
      }));

    // Search opportunities
    const oppsRes = await fetch(`${API_CONFIG.baseUrl}/api/opportunities`);
    const opps = await oppsRes.json();
    results.opportunities = (Array.isArray(opps) ? opps : [])
      .filter((o: any) => 
        o.name?.toLowerCase().includes(searchLower) || 
        o.account?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map((o: any) => ({
        id: o.id,
        type: 'opportunity' as const,
        title: o.name,
        subtitle: `${o.account} • ${o.amount}`,
        icon: 'target',
        url: `/opportunities?id=${o.id}`,
        status: o.stage
      }));

    // Search tasks
    const tasksRes = await fetch(`${API_CONFIG.baseUrl}/api/tasks`);
    const tasks = await tasksRes.json();
    results.tasks = (Array.isArray(tasks) ? tasks : [])
      .filter((t: any) => 
        t.subject?.toLowerCase().includes(searchLower) || 
        t.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map((t: any) => ({
        id: t.id,
        type: 'task' as const,
        title: t.subject,
        subtitle: `Due: ${t.dueDate} • ${t.priority}`,
        icon: 'check',
        url: `/tasks?id=${t.id}`,
        status: t.status
      }));

    // Search employees
    const empRes = await fetch(`${API_CONFIG.baseUrl}/api/employees`);
    const employees = await empRes.json();
    results.employees = (Array.isArray(employees) ? employees : [])
      .filter((e: any) => 
        e.name?.toLowerCase().includes(searchLower) || 
        e.email?.toLowerCase().includes(searchLower) ||
        e.department?.toLowerCase().includes(searchLower)
      )
      .slice(0, 5)
      .map((e: any) => ({
        id: e.id,
        type: 'employee' as const,
        title: e.name,
        subtitle: `${e.role} • ${e.department}`,
        icon: 'users',
        url: `/directory?id=${e.id}`,
        status: e.status
      }));

    // Calculate total
    results.total = results.accounts.length + results.contacts.length + 
                   results.opportunities.length + results.tasks.length + results.employees.length;

  } catch (error) {
    console.error('Search error:', error);
  }

  return results;
}