/**
 * Quotes Page - Quote/proposal management
 * Create and manage quotes for prospects
 * @route /quotes
 */
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Plus, 
  Copy,
  FileDown,
  Pencil,
  Trash2
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column, PageActions } from '@crm/ui';

interface Quote {
  id: string;
  number: string;
  version: string;
  customerName: string;
  customerCompany: string;
  date: string;
  validUntil: string;
  amount: string;
  currency: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
}

const QUOTES: Quote[] = [
  {
    id: '1',
    number: 'Q-2023-0045',
    version: 'Version 1',
    customerName: 'John Doe',
    customerCompany: 'Acme Corp',
    date: '2023-10-25',
    validUntil: '2023-11-25',
    amount: '8,496',
    currency: 'INR',
    status: 'Sent'
  }
];

export function Quotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alphabetLetter, setAlphabetLetter] = useState('');

  const filteredData = QUOTES.filter((quote) => {
    const matchesSearch = !searchTerm ||
      quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerCompany.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || quote.customerName.toUpperCase().startsWith(alphabetLetter);

    return matchesSearch && matchesAlphabet;
  });

  const hasActiveFilters = !!searchTerm || !!alphabetLetter;

  const clearFilters = () => {
    setSearchTerm('');
    setAlphabetLetter('');
  };

  const columns: Column<Quote>[] = [
    {
      header: '',
      headerClassName: 'w-12',
      render: () => <input type="checkbox" className="rounded border-border bg-muted text-primary focus:ring-primary" />
    },
    {
      header: 'Quote Number',
      render: (quote) => (
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-muted rounded-lg text-muted-foreground/60 border border-border transition-colors group-hover:bg-card shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary font-bold hover:underline underline-offset-2">{quote.number}</span>
            <span className="text-[11px] text-muted-foreground font-medium">{quote.version}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Customer',
      render: (quote) => (
        <div className="flex flex-col text-left">
          <span className="text-foreground font-bold">{quote.customerName}</span>
          <span className="text-[11px] text-muted-foreground font-medium">{quote.customerCompany}</span>
        </div>
      )
    },
    {
      header: 'Date',
      render: (quote) => (
        <div className="flex flex-col text-left">
          <span className="text-foreground/90 font-bold">{quote.date}</span>
          <span className="text-[11px] text-muted-foreground font-medium">Valid until {quote.validUntil}</span>
        </div>
      )
    },
    {
      header: 'Amount',
      render: (quote) => <span className="text-foreground font-extrabold">{quote.currency} {quote.amount}</span>
    },
    {
      header: 'Status',
      render: (quote) => (
        <Badge 
          variant="secondary" 
          className={cn(
            "font-bold px-3 py-1 border-none",
            quote.status === 'Sent' && "bg-indigo-500/10 text-indigo-600",
            quote.status === 'Accepted' && "bg-emerald-500/10 text-emerald-600",
            quote.status === 'Draft' && "bg-muted text-muted-foreground",
            quote.status === 'Declined' && "bg-rose-500/10 text-rose-500",
          )}
        >
          {quote.status}
        </Badge>
      )
    },
    {
      header: '',
      render: () => (
        <div className="flex items-center gap-6 text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button className="p-1 hover:text-primary transition-colors" title="Copy">
            <Copy className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 p-1 hover:text-primary transition-colors font-semibold" title="Download PDF">
            <FileDown className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">Download PDF</span>
          </button>
          <button className="flex items-center gap-1.5 p-1 hover:text-foreground transition-colors font-semibold" title="Edit">
            <Pencil className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">Edit</span>
          </button>
          <button className="flex items-center gap-1.5 p-1 hover:text-destructive transition-colors font-semibold" title="Delete">
            <Trash2 className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">Delete</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Quotes"
        subtitle="Manage sales quotes and proposals."
        actions={
          <PageActions
            actions={[
              { label: 'Export', variant: 'outline', icon: <Download className="w-4 h-4" />, onClick: () => {} },
              { label: 'Create Quote', variant: 'primary', icon: <Plus className="w-4 h-4" />, onClick: () => {} }
            ]}
          />
        }
      />

      <DataTable 
        data={filteredData}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        alphabetFilter={{
          value: alphabetLetter,
          onChange: setAlphabetLetter
        }}
        searchPlaceholder="Search quotes..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: filteredData.length,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />
    </div>
  );
}
