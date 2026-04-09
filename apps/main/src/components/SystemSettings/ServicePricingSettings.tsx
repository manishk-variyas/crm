/**
 * ServicePricingSettings - Service pricing management
 */
import { SettingsTable } from './SettingsTable';

interface ServicePricing {
  product: string;
  billingType: string;
  rate: string;
  status: string;
}

const servicePricing: ServicePricing[] = [
  { product: 'CRM Implementation', billingType: 'Man Day', rate: '600', status: 'Active' },
  { product: 'Technical Support', billingType: 'Hourly', rate: '85', status: 'Active' },
  { product: 'Onboarding Package', billingType: 'Fixed', rate: '1200', status: 'Active' },
  { product: 'Annual Audit', billingType: 'Per Instance', rate: '2500', status: 'Active' },
];

export function ServicePricingSettings() {
  const columns = [
    { key: 'product', header: 'Service Product' },
    { key: 'billingType', header: 'Billing Type' },
    { 
      key: 'rate', 
      header: 'Rate',
      className: 'text-center',
      render: (item: ServicePricing) => <span className="text-muted-foreground font-bold">{item.rate}</span>
    },
    { 
      key: 'status', 
      header: 'Status',
      className: 'text-center',
      render: (item: ServicePricing) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <SettingsTable
      title="Service Pricing"
      description="Manage pricing for services."
      columns={columns}
      data={servicePricing}
      addButtonLabel="Add Service Pricing"
    />
  );
}