/**
 * PerformanceChart Component - Bar chart comparing revenue vs quota
 * Visualizes monthly performance data for the current year
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, BarChart } from '@crm/ui';

export function PerformanceChart() {
  const data = [
    { name: 'Jan', revenue: 4000, target: 2400 },
    { name: 'Feb', revenue: 3000, target: 1398 },
    { name: 'Mar', revenue: 2000, target: 9800 },
    { name: 'Apr', revenue: 2780, target: 3908 },
    { name: 'May', revenue: 1890, target: 4800 },
    { name: 'Jun', revenue: 2390, target: 3800 },
    { name: 'Jul', revenue: 3490, target: 4300 },
  ];

  return (
    <Card className="shadow-sm border-border h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-base font-semibold">My Performance vs Quota</CardTitle>
        <div className="text-muted-foreground/50 font-bold tracking-wider leading-none">...</div>
      </CardHeader>
      <CardContent className="pt-6">
        <BarChart 
          data={data} 
          xAxisKey="name" 
          bars={[
            { key: 'target', color: '#e2e8f0', name: 'Target' },
            { key: 'revenue', color: '#7c3aed', name: 'Revenue' }
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
