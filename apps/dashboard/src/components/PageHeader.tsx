import React from 'react';
import { Button } from '@crm/ui';

export function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>
      <Button variant="outline" className="mt-4 sm:mt-0 shadow-sm border-indigo-100 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50">
        Sales Rep View
      </Button>
    </div>
  );
}
