/**
 * AccountDetailModal - View account details modal with tabs
 * Extracted from Accounts.tsx for better code organization
 */
import React, { useState } from 'react';
import { Building2, Globe, Phone, DollarSign, Users, Mail, MapPin, Clock, ExternalLink, Edit } from 'lucide-react';
import { Button, Badge, cn, Modal, StatusBadge, getStatusVariant } from '@crm/ui';

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

interface AccountDetailModalProps {
  account: Account;
  onClose: () => void;
  onEdit: (account: Account) => void;
}

export function AccountDetailModal({ account, onClose, onEdit }: AccountDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'opportunities'>('details');

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-foreground">{account.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-bold border-none px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                {account.industry}
              </Badge>
              <StatusBadge
                status={account.status}
                variant={getStatusVariant(account.status)}
              />
            </div>
          </div>
        </div>
      }
      tabs={
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              "py-4 text-[13px] font-bold transition-all border-b-[3px] relative -mb-[1px]",
              activeTab === 'details' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={cn(
              "py-4 text-[13px] font-bold transition-all border-b-[3px] relative -mb-[1px]",
              activeTab === 'opportunities' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            Opportunities
          </button>
        </div>
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="h-10 px-5 font-semibold">
            Close
          </Button>
          <Button onClick={() => onEdit(account)} className="h-10 px-5 font-semibold flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Account
          </Button>
        </>
      }
    >
      {activeTab === 'details' ? (
        <div className="space-y-8 pb-4">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Website</p>
                    <a href="#" className="text-[14px] text-foreground font-medium hover:underline flex items-center gap-1">
                      {account.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Phone</p>
                    <p className="text-[14px] text-foreground font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Email</p>
                    <p className="text-[14px] text-foreground font-medium">contact@cyberdyne.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Additional Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Annual Revenue</p>
                    <p className="text-[14px] text-foreground font-bold">{account.revenue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Employees</p>
                    <p className="text-[14px] text-foreground font-bold">5,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Location</p>
                    <p className="text-[14px] text-foreground font-medium">San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase">Last Activity</p>
                    <p className="text-[14px] text-foreground font-medium">{account.lastActivity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-border/50">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Description</h3>
            <p className="text-[14px] text-foreground font-medium leading-relaxed">
              Leading AI and robotics manufacturer specializing in advanced neural network processors and autonomous defense systems. Founded in 2014, Cyberdyne has grown to become a Fortune 500 company with operations in 15 countries.
            </p>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-border/50">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-semibold rounded-lg">Enterprise</span>
              <span className="px-3 py-1.5 bg-muted text-muted-foreground text-[11px] font-semibold rounded-lg">AI/ML</span>
              <span className="px-3 py-1.5 bg-muted text-muted-foreground text-[11px] font-semibold rounded-lg">North America</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No opportunities associated with this account.</p>
        </div>
      )}
    </Modal>
  );
}