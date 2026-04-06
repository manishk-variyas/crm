/**
 * useOpportunities - Custom hook for opportunities data with API integration
 */
import { useState, useEffect, useCallback } from 'react';
import { Opportunity, getOpportunities, getOpportunity, createOpportunity, updateOpportunity, deleteOpportunity } from '../api/opportunities';

interface UseOpportunitiesOptions {
  autoFetch?: boolean;
}

interface UseOpportunitiesResult {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: Parameters<typeof createOpportunity>[0]) => Promise<Opportunity | null>;
  update: (id: string, data: Parameters<typeof updateOpportunity>[1]) => Promise<Opportunity | null>;
  remove: (id: string) => Promise<boolean>;
}

export function useOpportunities(options: UseOpportunitiesOptions = {}): UseOpportunitiesResult {
  const { autoFetch = true } = options;
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Parameters<typeof createOpportunity>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const newOpp = await createOpportunity(data);
      setOpportunities(prev => [...prev, newOpp]);
      return newOpp;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create opportunity');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: Parameters<typeof updateOpportunity>[1]) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateOpportunity(id, data);
      setOpportunities(prev => prev.map(o => o.id === id ? updated : o));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update opportunity');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteOpportunity(id);
      setOpportunities(prev => prev.filter(o => o.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete opportunity');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchOpportunities();
    }
  }, [autoFetch, fetchOpportunities]);

  return {
    opportunities,
    loading,
    error,
    refetch: fetchOpportunities,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
  };
}

export function useOpportunity(id: string | null) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunity = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getOpportunity(id);
      setOpportunity(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opportunity');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOpportunity();
  }, [fetchOpportunity]);

  return { opportunity, loading, error, refetch: fetchOpportunity };
}