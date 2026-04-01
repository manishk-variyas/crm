/**
 * FormTextarea - Labeled textarea with consistent styling
 * Replaces repeated textarea + label + styling across pages
 */
import React from 'react';
import { cn } from '../lib/utils';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * FormTextarea Component
 * Textarea with label, optional error message, and hint text
 * 
 * @example
 * <FormTextarea
 *   label="Description"
 *   placeholder="Enter description"
 *   rows={4}
 * />
 */
export function FormTextarea({
  label,
  error,
  hint,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-[13px] font-semibold text-foreground">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-3 py-2 rounded-lg border border-border bg-background hover:border-primary/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "transition-all text-sm font-medium text-foreground placeholder:text-muted-foreground/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none",
          error && "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[11px] font-medium text-rose-500">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
