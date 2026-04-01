/**
 * PageLoader - Loading fallback for lazy-loaded microfrontends
 * Displayed while Module Federation remotes are being loaded
 */
import React from 'react';
import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] w-full text-slate-500 animate-in fade-in duration-300">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
      <span className="text-base font-medium text-slate-700 tracking-wide">Connecting workspace...</span>
      <p className="text-xs text-slate-400 mt-1.5">Fetching your latest data components</p>
    </div>
  );
}
