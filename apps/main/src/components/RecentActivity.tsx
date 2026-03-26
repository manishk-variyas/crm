/**
 * RecentActivity Component - Displays chronological list of recent user actions
 * Shows activity feed with user name, action, target, and timestamp
 */
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
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <span className="text-primary text-sm font-medium cursor-pointer hover:underline">View All</span>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6">
          {activities.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-muted mt-0.5 border border-border shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground leading-snug">
                  <span className="font-semibold text-foreground">{item.name}</span> {item.action} <span className="text-primary font-medium cursor-pointer hover:underline">{item.target}</span>
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
