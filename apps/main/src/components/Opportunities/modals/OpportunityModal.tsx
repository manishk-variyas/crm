/**
 * OpportunityModal - Add/Edit opportunity form modal
 * Extracted from Opportunities.tsx for better code organization
 */
import React from 'react';
import { Modal, Button, FormInput, FormSelect, FormTextarea, cn } from '@crm/ui';
import { Building2, Mail, Phone, User, Briefcase, DollarSign, Calendar, Save } from 'lucide-react';

interface Opportunity {
  id: string;
  oppId: string;
  name: string;
  subTitle: string;
  account: string;
  amount: string;
  stage: string;
  expectedClosure: string;
  lastContact: string;
  createdOn: string;
  email: string;
  phone: string;
  owner: string;
  productInterest?: string;
  description?: string;
  comments?: string;
  industry?: string;
  emdAmount?: string;
  source?: string;
  sourceName?: string;
  reverseAuction?: 'Yes' | 'No';
}

interface OpportunityModalProps {
  opportunity?: Opportunity | null;
  onClose: () => void;
}

export function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  const isEditing = !!opportunity;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Opportunity' : 'Add New Opportunity'}
      description={isEditing ? 'Update the details for this sales opportunity.' : 'Enter the details for the new prospect.'}
      className="max-w-3xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-semibold">
            Cancel
          </Button>
          <Button onClick={onClose} className="flex items-center gap-2 h-10 px-6 font-semibold">
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Opportunity' : 'Save Opportunity'}
          </Button>
        </div>
      }
    >
      <div className="space-y-10 pb-6 pt-2">
        <div className="space-y-6">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-0.5">Contact Information</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <FormInput
              label="Full Name"
              defaultValue={opportunity?.subTitle ? opportunity.subTitle.split(' (')[0] : ''}
              placeholder="John Doe"
              icon={<User className="w-4 h-4" />}
            />
            <FormInput
              label="Job Title"
              defaultValue={opportunity?.subTitle ? opportunity.subTitle.split(' (')[1]?.replace(')', '') : ''}
              placeholder="VP of Sales"
              icon={<Briefcase className="w-4 h-4" />}
            />
            <FormInput
              label="Email"
              defaultValue={opportunity?.email || ''}
              placeholder="john@example.com"
              icon={<Mail className="w-4 h-4" />}
            />
            <FormInput
              label="Phone"
              defaultValue={opportunity?.phone || ''}
              placeholder="+1 (555) 000-0000"
              icon={<Phone className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-0.5">Opportunity Specifics</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-2">
              <FormInput
                label="Opportunity Name"
                defaultValue={opportunity?.name || ''}
                placeholder="e.g. Q3 Enterprise Software Deal"
              />
            </div>

            <FormSelect
              label="Opportunity Stage"
              defaultValue={opportunity?.stage || 'Prospecting'}
              options={[
                { value: 'Prospecting', label: 'Prospecting' },
                { value: 'Qualification', label: 'Qualification' },
                { value: 'Proposal', label: 'Proposal' },
                { value: 'Qualified', label: 'Qualified' },
                { value: 'Discovery Done', label: 'Discovery Done' },
                { value: 'Proposal Sent', label: 'Proposal Sent' },
                { value: 'Negotiation', label: 'Negotiation' },
                { value: 'Closed Won', label: 'Closed Won' },
                { value: 'Closed Lost', label: 'Closed Lost' }
              ]}
            />
            <FormInput
              label="Product/Service Interest"
              defaultValue={opportunity?.productInterest || ''}
              placeholder="e.g. Cloud Suite Pro"
            />

            <FormInput
              label="Expected Closure Date"
              defaultValue={(opportunity?.expectedClosure && opportunity.expectedClosure !== 'Not set') ? opportunity.expectedClosure : ''}
              type="date"
              icon={<Calendar className="w-4 h-4 text-muted-foreground/60" />}
            />
            <FormInput
              label="Expected Closure Week"
              placeholder="Auto-calculated"
              defaultValue={(opportunity?.expectedClosure && opportunity.expectedClosure !== 'Not set') ? `Week ${Math.ceil((new Date(opportunity.expectedClosure).getDate() + new Date(opportunity.expectedClosure).getDay()) / 7) + 12}` : ''}
              disabled
              className="bg-muted/30"
            />

            <div className="col-span-2">
              <FormTextarea
                label="Description"
                defaultValue={opportunity?.description || ''}
                placeholder="Describe the opportunity and their needs..."
                rows={3}
              />
            </div>

            <div className="col-span-2">
              <FormTextarea
                label="Specific Comments"
                defaultValue={opportunity?.comments || ''}
                placeholder="Any additional notes or specific instructions..."
                rows={2}
              />
            </div>

            <div className="col-span-2 space-y-3">
              <label className="text-[12px] font-bold text-foreground">Attach Quote</label>
              <div className="flex items-center gap-6">
                {['None', 'Upload Quote', 'Select Existing Quote'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group" onClick={(e) => e.stopPropagation()}>
                    <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        option === 'None' ? "bg-primary" : "bg-transparent"
                      )} />
                    </div>
                    <span className="text-[13px] font-medium text-foreground/80">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-0.5">Company Details</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <FormInput
              label="Company Name"
              defaultValue={opportunity?.account || ''}
              placeholder="Acme Corp"
              icon={<Building2 className="w-4 h-4" />}
            />
            <FormSelect
              label="Industry"
              defaultValue={opportunity?.industry || 'Select Industry'}
              options={[
                { value: 'Select Industry', label: 'Select Industry' },
                { value: 'Technology', label: 'Technology' },
                { value: 'Finance', label: 'Finance' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'Manufacturing', label: 'Manufacturing' },
                { value: 'Government/Non-Profit', label: 'Government/Non-Profit' },
              ]}
            />

            <FormInput
              label="Estimated Value ($)"
              defaultValue={opportunity?.amount ? opportunity.amount.replace('$', '').replace(/,/g, '') : '0.00'}
              placeholder="0.00"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <FormInput
              label="EMD Amount ($)"
              defaultValue={opportunity?.emdAmount || '0.00'}
              placeholder="0.00"
              icon={<DollarSign className="w-4 h-4" />}
            />

            <FormSelect
              label="Opportunity Source"
              defaultValue={opportunity?.source || 'Website'}
              options={[
                { value: 'Website', label: 'Website' },
                { value: 'Referral', label: 'Referral' },
                { value: 'LinkedIn', label: 'LinkedIn' },
                { value: 'Cold Call', label: 'Cold Call' },
                { value: 'Trade Show', label: 'Trade Show' },
              ]}
            />
            <FormInput
              label="Source Name"
              defaultValue={opportunity?.sourceName || ''}
              placeholder="e.g. John Doe, Tech Conf 2026"
            />

            <FormSelect
              label="Reverse Auction"
              defaultValue={opportunity?.reverseAuction || 'No'}
              options={[
                { value: 'No', label: 'No' },
                { value: 'Yes', label: 'Yes' },
              ]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}