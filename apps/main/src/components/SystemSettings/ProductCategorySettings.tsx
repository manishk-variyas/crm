/**
 * ProductCategorySettings - Product category management
 */
import { SettingsTable } from './SettingsTable';

interface Category {
  name: string;
  type: string;
  description: string;
  status: string;
}

const categories: Category[] = [
  { name: 'Hardware', type: 'Hardware', description: 'Physical devices and equipment', status: 'Active' },
  { name: 'Software Licenses', type: 'Software', description: 'Annual and perpetual software licenses', status: 'Active' },
  { name: 'Professional Services', type: 'Service', description: 'Consulting, implementation, and training', status: 'Active' },
];

export function ProductCategorySettings() {
  const columns = [
    { key: 'name', header: 'Category Name' },
    { key: 'type', header: 'Type' },
    { key: 'description', header: 'Description' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: Category) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <SettingsTable
      title="Product Categories"
      description="Manage product categories and types."
      columns={columns}
      data={categories}
      addButtonLabel="Add Category"
    />
  );
}