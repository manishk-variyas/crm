/**
 * SearchModal - Global search modal with keyboard navigation
 * Beautiful, powerful search across all CRM entities
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Building2,
  User,
  Target,
  CheckSquare,
  Users,
  FileText,
  ArrowRight,
  X,
  Command
} from 'lucide-react';
import { cn } from '../lib/utils';

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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
  searchFn: (query: string, signal?: AbortSignal) => Promise<SearchResults>;
}

const entityConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  account: { icon: Building2, label: 'Accounts', color: 'text-blue-500 bg-blue-500/10' },
  contact: { icon: User, label: 'Contacts', color: 'text-purple-500 bg-purple-500/10' },
  opportunity: { icon: Target, label: 'Opportunities', color: 'text-amber-500 bg-amber-500/10' },
  task: { icon: CheckSquare, label: 'Tasks', color: 'text-green-500 bg-green-500/10' },
  quote: { icon: FileText, label: 'Quotes', color: 'text-rose-500 bg-rose-500/10' },
  employee: { icon: Users, label: 'Employees', color: 'text-indigo-500 bg-indigo-500/10' },
};

export function SearchModal({ isOpen, onClose, onNavigate, searchFn }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setLoading(false);
      return;
    }

    // Cancel previous request if it's still in flight
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchFn(query, controller.signal);
        
        // Only update if this request wasn't cancelled
        if (!controller.signal.aborted) {
          setResults(data);
          setLoading(false);
          setSelectedIndex(0);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Search failed:', err);
          setLoading(false);
        }
      }
    }, 250); // Slightly faster debounce for better feel

    return () => {
      clearTimeout(timer);
    };
  }, [query, searchFn]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults(null);
      setSelectedIndex(0);
    } else {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const getAllResults = useCallback(() => {
    if (!results) return [];
    return [
      ...results.accounts.map(r => ({ ...r, section: 'Accounts' })),
      ...results.contacts.map(r => ({ ...r, section: 'Contacts' })),
      ...results.opportunities.map(r => ({ ...r, section: 'Opportunities' })),
      ...results.tasks.map(r => ({ ...r, section: 'Tasks' })),
      ...results.employees.map(r => ({ ...r, section: 'Employees' })),
    ];
  }, [results]);

  const allResults = getAllResults();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, allResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && allResults[selectedIndex]) {
        e.preventDefault();
        onNavigate(allResults[selectedIndex].url);
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allResults, selectedIndex, onNavigate, onClose]);

  useEffect(() => {
    if (resultsRef.current && allResults.length > 0) {
      const selected = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selected?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, allResults.length]);

  if (!isOpen) return null;

  const renderSection = (title: string, items: SearchResult[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          {title} <span className="text-muted-foreground/60 font-normal">({items.length})</span>
        </h3>
        <div className="space-y-0.5">
          {items.map((item) => {
            const config = entityConfig[item.type];
            const Icon = config?.icon || Building2;
            const isSelected = allResults[selectedIndex]?.id === item.id;
            return (
              <button
                key={item.id}
                data-index={allResults.findIndex(r => r.id === item.id)}
                onClick={() => { onNavigate(item.url); onClose(); }}
                className={cn("w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors", isSelected ? "bg-primary/10" : "hover:bg-muted/50")}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config?.color || "bg-muted")}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                </div>
                {item.status && (
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full",
                    item.status === 'active' || item.status === 'Completed' || item.status === 'Closed Won' ? "bg-green-500/10 text-green-600" :
                    item.status === 'Prospecting' || item.status === 'To Do' ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"
                  )}>{item.status}</span>
                )}
                <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-background rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="relative border-b border-border/50">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts, contacts, opportunities..."
            className="w-full pl-12 pr-12 py-4 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {loading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded">
              <Command className="w-3 h-3" /><span>K</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded text-muted-foreground"><X className="w-4 h-4" /></button>
          </div>
          {loading && <div className="absolute bottom-0 left-0 h-[2px] bg-primary animate-pulse w-full" />}
        </div>

        <div ref={resultsRef} className={cn("max-h-[400px] overflow-y-auto p-2 transition-opacity duration-200", loading ? "opacity-50" : "opacity-100")}>
          {!query && (
            <div className="py-8 px-4">
              <p className="text-sm text-muted-foreground text-center mb-4 font-medium uppercase tracking-tight text-[11px]">Quick links</p>
              <div className="grid grid-cols-2 gap-2">
                {[{ label: 'Dashboard', url: '/dashboard', icon: '📊' },{ label: 'Accounts', url: '/accounts', icon: '🏢' },{ label: 'Opportunities', url: '/opportunities', icon: '🎯' },{ label: 'Tasks', url: '/tasks', icon: '✅' }].map((link) => (
                  <button key={link.label} onClick={() => { onNavigate(link.url); onClose(); }} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors text-left">
                    <span>{link.icon}</span><span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !loading && !results && (
            <div className="text-center py-12 text-muted-foreground animate-in fade-in duration-300">
               <p className="text-sm">No results found for "<span className="font-semibold text-foreground">{query}</span>"</p>
               <p className="text-xs mt-1">Try a different search term</p>
            </div>
          )}

          {results && results.total > 0 && (
            <div className="animate-in fade-in duration-300">
              {renderSection('Accounts', results.accounts)}
              {renderSection('Contacts', results.contacts)}
              {renderSection('Opportunities', results.opportunities)}
              {renderSection('Tasks', results.tasks)}
              {renderSection('Employees', results.employees)}
            </div>
          )}
        </div>

        {allResults.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/30 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd><span>Navigate</span></span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd><span>Select</span></span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">esc</kbd><span>Close</span></span>
            </div>
            <span>{results?.total || 0} results</span>
          </div>
        )}
      </div>
    </div>
  );
}