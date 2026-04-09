/**
 * BranchOfficeSettings - Manage branch locations
 */
import { SettingsTable } from './SettingsTable';

interface Branch {
  name: string;
  type: string;
  region: string;
  location: string;
  country: string;
}

const branches: Branch[] = [
  { name: 'Headquarters', type: 'Head Office', region: 'West', location: 'San Francisco, CA', country: 'USA' },
  { name: 'New York Branch', type: 'Regional', region: 'East', location: 'New York, NY', country: 'USA' },
];

export function BranchOfficeSettings() {
  const columns = [
    { key: 'name', header: 'Branch Name' },
    { 
      key: 'type', 
      header: 'Type',
      render: (item: Branch) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          item.type === 'Head Office' 
            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' 
            : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        }`}>
          {item.type}
        </span>
      )
    },
    { key: 'region', header: 'Region' },
    { 
      key: 'location', 
      header: 'Location',
      render: (item: Branch) => (
        <div>
          <div className="font-bold text-foreground/80">{item.location}</div>
          <div className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-0.5">{item.country}</div>
        </div>
      )
    },
  ];

  return (
    <SettingsTable
      title="Branch Offices"
      description="Manage your organization's branch locations."
      columns={columns}
      data={branches}
      addButtonLabel="Add Branch"
    />
  );
}