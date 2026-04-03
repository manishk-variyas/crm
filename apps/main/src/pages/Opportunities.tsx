/**
 * Opportunities Page - Sales deal/opportunity management
 * Tracks potential deals through various stages
 * @route /opportunities
 */
import React, { useState } from 'react';
import {
  Plus,
  Download,
  Building2,
  MoreVertical,
  X,
  Edit,
  Share2,
  ChevronRight,
  Phone,
  Mail,
  Target
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, Column, DataTable, SortOption, FilterConfig, StatusBadge, getStatusVariant, PageActions, ExportOptionsModal } from '@crm/ui';
import { OpportunityModal, OpportunityQuickViewModal } from '../components/Opportunities/modals';

interface Opportunity {
  id: string;
  oppId: string;
  name: string;
  subTitle: string;
  account: string;
  amount: string;
  stage: string;
  expectedClosure: string;
  lastContact: string;
  createdOn: string;
  email: string;
  phone: string;
  owner: string;
  productInterest?: string;
  description?: string;
  comments?: string;
  industry?: string;
  emdAmount?: string;
  source?: string;
  sourceName?: string;
  reverseAuction?: 'Yes' | 'No';
}

const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    oppId: 'OPP-005',
    name: 'Arc Reactor Supply Chain',
    subTitle: 'Tony Stark (CEO)',
    account: 'Stark Industries',
    amount: '$500,000',
    stage: 'Negotiation',
    expectedClosure: 'Not set',
    lastContact: 'Yesterday',
    createdOn: '2026-03-15',
    email: 'tony@stark.com',
    phone: '+1 (555) 777-7777',
    owner: 'Alex Morgan',
    productInterest: 'Arc Reactor Tech',
    description: 'Main supply chain for next-gen energy systems.',
    industry: 'Technology',
    emdAmount: '5,000',
    source: 'Referral',
    sourceName: 'Pepper Potts',
    reverseAuction: 'No'
  },
  {
    id: '2',
    oppId: 'OPP-004',
    name: 'Hoverboard Prototype Materials',
    subTitle: 'Marty McFly (Product Manager)',
    account: 'Hill Valley Inc.',
    amount: '$30,000',
    stage: 'Prospecting',
    expectedClosure: 'Not set',
    lastContact: '5 days ago',
    createdOn: '2026-03-12',
    email: 'marty@hillvalley.com',
    phone: '+1 (555) 111-2222',
    owner: 'Alex Morgan',
    productInterest: 'Anti-gravity Composites',
    description: 'Looking for specialized materials for prototype testing.',
    industry: 'Manufacturing',
    emdAmount: '1,000',
    source: 'Website',
    reverseAuction: 'No'
  },
  {
    id: '3',
    oppId: 'OPP-003',
    name: 'Colony Terraforming Equipment',
    subTitle: 'Ellen Ripley (Operations Director)',
    account: 'Weyland-Yutani',
    amount: '$120,000',
    stage: 'Qualified',
    expectedClosure: 'Not set',
    lastContact: '3 days ago',
    createdOn: '2026-03-10',
    email: 'ripley@weyland.com',
    phone: '+1 (555) 888-9999',
    owner: 'Alex Morgan',
    productInterest: 'Atmospheric Processors',
    description: 'Heavy duty terraforming equipment for extraterrestrial colonies.',
    industry: 'Manufacturing',
    emdAmount: '10,000',
    source: 'LinkedIn',
    reverseAuction: 'No'
  },
  {
    id: '4',
    oppId: 'OPP-007',
    name: 'Artifact Preservation Tech',
    subTitle: 'Diana Prince (Curator)',
    account: 'Louvre Museum',
    amount: '$15,000',
    stage: 'Discovery Done',
    expectedClosure: 'Not set',
    lastContact: '2 weeks ago',
    createdOn: '2026-03-20',
    email: 'diana@louvre.com',
    phone: '+1 (555) 000-1111',
    owner: 'Alex Morgan',
    productInterest: 'Climate Control Systems',
    description: 'High-precision climate and humidity control for museum storage.',
    industry: 'Government/Non-Profit',
    emdAmount: '500',
    source: 'Trade Show',
    reverseAuction: 'No'
  },
  {
    id: '5',
    oppId: 'OPP-001',
    name: 'AI Defense System Upgrade',
    subTitle: 'Sarah Connor (CTO)',
    account: 'Cyberdyne Systems',
    amount: '$50,000',
    stage: 'Prospecting',
    expectedClosure: '2026-04-15',
    lastContact: '2 days ago',
    createdOn: '2026-03-01',
    email: 'sarah@cyberdyne.com',
    phone: '+1 (555) 123-4567',
    owner: 'Alex Morgan',
    productInterest: 'Neural Processors',
    description: 'Strategic upgrade for existing AI defense infrastructure.',
    industry: 'Technology',
    emdAmount: '2,500',
    source: 'Cold Call',
    reverseAuction: 'No'
  },
  {
    id: '6',
    oppId: 'OPP-006',
    name: 'Security Systems Overhaul',
    subTitle: 'Bruce Wayne (Chairman)',
    account: 'Wayne Enterprises',
    amount: '$250,000',
    stage: 'Proposal Sent',
    expectedClosure: 'Not set',
    lastContact: '1 week ago',
    createdOn: '2026-03-18',
    email: 'bruce@wayne.com',
    phone: '+1 (555) 987-6543',
    owner: 'Alex Morgan',
    productInterest: 'Biometric Security',
    description: 'Complete overhaul of physical and digital security protocols at Wayne Tower.',
    industry: 'Finance',
    emdAmount: '15,000',
    source: 'Referral',
    reverseAuction: 'No'
  },
  {
    id: '7',
    oppId: 'OPP-002',
    name: 'Cloud Migration Project',
    subTitle: 'John Smith (VP of Engineering)',
    account: 'TechCorp',
    amount: '$75,000',
    stage: 'Discovery Done',
    expectedClosure: '2026-05-10',
    lastContact: '1 day ago',
    createdOn: '2026-03-05',
    email: 'john@techcorp.com',
    phone: '+1 (555) 333-4444',
    owner: 'Alex Morgan',
    productInterest: 'Multi-cloud Management',
    description: 'Enterprise-wide migration of on-premise infrastructure to hybrid cloud.',
    industry: 'Technology',
    emdAmount: '3,000',
    source: 'Website',
    reverseAuction: 'No'
  }
];

const sortOptions: SortOption[] = [
  { label: 'OPP ID', key: 'oppId' },
  { label: 'Name', key: 'name' },
  { label: 'Account', key: 'account' },
  { label: 'Amount', key: 'amount' },
  { label: 'Status', key: 'stage' },
  { label: 'Close Date', key: 'expectedClosure' },
  { label: 'Created On', key: 'createdOn' }
];

const filterConfigs: FilterConfig[] = [
  {
    key: 'stage', label: 'Status', type: 'select', options: [
      { value: 'Prospecting', label: 'Prospecting' },
      { value: 'Qualification', label: 'Qualification' },
      { value: 'Proposal', label: 'Proposal' },
      { value: 'Qualified', label: 'Qualified' },
      { value: 'Discovery Done', label: 'Discovery Done' },
      { value: 'Proposal Sent', label: 'Proposal Sent' },
      { value: 'Negotiation', label: 'Negotiation' },
      { value: 'Closed Won', label: 'Closed Won' },
      { value: 'Closed Lost', label: 'Closed Lost' }
    ]
  },
  {
    key: 'account', label: 'Company', type: 'select', options: [
      { value: 'Cyberdyne Systems', label: 'Cyberdyne Systems' },
      { value: 'Massive Dynamic', label: 'Massive Dynamic' },
      { value: 'Umbrella Corporation', label: 'Umbrella Corporation' },
      { value: 'Wayne Enterprises', label: 'Wayne Enterprises' },
      { value: 'Stark Industries', label: 'Stark Industries' }
    ]
  },
  {
    key: 'owner', label: 'Owner', type: 'select', options: [
      { value: 'Alex Morgan', label: 'Alex Morgan' }
    ]
  },
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
  amountMin: string;
  amountMax: string;
  closeDateFrom: string;
  closeDateTo: string;
}

const defaultFilters: FilterState = {
  stage: 'all',
  account: 'all',
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

export function Opportunities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ stage: 'all', account: 'all' });
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [viewingOpp, setViewingOpp] = useState<Opportunity | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [alphabetLetter, setAlphabetLetter] = useState('');

  const hasActiveFilters =
    (activeFilters.stage && activeFilters.stage !== 'all') ||
    (activeFilters.account && activeFilters.account !== 'all') ||
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
      setSelectedIds(filteredData.map(opp => opp.id));
    }
  };

  const filteredData = OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      !searchTerm ||
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.account.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || opp.name.toUpperCase().startsWith(alphabetLetter);

    const matchesStage = !activeFilters.stage || activeFilters.stage === 'all' || opp.stage === activeFilters.stage;
    const matchesAccount = !activeFilters.account || activeFilters.account === 'all' || opp.account === activeFilters.account;

    let matchesAmount = true;
    if (activeFilters.amountMin || activeFilters.amountMax) {
      const num = parseFloat(opp.amount.replace(/[^0-9.-]+/g, ""));
      const min = activeFilters.amountMin ? parseFloat(activeFilters.amountMin) : 0;
      const max = activeFilters.amountMax ? parseFloat(activeFilters.amountMax) : Infinity;
      matchesAmount = num >= min && num <= max;
    }

    let matchesCloseDate = true;
    if (activeFilters.closeDateFrom || activeFilters.closeDateTo) {
      if (opp.expectedClosure === 'Not set') {
        matchesCloseDate = false;
      } else {
        const date = new Date(opp.expectedClosure).getTime();
        const from = activeFilters.closeDateFrom ? new Date(activeFilters.closeDateFrom).getTime() : 0;
        const to = activeFilters.closeDateTo ? new Date(activeFilters.closeDateTo).getTime() : Infinity;
        matchesCloseDate = date >= from && date <= to;
      }
    }

    return matchesSearch && matchesStage && matchesAccount && matchesAmount && matchesCloseDate && matchesAlphabet;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      const aVal = parseFloat((a.amount as string).replace(/[^0-9.-]+/g, ""));
      const bVal = parseFloat((b.amount as string).replace(/[^0-9.-]+/g, ""));
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (sortConfig.key === 'expectedClosure') {
      if (a.expectedClosure === 'Not set') return sortConfig.direction === 'asc' ? 1 : -1;
      if (b.expectedClosure === 'Not set') return sortConfig.direction === 'asc' ? -1 : 1;
      const aVal = new Date(a.expectedClosure).getTime();
      const bVal = new Date(b.expectedClosure).getTime();
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (sortConfig.key === 'createdOn') {
      const aVal = new Date(a.createdOn).getTime();
      const bVal = new Date(b.createdOn).getTime();
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
      header: (
        <input
          type="checkbox"
          checked={selectedIds.length === filteredData.length && filteredData.length > 0}
          onChange={(e) => { e.stopPropagation(); toggleAllSelection(); }}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      ),
      headerClassName: 'w-10 px-4',
      cellClassName: 'px-4',
      render: (opp) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(opp.id)}
          onChange={() => { }}
          onClick={(e) => toggleSelection(opp.id, e as any)}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      )
    },
    {
      header: 'OPP ID',
      accessorKey: 'oppId',
      sortable: true,
      cellClassName: 'font-bold text-[11px] text-primary hover:underline cursor-pointer',
      render: (opp) => (
        <span onClick={(e) => { e.stopPropagation(); setViewingOpp(opp); }}>
          {opp.oppId}
        </span>
      )
    },
    {
      header: 'CREATED ON',
      accessorKey: 'createdOn',
      sortable: true,
      cellClassName: 'text-muted-foreground font-medium'
    },
    {
      header: 'OPPORTUNITY TITLE/NAME',
      headerClassName: 'min-w-[240px]',
      sortable: true,
      sortKey: 'name',
      render: (opp) => {
        const initials = opp.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return (
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-bold">{opp.name}</span>
              <span className="text-[12px] text-muted-foreground font-medium">{opp.subTitle}</span>
            </div>
          </div>
        );
      }
    },
    {
      header: 'COMPANY',
      sortable: true,
      sortKey: 'account',
      render: (opp) => (
        <span className="text-foreground font-bold">{opp.account}</span>
      )
    },
    {
      header: 'STATUS',
      sortable: true,
      sortKey: 'stage',
      render: (opp) => (
        <StatusBadge
          status={opp.stage}
          variant={getStatusVariant(opp.stage)}
        />
      )
    },
    {
      header: 'EXPECTED CLOSURE',
      sortable: true,
      sortKey: 'expectedClosure',
      render: (opp) => (
        <div className="flex flex-col">
          <span className={cn(
            "font-bold",
            opp.expectedClosure === 'Not set' ? "text-muted-foreground/50" : "text-foreground"
          )}>
            {opp.expectedClosure}
          </span>
          {opp.expectedClosure !== 'Not set' && (
            <span className="text-[11px] font-bold text-muted-foreground/60">
              Week {Math.ceil((new Date(opp.expectedClosure).getDate() + new Date(opp.expectedClosure).getDay()) / 7) + 12} {/* Mock week calculation */}
            </span>
          )}
        </div>
      )
    },
    {
      header: 'VALUE',
      sortable: true,
      sortKey: 'amount',
      render: (opp) => <span className="text-foreground font-medium">{opp.amount}</span>
    },
    {
      header: 'LAST CONTACT',
      accessorKey: 'lastContact',
      sortable: true,
      render: (opp) => (
        <span className="text-muted-foreground font-medium">
          {opp.lastContact}
        </span>
      )
    },
    {
      header: 'CONTACT INFO',
      render: () => (
        <div className="flex items-center gap-3">
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      )
    },
    {
      header: 'ACTIONS',
      headerClassName: 'w-12 text-center',
      align: 'center',
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
              {
                label: 'Export',
                onClick: () => setIsExportModalOpen(true),
                icon: <Download className="w-4 h-4" />,
                variant: 'outline',
                disabled: selectedIds.length === 0
              },
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
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: filteredData.length,
          resultsPerPage: 10,
          onPageChange: () => { }
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

      {viewingOpp && (
        <OpportunityQuickViewModal
          opportunity={viewingOpp}
          onClose={() => setViewingOpp(null)}
          onEdit={setEditingOpp}
        />
      )}

      <ExportOptionsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

