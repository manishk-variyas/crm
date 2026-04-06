/**
 * useQuotes - Custom hook for quotes data with API integration
 */
import { useState, useEffect, useCallback } from 'react';
import { Quote, getQuotes, getQuote, createQuote, updateQuote, deleteQuote } from '../api/quotes';

interface UseQuotesOptions {
  autoFetch?: boolean;
}

interface UseQuotesResult {
  quotes: Quote[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: Parameters<typeof createQuote>[0]) => Promise<Quote | null>;
  update: (id: string, data: Parameters<typeof updateQuote>[1]) => Promise<Quote | null>;
  remove: (id: string) => Promise<boolean>;
}

export function useQuotes(options: UseQuotesOptions = {}): UseQuotesResult {
  const { autoFetch = false } = options;
  
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuotes();
      setQuotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Parameters<typeof createQuote>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await createQuote(data);
      setQuotes(prev => [...prev, newQuote]);
      return newQuote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quote');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: Parameters<typeof updateQuote>[1]) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateQuote(id, data);
      setQuotes(prev => prev.map(q => q.id === id ? updated : q));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quote');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteQuote(id);
      setQuotes(prev => prev.filter(q => q.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quote');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchQuotes();
    }
  }, [autoFetch, fetchQuotes]);

  return {
    quotes,
    loading,
    error,
    refetch: fetchQuotes,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
  };
}

export function useQuote(id: string | null) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getQuote(id);
      setQuote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return { quote, loading, error, refetch: fetchQuote };
}