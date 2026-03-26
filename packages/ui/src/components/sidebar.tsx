/**
 * Sidebar Component - Navigation sidebar for the CRM application
 * Supports collapsible mode, user display, and navigation items
 * Responsive design with mobile overlay support
 */
import React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

/** Menu item structure for sidebar navigation */
export interface SidebarMenuItem {
  label: string;
  icon: React.ElementType;
  value?: string;
  href?: string;
}

/** User information structure */
export interface SidebarUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

interface SidebarItemProps {
  item: SidebarMenuItem;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: (item: SidebarMenuItem) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive, isCollapsed, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick?.(item)}
      title={isCollapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
        isCollapsed ? "justify-center w-full" : "justify-start w-full",
        isActive 
          ? "bg-primary text-white" 
          : "text-sidebar-foreground/70 hover:bg-white/10 hover:text-sidebar-foreground"
      )}
    >
      <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5 mx-auto" : "w-4 h-4 ml-1")} />
      {!isCollapsed && <span>{item.label}</span>}
    </button>
  );
};

export interface SidebarProps {
  className?: string;
  companyInitials?: string;
  companyName?: string;
  menuItems: SidebarMenuItem[];
  activeItem?: string;
  isCollapsed?: boolean;
  onItemClick?: (item: SidebarMenuItem) => void;
  user?: SidebarUser;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  companyInitials = 'E',
  companyName = 'Enterprise CRM',
  menuItems = [],
  activeItem, 
  isCollapsed = false,
  onItemClick,
  user,
  onLogout
}) => {
  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-border/50 transition-all duration-300", 
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className={cn(
        "flex items-center h-16 border-b border-border/50 shrink-0",
        isCollapsed ? "justify-center px-0" : "px-6 gap-3"
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white font-bold text-lg shrink-0">
          {companyInitials}
        </div>
        {!isCollapsed && (
          <span className="font-semibold text-base tracking-wide truncate">{companyName}</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={item.value || item.label || index}
            item={item}
            isCollapsed={isCollapsed}
            isActive={activeItem === (item.value || item.label)}
            onClick={onItemClick}
          />
        ))}
      </div>

      {user && (
        <div className={cn(
          "p-4 border-t border-border/50 shrink-0",
          isCollapsed ? "flex justify-center" : ""
        )}>
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-9 h-9 rounded-full bg-slate-700 overflow-hidden shrink-0"
                title={isCollapsed ? user.name : undefined}
              >
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-white leading-tight truncate">{user.name}</span>
                  <span className="text-xs text-sidebar-foreground/50 truncate">{user.role}</span>
                </div>
              )}
            </div>
            {(!isCollapsed && onLogout) && (
              <button 
                onClick={onLogout}
                className="text-slate-400 hover:text-white transition-colors p-2 shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
