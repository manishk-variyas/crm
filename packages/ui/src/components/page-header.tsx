import React from 'react';
import { cn } from '../lib/utils';

export interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  actions, 
  className 
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1.5">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
