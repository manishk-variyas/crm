/**
 * Tasks API Service
 * Handles all task-related API calls
 */
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from './client';

export interface Task {
  id: string;
  subject: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'To Do' | 'In Progress' | 'Deferred';
  relatedTo: string;
  relatedType: string;
  ownerName: string;
  ownerAvatar?: string;
  overdueDays?: number;
}

export interface CreateTaskPayload {
  subject: string;
  description?: string;
  dueDate?: string;
  priority?: 'High' | 'Medium' | 'Low';
  status?: 'Completed' | 'To Do' | 'In Progress' | 'Deferred';
  relatedTo?: string;
  relatedType?: string;
  ownerName?: string;
}

/**
 * Get all tasks
 */
export async function getTasks(): Promise<Task[]> {
  return apiGet<Task[]>(API_ENDPOINTS.tasks);
}

/**
 * Get single task by ID
 */
export async function getTask(id: string): Promise<Task> {
  return apiGet<Task>(`${API_ENDPOINTS.tasks}/${id}`);
}

/**
 * Create new task
 */
export async function createTask(data: CreateTaskPayload): Promise<Task> {
  return apiPost<Task>(API_ENDPOINTS.tasks, data);
}

/**
 * Update existing task
 */
export async function updateTask(id: string, data: Partial<CreateTaskPayload>): Promise<Task> {
  return apiPut<Task>(`${API_ENDPOINTS.tasks}/${id}`, data);
}

/**
 * Delete task
 */
export async function deleteTask(id: string): Promise<{ success: boolean; message: string }> {
  return apiDelete<{ success: boolean; message: string }>(`${API_ENDPOINTS.tasks}/${id}`);
}