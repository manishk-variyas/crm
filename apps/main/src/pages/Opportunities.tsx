/**
 * Opportunities Page - Sales deal/opportunity management
 * Tracks potential deals through various stages
 * @route /opportunities
 */
import React, { useState } from 'react';
import { 
  Plus, 
  Target,
  Download,
  Building2,
  Calendar,
  MoreVertical,
  X,
  Edit,
  Share2,
  CheckCircle,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, Column, DataTable, SortOption, FilterConfig, Modal, StatusBadge, getStatusVariant, PageActions, FormInput, FormSelect, FormTextarea, Tabs } from '@crm/ui';

interface Opportunity {
  id: string;
  name: string;
  account: string;
  amount: string;
  stage: 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: string;
  closeDate: string;
  owner: string;
}

const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    name: 'Unified Platform Expansion',
    account: 'Cyberdyne Systems',
    amount: '$450,000',
    stage: 'Negotiation',
    probability: '80%',
    closeDate: 'Oct 15, 2026',
    owner: 'Alex Morgan'
  },
  {
    id: '2',
    name: 'Global Licensing Deal',
    account: 'Massive Dynamic',
    amount: '$1,200,000',
    stage: 'Proposal',
    probability: '60%',
    closeDate: 'Nov 30, 2026',
    owner: 'Alex Morgan'
  },
  {
    id: '3',
    name: 'Cloud Infrastructure Upgrade',
    account: 'Umbrella Corporation',
    amount: '$250,000',
    stage: 'Qualification',
    probability: '20%',
    closeDate: 'Dec 12, 2026',
    owner: 'Alex Morgan'
  },
  {
    id: '4',
    name: 'Enterprise Security Suite',
    account: 'Wayne Enterprises',
    amount: '$850,000',
    stage: 'Closed Won',
    probability: '100%',
    closeDate: 'Sep 01, 2026',
    owner: 'Alex Morgan'
  },
  {
    id: '5',
    name: 'Next-Gen Analytics Engine',
    account: 'Stark Industries',
    amount: '$600,000',
    stage: 'Closed Lost',
    probability: '0%',
    closeDate: 'Aug 15, 2026',
    owner: 'Alex Morgan'
  }
];

const sortOptions: SortOption[] = [
  { label: 'Name', key: 'name' },
  { label: 'Account', key: 'account' },
  { label: 'Amount', key: 'amount' },
  { label: 'Stage', key: 'stage' },
  { label: 'Probability', key: 'probability' },
  { label: 'Close Date', key: 'closeDate' }
];

const filterConfigs: FilterConfig[] = [
  { key: 'stage', label: 'Stage', type: 'select', options: [
    { value: 'Qualification', label: 'Qualification' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Closed Won', label: 'Closed Won' },
    { value: 'Closed Lost', label: 'Closed Lost' }
  ]},
  { key: 'account', label: 'Account', type: 'select', options: [
    { value: 'Cyberdyne Systems', label: 'Cyberdyne Systems' },
    { value: 'Massive Dynamic', label: 'Massive Dynamic' },
    { value: 'Umbrella Corporation', label: 'Umbrella Corporation' },
    { value: 'Wayne Enterprises', label: 'Wayne Enterprises' },
    { value: 'Stark Industries', label: 'Stark Industries' }
  ]},
  { key: 'owner', label: 'Owner', type: 'select', options: [
    { value: 'Alex Morgan', label: 'Alex Morgan' }
  ]},
  {
    key: 'amount',
    label: 'Amount Range ($)',
    type: 'custom',
    render: (_, onChange, allFilters) => (
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Min"
          value={allFilters.amountMin || ''}
          onChange={(e) => onChange('amountMin', e.target.value)}
          className="h-9 w-20 px-3 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <span className="text-muted-foreground text-sm font-medium">–</span>
        <input
          type="text"
          placeholder="Max"
          value={allFilters.amountMax || ''}
          onChange={(e) => onChange('amountMax', e.target.value)}
          className="h-9 w-20 px-3 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>
    )
  },
  {
    key: 'closeDate',
    label: 'Close Date Range',
    type: 'custom',
    render: (_, onChange, allFilters) => (
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={allFilters.closeDateFrom || ''}
          onChange={(e) => onChange('closeDateFrom', e.target.value)}
          className="h-9 px-3 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
        />
        <span className="text-muted-foreground text-sm font-medium">–</span>
        <input
          type="date"
          value={allFilters.closeDateTo || ''}
          onChange={(e) => onChange('closeDateTo', e.target.value)}
          className="h-9 px-3 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
        />
      </div>
    )
  }
];

interface FilterState {
  stage: string;
  account: string;
  owner: string;
  amountMin: string;
  amountMax: string;
  closeDateFrom: string;
  closeDateTo: string;
}

const defaultFilters: FilterState = {
  stage: 'all',
  account: 'all',
  owner: 'all',
  amountMin: '',
  amountMax: '',
  closeDateFrom: '',
  closeDateTo: '',
};

function ActionMenu({ opportunity, onEdit }: { opportunity: Opportunity, onEdit: (opp: Opportunity) => void }) {
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
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(opportunity); }}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors w-full text-left group"
            >
              <Edit className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              Edit
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors w-full text-left group">
              <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              Share
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors w-full text-left group">
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OpportunityModal({ opportunity, onClose }: { opportunity?: Opportunity | null, onClose: () => void }) {
  const isEditing = !!opportunity;
  const [activeTab, setActiveTab] = useState<'details' | 'tasks'>('details');
  
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Opportunity' : 'Add New Opportunity'}
      description={isEditing ? 'Update the details for this sales opportunity.' : 'Enter the details for the new sales opportunity.'}
      tabs={
        <Tabs
          tabs={[
            { id: 'details', label: 'Opportunity Details' },
            { id: 'tasks', label: 'Associated Tasks' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Deal' : 'Create Opportunity'}
          </Button>
        </>
      }
    >
      {activeTab === 'details' ? (
        <div className="space-y-8 pb-4">
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1 md:col-span-2">
                <FormInput
                  label="Opportunity Name"
                  defaultValue={opportunity?.name || ''}
                  placeholder="Unified Platform Expansion"
                  icon={<Target />}
                />
              </div>
              
              <FormSelect
                label="Associated Account"
                defaultValue={opportunity?.account || ''}
                placeholder="Select an account"
                options={[
                  { value: 'Cyberdyne Systems', label: 'Cyberdyne Systems' },
                  { value: 'Massive Dynamic', label: 'Massive Dynamic' },
                  { value: 'Umbrella Corporation', label: 'Umbrella Corporation' },
                  { value: 'Wayne Enterprises', label: 'Wayne Enterprises' },
                  { value: 'Stark Industries', label: 'Stark Industries' },
                ]}
              />

              <FormSelect
                label="Sales Stage"
                defaultValue={opportunity?.stage || 'Qualification'}
                options={[
                  { value: 'Qualification', label: 'Qualification' },
                  { value: 'Proposal', label: 'Proposal' },
                  { value: 'Negotiation', label: 'Negotiation' },
                  { value: 'Closed Won', label: 'Closed Won' },
                  { value: 'Closed Lost', label: 'Closed Lost' },
                ]}
              />

              <FormInput
                label="Deal Amount ($)"
                defaultValue={opportunity?.amount || ''}
                placeholder="450,000"
              />

              <FormInput
                label="Probability (%)"
                defaultValue={opportunity?.probability.replace('%', '') || ''}
                placeholder="80"
              />

              <FormInput
                label="Expected Close Date"
                defaultValue={opportunity ? new Date(opportunity.closeDate).toISOString().split('T')[0] : ''}
                type="date"
              />

              <FormSelect
                label="Opportunity Owner"
                defaultValue="Alex Morgan"
                options={[
                  { value: 'Alex Morgan', label: 'Alex Morgan' },
                ]}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

function OwnerProfileModal({ ownerName, onClose }: { ownerName: string, onClose: () => void }) {
  // Mock data for the owner (consistent with Accounts)
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


export function Opportunities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ stage: 'all', account: 'all', owner: 'all' });
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingOwner, setViewingOwner] = useState<string | null>(null);
  const [alphabetLetter, setAlphabetLetter] = useState('');

  const hasActiveFilters =
    (activeFilters.stage && activeFilters.stage !== 'all') ||
    (activeFilters.account && activeFilters.account !== 'all') ||
    (activeFilters.owner && activeFilters.owner !== 'all') ||
    !!activeFilters.amountMin ||
    !!activeFilters.amountMax ||
    !!activeFilters.closeDateFrom ||
    !!activeFilters.closeDateTo ||
    searchTerm.trim().length > 0 ||
    !!alphabetLetter;

  const clearFilters = () => {
    setActiveFilters({ 
      stage: 'all', 
      account: 'all', 
      owner: 'all',
      amountMin: '',
      amountMax: '',
      closeDateFrom: '',
      closeDateTo: ''
    });
    setSearchTerm('');
    setAlphabetLetter('');
  };

  const handleFilterChange = (key: string, value: string) =>
    setActiveFilters((prev) => ({ ...prev, [key]: value }));

  const filteredData = OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      !searchTerm ||
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || opp.name.toUpperCase().startsWith(alphabetLetter);

    const matchesStage   = !activeFilters.stage   || activeFilters.stage   === 'all' || opp.stage   === activeFilters.stage;
    const matchesAccount = !activeFilters.account || activeFilters.account   === 'all' || opp.account === activeFilters.account;
    const matchesOwner   = !activeFilters.owner   || activeFilters.owner   === 'all' || opp.owner   === activeFilters.owner;

    let matchesAmount = true;
    if (activeFilters.amountMin || activeFilters.amountMax) {
      const num = parseFloat(opp.amount.replace(/[^0-9.-]+/g, ""));
      const min = activeFilters.amountMin ? parseFloat(activeFilters.amountMin) : 0;
      const max = activeFilters.amountMax ? parseFloat(activeFilters.amountMax) : Infinity;
      matchesAmount = num >= min && num <= max;
    }

    let matchesCloseDate = true;
    if (activeFilters.closeDateFrom || activeFilters.closeDateTo) {
      const date = new Date(opp.closeDate).getTime();
      const from = activeFilters.closeDateFrom ? new Date(activeFilters.closeDateFrom).getTime() : 0;
      const to = activeFilters.closeDateTo ? new Date(activeFilters.closeDateTo).getTime() : Infinity;
      matchesCloseDate = date >= from && date <= to;
    }

    return matchesSearch && matchesStage && matchesAccount && matchesOwner && matchesAmount && matchesCloseDate && matchesAlphabet;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      const aVal = parseFloat((a.amount as string).replace(/[^0-9.-]+/g, ""));
      const bVal = parseFloat((b.amount as string).replace(/[^0-9.-]+/g, ""));
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (sortConfig.key === 'probability') {
      const aVal = parseFloat((a.probability as string).replace(/[^0-9.-]+/g, ""));
      const bVal = parseFloat((b.probability as string).replace(/[^0-9.-]+/g, ""));
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (sortConfig.key === 'closeDate') {
      const aVal = new Date(a.closeDate).getTime();
      const bVal = new Date(b.closeDate).getTime();
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(a[sortConfig.key as keyof Opportunity]).toLowerCase();
    const bStr = String(b[sortConfig.key as keyof Opportunity]).toLowerCase();
    if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const columns: Column<Opportunity>[] = [
    {
      header: 'Opportunity Name',
      render: (opp) => (
        <div className="flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <Target className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-semibold">{opp.name}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Owner',
      render: (opp) => (
        <span 
          className="text-primary font-semibold hover:underline cursor-pointer text-[13px]"
          onClick={() => setViewingOwner(opp.owner)}
        >
          {opp.owner}
        </span>
      )
    },
    {
      header: 'Account',
      render: (opp) => (
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <Building2 className="w-4 h-4 text-muted-foreground/50" />
          {opp.account}
        </div>
      )
    },
    {
      header: 'Amount',
      render: (opp) => <span className="text-foreground font-bold">{opp.amount}</span>
    },
    {
      header: 'Stage',
      render: (opp) => (
        <StatusBadge
          status={opp.stage}
          variant={getStatusVariant(opp.stage)}
        />
      )
    },
    {
      header: 'Probability',
      render: (opp) => (
        <div className="w-full max-w-[100px] space-y-1.5 mx-auto">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-muted-foreground/70">{opp.probability}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                opp.stage === 'Closed Won'  ? "bg-emerald-500" : 
                opp.stage === 'Closed Lost' ? "bg-rose-500"    : "bg-blue-500"
              )}
              style={{ width: opp.probability }}
            />
          </div>
        </div>
      ),
      align: 'center'
    },
    {
      header: 'Close Date',
      render: (opp) => (
        <div className="flex items-center gap-2 text-muted-foreground font-medium whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground/50" />
          {opp.closeDate}
        </div>
      )
    },
    {
      header: '',
      headerClassName: 'w-12',
      render: (opp) => <ActionMenu opportunity={opp} onEdit={setEditingOpp} />
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Opportunities"
        subtitle="Track and manage your sales pipeline and ongoing deals."
        actions={
          <PageActions 
            actions={[
              { label: 'Export', onClick: () => {}, icon: <Download className="w-4 h-4" />, variant: 'outline' },
              { label: 'Add Opportunity', onClick: () => setIsAddModalOpen(true), icon: <Plus className="w-4 h-4" />, variant: 'primary' }
            ]}
          />
        }
      />

      <DataTable
        data={sortedData}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search deals, accounts..."
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
        emptyMessage="No opportunities match the current filters."
      />

      {(editingOpp || isAddModalOpen) && (
        <OpportunityModal 
          opportunity={editingOpp} 
          onClose={() => {
            setEditingOpp(null);
            setIsAddModalOpen(false);
          }} 
        />
      )}

      {viewingOwner && (
        <OwnerProfileModal ownerName={viewingOwner} onClose={() => setViewingOwner(null)} />
      )}
    </div>
  );
}

