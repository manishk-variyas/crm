/**
 * Employees API Service
 * Handles all employee/team member-related API calls
 */
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from './client';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  subDepartment: string;
  email: string;
  phone: string;
  location: string;
  desk: string;
  avatar: string;
}

export interface CreateEmployeePayload {
  name?: string;
  role?: string;
  department?: string;
  subDepartment?: string;
  email?: string;
  phone?: string;
  location?: string;
  desk?: string;
  avatar?: string;
}

/**
 * Get all employees
 */
export async function getEmployees(): Promise<Employee[]> {
  return apiGet<Employee[]>(API_ENDPOINTS.employees);
}

/**
 * Get single employee by ID
 */
export async function getEmployee(id: string): Promise<Employee> {
  return apiGet<Employee>(`${API_ENDPOINTS.employees}/${id}`);
}

/**
 * Create new employee
 */
export async function createEmployee(data: CreateEmployeePayload): Promise<Employee> {
  return apiPost<Employee>(API_ENDPOINTS.employees, data);
}

/**
 * Update existing employee
 */
export async function updateEmployee(id: string, data: Partial<CreateEmployeePayload>): Promise<Employee> {
  return apiPut<Employee>(`${API_ENDPOINTS.employees}/${id}`, data);
}

/**
 * Delete employee
 */
export async function deleteEmployee(id: string): Promise<{ success: boolean; message: string }> {
  return apiDelete<{ success: boolean; message: string }>(`${API_ENDPOINTS.employees}/${id}`);
}