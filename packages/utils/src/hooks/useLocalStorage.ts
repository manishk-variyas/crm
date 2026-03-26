/**
 * useLocalStorage Hook - Manages state synchronized with browser localStorage
 * Automatically persists and retrieves values across page reloads
 * @param key - Unique key for localStorage item
 * @param initialValue - Default value if key doesn't exist
 * @returns Tuple of [stored value, setter function]
 */
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('useLocalStorage error:', error);
    }
  };

  return [storedValue, setValue] as const;
}
