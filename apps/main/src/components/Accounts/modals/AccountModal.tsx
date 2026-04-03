/**
 * AccountModal - Add/Edit account form modal
 * Extracted from Accounts.tsx for better code organization
 */
import React, { useState } from 'react';
import { Building2, Globe, Phone, DollarSign, Users, Save, Activity } from 'lucide-react';
import { Button, Modal, FormInput, FormSelect, FormTextarea, Tabs } from '@crm/ui';

interface Account {
  id: string;
  name: string;
  website: string;
  owner: string;
  industry: string;
  status: 'active' | 'churned' | 'prospect';
  revenue: string;
  lastActivity: string;
}

interface AccountModalProps {
  account?: Account | null;
  onClose: () => void;
}

export function AccountModal({ account, onClose }: AccountModalProps) {
  const isEditing = !!account;
  const [activeTab, setActiveTab] = useState<'info' | 'hierarchy'>('info');

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Account' : 'Add New Account'}
      description={isEditing ? 'Update the details for this company account.' : 'Enter the details for the new company account.'}
      tabs={
        <Tabs
          tabs={[
            { id: 'info', label: 'Company Information' },
            { id: 'hierarchy', label: 'Company Hierarchy' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="h-10 px-5 font-semibold text-[13px]">
            Cancel
          </Button>
          <Button onClick={onClose} className="shadow-md flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Account
          </Button>
        </>
      }
    >
      {activeTab === 'info' ? (
        <div className="space-y-8 pb-4">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1 md:col-span-2">
                <FormInput
                  label="Company Name"
                  defaultValue={account?.name || ''}
                  placeholder="Acme Corp"
                  icon={<Building2 />}
                />
              </div>
              <FormSelect
                label="Industry Vertical"
                defaultValue={account?.industry || 'Technology'}
                options={[
                  { value: 'Technology', label: 'Technology' },
                  { value: 'Healthcare', label: 'Healthcare' },
                  { value: 'Finance', label: 'Finance' },
                ]}
              />
              <FormSelect
                label="Status"
                defaultValue={account ? (account.status === 'active' ? 'Active' : account.status === 'churned' ? 'Churned' : 'Prospect') : 'Prospect'}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Churned', label: 'Churned' },
                  { value: 'Prospect', label: 'Prospect' },
                ]}
              />
              <div className="col-span-1 md:col-span-2">
                <FormSelect
                  label="Owner"
                  defaultValue="Alex Morgan (EMP001)"
                  options={[
                    { value: 'Alex Morgan (EMP001)', label: 'Alex Morgan (EMP001)' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Contact & Details */}
          <div className="space-y-4 pt-2 border-t border-border/40">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Contact & Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <FormInput
                label="Website"
                defaultValue={account?.website || ''}
                placeholder="www.example.com"
                icon={<Globe />}
              />
              <FormInput
                label="Phone"
                defaultValue={account ? "+1 (555) 123-4567" : ""}
                placeholder="+1 (555) 000-0000"
                icon={<Phone />}
              />
              <FormInput
                label="Annual Revenue"
                defaultValue={account ? account.revenue.replace(/[^0-9.]/g, '') + (account.revenue.includes('B') ? '00000000' : '000000') : "0"}
                placeholder="0"
                icon={<DollarSign />}
              />
              <FormInput
                label="Employees"
                defaultValue={account ? "5000" : "0"}
                placeholder="0"
                icon={<Users />}
              />
              <div className="col-span-1 md:col-span-2">
                <FormTextarea
                  label="Description"
                  defaultValue={account ? "Leading AI and robotics manufacturer." : ""}
                  placeholder="Brief description of the company..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4 pt-2 border-t border-border/40">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1 md:col-span-2">
                <FormInput
                  label="Street Address"
                  defaultValue={account ? "123 Main St" : ""}
                  placeholder="123 Main St"
                />
              </div>
              <FormInput
                label="City"
                defaultValue={account ? "San Francisco" : ""}
                placeholder="San Francisco"
              />
              <FormInput
                label="State / Province"
                defaultValue={account ? "CA" : ""}
                placeholder="CA"
              />
              <FormInput
                label="ZIP / Postal Code"
                defaultValue={account ? "94105" : ""}
                placeholder="94105"
              />
              <FormInput
                label="Country"
                defaultValue={account ? "United States" : ""}
                placeholder="United States"
              />
              <FormInput
                label="Latitude (Google Maps)"
                defaultValue={account ? "37.7749" : ""}
                placeholder="37.7749"
              />
              <FormInput
                label="Longitude (Google Maps)"
                defaultValue={account ? "-122.4194" : ""}
                placeholder="-122.4194"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 pb-4">
          <div className="bg-muted/10 border border-border/50 rounded-xl p-5 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Parent Company</h3>
            </div>
            <FormSelect
              label="Parent Account"
              options={[
                { value: '', label: 'None (Top Level)' },
              ]}
              placeholder="Select parent account"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}