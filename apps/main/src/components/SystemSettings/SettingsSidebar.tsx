/**
 * SettingsSidebar - Navigation sidebar for System Settings pages
 */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Settings, 
  Building2, 
  Map, 
  Layers, 
  GitBranch, 
  LayoutGrid, 
  Package, 
  DollarSign, 
  UserCog, 
  ShieldCheck, 
  Lock, 
  Box 
} from 'lucide-react';
import { cn } from '@crm/ui';

type SettingsTab = 
  | 'general' 
  | 'branch_offices' 
  | 'geography_master' 
  | 'industry_verticals' 
  | 'sales_hierarchy' 
  | 'product_categories' 
  | 'products' 
  | 'service_pricing' 
  | 'user_management' 
  | 'role_management' 
  | 'security' 
  | 'integrations';

interface SidebarItem {
  id: SettingsTab;
  path: string;
  label: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  { id: 'general', path: 'general', label: 'General', icon: Settings },
  { id: 'branch_offices', path: 'branch-offices', label: 'Branch Offices', icon: Building2 },
  { id: 'geography_master', path: 'geography-master', label: 'Geography Master', icon: Map },
  { id: 'industry_verticals', path: 'industry-verticals', label: 'Industry Verticals', icon: Layers },
  { id: 'sales_hierarchy', path: 'sales-hierarchy', label: 'Sales Channel Hierarchy', icon: GitBranch },
  { id: 'product_categories', path: 'product-categories', label: 'Product Categories', icon: LayoutGrid },
  { id: 'products', path: 'products', label: 'Products', icon: Package },
  { id: 'service_pricing', path: 'service-pricing', label: 'Service Pricing', icon: DollarSign },
  { id: 'user_management', path: 'user-management', label: 'User Management', icon: UserCog },
  { id: 'role_management', path: 'role-management', label: 'Role Management', icon: ShieldCheck },
  { id: 'security', path: 'security', label: 'Security', icon: Lock },
  { id: 'integrations', path: 'integrations', label: 'Integrations', icon: Box },
];

export function SettingsSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const segments = location.pathname.split('/').filter(Boolean);
  const currentPathSub = segments.length > 1 ? segments[1] : 'general';
  const activeItem = sidebarItems.find(item => item.path === currentPathSub) || sidebarItems[0];

  return (
    <aside className="w-full lg:w-72 flex flex-col shrink-0">
      <div className="px-6 lg:px-3 pb-6 lg:pb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground flex items-center gap-2">
          System Settings
        </h2>
        <p className="text-[11px] lg:text-sm text-muted-foreground mt-1 font-medium">Manage your organization settings and preferences.</p>
      </div>
      
      <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 no-scrollbar px-6 lg:px-0 lg:space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/system-settings/${item.path}`)}
            className={cn(
              "flex-none lg:w-full flex items-center gap-3 px-5 py-2.5 rounded-2xl lg:rounded-xl transition-all duration-300 group whitespace-nowrap border",
              activeItem.id === item.id 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-primary" 
                : "bg-background lg:bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground border-border/50 lg:border-transparent"
            )}
          >
            <item.icon className={cn("w-4 h-4 lg:w-4.5 lg:h-4.5 transition-colors", 
              activeItem.id === item.id ? "text-primary-foreground" : "text-muted-foreground/60 group-hover:text-primary")} />
            <span className="text-xs lg:text-sm font-bold">{item.label}</span>
            {activeItem.id === item.id && (
              <div className="hidden lg:block ml-auto w-1 h-4 bg-primary-foreground/40 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}

export type { SettingsTab, SidebarItem };