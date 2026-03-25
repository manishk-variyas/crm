import { StateCreator } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentColor = 'indigo' | 'blue' | 'emerald' | 'rose' | 'amber' | 'slate';
export type FontSize = 'small' | 'medium' | 'large';
export type FontFamily = 'Be Vietnam Pro' | 'Inter' | 'Roboto' | 'Open Sans';

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
