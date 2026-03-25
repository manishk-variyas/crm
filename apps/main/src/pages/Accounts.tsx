import React, { useState } from 'react';
import { 
  Building2, 
  Download, 
  Plus, 
  Activity,
  Globe,
  MoreVertical
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column } from '@crm/ui';

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

export function Accounts() {
  const [searchTerm, setSearchTerm] = useState('');

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
            <span className="text-foreground font-semibold">{account.name}</span>
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
        <span className="text-primary font-semibold hover:underline cursor-pointer">{account.owner}</span>
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
        <Badge 
          variant="secondary" 
          className={cn(
            "font-bold px-3 py-1 border-none",
            account.status === 'active' && "bg-emerald-500/10 text-emerald-600",
            account.status === 'churned' && "bg-rose-500/10 text-rose-500",
            account.status === 'prospect' && "bg-primary/10 text-primary",
          )}
        >
          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
        </Badge>
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
        title="Accounts"
        subtitle={
          <>
            Manage your customer accounts and company details. <span className="text-blue-600 font-medium cursor-pointer hover:underline underline-offset-4">(My Accounts)</span>
          </>
        }
        actions={
          <>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2 h-10 shadow-sm active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              Add Account
            </Button>
          </>
        }
      />

      <DataTable 
        data={ACCOUNTS}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, industry, or website..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: 4,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />
    </div>
  );
}
