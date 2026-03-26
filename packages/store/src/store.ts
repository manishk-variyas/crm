/**
 * Root Store - Centralized state management using Zustand
 * Combines UI slice and Notification slice into a single store
 * Includes Redux DevTools integration and localStorage persistence
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UiSlice, createUiSlice } from './slices/uiSlice';
import { NotificationSlice, createNotificationSlice } from './slices/notificationSlice';

/** Combined store type combining all slices */
export type RootStore = UiSlice & NotificationSlice;

/**
 * Main store hook - provides access to UI and notification state
 * Persists theme, accent color, font size, and font family to localStorage
 * Redux DevTools enabled for debugging in development
 */
export const useStore = create<RootStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createUiSlice(...args),
        ...createNotificationSlice(...args),
      }),
      {
        name: 'mfe-store',
        partialize: (state) => ({ 
          theme: state.theme,
          accentColor: state.accentColor,
          fontSize: state.fontSize,
          fontFamily: state.fontFamily
        }),
      }
    ),
    { name: 'MFE Store' }
  )
);
