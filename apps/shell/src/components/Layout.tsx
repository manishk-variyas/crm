import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, Header, SidebarMenuItem } from '@crm/ui';
import { useStore, RootStore } from '@crm/store';
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
  PanelLeftOpen
} from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    toggleSidebar 
  } = useStore((state: RootStore) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
    toggleSidebar: state.toggleSidebar,
  }));

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems: SidebarMenuItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, value: '/dashboard', href: '/dashboard' },
    { label: 'Opportunities', icon: Users, value: '/opportunities', href: '/opportunities' },
    { label: 'Accounts', icon: Building2, value: '/accounts', href: '/accounts' },
    { label: 'Customer Contacts', icon: Contact, value: '/contacts', href: '/contacts' },
    { label: 'Employee Directory', icon: Users, value: '/directory', href: '/directory' },
    { label: 'Sales Pipeline', icon: BarChart3, value: '/pipeline', href: '/pipeline' },
    { label: 'Quotes', icon: FileText, value: '/quotes', href: '/quotes' },
    { label: 'Tasks', icon: CheckSquare, value: '/tasks', href: '/tasks' },
    { label: 'Reports', icon: LineChart, value: '/reports', href: '/reports' },
    { label: 'Settings', icon: Settings, value: '/settings', href: '/settings' },
  ];

  const activeItem = menuItems.find(item => location.pathname.startsWith(item.value!))?.value || '/dashboard';

  const user = {
    name: "Alex Morgan",
    role: "Rep",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4"
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground font-sans relative">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 xl:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out xl:relative xl:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          companyInitials="E"
          companyName="Enterprise CRM"
          menuItems={menuItems}
          activeItem={activeItem}
          isCollapsed={!sidebarOpen}
          user={user}
          onItemClick={(item) => {
            navigate(item.href || '/');
            setIsMobileOpen(false);
          }}
          onLogout={() => console.log("Logout triggered")}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notificationCount={1}
          onMenuClick={() => setIsMobileOpen(true)}
          rightElement={
            <button
              onClick={toggleSidebar}
              className="hidden xl:flex p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors mr-1"
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
    </div>
  );
}
