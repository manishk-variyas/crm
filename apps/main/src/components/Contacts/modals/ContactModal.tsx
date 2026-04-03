/**
 * ContactModal - Add/Edit contact form modal
 * Extracted from Contacts.tsx for better code organization
 */
import React from 'react';
import { Modal, Button, FormInput, FormSelect } from '@crm/ui';
import { Building2, Mail, Phone, Smartphone, MapPin, User } from 'lucide-react';

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

interface ContactModalProps {
  contact?: Contact | null;
  onClose: () => void;
}

export function ContactModal({ contact, onClose }: ContactModalProps) {
  const isEditing = !!contact;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Customer Contact' : 'Add New Customer Contact'}
      description={isEditing ? 'Update the details for this customer contact.' : 'Enter the details for the new customer contact.'}
      className="max-w-2xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-bold text-[13px]">
            Cancel
          </Button>
          <Button onClick={onClose}>
            {isEditing ? 'Update Customer Contact' : 'Create Customer Contact'}
          </Button>
        </div>
      }
    >
      <div className="space-y-10 pb-4">
        <div className="space-y-5">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormInput
              label="Full Name"
              defaultValue={contact?.name || ''}
              placeholder="Alice Abernathy"
              icon={<User />}
            />
            <FormInput
              label="Designation"
              defaultValue={contact?.title || ''}
              placeholder="Head of Security"
            />
            <FormSelect
              label="Role Type"
              defaultValue={contact?.role || 'Influencer'}
              options={[
                { value: 'Influencer', label: 'Influencer' },
                { value: 'Decision Maker', label: 'Decision Maker' },
                { value: 'Gatekeeper', label: 'Gatekeeper' },
                { value: 'End User', label: 'End User' },
              ]}
            />
            <FormInput
              label="Account"
              defaultValue={contact?.account || ''}
              placeholder="Umbrella Corporation"
              icon={<Building2 />}
            />
          </div>
        </div>

        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormInput
              label="Email"
              defaultValue={contact?.email || ''}
              placeholder="alice@umbrella.com"
              icon={<Mail />}
            />
            <FormInput
              label="Phone"
              defaultValue={contact?.phone || ''}
              placeholder="+1 (555) 666-6666"
              icon={<Phone />}
            />
            <FormInput
              label="Mobile Number"
              placeholder="+1 (555) 000-0000"
              icon={<Smartphone />}
            />
            <FormInput
              label="Alternate Contact"
              placeholder="+1 (555) 000-0000"
            />
            <FormInput
              label="Desk / VoIP Phone No."
              placeholder="+1 (555) 000-0000"
              icon={<Phone />}
            />
            <FormInput
              label="Location"
              placeholder="Raccoon City"
              icon={<MapPin />}
            />
            <FormSelect
              label="Reports To"
              options={[
                { value: '', label: 'None (Top Level)' },
                { value: '1', label: 'Bruce Wayne' },
                { value: '2', label: 'Tony Stark' },
              ]}
            />
          </div>
        </div>

        <div className="space-y-5 pt-2 border-t border-border/40">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Office Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormInput
              label="Desk Number"
              placeholder="e.g. D-402"
            />
            <FormInput
              label="Bay / Workspace Location"
              placeholder="e.g. Building A, Floor 4"
              icon={<MapPin />}
            />
            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Office Address"
                placeholder="Full office address"
                icon={<Building2 />}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}