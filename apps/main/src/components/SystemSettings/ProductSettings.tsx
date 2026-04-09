/**
 * ProductSettings - Product catalog management
 */
import { SettingsTable } from './SettingsTable';

interface Product {
  name: string;
  sku: string;
  partCode: string;
  category: string;
  price: string;
  status: string;
}

const products: Product[] = [
  { name: 'Cisco Router 2900', sku: 'CIS-RT-2900', partCode: 'CRT2900', category: 'Hardware', price: '2400 INR', status: 'Active' },
  { name: 'Catalyst Switch 3850', sku: 'CAT-SW-3850', partCode: 'CSW3850', category: 'Hardware', price: '4500 INR', status: 'Active' },
  { name: 'Security Gateway XLS', sku: 'SG-XLS-100', partCode: 'SGX100', category: 'Hardware', price: '1200 INR', status: 'Active' },
];

export function ProductSettings() {
  const columns = [
    { key: 'name', header: 'Product Name' },
    { 
      key: 'sku', 
      header: 'SKU / Part Code',
      render: (item: Product) => (
        <div>
          <div className="text-muted-foreground font-medium uppercase tracking-tight">{item.sku}</div>
          <div className="text-[10px] text-muted-foreground/50 font-bold uppercase mt-0.5">{item.partCode}</div>
        </div>
      )
    },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', render: (item: Product) => <span className="text-foreground font-bold">{item.price}</span> },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: Product) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <SettingsTable
      title="Products"
      description="Manage product catalog."
      columns={columns}
      data={products}
      addButtonLabel="Add Product"
    />
  );
}