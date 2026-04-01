/**
 * FormSelect - Labeled select dropdown with consistent styling
 * Replaces repeated select + label + styling across pages
 */
import React from 'react';
import { cn } from '../lib/utils';

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  selectSize?: 'sm' | 'md' | 'lg';
}

/**
 * FormSelect Component
 * Select dropdown with label, optional error message, and hint text
 * 
 * @example
 * <FormSelect
 *   label="Industry"
 *   options={[
 *     { value: 'tech', label: 'Technology' },
 *     { value: 'health', label: 'Healthcare' }
 *   ]}
 *   placeholder="Select industry"
 * />
 */
export function FormSelect({
  label,
  error,
  hint,
  options,
  placeholder,
  selectSize = 'md',
  className,
  ...props
}: FormSelectProps) {
  const sizeClasses = {
    sm: 'h-9 text-sm px-3',
    md: 'h-10 text-sm px-3',
    lg: 'h-11 text-base px-4',
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-[13px] font-semibold text-foreground">
          {label}
        </label>
      )}
      <select
        className={cn(
          sizeClasses[selectSize],
          "w-full rounded-lg border border-border bg-background hover:border-primary/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "transition-all text-sm font-medium text-foreground cursor-pointer appearance-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[11px] font-medium text-rose-500">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
