/**
 * GeographicModelSettings - Manage geographical hierarchy
 */
import { SettingsTable } from './SettingsTable';

interface Geography {
  name: string;
  type: string;
  parent: string;
  location: string;
  country: string;
  status: string;
}

const geographyData: Geography[] = [
  { name: 'Global Corp', type: 'Corporate Office', parent: '-', location: 'New York, NY', country: 'USA', status: 'Active' },
  { name: 'India Head Office', type: 'Head Office', parent: 'Global Corp', location: 'Mumbai, Maharashtra', country: 'India', status: 'Active' },
  { name: 'West Zone', type: 'Zonal Office', parent: 'India Head Office', location: 'Mumbai, Maharashtra', country: 'India', status: 'Active' },
  { name: 'Maharashtra Region', type: 'Regional Office', parent: 'West Zone', location: 'Pune, Maharashtra', country: 'India', status: 'Active' },
  { name: 'Pune Branch', type: 'Branch Office', parent: 'Maharashtra Region', location: 'Pune, Maharashtra', country: 'India', status: 'Active' },
];

const typeColors: Record<string, string> = {
  'Corporate Office': 'bg-purple-100 text-purple-600',
  'Head Office': 'bg-blue-100 text-blue-600',
  'Zonal Office': 'bg-indigo-100 text-indigo-600',
  'Regional Office': 'bg-orange-100 text-orange-600',
  'Branch Office': 'bg-emerald-100 text-emerald-600',
};

export function GeographicModelSettings() {
  const columns = [
    { key: 'name', header: 'Name' },
    { 
      key: 'type', 
      header: 'Type',
      render: (item: Geography) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeColors[item.type] || ''}`}>
          {item.type}
        </span>
      )
    },
    { key: 'parent', header: 'Parent' },
    { 
      key: 'location', 
      header: 'Location',
      render: (item: Geography) => (
        <div>
          <div className="font-bold text-foreground/80">{item.location}</div>
          <div className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-0.5">{item.country}</div>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: Geography) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <SettingsTable
      title="Geography Master"
      description="Manage geographical hierarchy (Zones, Regions, Districts, Branches)."
      columns={columns}
      data={geographyData}
      addButtonLabel="Add Geography"
    />
  );
}