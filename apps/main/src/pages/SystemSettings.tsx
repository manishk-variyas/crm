/**
 * SystemSettings Page - Global organization and security settings for the CRM
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@crm/ui';
import { Shield, Key, Globe, Database, UserPlus, Server } from 'lucide-react';

export function SystemSettings() {
  const sections = [
    { title: 'Identity & Access', icon: Shield, items: ['Single Sign-On (SSO)', 'Two-Factor Authentication', 'Role-Based Access Control', 'User Provisioning'] },
    { title: 'Security', icon: Key, items: ['IP Whitelisting', 'Encryption at Rest', 'Audit Logging', 'Data Loss Prevention'] },
    { title: 'Integrations', icon: Server, items: ['Webhooks Manager', 'API Access Keys', 'External Data Sources', 'Cloud Connectors'] },
    { title: 'Data Management', icon: Database, items: ['Data Backup Schedule', 'Compliance Archive', 'Retention Policies', 'Storage Allocation'] },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2 text-primary font-bold tracking-tight uppercase text-xs">
            <Shield className="w-4 h-4" /> Admin Console
          </div>
          <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Control global configuration and data security policies</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors text-sm">
            View Audit Log
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {sections.map((section) => (
          <Card key={section.title} className="border-border/50 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center gap-4 pb-4 border-b border-border/40">
              <div className="p-2.5 bg-muted rounded-xl text-primary shrink-0 transition-colors">
                <section.icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-semibold">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-1">
                {section.items.map((item) => (
                  <button key={item} className="w-full text-left p-3 flex items-center justify-between text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground rounded-lg group transition-all">
                    <span>{item}</span>
                    <Globe className="w-3 h-3 opacity-0 group-hover:opacity-30 transition-opacity" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
