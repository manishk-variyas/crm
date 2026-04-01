/**
 * PageActions - Header action buttons (Export, Add, Download, etc.)
 * Used in page headers across Accounts, Contacts, Opportunities, etc.
 */
import React from 'react';
import { cn } from '../lib/utils';

export interface PageAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface PageActionsProps {
  actions: PageAction[];
  className?: string;
}

/**
 * PageActions Component
 * Renders action buttons in page headers
 * 
 * @example
 * <PageActions
 *   actions={[
 *     { label: 'Export', variant: 'outline', onClick: handleExport },
 *     { label: 'Add Account', variant: 'primary', onClick: handleAdd }
 *   ]}
 * />
 */
export function PageActions({ actions, className }: PageActionsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            "flex items-center gap-2 h-10 px-4 text-sm font-semibold rounded-lg transition-all active:scale-95",
            action.variant === 'primary' && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            action.variant === 'outline' && "border border-border bg-background hover:bg-muted text-foreground",
            action.variant === 'ghost' && "hover:bg-muted text-foreground",
            action.variant === 'destructive' && "bg-rose-500 text-white hover:bg-rose-600",
            !action.variant && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            action.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
