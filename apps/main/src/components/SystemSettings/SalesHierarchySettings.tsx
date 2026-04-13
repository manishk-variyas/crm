/**
 * SalesHierarchySettings - Sales channel hierarchy management
 */
import { SettingsTable } from './SettingsTable';
import { Button } from '@crm/ui';
import { GitBranch, Plus } from 'lucide-react';

interface Hierarchy {
  role: string;
  geography: string;
  vertical: string;
  reportsTo: string;
  level: string;
  status: string;
}

const hierarchyData: Hierarchy[] = [
  { role: 'Manager', geography: 'West Zone', vertical: 'Banking', reportsTo: '-', level: 'L6', status: 'Active' },
  { role: 'Sales Rep', geography: 'Maharashtra Region', vertical: 'Banking', reportsTo: 'Manager (West Zone)', level: 'L1', status: 'Active' },
];

export function SalesHierarchySettings() {
  const columns = [
    { key: 'role', header: 'Role' },
    { key: 'geography', header: 'Geography' },
    { key: 'vertical', header: 'Vertical' },
    { key: 'reportsTo', header: 'Reports To' },
    { 
      key: 'level', 
      header: 'Level',
      render: (item: Hierarchy) => (
        <span className="text-muted-foreground font-medium font-mono text-xs">{item.level}</span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: Hierarchy) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Sales Channel Hierarchy</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Define the sales org chart by connecting roles, geographies, and verticals.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs font-bold h-10 border-border/60">
            <GitBranch className="w-3.5 h-3.5" /> Re-index Hierarchy
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Add Hierarchy Node
          </Button>
        </div>
      </div>

      <SettingsTable
        title=""
        description=""
        columns={columns}
        data={hierarchyData}
        actions={true}
      />
    </div>
  );
}