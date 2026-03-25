import React from 'react';
import { useQuery } from '@tanstack/react-query';

export function DashboardFeature() {
  const { data, isLoading } = useQuery({
    queryKey: ['module-data-Dashboard'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 1000));
      return { status: 'Live', lastUpdate: new Date().toLocaleTimeString() };
    }
  });
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This is the <strong className="text-foreground">Dashboard</strong> microfrontend module.
        Edit <code className="bg-muted px-1.5 py-0.5 rounded text-primary">src/components/DashboardFeature.tsx</code> to get started.
      </p>
      {isLoading ? (
        <p className="text-xs text-muted-foreground italic animate-pulse">Fetching query data...</p>
      ) : (
        <p className="text-xs text-emerald-500 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Remote state: {data?.status} — {data?.lastUpdate}
        </p>
      )}
    </div>
  );
}
