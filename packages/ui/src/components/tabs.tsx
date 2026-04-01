/**
 * Tabs Component - Tab navigation for switching between views
 * Replaces repeated tab button groups across pages
 */
import React from 'react';
import { cn } from '../lib/utils';

export interface Tab<T extends string = string> {
  id: T;
  label: string;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
}

/**
 * Tabs Component
 * Horizontal tab navigation with active state styling
 * 
 * @example
 * <Tabs
 *   tabs={[
 *     { id: 'details', label: 'Details' },
 *     { id: 'tasks', label: 'Tasks' }
 *   ]}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 */
export function Tabs<T extends string = string>({ tabs, activeTab, onChange, className }: TabsProps<T>) {
  return (
    <div className={cn("flex items-center gap-8 border-b border-border/50", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            "py-3 px-1 text-[13px] font-bold transition-all border-b-[3px] relative -bottom-[1.5px]",
            activeTab === tab.id
              ? "text-primary border-primary"
              : "text-muted-foreground hover:text-foreground border-transparent"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
