import React, { useState } from 'react';
import { 
  Plus, 
  Target,
  Download,
  Building2,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column } from '@crm/ui';

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

export function Opportunities() {
  const [searchTerm, setSearchTerm] = useState('');

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
            <span className="text-[11px] text-muted-foreground font-medium">{opp.owner}</span>
          </div>
        </div>
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
            opp.stage === 'Closed Won' && "bg-emerald-50 text-emerald-600",
            opp.stage === 'Closed Lost' && "bg-rose-50 text-rose-500",
            opp.stage === 'Qualification' && "bg-muted text-muted-foreground",
            opp.stage === 'Proposal' && "bg-indigo-50 text-indigo-600",
            opp.stage === 'Negotiation' && "bg-amber-50 text-amber-600",
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
                opp.stage === 'Closed Won' ? "bg-emerald-500" : 
                opp.stage === 'Closed Lost' ? "bg-rose-500" : "bg-blue-500"
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
      render: () => (
        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
          <MoreVertical className="w-4.5 h-4.5" />
        </button>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Opportunities"
        subtitle="Track and manage your sales pipeline and ongoing deals."
        actions={
          <>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2 h-10 shadow-sm active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              Add Opportunity
            </Button>
          </>
        }
      />

      <DataTable 
        data={OPPORTUNITIES}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search deals, accounts..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: 5,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />
    </div>
  );
}
