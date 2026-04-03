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
import { Button, Badge, cn, PageHeader, Column, DataTable, SortOption, FilterConfig, Modal, StatusBadge, getStatusVariant, PageActions, FormInput, FormSelect, FormTextarea, Tabs, ExportOptionsModal } from '@crm/ui';
import { AccountModal, AccountDetailModal, OwnerProfileModal } from '../components/Accounts/modals';

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



export function Accounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ status: 'all', industry: 'all', owner: 'all', lastActivityUnit: 'days' });
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [viewingAccount, setViewingAccount] = useState<Account | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(account => account.id));
    }
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
      header: (
        <input 
          type="checkbox" 
          checked={selectedIds.length === filteredData.length && filteredData.length > 0}
          onChange={(e) => { e.stopPropagation(); toggleAllSelection(); }}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      ),
      headerClassName: 'w-12 px-4',
      cellClassName: 'px-4',
      render: (account) => (
        <input 
          type="checkbox" 
          checked={selectedIds.includes(account.id)}
          onChange={() => {}}
          onClick={(e) => toggleSelection(account.id, e as any)}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      )
    },
    {
      header: 'Company',
      sortable: true,
      sortKey: 'name',
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
      sortable: true,
      sortKey: 'owner',
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
      sortable: true,
      sortKey: 'industry',
      render: (account) => (
        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-semibold px-2.5 py-0.5">
          {account.industry}
        </Badge>
      )
    },
    {
      header: 'Status',
      align: 'center',
      sortable: true,
      sortKey: 'status',
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
      sortable: true,
      cellClassName: 'text-foreground/80 font-semibold'
    },
    {
      header: 'Last Activity',
      sortable: true,
      sortKey: 'lastActivity',
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
              { 
                label: 'Export', 
                variant: 'outline', 
                icon: <Download className="w-4 h-4" />, 
                onClick: () => setIsExportModalOpen(true),
                disabled: selectedIds.length === 0
              },
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
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: filteredData.length,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
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

      <ExportOptionsModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />
    </div>
  );
}
