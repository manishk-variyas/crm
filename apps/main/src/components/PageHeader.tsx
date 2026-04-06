/**
 * PageHeader Component - Welcome message and quick actions
 * Displays user greeting with contextual action button
 */
import React from 'react';
import { Button } from '@crm/ui';

function getStoredUser(): { name: string; role: string } | null {
  const userStr = localStorage.getItem('crm_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function PageHeader() {
  const user = getStoredUser();
  const userName = user?.name || 'User';
  const userRole = user?.role || 'guest';
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {getGreeting()}, {userName.split(' ')[0]}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          {userRole === 'admin' ? 'Administrator' : userRole === 'manager' ? 'Manager' : userRole === 'sales_rep' ? 'Sales Representative' : 'Welcome'}
        </p>
      </div>
      <Button variant="outline" className="mt-4 sm:mt-0 shadow-sm">
        {userRole === 'admin' ? 'Admin Panel' : 'My Tasks'}
      </Button>
    </div>
  );
}