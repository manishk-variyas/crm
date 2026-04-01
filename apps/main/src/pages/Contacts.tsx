/**
 * Contacts Page - Individual contact management
 * Manages customer/prospect contacts linked to accounts
 * @route /contacts
 */
import React, { useState } from 'react';
import { 
  Building2, 
  Download, 
  Plus, 
  Mail, 
  Phone
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column } from '@crm/ui';

interface Contact {
  id: string;
  name: string;
  title: string;
  account: string;
  role: 'Influencer' | 'Decision Maker' | 'Gatekeeper' | 'End User';
  email: string;
  phone: string;
  lastActivity: string;
  avatarColor: string;
}

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Alice Abernathy',
    title: 'Head of Security',
    account: 'Umbrella Corporation',
    role: 'Influencer',
    email: 'alice@umbrella.com',
    phone: '+1 (555) 666-6666',
    lastActivity: '5 days ago',
    avatarColor: 'bg-primary/10 text-primary',
  },
  {
    id: '2',
    name: 'Bruce Wayne',
    title: 'CEO',
    account: 'Wayne Enterprises',
    role: 'Decision Maker',
    email: 'bruce@wayne.com',
    phone: '+1 (555) 987-6543',
    lastActivity: '1 week ago',
    avatarColor: 'bg-primary/10 text-primary',
  },
  {
    id: '3',
    name: 'Griphook',
    title: 'Senior Banker',
    account: 'Gringotts Wizarding Bank',
    role: 'Gatekeeper',
    email: 'griphook@gringotts.com',
    phone: '+44 (20) 7946 0123',
    lastActivity: '1 month ago',
    avatarColor: 'bg-primary/10 text-primary',
  },
  {
    id: '4',
    name: 'Sarah Connor',
    title: 'CTO',
    account: 'Cyberdyne Systems',
    role: 'Decision Maker',
    email: 'sarah@cyberdyne.com',
    phone: '+1 (555) 123-4567',
    lastActivity: '2 days ago',
    avatarColor: 'bg-primary/10 text-primary',
  },
  {
    id: '5',
    name: 'Tony Stark',
    title: 'Owner',
    account: 'Stark Industries',
    role: 'Decision Maker',
    email: 'tony@stark.com',
    phone: '+1 (555) 777-7777',
    lastActivity: '3 days ago',
    avatarColor: 'bg-primary/10 text-primary',
  },
  {
    id: '6',
    name: 'Wile E. Coyote',
    title: 'Chief Engineer',
    account: 'Acme Corp',
    role: 'End User',
    email: 'coyote@acme.com',
    phone: '+1 (555) 222-2222',
    lastActivity: '2 weeks ago',
    avatarColor: 'bg-primary/10 text-primary',
  },
  {
    id: '7',
    name: 'William Bell',
    title: 'Founder',
    account: 'Massive Dynamic',
    role: 'Decision Maker',
    email: 'bell@massivedynamic.com',
    phone: '+1 (555) 444-4444',
    lastActivity: '3 months ago',
    avatarColor: 'bg-primary/10 text-primary',
  }
];

export function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');

  const columns: Column<Contact>[] = [
    {
      header: '',
      headerClassName: 'w-12',
      render: () => <input type="checkbox" className="rounded border-border bg-muted text-primary focus:ring-primary" />
    },
    {
      header: 'Name',
      render: (contact) => (
        <div className="flex items-center gap-4 text-left">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm border border-white/50",
            contact.avatarColor
          )}>
            {contact.name.charAt(0)}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-foreground font-semibold">{contact.name}</span>
            <span className="text-[11px] text-muted-foreground font-medium">{contact.title}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Account',
      render: (contact) => (
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-muted-foreground/50 shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <span className="truncate max-w-[150px]">{contact.account}</span>
        </div>
      )
    },
    {
      header: 'Role',
      render: (contact) => (
        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-bold px-2.5 py-1 text-[11px]">
          {contact.role}
        </Badge>
      )
    },
    {
      header: 'Contact Info',
      render: (contact) => (
        <div className="flex flex-col gap-1 text-[11px] font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-muted-foreground/50" />
            {contact.email}
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-muted-foreground/50" />
            {contact.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Last Activity',
      accessorKey: 'lastActivity',
      cellClassName: 'text-muted-foreground/70 font-medium'
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Customer Contacts"
        subtitle="Manage your key customer contacts and relationships."
        actions={
          <>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2 h-10 shadow-sm active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              Add Customer Contact
            </Button>
          </>
        }
      />

      <DataTable 
        data={CONTACTS}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, account, or email..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: 7,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />
    </div>
  );
}
