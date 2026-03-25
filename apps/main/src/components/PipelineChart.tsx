import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, DonutChart } from '@crm/ui';

export function PipelineChart() {
  const data = [
    { name: 'Prospecting', value: 400, color: '#94a3b8' },
    { name: 'Qualified', value: 300, color: '#3b82f6' },
    { name: 'Discovery Done', value: 250, color: '#8b5cf6' },
    { name: 'Proposal Sent', value: 300, color: '#ec4899' },
    { name: 'Negotiation', value: 200, color: '#a855f7' },
    { name: 'Verbal Commit', value: 150, color: '#10b981' },
    { name: 'Closed Won', value: 100, color: '#4f46e5' },
    { name: 'Closed Lost', value: 50, color: '#ef4444' },
  ];

  return (
    <Card className="shadow-sm border-border h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-base font-semibold">Pipeline Distribution</CardTitle>
        <div className="text-muted-foreground/50 font-bold tracking-wider leading-none">...</div>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col justify-between">
        <div className="relative">
          <DonutChart data={data} height={200} innerRadius="65%" outerRadius="85%" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-1 flex-1">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                 <span className="text-muted-foreground font-medium">{item.name}</span>
              </div>
              <span className="font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
