/**
 * useAccounts - Custom hook for accounts data with API integration
 * Demonstrates how to replace static data with API calls
 */
import { useState, useEffect, useCallback } from 'react';
import { Account, getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../api/accounts';

interface UseAccountsOptions {
  /** Enable automatic fetch on mount */
  autoFetch?: boolean;
}

interface UseAccountsResult {
  accounts: Account[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: Parameters<typeof createAccount>[0]) => Promise<Account | null>;
  update: (id: string, data: Parameters<typeof updateAccount>[1]) => Promise<Account | null>;
  remove: (id: string) => Promise<boolean>;
}

/**
 * Hook for managing accounts data
 * 
 * @example
 * ```tsx
 * const { accounts, loading, error, refetch } = useAccounts();
 * 
 * if (loading) return <Spinner />;
 * if (error) return <Error message={error} />;
 * 
 * return <DataTable data={accounts} columns={columns} />;
 * ```
 */
export function useAccounts(options: UseAccountsOptions = {}): UseAccountsResult {
  const { autoFetch = true } = options;
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Parameters<typeof createAccount>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const newAccount = await createAccount(data);
      setAccounts(prev => [...prev, newAccount]);
      return newAccount;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: Parameters<typeof updateAccount>[1]) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAccount(id, data);
      setAccounts(prev => prev.map(acc => acc.id === id ? updated : acc));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update account');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAccount(id);
      setAccounts(prev => prev.filter(acc => acc.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchAccounts();
    }
  }, [autoFetch, fetchAccounts]);

  return {
    accounts,
    loading,
    error,
    refetch: fetchAccounts,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
  };
}

/**
 * useAccount - Hook for single account
 */
export function useAccount(id: string | null) {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getAccount(id);
      setAccount(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return { account, loading, error, refetch: fetchAccount };
}