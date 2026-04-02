/**
 * Accounts Page - Company/business account management
 * Lists all accounts with search, filters, and CRUD operations
 * @route /accounts
 */
import React, { useState } from 'react';
import {
  Building2,
  Download,
  Plus,
  Edit,
  Share2,
  Phone,
  DollarSign,
  Users,
  Save,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MoreVertical,
  ChevronRight,
  Globe,
  UserPlus,
  Activity,
  X
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, Column, DataTable, SortOption, FilterConfig, Modal, StatusBadge, getStatusVariant, PageActions, FormInput, FormSelect, FormTextarea, Tabs } from '@crm/ui';

interface Account {
  id: string;
  name: string;
  website: string;
  owner: string;
  industry: string;
  status: 'active' | 'churned' | 'prospect';
  revenue: string;
  lastActivity: string;
}

const ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Cyberdyne Systems',
    website: 'www.cyberdyne.com',
    owner: 'Alex Morgan',
    industry: 'Technology',
    status: 'active',
    revenue: '$1.2B',
    lastActivity: '2 days ago'
  },
  {
    id: '2',
    name: 'Massive Dynamic',
    website: 'www.massivedynamic.com',
    owner: 'Alex Morgan',
    industry: 'Technology',
    status: 'churned',
    revenue: '$3.5B',
    lastActivity: '3 months ago'
  },
  {
    id: '3',
    name: 'Umbrella Corporation',
    website: 'www.umbrella.com',
    owner: 'Alex Morgan',
    industry: 'Healthcare',
    status: 'prospect',
    revenue: '$900.0M',
    lastActivity: '5 days ago'
  },
  {
    id: '4',
    name: 'Wayne Enterprises',
    website: 'www.wayne.com',
    owner: 'Alex Morgan',
    industry: 'Technology',
    status: 'active',
    revenue: '$5.0B',
    lastActivity: '1 week ago'
  }
];

const sortOptions: SortOption[] = [
  { label: 'Name', key: 'name' },
  { label: 'Owner', key: 'owner' },
  { label: 'Industry', key: 'industry' },
  { label: 'Status', key: 'status' },
  { label: 'Revenue', key: 'revenue' },
  { label: 'Last Activity', key: 'lastActivity' }
];

const filterConfigs: FilterConfig[] = [
  {
    key: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'churned', label: 'Churned' },
      { value: 'prospect', label: 'Prospect' }
    ]
  },
  {
    key: 'industry', label: 'Industry', type: 'select', options: [
      { value: 'Technology', label: 'Technology' },
      { value: 'Healthcare', label: 'Healthcare' },
      { value: 'Finance', label: 'Finance' }
    ]
  },
  {
    key: 'owner', label: 'Owner', type: 'select', options: [
      { value: 'Alex Morgan', label: 'Alex Morgan' }
    ]
  },
  {
    key: 'revenue',
    label: 'Revenue Range ($)',
    type: 'custom',
    render: (_, onChange, allFilters) => (
      <div className="flex items-center gap-2">
        <FormInput
          type="text"
          placeholder="Min"
          value={allFilters.revenueMin || ''}
          onChange={(e) => onChange('revenueMin', e.target.value)}
          inputSize="sm"
          className="w-20"
        />
        <span className="text-muted-foreground text-sm font-medium">–</span>
        <FormInput
          type="text"
          placeholder="Max"
          value={allFilters.revenueMax || ''}
          onChange={(e) => onChange('revenueMax', e.target.value)}
          inputSize="sm"
          className="w-20"
        />
      </div>
    )
  },
  {
    key: 'lastActivity',
    label: 'Last Activity (Within)',
    type: 'custom',
    render: (_, onChange, allFilters) => (
      <div className="flex items-center gap-2">
        <FormInput
          type="text"
          placeholder="e.g. 3"
          value={allFilters.lastActivityValue || ''}
          onChange={(e) => onChange('lastActivityValue', e.target.value)}
          inputSize="sm"
          className="w-20"
        />
        <FormSelect
          value={allFilters.lastActivityUnit || 'days'}
          onChange={(e) => onChange('lastActivityUnit', e.target.value)}
          options={[
            { value: 'days', label: 'Days ago' },
            { value: 'weeks', label: 'Weeks ago' },
            { value: 'months', label: 'Months ago' },
          ]}
          selectSize="sm"
        />
      </div>
    )
  }
];

interface FilterState {
  status: string;
  industry: string;
  owner: string;
  revenueMin: string;
  revenueMax: string;
  lastActivityValue: string;
  lastActivityUnit: string;
}

const defaultFilters: FilterState = {
  status: 'all',
  industry: 'all',
  owner: 'all',
  revenueMin: '',
  revenueMax: '',
  lastActivityValue: '',
  lastActivityUnit: 'days',
};

function ActionMenu({ account, onEdit }: { account: Account, onEdit: (account: Account) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative flex justify-end" ref={menuRef}>
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
      >
        <MoreVertical className="w-4.5 h-4.5" />
      </button>

      {isOpen && (
        <div className="absolute right-6 top-0 mt-8 w-36 bg-card border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col p-1.5 gap-0.5">
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(account); }}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors w-full text-left group"
            >
              <Edit className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              Edit
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors w-full text-left group"
            >
              <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              Share
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors w-full text-left group"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountModal({ account, onClose }: { account?: Account | null, onClose: () => void }) {
  const isEditing = !!account;
  const [activeTab, setActiveTab] = useState<'info' | 'hierarchy'>('info');

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Account' : 'Add New Account'}
      description={isEditing ? 'Update the details for this company account.' : 'Enter the details for the new company account.'}
      tabs={
        <Tabs
          tabs={[
            { id: 'info', label: 'Company Information' },
            { id: 'hierarchy', label: 'Company Hierarchy' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="h-10 px-5 font-semibold text-[13px]">
            Cancel
          </Button>
          <Button onClick={onClose}
            className='shadow-md flex items-center gap-2'
          >
            <Save className="w-4 h-4" />
            Save Account
          </Button>
        </>
      }
    >
      {activeTab === 'info' ? (
        <div className="space-y-8 pb-4">
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1 md:col-span-2">
                <FormInput
                  label="Company Name"
                  defaultValue={account?.name || ''}
                  placeholder="Acme Corp"
                  icon={<Building2 />}
                />
              </div>
              <FormSelect
                label="Industry Vertical"
                defaultValue={account?.industry || 'Technology'}
                options={[
                  { value: 'Technology', label: 'Technology' },
                  { value: 'Healthcare', label: 'Healthcare' },
                  { value: 'Finance', label: 'Finance' },
                ]}
              />
              <FormSelect
                label="Status"
                defaultValue={account ? (account.status === 'active' ? 'Active' : account.status === 'churned' ? 'Churned' : 'Prospect') : 'Prospect'}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Churned', label: 'Churned' },
                  { value: 'Prospect', label: 'Prospect' },
                ]}
              />
              <div className="col-span-1 md:col-span-2">
                <FormSelect
                  label="Owner"
                  defaultValue="Alex Morgan (EMP001)"
                  options={[
                    { value: 'Alex Morgan (EMP001)', label: 'Alex Morgan (EMP001)' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-border/40">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Contact & Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <FormInput
                label="Website"
                defaultValue={account?.website || ''}
                placeholder="www.example.com"
                icon={<Globe />}
              />
              <FormInput
                label="Phone"
                defaultValue={account ? "+1 (555) 123-4567" : ""}
                placeholder="+1 (555) 000-0000"
                icon={<Phone />}
              />
              <FormInput
                label="Annual Revenue"
                defaultValue={account ? account.revenue.replace(/[^0-9.]/g, '') + (account.revenue.includes('B') ? '00000000' : '000000') : "0"}
                placeholder="0"
                icon={<DollarSign />}
              />
              <FormInput
                label="Employees"
                defaultValue={account ? "5000" : "0"}
                placeholder="0"
                icon={<Users />}
              />
              <div className="col-span-1 md:col-span-2">
                <FormTextarea
                  label="Description"
                  defaultValue={account ? "Leading AI and robotics manufacturer." : ""}
                  placeholder="Brief description of the company..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-border/40">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1 md:col-span-2">
                <FormInput
                  label="Street Address"
                  defaultValue={account ? "123 Main St" : ""}
                  placeholder="123 Main St"
                />
              </div>
              <FormInput
                label="City"
                defaultValue={account ? "San Francisco" : ""}
                placeholder="San Francisco"
              />
              <FormInput
                label="State / Province"
                defaultValue={account ? "CA" : ""}
                placeholder="CA"
              />
              <FormInput
                label="ZIP / Postal Code"
                defaultValue={account ? "94105" : ""}
                placeholder="94105"
              />
              <FormInput
                label="Country"
                defaultValue={account ? "United States" : ""}
                placeholder="United States"
              />
              <FormInput
                label="Latitude (Google Maps)"
                defaultValue={account ? "37.7749" : ""}
                placeholder="37.7749"
              />
              <FormInput
                label="Longitude (Google Maps)"
                defaultValue={account ? "-122.4194" : ""}
                placeholder="-122.4194"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 pb-4">
          <div className="bg-muted/10 border border-border/50 rounded-xl p-5 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Add Customer Contact</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Customer Contact Name</label>
                <input type="text" placeholder="John Doe" className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Designation</label>
                <input type="text" placeholder="CTO, VP of Sales..." className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Role Type</label>
                <select className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium">
                  <option value="Influencer">Influencer</option>
                  <option value="Decision Maker">Decision Maker</option>
                  <option value="Evaluator">Evaluator</option>
                  <option value="Champion">Champion</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Reports To</label>
                <select className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium">
                  <option value="">None (Top Level)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Phone</label>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" className="h-9 px-4 text-xs font-bold gap-2 text-primary border-primary/20 hover:bg-primary/5">
                <Plus className="w-3.5 h-3.5" />
                Add to Hierarchy
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Current Hierarchy</h3>
            <div className="border-2 border-dashed border-border/60 rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-3 bg-muted/5">
              <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="text-[13px] font-medium text-muted-foreground">No customer contacts added yet.</p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function OwnerProfileModal({ ownerName, onClose }: { ownerName: string, onClose: () => void }) {
  // Mock data for the owner
  const owner = {
    name: ownerName,
    initials: ownerName.split(' ').map(n => n[0]).join(''),
    title: 'Account Owner',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    manager: 'Sarah Jenkins',
    department: 'Sales'
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Owner Profile"
      maxWidth="md"
      footer={
        <Button onClick={onClose} variant="outline" className="h-10 px-6 font-semibold">
          Close
        </Button>
      }
    >
      <div className="space-y-8 py-2">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold border-2 border-primary/20 shadow-sm">
            {owner.initials}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground">{owner.name}</h2>
            <p className="text-[14px] text-muted-foreground font-medium">{owner.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-6 pt-2">
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Email</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.email}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Phone</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.phone}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Manager</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.manager}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Department</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.department}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function AccountDetailModal({ account, onClose, onEdit }: { account: Account, onClose: () => void, onEdit: (account: Account) => void }) {
  const [activeTab, setActiveTab] = useState<'details' | 'opportunities'>('details');

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-foreground">{account.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-bold border-none px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                {account.industry}
              </Badge>
              <StatusBadge
                status={account.status}
                variant={getStatusVariant(account.status)}
              />
            </div>
          </div>
        </div>
      }
      tabs={
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              "py-4 text-[13px] font-bold transition-all border-b-[3px] relative -mb-[1px]",
              activeTab === 'details' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={cn(
              "py-4 text-[13px] font-bold transition-all border-b-[3px] relative -mb-[1px]",
              activeTab === 'opportunities' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            Opportunities
          </button>
        </div>
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(account)} className="shadow-md flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Account
          </Button>
        </>
      }
    >
      <div className="space-y-10 pb-4">
        {activeTab === 'details' ? (
          <>
            {/* Company Details */}
            <div className="space-y-5 px-1">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Company Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Website</p>
                  <a href={`https://${account.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] font-bold text-primary hover:underline underline-offset-4 w-fit group transition-all">
                    <Globe className="w-4 h-4" />
                    {account.website}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Phone</p>
                  <a href="tel:+15551234567" className="flex items-center gap-2 text-[14px] font-bold text-primary hover:underline underline-offset-4 w-fit">
                    <Phone className="w-4 h-4" />
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Employees</p>
                  <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    5,000
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Annual Revenue</p>
                  <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    {account.revenue}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 py-6 border-t border-border/50 px-1">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Description</h3>
              <p className="text-[14px] font-medium text-foreground/80 leading-relaxed max-w-2xl">
                Leading AI and robotics manufacturer. Specializing in advanced neural networks and automation systems for global infrastructure.
              </p>
            </div>

            {/* Location Details */}
            <div className="space-y-4 py-6 border-t border-border/50 px-1">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Location Details</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Working Office</p>
                  <p className="text-[14px] font-bold text-foreground">No address provided</p>
                </div>
              </div>
            </div>

            {/* Account Management */}
            <div className="space-y-4 py-6 border-t border-border/50 px-1">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Account Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Account Owner</p>
                  <p className="text-[14px] font-bold text-foreground">{account.owner}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] font-medium text-muted-foreground">Last Activity</p>
                  <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    {account.lastActivity}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Activities */}
            <div className="space-y-6 py-6 border-t border-border/50 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Account Activities</h3>
                <Badge variant="secondary" className="px-1.5 py-0 text-[9px] font-bold">LATEST FIRST</Badge>
              </div>
              <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
                <div className="relative">
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-primary border-[4px] border-background flex items-center justify-center z-10 shadow-sm ring-1 ring-border" />
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-bold text-foreground">Account Assigned</p>
                    <p className="text-[11px] font-bold text-muted-foreground">Mar 18, 2026, 10:25 AM IST</p>
                  </div>
                  <p className="text-[13px] font-medium text-muted-foreground mt-1">Owner: Alex Morgan</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-primary border-[4px] border-background flex items-center justify-center z-10 shadow-sm ring-1 ring-border" />
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-bold text-foreground">Account Created</p>
                    <p className="text-[11px] font-bold text-muted-foreground">Mar 17, 2025, 10:00 AM IST</p>
                  </div>
                  <p className="text-[13px] font-medium text-muted-foreground mt-1">Owner: Unassigned</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4 px-1">
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6 group hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <h4 className="text-[15px] font-bold text-foreground">AI Defense System Upgrade</h4>
                  <p className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">OPP-001</p>
                </div>
                <StatusBadge status="Prospecting" variant="prospect" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[12px] font-medium text-muted-foreground">Value</p>
                  <p className="text-[14px] font-bold text-foreground">$50,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[12px] font-medium text-muted-foreground">Owner</p>
                  <p className="text-[14px] font-bold text-foreground">Alex Morgan</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 border-dashed text-muted-foreground hover:text-primary transition-all font-bold gap-2 bg-primary/5 hover:bg-primary/10">
              <Plus className="w-4 h-4" />
              Add Opportunity
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export function Accounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ status: 'all', industry: 'all', owner: 'all', lastActivityUnit: 'days' });
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [viewingAccount, setViewingAccount] = useState<Account | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingOwner, setViewingOwner] = useState<string | null>(null);
  const [alphabetLetter, setAlphabetLetter] = useState('');

  const hasActiveFilters =
    (activeFilters.status && activeFilters.status !== 'all') ||
    (activeFilters.industry && activeFilters.industry !== 'all') ||
    (activeFilters.owner && activeFilters.owner !== 'all') ||
    !!activeFilters.revenueMin ||
    !!activeFilters.revenueMax ||
    !!activeFilters.lastActivityValue ||
    searchTerm.trim().length > 0 ||
    !!alphabetLetter;

  const clearFilters = () => {
    setActiveFilters({
      status: 'all',
      industry: 'all',
      owner: 'all',
      lastActivityUnit: 'days',
      revenueMin: '',
      revenueMax: '',
      lastActivityValue: ''
    });
    setSearchTerm('');
    setAlphabetLetter('');
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = ACCOUNTS.filter((account) => {
    const matchesSearch = !searchTerm ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.website.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || account.name.toUpperCase().startsWith(alphabetLetter);

    const matchesStatus = !activeFilters.status || activeFilters.status === 'all' || account.status === activeFilters.status;
    const matchesIndustry = !activeFilters.industry || activeFilters.industry === 'all' || account.industry === activeFilters.industry;
    const matchesOwner = !activeFilters.owner || activeFilters.owner === 'all' || account.owner === activeFilters.owner;

    let matchesRevenue = true;
    if (activeFilters.revenueMin || activeFilters.revenueMax) {
      let num = parseFloat((account.revenue as string).replace(/[^0-9.]/g, ''));
      if ((account.revenue as string).includes('B')) num *= 1000000000;
      else if ((account.revenue as string).includes('M')) num *= 1000000;
      else if ((account.revenue as string).includes('K')) num *= 1000;

      const rMin = activeFilters.revenueMin ? parseFloat(activeFilters.revenueMin) : 0;
      const rMax = activeFilters.revenueMax ? parseFloat(activeFilters.revenueMax) : Infinity;
      matchesRevenue = num >= rMin && num <= rMax;
    }

    let matchesActivity = true;
    if (activeFilters.lastActivityValue) {
      const activityStr = account.lastActivity.toLowerCase();
      let rowDays = 0;
      if (activityStr.includes('day')) rowDays = parseInt(activityStr) || 0;
      else if (activityStr.includes('week')) rowDays = (parseInt(activityStr) || 0) * 7;
      else if (activityStr.includes('month')) rowDays = (parseInt(activityStr) || 0) * 30;
      else if (activityStr.includes('year')) rowDays = (parseInt(activityStr) || 0) * 365;

      const filterAmnt = parseInt(activeFilters.lastActivityValue) || 0;
      let filterDays = filterAmnt;
      if (activeFilters.lastActivityUnit === 'weeks') filterDays *= 7;
      if (activeFilters.lastActivityUnit === 'months') filterDays *= 30;

      matchesActivity = rowDays <= filterDays;
    }

    return matchesSearch && matchesStatus && matchesIndustry && matchesOwner && matchesRevenue && matchesActivity && matchesAlphabet;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'revenue') {
      const parseRevenue = (val: string) => {
        let num = parseFloat(val.replace(/[^0-9.]/g, ''));
        if (val.includes('B')) num *= 1000000000;
        else if (val.includes('M')) num *= 1000000;
        else if (val.includes('K')) num *= 1000;
        return num || 0;
      };
      const aVal = parseRevenue(a.revenue);
      const bVal = parseRevenue(b.revenue);
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(a[sortConfig.key as keyof Account]).toLowerCase();
    const bStr = String(b[sortConfig.key as keyof Account]).toLowerCase();
    if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const columns: Column<Account>[] = [
    {
      header: '',
      headerClassName: 'w-12',
      render: () => <input type="checkbox" className="rounded border-border bg-muted text-primary focus:ring-primary" />
    },
    {
      header: 'Company',
      render: (account) => (
        <div className="flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-card group-hover:shadow-sm transition-all border border-transparent group-hover:border-border">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-foreground font-semibold hover:text-primary hover:underline cursor-pointer transition-colors"
              onClick={() => setViewingAccount(account)}
            >
              {account.name}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium mt-0.5">
              <Globe className="w-3 h-3" />
              {account.website}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Owner',
      render: (account) => (
        <span
          className="text-primary font-semibold hover:underline cursor-pointer"
          onClick={() => setViewingOwner(account.owner)}
        >
          {account.owner}
        </span>
      )
    },
    {
      header: 'Industry Vertical',
      render: (account) => (
        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-semibold px-2.5 py-0.5">
          {account.industry}
        </Badge>
      )
    },
    {
      header: 'Status',
      align: 'center',
      render: (account) => (
        <StatusBadge
          status={account.status.charAt(0).toUpperCase() + account.status.slice(1)}
          variant={getStatusVariant(account.status)}
        />
      )
    },
    {
      header: 'Revenue',
      accessorKey: 'revenue',
      cellClassName: 'text-foreground/80 font-semibold'
    },
    {
      header: 'Last Activity',
      render: (account) => (
        <div className="flex items-center gap-2 text-muted-foreground font-medium whitespace-nowrap">
          <Activity className="w-3.5 h-3.5 text-muted-foreground/50" />
          {account.lastActivity}
        </div>
      )
    },
    {
      header: '',
      headerClassName: 'w-12',
      render: (account) => <ActionMenu account={account} onEdit={setEditingAccount} />
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader
        title="Accounts"
        subtitle={
          <>
            Manage your customer accounts and company details. <span className="text-primary font-medium cursor-pointer hover:underline underline-offset-4">(My Accounts)</span>
          </>
        }
        actions={
          <PageActions
            actions={[
              { label: 'Export', variant: 'outline', icon: <Download className="w-4 h-4" />, onClick: () => {} },
              { label: 'Add Account', variant: 'primary', icon: <Plus className="w-4 h-4" />, onClick: () => setIsAddModalOpen(true) }
            ]}
          />
        }
      />

      <DataTable
        data={sortedData}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, industry, or website..."
        sortOptions={sortOptions}
        defaultSort={sortConfig}
        onSortChange={setSortConfig}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        alphabetFilter={{
          value: alphabetLetter,
          onChange: setAlphabetLetter
        }}
        emptyMessage="No accounts match the current filters."
      />

      {editingAccount && (
        <AccountModal account={editingAccount} onClose={() => setEditingAccount(null)} />
      )}

      {isAddModalOpen && (
        <AccountModal onClose={() => setIsAddModalOpen(false)} />
      )}

      {viewingOwner && (
        <OwnerProfileModal ownerName={viewingOwner} onClose={() => setViewingOwner(null)} />
      )}

      {viewingAccount && (
        <AccountDetailModal
          account={viewingAccount}
          onClose={() => setViewingAccount(null)}
          onEdit={(acc) => {
            setViewingAccount(null);
            setEditingAccount(acc);
          }}
        />
      )}
    </div>
  );
}
