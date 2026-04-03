/**
 * ContactDetailModal - View contact details modal
 * Extracted from Contacts.tsx for better code organization
 */
import React from 'react';
import { Modal, Button, Badge, cn } from '@crm/ui';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  title: string;
  account: string;
  role: 'Influencer' | 'Decision Maker' | 'Gatekeeper' | 'End User';
  email: string;
  phone: string;
  lastActivity: string;
  avatarColor: string;
}

interface ContactDetailModalProps {
  contact: Contact;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
}

export function ContactDetailModal({ contact, onClose, onEdit }: ContactDetailModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="max-w-2xl"
      title={
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border border-white/50",
            contact.avatarColor
          )}>
            {contact.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-bold text-foreground">{contact.name}</h2>
            <p className="text-[13px] font-medium text-muted-foreground">{contact.title} at {contact.account}</p>
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-bold text-[13px]">
            Close
          </Button>
          <Button onClick={() => onEdit(contact)}>
            Edit Customer Contact
          </Button>
        </div>
      }
    >
      <div className="space-y-10 pb-4">
        <div className="space-y-5">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Contact Details</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Role</p>
              <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-bold px-3 py-1 text-[11px]">
                {contact.role}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Account</p>
              <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                <Building2 className="w-4 h-4 text-muted-foreground/60" />
                {contact.account}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Contact Information</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Email</p>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[14px] font-bold text-primary hover:underline underline-offset-4">
                <Mail className="w-4 h-4" />
                {contact.email}
              </a>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Phone</p>
              <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-[14px] font-bold text-primary hover:underline underline-offset-4">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
            </div>
            <div className="space-y-1.5 col-span-2">
              <p className="text-[12px] font-medium text-muted-foreground">Location</p>
              <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground/60" />
                Raccoon City
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Office Details</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Desk Number</p>
              <p className="text-[14px] font-bold text-foreground">--</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[12px] font-medium text-muted-foreground">Bay / Workspace</p>
              <p className="text-[14px] font-bold text-foreground">--</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Activity</h3>
          <div className="space-y-1.5">
            <p className="text-[12px] font-medium text-muted-foreground">Last Activity</p>
            <p className="text-[14px] font-bold text-foreground">{contact.lastActivity}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}