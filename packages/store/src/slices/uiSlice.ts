/**
 * UI Slice - Manages global UI state including theme, colors, fonts, and sidebar
 * Part of the Zustand store for centralized UI state management
 */
import { StateCreator } from 'zustand';

/** Theme display mode options */
export type ThemeMode = 'light' | 'dark' | 'system';
/** Available accent color presets for the application */
export type AccentColor = 'indigo' | 'blue' | 'emerald' | 'rose' | 'amber' | 'slate';
/** Font size scaling options */
export type FontSize = 'small' | 'medium' | 'large';
/** Font family options for the application */
export type FontFamily = 'Be Vietnam Pro' | 'Inter' | 'Roboto' | 'Open Sans';

/** Interface defining UI state and actions */
export interface UiSlice {
  theme: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
  fontFamily: FontFamily;
  sidebarOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  setAccentColor: (accent: AccentColor) => void;
  setFontSize: (size: FontSize) => void;
  setFontFamily: (font: FontFamily) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

/** Creates the UI slice with default values and action implementations */
export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  theme: 'system',
  accentColor: 'blue',
  fontSize: 'medium',
  fontFamily: 'Be Vietnam Pro',
  sidebarOpen: true,
  setTheme: (theme) => set({ theme }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
});
