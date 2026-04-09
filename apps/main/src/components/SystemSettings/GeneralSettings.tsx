/**
 * GeneralSettings - Organization and localization settings
 */
import { Button, Input } from '@crm/ui';
import { Save, Mail, Phone, ExternalLink } from 'lucide-react';

export function GeneralSettings() {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-foreground">General Settings</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Configure organization details, localization, and quote settings.</p>
      </div>

      <OrganizationInfoSection />
      <LocalizationSection />
      <CurrencyConfigSection />
      <TaxConfigSection />
      <QuoteConfigSection />

      <div className="flex justify-end pt-8">
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 h-12 rounded-xl font-bold text-xs shadow-lg shadow-[#4F46E5]/20 flex items-center gap-2 transition-all active:scale-95">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
}

function OrganizationInfoSection() {
  return (
    <section className="space-y-6">
      <SectionHeader 
        title="Section 1: Organization Information" 
        description="This information appears in quote headers, company profiles, and compliance reporting."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <FormField label="Organization Name" defaultValue="ABC Technologies" />
        <FormField label="Legal Entity Name" defaultValue="ABC Technologies Pvt Ltd" />
        <FormField label="Organization Type" defaultValue="Private Company" />
        <FormField label="GST Registration Number" defaultValue="22AAAAA0000A1Z5" />
        <div className="md:col-span-3">
          <FormField label="Address Line 1" defaultValue="123 Tech Avenue, Block 4" />
        </div>
        <div className="md:col-span-2">
          <FormField label="Address Line 2" defaultValue="Sector 5, MIDC Area" />
        </div>
        <FormField label="City" defaultValue="Mumbai" />
        <FormField label="State" defaultValue="Maharashtra" />
        <FormField label="Country" defaultValue="India" />
        <FormField label="Postal Code" defaultValue="400001" />
        <FormField label="Primary Contact Email" defaultValue="sales@abctech.com" icon={<Mail className="w-3.5 h-3.5" />} />
        <FormField label="Primary Contact Phone" defaultValue="+91 22 4444 8888" icon={<Phone className="w-3.5 h-3.5" />} />
        <FormField label="Website URL" defaultValue="www.abctech.com" icon={<ExternalLink className="w-3.5 h-3.5" />} />
      </div>
    </section>
  );
}

function LocalizationSection() {
  return (
    <section className="space-y-6">
      <SectionHeader 
        title="Section 2: Regional & Localization Settings" 
        description="Controls time, currency, and formatting behavior."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <FormField label="Timezone" defaultValue="Asia/Kolkata" />
        <FormField label="Date Format" defaultValue="DD-MM-YYYY" />
        <FormField label="Time Format" defaultValue="24 Hour" />
        <FormField label="Default Currency" defaultValue="INR" />
        <div className="md:col-span-2">
          <FormField label="Allowed Quote Currencies (Comma separated)" defaultValue="INR, USD" />
        </div>
      </div>
    </section>
  );
}

function CurrencyConfigSection() {
  return (
    <section className="space-y-6">
      <SectionHeader 
        title="Section 3: Currency Configuration" 
        description="Ensure quotes convert and calculate values correctly."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <FormField label="Base Currency" defaultValue="INR" />
        <FormField label="Exchange Rate Mode" defaultValue="Manual" />
        <FormField label="Default Exchange Rate (USD -> INR)" defaultValue="83.2" />
      </div>
    </section>
  );
}

function TaxConfigSection() {
  return (
    <section className="space-y-6">
      <SectionHeader 
        title="Section 4: Tax / GST Configuration" 
        description="Defines the tax rules applied to quotes."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <FormField label="Tax Region" defaultValue="India" />
        <FormField label="Default Tax Group" defaultValue="GST_INTRASTATE" />
        <FormField label="GST Structure" defaultValue="Intra-State (CGST + SGST)" />
        <FormField label="CGST Rate (%)" defaultValue="9" />
        <FormField label="SGST Rate (%)" defaultValue="9" />
        <FormField label="IGST Rate (%)" defaultValue="18" />
      </div>
    </section>
  );
}

function QuoteConfigSection() {
  return (
    <section className="space-y-6">
      <SectionHeader 
        title="Section 5: Quote Configuration" 
        description="Controls how quotes behave and how quote numbers are generated."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
        <FormField label="Quote Number Prefix" defaultValue="QT" />
        <div className="md:col-span-2">
          <FormField label="Quote Number Format" defaultValue="QT-{YYYY}-{NNNN}" />
        </div>
        <FormField label="Quote Validity (days)" defaultValue="30" />
        <FormField label="Default Payment Terms" defaultValue="Net 30" />
        <FormField label="Default Tax Group" defaultValue="GST_INTRASTATE" />
        <div className="md:col-span-3 flex items-center gap-2 px-1">
          <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border/60 text-primary cursor-pointer" />
          <label className="text-[11px] font-bold text-foreground/80 cursor-pointer">Allow Discounts</label>
        </div>
        <FormField label="Discount Approval Threshold (%)" defaultValue="15" />
      </div>
    </section>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="pb-2 border-b border-border/40">
      <h4 className="text-sm font-bold text-foreground tracking-tight">{title}</h4>
      <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{description}</p>
    </div>
  );
}

function FormField({ label, defaultValue, icon }: { label: string; defaultValue: string; icon?: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-muted-foreground/70 uppercase ml-1">{label}</label>
      <Input defaultValue={defaultValue} className="h-10 text-xs" icon={icon} />
    </div>
  );
}