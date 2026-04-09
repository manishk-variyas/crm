/**
 * SystemSettings Page - Global organization and security settings for the CRM
 * Features a sidebar for sub-pages and detailed configuration forms.
 * Restricted to Admin role.
 * Uses React Router for nested navigation.
 */
import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@crm/ui';
import { BookOpen } from 'lucide-react';

import { SettingsSidebar } from '../components/SystemSettings/SettingsSidebar';
import {
  GeneralSettings,
  BranchOfficeSettings,
  GeographicModelSettings,
  IndustryVerticalSettings,
  SalesHierarchySettings,
  ProductCategorySettings,
  ProductSettings,
  ServicePricingSettings,
  UserManagementSettings,
  RoleManagementSettings,
  SecuritySettings,
  IntegrationSettings,
} from '../components/SystemSettings';

export function SystemSettings() {
  const location = useLocation();
  
  // Extract the active tab from the URL path safely
  const segments = location.pathname.split('/').filter(Boolean);
  const currentPathSub = segments.length > 1 ? segments[1] : 'general';
  
  const sidebarItems = [
    { path: 'general', label: 'General' },
    { path: 'branch-offices', label: 'Branch Offices' },
    { path: 'geography-master', label: 'Geography Master' },
    { path: 'industry-verticals', label: 'Industry Verticals' },
    { path: 'sales-hierarchy', label: 'Sales Channel Hierarchy' },
    { path: 'product-categories', label: 'Product Categories' },
    { path: 'products', label: 'Products' },
    { path: 'service-pricing', label: 'Service Pricing' },
    { path: 'user-management', label: 'User Management' },
    { path: 'role-management', label: 'Role Management' },
    { path: 'security', label: 'Security' },
    { path: 'integrations', label: 'Integrations' },
  ];
  
  const activeItem = sidebarItems.find(item => item.path === currentPathSub) || sidebarItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-[1600px] mx-auto animate-in fade-in duration-500 px-0 lg:px-4">
      <SettingsSidebar />

      <div className="flex-1 min-w-0">
        <div className="bg-card border-y lg:border border-border/40 lg:rounded-3xl shadow-sm overflow-hidden min-h-[500px] lg:min-h-[800px] flex flex-col">
          <div className="px-6 lg:px-8 py-4 lg:py-6 flex justify-between lg:justify-end items-center">
            <div className="lg:hidden">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Section</span>
               <div className="text-sm font-bold text-foreground">{activeItem.label}</div>
            </div>
            <Button variant="outline" className="flex items-center gap-2 text-[10px] lg:text-xs font-bold h-9 lg:h-10 border-border/60 rounded-full lg:rounded-xl">
              <BookOpen className="w-3.5 h-3.5 lg:w-4 h-4" /> Administrator Guide
            </Button>
          </div>

          <div className="flex-1 px-6 lg:px-10 pb-10">
            <Routes>
              <Route index element={<Navigate to="general" replace />} />
              <Route path="general" element={<GeneralSettings />} />
              <Route path="branch-offices" element={<BranchOfficeSettings />} />
              <Route path="geography-master" element={<GeographicModelSettings />} />
              <Route path="industry-verticals" element={<IndustryVerticalSettings />} />
              <Route path="sales-hierarchy" element={<SalesHierarchySettings />} />
              <Route path="product-categories" element={<ProductCategorySettings />} />
              <Route path="products" element={<ProductSettings />} />
              <Route path="service-pricing" element={<ServicePricingSettings />} />
              <Route path="user-management" element={<UserManagementSettings />} />
              <Route path="role-management" element={<RoleManagementSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="integrations" element={<IntegrationSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
