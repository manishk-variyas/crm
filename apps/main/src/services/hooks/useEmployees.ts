/**
 * useEmployees - Custom hook for employees data with API integration
 */
import { useState, useEffect, useCallback } from 'react';
import { Employee, getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../api/employees';

interface UseEmployeesOptions {
  autoFetch?: boolean;
}

interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: Parameters<typeof createEmployee>[0]) => Promise<Employee | null>;
  update: (id: string, data: Parameters<typeof updateEmployee>[1]) => Promise<Employee | null>;
  remove: (id: string) => Promise<boolean>;
}

export function useEmployees(options: UseEmployeesOptions = {}): UseEmployeesResult {
  const { autoFetch = false } = options;
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Parameters<typeof createEmployee>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const newEmployee = await createEmployee(data);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: Parameters<typeof updateEmployee>[1]) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateEmployee(id, data);
      setEmployees(prev => prev.map(e => e.id === id ? updated : e));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchEmployees();
    }
  }, [autoFetch, fetchEmployees]);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
  };
}

export function useEmployee(id: string | null) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployee = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployee(id);
      setEmployee(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  return { employee, loading, error, refetch: fetchEmployee };
}