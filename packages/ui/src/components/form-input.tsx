/**
 * FormInput - Labeled input with consistent styling
 * Replaces repeated input + label + styling across pages
 */
import React from 'react';
import { cn } from '../lib/utils';
import { Input, InputProps } from './input';

export interface FormInputProps extends Omit<InputProps, 'label' | 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: 'sm' | 'md' | 'lg';
}

/**
 * FormInput Component
 * Input with label, optional error message, and hint text
 * 
 * @example
 * <FormInput
 *   label="Company Name"
 *   placeholder="Enter company name"
 *   error={errors.name}
 * />
 */
export function FormInput({
  label,
  error,
  hint,
  inputSize = 'md',
  className,
  icon,
  ...props
}: FormInputProps) {
  const sizeClasses = {
    sm: cn('h-9 text-sm pr-3', icon ? 'pl-11' : 'pl-3'),
    md: cn('h-10 text-sm pr-3', icon ? 'pl-11' : 'pl-3'),
    lg: cn('h-11 text-base pr-4', icon ? 'pl-12' : 'pl-4'),
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-[13px] font-semibold text-foreground">
          {label}
        </label>
      )}
      <Input 
        className={cn(
          sizeClasses[inputSize],
          error && "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500", 
          className
        )}
        icon={icon}
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
