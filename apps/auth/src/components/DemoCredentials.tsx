/**
 * DemoCredentials - Displays login credentials for authorized users
 * Shows the unique credentials needed to access the CRM
 */
import React from 'react';
import { Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function DemoCredentials() {
  const [copied, setCopied] = useState(false);
  
  const credentials = [
    { label: 'Email', value: 'admin@crm.com' },
    { label: 'Password', value: 'crm123' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Private Access</span>
        </div>
      </div>

      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="text-primary w-5 h-5" strokeWidth={2} />
          <span className="text-[14px] font-semibold text-foreground">Authorized Access Only</span>
        </div>
        
        <div className="space-y-2">
          {credentials.map((cred) => (
            <div key={cred.label} className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">{cred.label}:</span>
              <div className="flex items-center gap-2">
                <code className="text-[13px] font-mono font-semibold text-foreground bg-background px-2 py-1 rounded border border-border">
                  {cred.value}
                </code>
                <button
                  onClick={() => copyToClipboard(cred.value)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-[11px] text-muted-foreground mt-3">
          Contact admin for access credentials
        </p>
      </div>
    </>
  );
}
