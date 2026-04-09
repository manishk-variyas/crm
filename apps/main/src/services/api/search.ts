/**
 * Global Search API Service
 * Searches across accounts, contacts, opportunities, tasks, and quotes
 * Entry point exposed via Module Federation
 */
import { searchAll, calculateTotal } from './search-utils';

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

export async function globalSearch(query: string): Promise<SearchResults> {
  const results = await searchAll(query);
  results.total = calculateTotal(results);
  return results;
}