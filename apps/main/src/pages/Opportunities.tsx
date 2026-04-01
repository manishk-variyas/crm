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
  Filter,
  ArrowUpDown,
  Search,
  X,
  Edit,
  Share2,
  CheckCircle,
  Save
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, Column, DataTable, SortOption, FilterConfig, Modal } from '@crm/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors w-full text-left group"
            >
              <Edit className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              Edit
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors w-full text-left group">
              <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
              Share
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors w-full text-left group">
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600" />
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
        <>
          <button 
            onClick={() => setActiveTab('details')}
            className={cn(
              "py-3 text-[13px] font-bold transition-all border-b-[3px]",
              activeTab === 'details' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            Opportunity Details
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={cn(
              "py-3 text-[13px] font-bold transition-all border-b-[3px]",
              activeTab === 'tasks' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            Associated Tasks
          </button>
        </>
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="h-10 px-5 font-semibold text-[13px]">
            Cancel
          </Button>
          <Button onClick={onClose} className="h-10 px-6 font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-[13px] border-none shadow-md">
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
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Opportunity Name</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input 
                    type="text" 
                    defaultValue={opportunity?.name || ''} 
                    placeholder="Unified Platform Expansion" 
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" 
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Associated Account</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <select 
                    defaultValue={opportunity?.account || ''} 
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium"
                  >
                    <option value="" disabled>Select an account</option>
                    <option value="Cyberdyne Systems">Cyberdyne Systems</option>
                    <option value="Massive Dynamic">Massive Dynamic</option>
                    <option value="Umbrella Corporation">Umbrella Corporation</option>
                    <option value="Wayne Enterprises">Wayne Enterprises</option>
                    <option value="Stark Industries">Stark Industries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Sales Stage</label>
                <select 
                  defaultValue={opportunity?.stage || 'Qualification'} 
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium"
                >
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Deal Amount ($)</label>
                <input 
                  type="text" 
                  defaultValue={opportunity?.amount || ''} 
                  placeholder="450,000" 
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Probability (%)</label>
                <input 
                  type="text" 
                  defaultValue={opportunity?.probability.replace('%', '') || ''} 
                  placeholder="80" 
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Expected Close Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input 
                    type="date" 
                    defaultValue={opportunity ? new Date(opportunity.closeDate).toISOString().split('T')[0] : ''} 
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Opportunity Owner</label>
                <select 
                  defaultValue="Alex Morgan" 
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium"
                >
                  <option value="Alex Morgan">Alex Morgan</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 pb-4">
          <div className="bg-muted/10 border border-border/50 rounded-xl p-5 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Add Task</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Task Subject</label>
                <input type="text" placeholder="Follow up call, Send proposal..." className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Due Date</label>
                <input type="date" className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-foreground">Priority</label>
                <select className="w-full h-10 px-3 rounded-lg border border-border bg-background hover:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[13px] font-medium">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button variant="outline" className="h-9 px-4 text-xs font-bold gap-2 text-primary border-primary/20 hover:bg-primary/5 border-dashed">
                <Plus className="w-3.5 h-3.5" />
                Add to Task List
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Pending Tasks</h3>
              <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">0 Tasks</Badge>
            </div>
            <div className="border-2 border-dashed border-border/60 rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-3 bg-muted/5">
              <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="text-[13px] font-medium text-muted-foreground">No tasks associated with this opportunity.</p>
            </div>
          </div>
        </div>
      )}
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
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold border-2 border-blue-50 shadow-sm">
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

  const hasActiveFilters =
    (activeFilters.stage && activeFilters.stage !== 'all') ||
    (activeFilters.account && activeFilters.account !== 'all') ||
    (activeFilters.owner && activeFilters.owner !== 'all') ||
    !!activeFilters.amountMin ||
    !!activeFilters.amountMax ||
    !!activeFilters.closeDateFrom ||
    !!activeFilters.closeDateTo ||
    searchTerm.trim().length > 0;

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
  };

  const handleFilterChange = (key: string, value: string) =>
    setActiveFilters((prev) => ({ ...prev, [key]: value }));

  const filteredData = OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      !searchTerm ||
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.owner.toLowerCase().includes(searchTerm.toLowerCase());

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

    return matchesSearch && matchesStage && matchesAccount && matchesOwner && matchesAmount && matchesCloseDate;
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
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
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
        <Badge 
          variant="secondary" 
          className={cn(
            "font-bold px-3 py-1 border-none",
            opp.stage === 'Closed Won'    && "bg-emerald-50 text-emerald-600",
            opp.stage === 'Closed Lost'   && "bg-rose-50 text-rose-500",
            opp.stage === 'Qualification' && "bg-muted text-muted-foreground",
            opp.stage === 'Proposal'      && "bg-indigo-50 text-indigo-600",
            opp.stage === 'Negotiation'   && "bg-amber-50 text-amber-600",
          )}
        >
          {opp.stage}
        </Badge>
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
          <>
            <Button variant="outline" className="flex items-center gap-2 h-10 transition-all hover:bg-muted font-bold">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              className="flex items-center gap-2 h-10 shadow-lg shadow-primary/20 active:scale-95 transition-all font-bold"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Opportunity
            </Button>
          </>
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

