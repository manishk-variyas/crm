/**
 * AlphabetFilter - Component to filter list/table data by its initial character
 * Provides A-Z tabs with an "All" option
 */
import React from 'react';
import { cn } from '../lib/utils';

export interface AlphabetFilterProps {
  /** Currently selected letter (e.g. "A", "B", ... or "" for "All") */
  value: string;
  /** Callback when a letter is selected */
  onChange: (value: string) => void;
  /** Optional custom class name */
  className?: string;
}

export function AlphabetFilter({ value, onChange, className }: AlphabetFilterProps) {
  const letters = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  return (
    <div className={cn(
      "w-full px-4 py-2 border-b border-border/50 bg-muted/5 flex items-center overflow-x-auto no-scrollbar",
      className
    )}>
      <div className="flex items-center gap-1 min-w-max mx-auto">
        {letters.map((letter) => {
          const val = letter === 'All' ? '' : letter;
          const isActive = value === val;

          return (
            <button
              key={letter}
              onClick={() => onChange(val)}
              className={cn(
                "h-8 min-w-[32px] px-2.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center border border-transparent",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
