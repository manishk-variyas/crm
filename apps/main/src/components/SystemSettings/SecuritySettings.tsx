/**
 * SecuritySettings - Password policies and authentication
 */
import React from 'react';
import { Button, cn } from '@crm/ui';
import { Key, Smartphone } from 'lucide-react';

export function SecuritySettings() {
  const [passwordReq, setPasswordReq] = React.useState(true);
  const [tfa, setTfa] = React.useState(false);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-foreground">Security Settings</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Manage password policies and authentication.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        <ToggleCard
          icon={<Key className="w-6 h-6" />}
          title="Password Requirements"
          description="Require special characters and numbers"
          isEnabled={passwordReq}
          onToggle={() => setPasswordReq(!passwordReq)}
        />

        <ToggleCard
          icon={<Smartphone className="w-6 h-6" />}
          title="Two-Factor Authentication"
          description="Require 2FA for all admin accounts"
          isEnabled={tfa}
          onToggle={() => setTfa(!tfa)}
        />
      </div>
    </div>
  );
}

interface ToggleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

function ToggleCard({ icon, title, description, isEnabled, onToggle }: ToggleCardProps) {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
          {icon}
        </div>
        <div>
          <div className="font-bold text-foreground">{title}</div>
          <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{description}</div>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-6 rounded-full transition-all duration-300 relative",
          isEnabled ? "bg-primary" : "bg-muted"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
          isEnabled ? "left-7" : "left-1"
        )} />
      </button>
    </div>
  );
}