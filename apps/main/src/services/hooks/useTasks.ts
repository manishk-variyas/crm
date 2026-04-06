/**
 * useTasks - Custom hook for tasks data with API integration
 */
import { useState, useEffect, useCallback } from 'react';
import { Task, getTasks, getTask, createTask, updateTask, deleteTask } from '../api/tasks';

interface UseTasksOptions {
  autoFetch?: boolean;
}

interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: Parameters<typeof createTask>[0]) => Promise<Task | null>;
  update: (id: string, data: Parameters<typeof updateTask>[1]) => Promise<Task | null>;
  remove: (id: string) => Promise<boolean>;
}

export function useTasks(options: UseTasksOptions = {}): UseTasksResult {
  const { autoFetch = true } = options;
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: Parameters<typeof createTask>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await createTask(data);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: Parameters<typeof updateTask>[1]) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTask(id, data);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchTasks();
    }
  }, [autoFetch, fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
  };
}

export function useTask(id: string | null) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getTask(id);
      setTask(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return { task, loading, error, refetch: fetchTask };
}