/**
 * StatusBadge - Reusable status indicator with color coding
 * Used for account status, opportunity stage, task status, etc.
 */
import React from 'react';
import { cn } from '../lib/utils';

export type StatusVariant = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'neutral'
  | 'active'
  | 'churned'
  | 'prospect'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'closed';

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * StatusBadge Component
 * Color-coded badge for displaying status/ stage information
 * 
 * @example
 * <StatusBadge status="Active" variant="active" />
 * <StatusBadge status="Negotiation" variant="negotiation" />
 * <StatusBadge status="High Priority" variant="error" size="sm" />
 */
export function StatusBadge({ 
  status, 
  variant = 'neutral',
  className,
  size = 'md'
}: StatusBadgeProps) {
  const variantStyles: Record<StatusVariant, string> = {
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    error: 'bg-rose-100 text-rose-700 border-rose-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    churned: 'bg-slate-100 text-slate-500 border-slate-200',
    prospect: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    qualified: 'bg-blue-100 text-blue-700 border-blue-200',
    proposal: 'bg-purple-100 text-purple-700 border-purple-200',
    negotiation: 'bg-orange-100 text-orange-700 border-orange-200',
    closed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const sizeStyles = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-[11px]',
    lg: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold border rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {status}
    </span>
  );
}

/**
 * Map status string to appropriate variant
 * Use this helper when status comes from data
 */
export function getStatusVariant(status: string): StatusVariant {
  const statusLower = status.toLowerCase();
  
  if (['active', 'completed', 'won', 'accepted', 'done', 'discovery done'].includes(statusLower)) {
    return 'active';
  }
  if (['in progress', 'sent', 'qualified', 'proposal', 'proposal sent'].includes(statusLower)) {
    return 'proposal';
  }
  if (['churned', 'lost', 'declined'].includes(statusLower)) {
    return 'churned';
  }
  if (['prospect', 'todo', 'to do', 'draft', 'prospecting'].includes(statusLower)) {
    return 'prospect';
  }
  if (['negotiation', 'high'].includes(statusLower)) {
    return 'negotiation';
  }
  if (['warning', 'medium'].includes(statusLower)) {
    return 'warning';
  }
  if (['error', 'low'].includes(statusLower)) {
    return 'error';
  }
  
  return 'neutral';
}
