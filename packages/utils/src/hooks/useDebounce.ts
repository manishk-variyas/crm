/**
 * useDebounce Hook - Delays updating a value until after a specified delay
 * Useful for preventing expensive operations like API calls during rapid changes
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before updating (default: 300ms)
 * @returns The debounced value
 */
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
