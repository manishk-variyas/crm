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
  Phone,
  User,
  Smartphone,
  MapPin,
  MoreVertical,
  ChevronRight,
  Edit,
  Share2,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column, Modal, SortOption, FilterConfig, PageActions, FormInput, FormSelect, FormTextarea, ExportOptionsModal } from '@crm/ui';
import { ContactModal, ContactDetailModal } from '../components/Contacts/modals';
import { useContacts } from '../services/hooks';

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



function ActionMenu({ contact, onEdit }: { contact: Contact, onEdit: (contact: Contact) => void }) {
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
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(contact); }}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors w-full text-left group"
            >
              <Edit className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              Edit
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors w-full text-left group"
            >
              <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              Share
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors w-full text-left group"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


const sortOptions: SortOption[] = [
  { label: 'Name', key: 'name' },
  { label: 'Account', key: 'account' },
  { label: 'Role', key: 'role' },
  { label: 'Last Activity', key: 'lastActivity' }
];

const filterConfigs: FilterConfig[] = [
  {
    key: 'role',
    label: 'Role Type',
    type: 'select',
    options: [
      { value: 'Influencer', label: 'Influencer' },
      { value: 'Decision Maker', label: 'Decision Maker' },
      { value: 'Gatekeeper', label: 'Gatekeeper' },
      { value: 'End User', label: 'End User' }
    ]
  },
  {
    key: 'account',
    label: 'Account',
    type: 'select',
    options: [
      { value: 'Umbrella Corporation', label: 'Umbrella Corporation' },
      { value: 'Wayne Enterprises', label: 'Wayne Enterprises' },
      { value: 'Gringotts Wizarding Bank', label: 'Gringotts Wizarding Bank' },
      { value: 'Cyberdyne Systems', label: 'Cyberdyne Systems' },
      { value: 'Stark Industries', label: 'Stark Industries' },
      { value: 'Acme Corp', label: 'Acme Corp' },
      { value: 'Massive Dynamic', label: 'Massive Dynamic' }
    ]
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

export function Contacts() {
  const { contacts, loading, error, refetch } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ role: 'all', account: 'all', lastActivityUnit: 'days' });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [alphabetLetter, setAlphabetLetter] = useState('');

  const contactsData = contacts;

  const hasActiveFilters =
    (activeFilters.role && activeFilters.role !== 'all') ||
    (activeFilters.account && activeFilters.account !== 'all') ||
    !!activeFilters.lastActivityValue ||
    searchTerm.trim().length > 0 ||
    !!alphabetLetter;

  const clearFilters = () => {
    setActiveFilters({
      role: 'all',
      account: 'all',
      lastActivityUnit: 'days',
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
      setSelectedIds(filteredData.map(contact => contact.id));
    }
  };

  const filteredData = contactsData.filter((contact) => {
    const matchesSearch = !searchTerm ||
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || contact.name.toUpperCase().startsWith(alphabetLetter);

    const matchesRole = !activeFilters.role || activeFilters.role === 'all' || contact.role === activeFilters.role;
    const matchesAccount = !activeFilters.account || activeFilters.account === 'all' || contact.account === activeFilters.account;

    let matchesActivity = true;
    if (activeFilters.lastActivityValue) {
      const activityStr = contact.lastActivity.toLowerCase();
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

    return matchesSearch && matchesRole && matchesAccount && matchesActivity && matchesAlphabet;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aStr = String(a[sortConfig.key as keyof Contact]).toLowerCase();
    const bStr = String(b[sortConfig.key as keyof Contact]).toLowerCase();

    if (sortConfig.key === 'lastActivity') {
      const getDays = (str: string) => {
        let days = 0;
        if (str.includes('day')) days = parseInt(str) || 0;
        else if (str.includes('week')) days = (parseInt(str) || 0) * 7;
        else if (str.includes('month')) days = (parseInt(str) || 0) * 30;
        return days;
      };
      const aDays = getDays(a.lastActivity);
      const bDays = getDays(b.lastActivity);
      return sortConfig.direction === 'asc' ? aDays - bDays : bDays - aDays;
    }

    if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const columns: Column<Contact>[] = [
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
      render: (contact) => (
        <input 
          type="checkbox" 
          checked={selectedIds.includes(contact.id)}
          onChange={() => {}}
          onClick={(e) => toggleSelection(contact.id, e as any)}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      )
    },
    {
      header: 'Name',
      sortable: true,
      sortKey: 'name',
      render: (contact) => (
        <div className="flex items-center gap-4 text-left">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm border border-white/50",
            contact.avatarColor
          )}>
            {contact.name.charAt(0)}
          </div>
          <div className="flex flex-col text-left">
            <span
              className="text-foreground font-semibold hover:text-primary hover:underline cursor-pointer transition-colors"
              onClick={() => setViewingContact(contact)}
            >
              {contact.name}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">{contact.title}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Account',
      sortable: true,
      sortKey: 'account',
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
      sortable: true,
      sortKey: 'role',
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
      sortable: true,
      sortKey: 'lastActivity',
      render: (contact) => (
        <span className="text-muted-foreground/70 font-medium whitespace-nowrap">
          {contact.lastActivity}
        </span>
      )
    },
    {
      header: '',
      headerClassName: 'w-12',
      render: (contact) => <ActionMenu contact={contact} onEdit={setEditingContact} />
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Customer Contacts"
        subtitle="Manage your key customer contacts and relationships."
        actions={
          <div className="flex items-center gap-2">
            {contacts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="h-9 px-3"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              </Button>
            )}
            <PageActions 
              actions={[
                { 
                  label: 'Export', 
                  variant: 'outline', 
                  icon: <Download className="w-4 h-4" />, 
                  onClick: () => setIsExportModalOpen(true),
                  disabled: selectedIds.length === 0
                },
                { label: 'Add Customer Contact', variant: 'primary', icon: <Plus className="w-4 h-4" />, onClick: () => setIsAddModalOpen(true) }
              ]}
            />
          </div>
        }
      />

      <DataTable
        data={sortedData}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, account, or email..."
        sortOptions={sortOptions}
        defaultSort={sortConfig}
        onSortChange={setSortConfig}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        emptyMessage={loading ? "Loading contacts..." : error ? `Error: ${error}` : "No contacts match the current filters."}
        alphabetFilter={{
          value: alphabetLetter,
          onChange: setAlphabetLetter
        }}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: sortedData.length,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />

      {(editingContact || isAddModalOpen) && (
        <ContactModal
          contact={editingContact}
          onClose={() => {
            setEditingContact(null);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {viewingContact && (
        <ContactDetailModal
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
          onEdit={(c: Contact) => {
            setViewingContact(null);
            setEditingContact(c);
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
