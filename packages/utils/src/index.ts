/**
 * Utils Package - Re-exports custom hooks and utility functions
 * Entry point for @crm/utils module consumed by other applications
 */
export { useLocalStorage } from './hooks/useLocalStorage';
export { useDebounce } from './hooks/useDebounce';
export { useFetch } from './hooks/useFetch';
export { formatDate, formatCurrency, truncate } from './lib/format';
