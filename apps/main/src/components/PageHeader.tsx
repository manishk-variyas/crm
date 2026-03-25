import React from 'react';
import { Button } from '@crm/ui';

export function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome back, Jones</h1>
      </div>
      <Button variant="outline" className="mt-4 sm:mt-0 shadow-sm">
        Sales Rep View
      </Button>
    </div>
  );
}
