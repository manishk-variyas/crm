import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@crm/ui';
import { Target } from 'lucide-react';

export function SalesTargets() {
  const targets = [
    { label: 'Weekly Target', date: 'Ends in 3 days', achieved: '$8,000', target: '$12,500', percent: 64, color: 'bg-primary/80', remaining: '$4,500 remaining' },
    { label: 'Monthly Target', date: 'March 2026', achieved: '$32,000', target: '$50,000', percent: 64, color: 'bg-primary', remaining: '$18,000 remaining' },
    { label: 'Quarterly Target', date: 'Q1 2026', achieved: '$120,000', target: '$150,000', percent: 80, color: 'bg-primary/60', remaining: '$30,000 remaining' },
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <div>
          <CardTitle className="text-base font-semibold">My Sales Targets</CardTitle>
          <p className="text-sm text-muted-foreground font-normal mt-1">Track your performance against quota</p>
        </div>
        <div className="p-2.5 bg-primary text-primary-foreground rounded-[10px] shadow-sm">
          <Target className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {targets.map((t, i) => (
            <div key={i} className="flex flex-col relative w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-foreground/90">{t.label}</span>
                <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t.date}</span>
              </div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Achieved</div>
                  <div className="text-2xl font-bold text-foreground">{t.achieved}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Target</div>
                  <div className="text-base font-semibold text-foreground/80">{t.target}</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-2 mt-1">
                <span className="font-semibold text-foreground/70">{t.percent}%</span>
                <span>{t.remaining}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`${t.color} h-2 rounded-full`} style={{ width: `${t.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
