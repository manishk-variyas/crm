import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@crm/ui';

export function UpcomingTasks() {
  const tasks = [
    { text: 'Review Q3 proposal with client', priority: 'High Priority', date: 'Due Today', user: 'JD', checked: true },
    { text: 'Review Q3 proposal with client', priority: 'High Priority', date: 'Due Today', user: 'JD', checked: false },
    { text: 'Review Q3 proposal with client', priority: 'High Priority', date: 'Due Today', user: 'JD', checked: false },
    { text: 'Review Q3 proposal with client', priority: 'High Priority', date: 'Due Today', user: 'JD', checked: false },
  ];

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
        <span className="text-primary text-sm font-medium cursor-pointer hover:underline">View All</span>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-3">
          {tasks.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:border-border transition-colors">
              <div className="flex items-center gap-4">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary" 
                  defaultChecked={item.checked} 
                />
                <div>
                  <p className={`text-sm font-medium ${item.checked ? 'line-through text-muted-foreground/50' : 'text-foreground/90'}`}>
                    {item.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.date} • <span className="text-muted-foreground/70">{item.priority}</span>
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0 border border-border">
                {item.user}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
