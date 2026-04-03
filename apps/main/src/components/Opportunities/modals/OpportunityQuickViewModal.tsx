/**
 * OpportunityQuickViewModal - View opportunity details modal
 * Extracted from Opportunities.tsx for better code organization
 */
import React from 'react';
import { Modal, Button, StatusBadge, getStatusVariant } from '@crm/ui';

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

interface OpportunityQuickViewModalProps {
  opportunity: Opportunity;
  onClose: () => void;
  onEdit: (opp: Opportunity) => void;
}

export function OpportunityQuickViewModal({ opportunity, onClose, onEdit }: OpportunityQuickViewModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold text-foreground">{opportunity.subTitle.split(' (')[0]}</h2>
          <p className="text-[13px] font-medium text-muted-foreground">{opportunity.subTitle.split('(')[1]?.replace(')', '') || 'Contact'} at {opportunity.account}</p>
        </div>
      }
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-semibold">
            Close
          </Button>
          <Button onClick={() => { onClose(); onEdit(opportunity); }} className="h-10 px-6 font-semibold">
            Edit Opportunity
          </Button>
        </div>
      }
    >
      <div className="space-y-10 py-2">
        <div className="space-y-6">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-0.5">Opportunity Details</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Opportunity Title / Opportunity</p>
              <p className="text-[15px] font-bold text-foreground">{opportunity.name}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Status</p>
              <StatusBadge status={opportunity.stage} variant={getStatusVariant(opportunity.stage)} />
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Value</p>
              <p className="text-[15px] font-bold text-foreground">{opportunity.amount}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Owner</p>
              <p className="text-[15px] font-bold text-foreground">{opportunity.owner}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-0.5">Contact Information</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Email</p>
              <a href={`mailto:${opportunity.email}`} className="text-[14px] font-bold text-primary hover:underline underline-offset-4">
                {opportunity.email}
              </a>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Phone</p>
              <a href={`tel:${opportunity.phone}`} className="text-[14px] font-bold text-primary hover:underline underline-offset-4">
                {opportunity.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}