import React from 'react';
import { Menu, Search, Bell, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from './input';

export interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  className, 
  onMenuClick,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search opportunities, deals, contacts...",
  showSearch = true,
  notificationCount = 0,
  onNotificationClick,
  onHelpClick,
  rightElement
}) => {
  return (
    <header className={cn("flex items-center justify-between h-16 px-6 bg-background border-b border-border/50 shrink-0", className)}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-muted-foreground hover:bg-muted rounded-md xl:hidden shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {showSearch && (
          <div className="w-full max-w-md hidden sm:block">
            <Input 
              icon={<Search />}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 text-sm bg-muted/20 border-border/40"
            />
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
