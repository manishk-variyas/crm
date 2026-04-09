/**
 * IndustryVerticalSettings - Manage industry segments
 */
import { SettingsTable } from './SettingsTable';

interface Vertical {
  name: string;
  code: string;
  parent: string;
  description: string;
  status: string;
}

const verticals: Vertical[] = [
  { name: 'Banking', code: 'BNK', parent: '-', description: 'Commercial & Retail Banking Clients', status: 'Active' },
  { name: 'Healthcare', code: 'HLT', parent: '-', description: 'Hospitals and Healthcare Providers', status: 'Active' },
  { name: 'Manufacturing', code: 'MFG', parent: '-', description: 'Industrial Manufacturing', status: 'Active' },
  { name: 'Retail Banking', code: 'RBNK', parent: 'Banking', description: 'Retail Banking Division', status: 'Active' },
];

export function IndustryVerticalSettings() {
  const columns = [
    { key: 'name', header: 'Vertical Name' },
    { 
      key: 'code', 
      header: 'Code',
      render: (item: Vertical) => (
        <span className="text-muted-foreground font-medium uppercase tracking-widest">{item.code}</span>
      )
    },
    { key: 'parent', header: 'Parent Vertical' },
    { 
      key: 'description', 
      header: 'Description',
      render: (item: Vertical) => (
        <span className="text-muted-foreground font-medium max-w-xs truncate">{item.description}</span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: Vertical) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <SettingsTable
      title="Industry Vertical Management"
      description="Manage industry segments like Banking, Healthcare, Manufacturing etc."
      columns={columns}
      data={verticals}
      addButtonLabel="Add Vertical"
    />
  );
}