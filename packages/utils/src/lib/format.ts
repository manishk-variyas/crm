/**
 * Format Utilities - Helper functions for formatting dates, currencies, and text
 * Provides consistent formatting across the application using Intl APIs
 */

/**
 * Formats a date value into a human-readable string
 * @param date - Date object or ISO string representation
 * @param locale - Locale identifier for formatting (default: 'en-US')
 * @returns Formatted date string (e.g., "Mar 26, 2026")
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Formats a number as currency with proper symbols and decimal formatting
 * @param amount - Numeric amount to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @param locale - Locale identifier for formatting (default: 'en-US')
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

/**
 * Truncates a string to a maximum length, appending ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if exceeded
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}
