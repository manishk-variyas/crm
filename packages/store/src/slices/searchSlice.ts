/**
 * Search Slice - Manages global search state across microfrontends
 */
import { StateCreator } from 'zustand';

export interface SearchSlice {
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  clearGlobalSearchQuery: () => void;
}

export const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  globalSearchQuery: '',
  setGlobalSearchQuery: (globalSearchQuery) => set({ globalSearchQuery }),
  clearGlobalSearchQuery: () => set({ globalSearchQuery: '' }),
});
