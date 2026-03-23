import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@crm/ui';

export function RecentActivity() {
  const activities = [
    { name: 'Sarah Connor', action: 'Created a new deal', target: 'Cyberdyne Systems', time: '2 mins ago' },
    { name: 'John Smith', action: 'Updated stage', target: 'TechCorp Enterprise', time: '1 hour ago' },
    { name: 'Mike Ross', action: 'Completed task', target: 'Prepare Q3 Review', time: '3 hours ago' },
    { name: 'Rachel Green', action: 'Added contact', target: 'Monica Geller', time: '5 hours ago' },
  ];

  return (
    <Card className="shadow-sm border-slate-200 h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <span className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">View All</span>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6">
          {activities.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 mt-0.5 border border-slate-200 shrink-0" />
              <div>
                <p className="text-sm text-slate-600 leading-snug">
                  <span className="font-semibold text-slate-900">{item.name}</span> {item.action} <span className="text-blue-600 font-medium cursor-pointer hover:underline">{item.target}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
