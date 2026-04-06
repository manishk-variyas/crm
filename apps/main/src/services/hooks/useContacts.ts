/**
 * useContacts - Custom hook for contacts data with API integration
 */
import { useState, useEffect, useCallback } from 'react';
import { Contact, getContacts, getContact, createContact, updateContact, deleteContact } from '../api/contacts';

interface UseContactsOptions {
  autoFetch?: boolean;
}

interface UseContactsResult {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: Parameters<typeof createContact>[0]) => Promise<Contact | null>;
  update: (id: string, data: Parameters<typeof updateContact>[1]) => Promise<Contact | null>;
  remove: (id: string) => Promise<boolean>;
}

export function useContacts(options: UseContactsOptions = {}): UseContactsResult {
  const { autoFetch = true } = options;
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Parameters<typeof createContact>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const newContact = await createContact(data);
      setContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create contact');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: Parameters<typeof updateContact>[1]) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateContact(id, data);
      setContacts(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchContacts();
    }
  }, [autoFetch, fetchContacts]);

  return {
    contacts,
    loading,
    error,
    refetch: fetchContacts,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
  };
}

export function useContact(id: string | null) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getContact(id);
      setContact(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contact');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  return { contact, loading, error, refetch: fetchContact };
}