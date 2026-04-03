/**
 * OwnerProfileModal - Display owner/user profile details
 * Extracted from Accounts.tsx for better code organization
 */
import React from 'react';
import { Button, Modal } from '@crm/ui';

interface OwnerProfileModalProps {
  ownerName: string;
  onClose: () => void;
}

export function OwnerProfileModal({ ownerName, onClose }: OwnerProfileModalProps) {
  const owner = {
    name: ownerName,
    initials: ownerName.split(' ').map(n => n[0]).join(''),
    title: 'Account Owner',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    manager: 'Sarah Jenkins',
    department: 'Sales'
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Owner Profile"
      maxWidth="md"
      footer={
        <Button onClick={onClose} variant="outline" className="h-10 px-6 font-semibold">
          Close
        </Button>
      }
    >
      <div className="space-y-8 py-2">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold border-2 border-primary/20 shadow-sm">
            {owner.initials}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground">{owner.name}</h2>
            <p className="text-[14px] text-muted-foreground font-medium">{owner.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-6 pt-2">
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Email</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.email}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Phone</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.phone}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Manager</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.manager}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Department</h4>
            <p className="text-[15px] font-medium text-foreground">{owner.department}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}