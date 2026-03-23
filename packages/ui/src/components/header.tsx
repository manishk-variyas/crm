import React from 'react';
import { Menu, Search, Bell, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

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
    <header className={cn("flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shrink-0", className)}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md xl:hidden shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {showSearch && (
          <div className="relative w-full max-w-md hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              placeholder={searchPlaceholder}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightElement}
        
        <button 
          onClick={onNotificationClick}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border border-white">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={onHelpClick}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
