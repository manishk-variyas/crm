/**
 * Root Store - Centralized state management using Zustand
 * Combines UI slice and Notification slice into a single store
 * Includes Redux DevTools integration and localStorage persistence
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UiSlice, createUiSlice } from './slices/uiSlice';
import { NotificationSlice, createNotificationSlice } from './slices/notificationSlice';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { SearchSlice, createSearchSlice } from './slices/searchSlice';

/** Combined store type combining all slices */
export type RootStore = UiSlice & NotificationSlice & AuthSlice & SearchSlice;

/**
 * Main store hook - provides access to UI, notification, auth and search state
 * Persists theme, accent color, font size, font family and auth data to localStorage
 * Redux DevTools enabled for debugging in development
 */
export const useStore = create<RootStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createUiSlice(...args),
        ...createNotificationSlice(...args),
        ...createAuthSlice(...args),
        ...createSearchSlice(...args),
      }),
      {
        name: 'mfe-store',
        partialize: (state) => ({ 
          theme: state.theme,
          accentColor: state.accentColor,
          fontSize: state.fontSize,
          fontFamily: state.fontFamily,
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated
        }),
      }
    ),
    { name: 'MFE Store' }
  )
);
