/**
 * Header Component - Top navigation bar with search, notifications, and actions
 * Provides consistent header across all pages with customizable elements
 */
import React from 'react';
import { Menu, Search, Bell, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from './input';

/** Header component props for customization */
export interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchClick?: () => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  className, 
  onMenuClick,
  searchQuery,
  onSearchChange,
  onSearchClick,
  searchPlaceholder = "Search opportunities, deals, contacts...",
  showSearch = true,
  notificationCount = 0,
  onNotificationClick,
  onHelpClick,
  leftElement,
  rightElement
}) => {
  return (
    <header className={cn("flex items-center justify-between h-16 px-6 bg-background border-b border-border/50 shrink-0", className)}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {leftElement}
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-muted-foreground hover:bg-muted rounded-md xl:hidden shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {showSearch && (
          <div className="w-full max-w-md hidden sm:block relative cursor-pointer group" onClick={onSearchClick}>
            <Input 
              icon={<Search />}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 text-sm bg-muted/20 border-border/40 cursor-pointer"
              readOnly
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">
              <span className="text-[12px]">⌘</span><span>K</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightElement}
        
        <button 
          onClick={onNotificationClick}
          className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full border border-background">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={onHelpClick}
          className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
