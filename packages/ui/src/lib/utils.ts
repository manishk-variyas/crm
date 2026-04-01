/**
 * Utility Functions - Shared helpers for UI components
 * Provides className merging via clsx + tailwind-merge
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges className strings with Tailwind CSS conflict resolution
 * @param inputs - ClassValue arguments to merge
 * @returns Combined className string
 * 
 * @example
 * cn('px-2 py-1', isActive && 'bg-blue-500')
 * cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
