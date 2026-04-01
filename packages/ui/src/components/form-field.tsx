/**
 * FormField - Generic wrapper for form fields
 * Provides consistent label, error, and hint styling
 */
import React from 'react';
import { cn } from '../lib/utils';

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * FormField Component
 * Wrapper for any form field with consistent label/error/hint styling
 * 
 * @example
 * <FormField label="Name" error={errors.name}>
 *   <Input placeholder="Enter name" />
 * </FormField>
 */
export function FormField({
  label,
  error,
  hint,
  children,
  className
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-[13px] font-semibold text-foreground">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-[11px] font-medium text-rose-500">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
