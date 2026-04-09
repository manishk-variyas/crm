/**
 * SystemSettings Page - Global organization and security settings for the CRM
 * Features a sidebar for sub-pages and detailed configuration forms.
 * Restricted to Admin role.
 * Uses React Router for nested navigation.
 */
import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Settings, 
  Building2, 
  Map, 
  Clock, 
  GitBranch, 
  LayoutGrid, 
  Package, 
  DollarSign, 
  UserCog, 
  ShieldCheck, 
  Lock, 
  Box,
  Save,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Search,
  Key,
  Webhook,
  Activity,
  Layers,
  BookOpen,
  Power,
  Smartphone
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, cn } from '@crm/ui';

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

export function SystemSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  
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

  // Extract the active tab from the URL path safely
  const segments = location.pathname.split('/').filter(Boolean);
  const currentPathSub = segments.length > 1 ? segments[1] : 'general';
  const activeItem = sidebarItems.find(item => item.path === currentPathSub) || sidebarItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Settings Navigation Sidebar */}
      <aside className="w-full lg:w-72 flex flex-col gap-1.5 shrink-0">
        <div className="px-3 pb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            System Settings
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-medium">Manage your organization settings and preferences.</p>
        </div>
        
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/system-settings/${item.path}`)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group",
                activeItem.id === item.id 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-4.5 h-4.5", activeItem.id === item.id ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary transition-colors")} />
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Settings Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border/40 rounded-3xl shadow-sm overflow-hidden min-h-[800px] flex flex-col">
          {/* Header Info (Optional, matching screenshot) */}
          <div className="px-8 py-6 flex justify-end">
            <Button variant="outline" className="flex items-center gap-2 text-xs font-bold h-10 border-border/60">
              <BookOpen className="w-4 h-4" /> Administrator Guide
            </Button>
          </div>

          <div className="flex-1 px-10 pb-10">
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

// --- SUB-PAGE COMPONENTS ---

function GeneralSettings() {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-foreground">General Settings</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Configure organization details, localization, and quote settings.</p>
      </div>

      {/* Section 1: Organization Information */}
      <section className="space-y-6">
        <div className="pb-2 border-b border-border/40">
          <h4 className="text-sm font-bold text-foreground tracking-tight">Section 1: Organization Information</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">This information appears in quote headers, company profiles, and compliance reporting.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Organization Name</label>
            <Input defaultValue="ABC Technologies" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Legal Entity Name</label>
            <Input defaultValue="ABC Technologies Pvt Ltd" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Organization Type</label>
            <Input defaultValue="Private Company" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">GST Registration Number</label>
            <Input defaultValue="22AAAAA0000A1Z5" className="h-10 text-xs" />
          </div>
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Address Line 1</label>
            <Input defaultValue="123 Tech Avenue, Block 4" className="h-10 text-xs" />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Address Line 2</label>
            <Input defaultValue="Sector 5, MIDC Area" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">City</label>
            <Input defaultValue="Mumbai" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">State</label>
            <Input defaultValue="Maharashtra" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Country</label>
            <Input defaultValue="India" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Postal Code</label>
            <Input defaultValue="400001" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Primary Contact Email</label>
            <Input defaultValue="sales@abctech.com" className="h-10 text-xs" icon={<Mail className="w-3.5 h-3.5" />} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Primary Contact Phone</label>
            <Input defaultValue="+91 22 4444 8888" className="h-10 text-xs" icon={<Phone className="w-3.5 h-3.5" />} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Website URL</label>
            <Input defaultValue="www.abctech.com" className="h-10 text-xs" icon={<ExternalLink className="w-3.5 h-3.5" />} />
          </div>
        </div>
      </section>

      {/* Section 2: Regional & Localization Settings */}
      <section className="space-y-6">
        <div className="pb-2 border-b border-border/40">
          <h4 className="text-sm font-bold text-foreground tracking-tight">Section 2: Regional & Localization Settings</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Controls time, currency, and formatting behavior.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Timezone</label>
            <Input defaultValue="Asia/Kolkata" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Date Format</label>
            <Input defaultValue="DD-MM-YYYY" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Time Format</label>
            <Input defaultValue="24 Hour" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Default Currency</label>
            <Input defaultValue="INR" className="h-10 text-xs" />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Allowed Quote Currencies (Comma separated)</label>
            <Input defaultValue="INR, USD" className="h-10 text-xs" />
          </div>
        </div>
      </section>

      {/* Section 3: Currency Configuration */}
      <section className="space-y-6">
        <div className="pb-2 border-b border-border/40">
          <h4 className="text-sm font-bold text-foreground tracking-tight">Section 3: Currency Configuration</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Ensure quotes convert and calculate values correctly.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Base Currency</label>
            <Input defaultValue="INR" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Exchange Rate Mode</label>
            <Input defaultValue="Manual" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Default Exchange Rate (USD -&gt; INR)</label>
            <Input defaultValue="83.2" className="h-10 text-xs" />
          </div>
        </div>
      </section>

      {/* Section 4: Tax / GST Configuration */}
      <section className="space-y-6">
        <div className="pb-2 border-b border-border/40">
          <h4 className="text-sm font-bold text-foreground tracking-tight">Section 4: Tax / GST Configuration</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Defines the tax rules applied to quotes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Tax Region</label>
            <Input defaultValue="India" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Default Tax Group</label>
            <Input defaultValue="GST_INTRASTATE" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">GST Structure</label>
            <Input defaultValue="Intra-State (CGST + SGST)" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">CGST Rate (%)</label>
            <Input defaultValue="9" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">SGST Rate (%)</label>
            <Input defaultValue="9" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">IGST Rate (%)</label>
            <Input defaultValue="18" className="h-10 text-xs" />
          </div>
        </div>
      </section>

      {/* Section 5: Quote Configuration */}
      <section className="space-y-6">
        <div className="pb-2 border-b border-border/40">
          <h4 className="text-sm font-bold text-foreground tracking-tight">Section 5: Quote Configuration</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Controls how quotes behave and how quote numbers are generated.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Quote Number Prefix</label>
            <Input defaultValue="QT" className="h-10 text-xs" />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Quote Number Format</label>
            <Input defaultValue="QT-{YYYY}-{NNNN}" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Quote Validity (days)</label>
            <Input defaultValue="30" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Default Payment Terms</label>
            <Input defaultValue="Net 30" className="h-10 text-xs" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Default Tax Group</label>
            <Input defaultValue="GST_INTRASTATE" className="h-10 text-xs" />
          </div>
          <div className="md:col-span-3 flex items-center gap-2 px-1">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border/60 text-primary cursor-pointer" />
            <label className="text-[11px] font-bold text-foreground/80 cursor-pointer">Allow Discounts</label>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">Discount Approval Threshold (%)</label>
            <Input defaultValue="15" className="h-10 text-xs" />
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-8">
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 h-12 rounded-xl font-bold text-xs shadow-lg shadow-[#4F46E5]/20 flex items-center gap-2 transition-all active:scale-95">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
}

function BranchOfficeSettings() {
  const branches = [
    { name: 'Headquarters', type: 'Head Office', region: 'West', location: 'San Francisco, CA', country: 'USA' },
    { name: 'New York Branch', type: 'Regional', region: 'East', location: 'New York, NY', country: 'USA' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Branch Offices</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your organization's branch locations.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm">
          <Plus className="w-4 h-4" /> Add Branch
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Branch Name</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Region</th>
              <th className="px-8 py-5">Location</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {branches.map(branch => (
              <tr key={branch.name} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{branch.name}</td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    branch.type === 'Head Office' ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  )}>
                    {branch.type}
                  </span>
                </td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{branch.region}</td>
                <td className="px-8 py-6">
                  <div className="font-bold text-foreground/80">{branch.location}</div>
                  <div className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-0.5">{branch.country}</div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground/60 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GeographicModelSettings() {
  const geography = [
    { name: 'Global Corp', type: 'Corporate Office', parent: '-', location: 'New York, NY', country: 'USA', status: 'Active' },
    { name: 'India Head Office', type: 'Head Office', parent: 'Global Corp', location: 'Mumbai, Maharashtra', country: 'India', status: 'Active' },
    { name: 'West Zone', type: 'Zonal Office', parent: 'India Head Office', location: 'Mumbai, Maharashtra', country: 'India', status: 'Active' },
    { name: 'Maharashtra Region', type: 'Regional Office', parent: 'West Zone', location: 'Pune, Maharashtra', country: 'India', status: 'Active' },
    { name: 'Pune Branch', type: 'Branch Office', parent: 'Maharashtra Region', location: 'Pune, Maharashtra', country: 'India', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Geography Master</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage geographical hierarchy (Zones, Regions, Districts, Branches).</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm">
          <Plus className="w-4 h-4" /> Add Geography
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Parent</th>
              <th className="px-8 py-5">Location</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {geography.map(item => (
              <tr key={item.name} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{item.name}</td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    item.type === 'Corporate Office' ? "bg-purple-100 text-purple-600" :
                    item.type === 'Head Office' ? "bg-blue-100 text-blue-600" :
                    item.type === 'Zonal Office' ? "bg-indigo-100 text-indigo-600" :
                    item.type === 'Regional Office' ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
                  )}>
                    {item.type}
                  </span>
                </td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{item.parent}</td>
                <td className="px-8 py-6">
                  <div className="font-bold text-foreground/80">{item.location}</div>
                  <div className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-0.5">{item.country}</div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground/60 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IndustryVerticalSettings() {
  const verticals = [
    { name: 'Banking', code: 'BNK', parent: '-', description: 'Commercial & Retail Banking Clients', status: 'Active' },
    { name: 'Healthcare', code: 'HLT', parent: '-', description: 'Hospitals and Healthcare Providers', status: 'Active' },
    { name: 'Manufacturing', code: 'MFG', parent: '-', description: 'Industrial Manufacturing', status: 'Active' },
    { name: 'Retail Banking', code: 'RBNK', parent: 'Banking', description: 'Retail Banking Division', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Industry Vertical Management</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage industry segments like Banking, Healthcare, Manufacturing etc.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm">
          <Plus className="w-4 h-4" /> Add Vertical
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Vertical Name</th>
              <th className="px-8 py-5">Code</th>
              <th className="px-8 py-5">Parent Vertical</th>
              <th className="px-8 py-5">Description</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {verticals.map(item => (
              <tr key={item.name} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{item.name}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium uppercase tracking-widest">{item.code}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{item.parent}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium max-w-xs truncate">{item.description}</td>
                <td className="px-8 py-6 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground/60 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SalesHierarchySettings() {
  const hierarchy = [
    { role: 'Manager', geography: 'West Zone', vertical: 'Banking', reportsTo: '-', level: 'L6', status: 'Active' },
    { role: 'Sales Rep', geography: 'Maharashtra Region', vertical: 'Banking', reportsTo: 'Manager (West Zone)', level: 'L1', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Sales Channel Hierarchy</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Define the sales org chart by connecting roles, geographies, and verticals.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs font-bold h-10 border-border/60">
            <GitBranch className="w-3.5 h-3.5" /> Re-index Hierarchy
          </Button>
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Add Hierarchy Node
          </Button>
        </div>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Role</th>
              <th className="px-8 py-5">Geography</th>
              <th className="px-8 py-5">Vertical</th>
              <th className="px-8 py-5">Reports To</th>
              <th className="px-8 py-5">Level</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {hierarchy.map((item, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{item.role}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{item.geography}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{item.vertical}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{item.reportsTo}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium font-mono text-xs">{item.level}</td>
                <td className="px-8 py-6">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground/60 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductCategorySettings() {
  const categories = [
    { name: 'Hardware', type: 'Hardware', description: 'Physical devices and equipment', status: 'Active' },
    { name: 'Software Licenses', type: 'Software', description: 'Annual and perpetual software licenses', status: 'Active' },
    { name: 'Professional Services', type: 'Service', description: 'Consulting, implementation, and training', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Product Categories</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage product categories and types.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Category Name</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Description</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {categories.map((category) => (
              <tr key={category.name} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{category.name}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{category.type}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{category.description}</td>
                <td className="px-8 py-6">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {category.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">
                      Edit
                    </button>
                    <button className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductSettings() {
  const products = [
    { name: 'Cisco Router 2900', sku: 'CIS-RT-2900', partCode: 'CRT2900', category: 'Hardware', price: '2400 INR', status: 'Active' },
    { name: 'Catalyst Switch 3850', sku: 'CAT-SW-3850', partCode: 'CSW3850', category: 'Hardware', price: '4500 INR', status: 'Active' },
    { name: 'Security Gateway XLS', sku: 'SG-XLS-100', partCode: 'SGX100', category: 'Hardware', price: '1200 INR', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Products</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage product catalog.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Product Name</th>
              <th className="px-8 py-5">SKU / Part Code</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {products.map((product) => (
              <tr key={product.sku} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{product.name}</td>
                <td className="px-8 py-6">
                  <div className="text-muted-foreground font-medium uppercase tracking-tight">{product.sku}</div>
                  <div className="text-[10px] text-muted-foreground/50 font-bold uppercase mt-0.5">{product.partCode}</div>
                </td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{product.category}</td>
                <td className="px-8 py-6 text-foreground font-bold">{product.price}</td>
                <td className="px-8 py-6">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">
                      Edit
                    </button>
                    <button className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicePricingSettings() {
  const servicePricing = [
    { product: 'CRM Implementation', billingType: 'Man Day', rate: '600', status: 'Active' },
    { product: 'Technical Support', billingType: 'Hourly', rate: '85', status: 'Active' },
    { product: 'Onboarding Package', billingType: 'Fixed', rate: '1200', status: 'Active' },
    { product: 'Annual Audit', billingType: 'Per Instance', rate: '2500', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Service Pricing</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage pricing for services.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add Service Pricing
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Service Product</th>
              <th className="px-8 py-5">Billing Type</th>
              <th className="px-8 py-5 text-center">Rate</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {servicePricing.map((item) => (
              <tr key={item.product} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6 font-bold text-foreground">{item.product}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{item.billingType}</td>
                <td className="px-8 py-6 text-center text-muted-foreground font-bold">{item.rate}</td>
                <td className="px-8 py-6 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">
                      Edit
                    </button>
                    <button className="text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagementSettings() {
  const users = [
    { name: 'Alex Morgan', email: 'alex@example.com', role: 'Admin', status: 'Active', avatar: 'A' },
    { name: 'Sarah Connor', email: 'sarah@example.com', role: 'Manager', status: 'Active', avatar: 'S' },
    { name: 'John Doe', email: 'john@example.com', role: 'Sales Rep', status: 'Inactive', avatar: 'J' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage user access and roles.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5 text-center">Role</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{user.name}</div>
                      <div className="text-[11px] text-muted-foreground font-medium">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    user.role === 'Admin' ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" : 
                    user.role === 'Manager' ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" :
                    "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  )}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    user.status === 'Active' ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                  )}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-muted-foreground/60 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground/60 hover:text-amber-500 hover:bg-amber-500/5 rounded-lg transition-all">
                      <Power className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoleManagementSettings() {
  const roles = [
    { name: 'Admin', description: 'Full system access', code: 'ADM', level: 'Level 8', category: 'System', status: 'Active' },
    { name: 'Manager', description: 'Branch management and reporting', code: 'MGR', level: 'Level 6', category: 'Management', status: 'Active' },
    { name: 'Sales Rep', description: 'Opportunity management and basic access', code: 'REP', level: 'Level 1', category: 'Sales', status: 'Active' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Role Management</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage user roles and permissions.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add Role
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Role Name</th>
              <th className="px-8 py-5">Role Code</th>
              <th className="px-8 py-5">Level</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {roles.map((role) => (
              <tr key={role.code} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="font-bold text-foreground">{role.name}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">{role.description}</div>
                </td>
                <td className="px-8 py-6 text-muted-foreground font-medium uppercase tracking-widest">{role.code}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{role.level}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{role.category}</td>
                <td className="px-8 py-6 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {role.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground/60 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SecuritySettings() {
  const [passwordReq, setPasswordReq] = React.useState(true);
  const [tfa, setTfa] = React.useState(false);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-foreground">Security Settings</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Manage password policies and authentication.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        {/* Toggle Card 1 */}
        <div className="flex items-center justify-between p-6 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-foreground">Password Requirements</div>
              <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Require special characters and numbers</div>
            </div>
          </div>
          <button 
            onClick={() => setPasswordReq(!passwordReq)}
            className={cn(
              "w-12 h-6 rounded-full transition-all duration-300 relative",
              passwordReq ? "bg-[#4F46E5]" : "bg-muted"
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
              passwordReq ? "left-7" : "left-1"
            )} />
          </button>
        </div>

        {/* Toggle Card 2 */}
        <div className="flex items-center justify-between p-6 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-foreground">Two-Factor Authentication</div>
              <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Require 2FA for all admin accounts</div>
            </div>
          </div>
          <button 
            onClick={() => setTfa(!tfa)}
            className={cn(
              "w-12 h-6 rounded-full transition-all duration-300 relative",
              tfa ? "bg-[#4F46E5]" : "bg-[#CBD5E1] dark:bg-muted"
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
              tfa ? "left-7" : "left-1"
            )} />
          </button>
        </div>
      </div>
    </div>
  );
}

function IntegrationSettings() {
  const integrations = [
    { name: 'Slack', status: 'Not connected', icon: 'S' },
    { name: 'Google Workspace', status: 'Not connected', icon: 'G' },
    { name: 'Salesforce', status: 'Not connected', icon: 'S' },
    { name: 'HubSpot', status: 'Not connected', icon: 'H' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-foreground">Integrations</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Connect with third-party services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-5 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-lg">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{item.status}</div>
              </div>
            </div>
            <button className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
