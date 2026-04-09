/**
 * Layout Component - Main application shell with sidebar and header
 * Wraps page content with consistent navigation and layout structure
 * Handles responsive sidebar behavior and mobile overlay
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, Header, SidebarMenuItem, SearchModal } from '@crm/ui';
import { useStore, RootStore } from '@crm/store';
import { globalSearch } from '../services/searchService';
import {
  Building2,
  CheckSquare,
  FileText,
  LayoutDashboard,
  LineChart,
  Settings,
  Users,
  BarChart3,
  Contact,
  PanelLeftClose,
  PanelLeftOpen,
  Target,
  Zap,
  Shield
} from 'lucide-react';

export function Layout({ children, onLogout }: { children: React.ReactNode; onLogout?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    toggleSidebar,
    user: storeUser,
    token
  } = useStore((state: RootStore) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
    toggleSidebar: state.toggleSidebar,
    user: state.user,
    token: state.token
  }));
  const user = storeUser || {
    name: "Guest User",
    role: "Visitor",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Guest"
  };

  const currentRole = user.role.toLowerCase();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems: (SidebarMenuItem & { requiredRoles?: string[] })[] = [
    { label: 'Dashboard', icon: LayoutDashboard, value: '/dashboard', href: '/dashboard' },
    { label: 'Opportunities', icon: Users, value: '/opportunities', href: '/opportunities' },
    { label: 'Accounts', icon: Building2, value: '/accounts', href: '/accounts' },
    { label: 'Customer Contacts', icon: Contact, value: '/contacts', href: '/contacts' },
    { label: 'Employee Directory', icon: Users, value: '/directory', href: '/directory', requiredRoles: ['admin', 'manager'] },
    { label: 'Sales Pipeline', icon: BarChart3, value: '/pipeline', href: '/pipeline' },
    { label: 'Sales Targets', icon: Target, value: '/sales-targets', href: '/sales-targets', requiredRoles: ['admin', 'manager', 'executive'] },
    { label: 'Quotes', icon: FileText, value: '/quotes', href: '/quotes' },
    { label: 'Tasks', icon: CheckSquare, value: '/tasks', href: '/tasks' },
    { label: 'Reports', icon: LineChart, value: '/reports', href: '/reports', requiredRoles: ['admin', 'manager', 'executive'] },
    { label: 'Settings', icon: Settings, value: '/settings', href: '/settings' },
    { label: 'Automation', icon: Zap, value: '/automation', href: '/automation', requiredRoles: ['admin'] },
    { label: 'System Settings', icon: Shield, value: '/system-settings', href: '/system-settings', requiredRoles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.requiredRoles || item.requiredRoles.map(r => r.toLowerCase()).includes(currentRole)
  );

  const activeItem = menuItems.find(item => location.pathname.startsWith(item.value!))?.value || '/dashboard';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchNavigate = useCallback((url: string) => {
    navigate(url);
    setIsSearchOpen(false);
  }, [navigate]);


  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground font-sans relative">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 xl:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Static Fixed Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <Sidebar
          companyInitials="E"
          companyName="Enterprise CRM"
          menuItems={filteredMenuItems}
          activeItem={activeItem}
          isCollapsed={!sidebarOpen}
          user={user}
          onItemClick={(item) => {
            navigate(item.href || '/');
            setIsMobileOpen(false);
          }}
          onLogout={() => onLogout ? onLogout() : () => {}}
        />
      </div>

      {/* Main Content with dynamically adjusting margin to offset the fixed sidebar */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen transition-all duration-300 ease-in-out ${!sidebarOpen ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchClick={() => setIsSearchOpen(true)}
          notificationCount={1}
          onMenuClick={() => setIsMobileOpen(true)}
          leftElement={
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 -ml-2 text-muted-foreground hover:bg-muted rounded-full transition-colors mr-1"
              title={!sidebarOpen ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {!sidebarOpen ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
          }
        />

        <main className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSearchNavigate}
        searchFn={globalSearch}
      />
    </div>
  );
}
