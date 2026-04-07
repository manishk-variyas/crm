/**
 * Store Package - Re-exports Zustand store and types for convenient use
 * Entry point for @crm/store module consumed by other applications
 */
export { useStore } from './store';
export type { RootStore } from './store';
export type { UiSlice, ThemeMode, AccentColor, FontSize, FontFamily } from './slices/uiSlice';
export type { NotificationSlice, Notification } from './slices/notificationSlice';
export type { AuthSlice, User } from './slices/authSlice';
export type { SearchSlice } from './slices/searchSlice';
