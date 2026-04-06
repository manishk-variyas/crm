/**
 * useDashboard - Custom hook for dashboard data with API integration
 */
import { useState, useEffect, useCallback } from 'react';
import { DashboardStats, PipelineStage, getDashboardStats, getPipelineOverview } from '../api/dashboard';

interface UseDashboardResult {
  stats: DashboardStats | null;
  pipeline: PipelineStage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardResult {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pipeline, setPipeline] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, pipelineData] = await Promise.all([
        getDashboardStats(),
        getPipelineOverview()
      ]);
      setStats(statsData);
      setPipeline(pipelineData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    pipeline,
    loading,
    error,
    refetch: fetchDashboard,
  };
}