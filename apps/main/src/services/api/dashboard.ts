/**
 * Dashboard API Service
 * Handles all dashboard-related API calls (stats, pipeline, etc.)
 */
import { apiGet, API_ENDPOINTS } from './client';

export interface DashboardStats {
  totalRevenue: string;
  revenueGrowth: number;
  activeDeals: number;
  dealsGrowth: number;
  winRate: number;
  winRateGrowth: number;
  newOpportunities: number;
  opportunitiesGrowth: number;
  totalAccounts: number;
  totalContacts: number;
  pipelineValue: string;
  closedWonThisMonth: number;
  accountsGrowth: number;
  contactsGrowth: number;
}

export interface PipelineStage {
  stage: string;
  count: number;
  value: number;
}

export interface RecentActivity {
  id: string;
  type: 'account' | 'contact' | 'opportunity' | 'task';
  action: string;
  description: string;
  timestamp: string;
  user: string;
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  return apiGet<DashboardStats>(`${API_ENDPOINTS.dashboard}/stats`);
}

/**
 * Get pipeline overview (stage breakdown)
 */
export async function getPipelineOverview(): Promise<PipelineStage[]> {
  return apiGet<PipelineStage[]>(`${API_ENDPOINTS.pipeline}/overview`);
}

/**
 * Get recent activity feed
 */
export async function getRecentActivity(): Promise<RecentActivity[]> {
  return apiGet<RecentActivity[]>(`${API_ENDPOINTS.dashboard}/activity`);
}