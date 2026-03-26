/**
 * Notification Slice - Manages toast/alert notifications across the application
 * Provides a queue-based system for displaying user feedback messages
 */
import { StateCreator } from 'zustand';

/** Represents a single notification message */
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

/** Interface defining notification state and actions */
export interface NotificationSlice {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

/** Creates the notification slice with default empty state and action implementations */
export const createNotificationSlice: StateCreator<NotificationSlice> = (set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
});
