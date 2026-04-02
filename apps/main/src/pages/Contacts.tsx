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
  ChevronDown
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column, Modal, SortOption, FilterConfig, PageActions, FormInput, FormSelect, FormTextarea } from '@crm/ui';

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

function ContactModal({ contact, onClose }: { contact?: Contact | null, onClose: () => void }) {
  const isEditing = !!contact;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Customer Contact' : 'Add New Customer Contact'}
      description={isEditing ? 'Update the details for this customer contact.' : 'Enter the details for the new customer contact.'}
      className="max-w-2xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-bold text-[13px]">
            Cancel
          </Button>
          <Button onClick={onClose}
          >
            {isEditing ? 'Update Customer Contact' : 'Create Customer Contact'}
          </Button>
        </div>
      }
    >
      <div className="space-y-10 pb-4">
        {/* Personal Details */}
        <div className="space-y-5">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormInput
              label="Full Name"
              defaultValue={contact?.name || ''}
              placeholder="Alice Abernathy"
              icon={<User />}
            />
            <FormInput
              label="Designation"
              defaultValue={contact?.title || ''}
              placeholder="Head of Security"
            />
            <FormSelect
              label="Role Type"
              defaultValue={contact?.role || 'Influencer'}
              options={[
                { value: 'Influencer', label: 'Influencer' },
                { value: 'Decision Maker', label: 'Decision Maker' },
                { value: 'Gatekeeper', label: 'Gatekeeper' },
                { value: 'End User', label: 'End User' },
              ]}
            />
            <FormInput
              label="Account"
              defaultValue={contact?.account || ''}
              placeholder="Umbrella Corporation"
              icon={<Building2 />}
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormInput
              label="Email"
              defaultValue={contact?.email || ''}
              placeholder="alice@umbrella.com"
              icon={<Mail />}
            />
            <FormInput
              label="Phone"
              defaultValue={contact?.phone || ''}
              placeholder="+1 (555) 666-6666"
              icon={<Phone />}
            />
            <FormInput
              label="Mobile Number"
              placeholder="+1 (555) 000-0000"
              icon={<Smartphone />}
            />
            <FormInput
              label="Alternate Contact"
              placeholder="+1 (555) 000-0000"
            />
            <FormInput
              label="Desk / VoIP Phone No."
              placeholder="+1 (555) 000-0000"
              icon={<Phone />}
            />
            <FormInput
              label="Location"
              placeholder="Raccoon City"
              icon={<MapPin />}
            />
            <FormSelect
              label="Reports To"
              options={[
                { value: '', label: 'None (Top Level)' },
                { value: '1', label: 'Bruce Wayne' },
                { value: '2', label: 'Tony Stark' },
              ]}
            />
          </div>
        </div>

        {/* Office Details */}
        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Office Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormInput
              label="Desk Number"
              placeholder="e.g. D-402"
            />
            <FormInput
              label="Bay / Workspace Location"
              placeholder="e.g. Building A, Floor 4"
              icon={<MapPin />}
            />
            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Office Address"
                placeholder="Full office address"
                icon={<Building2 />}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ContactDetailModal({ contact, onClose, onEdit }: { contact: Contact, onClose: () => void, onEdit: (contact: Contact) => void }) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="max-w-2xl"
      title={
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border border-white/50",
            contact.avatarColor
          )}>
            {contact.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-bold text-foreground">{contact.name}</h2>
            <p className="text-[13px] font-medium text-muted-foreground">{contact.title} at {contact.account}</p>
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-bold text-[13px]">
            Close
          </Button>
          <Button onClick={() => onEdit(contact)}
          >
            Edit Customer Contact
          </Button>
        </div>
      }
    >
      <div className="space-y-10 pb-4">
        {/* Contact Details Section */}
        <div className="space-y-5">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Contact Details</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Role</p>
              <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-bold px-3 py-1 text-[11px]">
                {contact.role}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Account</p>
              <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                <Building2 className="w-4 h-4 text-muted-foreground/60" />
                {contact.account}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Contact Information</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Email</p>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[14px] font-bold text-primary hover:underline underline-offset-4">
                <Mail className="w-4 h-4" />
                {contact.email}
              </a>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Phone</p>
              <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-[14px] font-bold text-primary hover:underline underline-offset-4">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
            </div>
            <div className="space-y-1.5 col-span-2">
              <p className="text-[12px] font-medium text-muted-foreground">Location</p>
              <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground/60" />
                Raccoon City
              </div>
            </div>
          </div>
        </div>

        {/* Office Details Section */}
        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Office Details</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Desk Number</p>
              <p className="text-[14px] font-bold text-foreground">--</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Bay / Workspace</p>
              <p className="text-[14px] font-bold text-foreground">--</p>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Activity</h3>
          <div className="space-y-1.5">
            <p className="text-[12px] font-medium text-muted-foreground">Last Activity</p>
            <p className="text-[14px] font-bold text-foreground">{contact.lastActivity}</p>
          </div>
        </div>
      </div>
    </Modal>
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({ role: 'all', account: 'all', lastActivityUnit: 'days' });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [alphabetLetter, setAlphabetLetter] = useState('');

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

  const filteredData = CONTACTS.filter((contact) => {
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
          <PageActions
            actions={[
              { label: 'Export', variant: 'outline', icon: <Download className="w-4 h-4" />, onClick: () => {} },
              { label: 'Add Customer Contact', variant: 'primary', icon: <Plus className="w-4 h-4" />, onClick: () => setIsAddModalOpen(true) }
            ]}
          />
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
        emptyMessage="No contacts match the current filters."
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
    </div>
  );
}
