/**
 * Automation Page - Admin tool for workflow and CRM automation
 */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@crm/ui';
import { Zap, Play, Plus, Settings2 } from 'lucide-react';

export function Automation() {
  const workflows = [
    { name: 'Lead Assignment Rule', trigger: 'New Lead Created', status: 'Active', color: 'text-blue-500' },
    { name: 'Quote Approval Process', trigger: 'Quote > $50,000', status: 'Active', color: 'text-purple-500' },
    { name: 'Task Follow-up reminder', trigger: 'Deal Phase Change', status: 'Inactive', color: 'text-slate-400' },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Automation</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's workflow rules and triggers</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Play className="w-5 h-5" /> <span className="font-bold">Active Rules</span>
          </div>
          <p className="text-4xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">Currently running</p>
        </div>
        <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-xl">
          <div className="flex items-center gap-3 mb-4 text-purple-600">
            <Zap className="w-5 h-5" /> <span className="font-bold">Triggers Fired</span>
          </div>
          <p className="text-4xl font-bold text-foreground">1.2k</p>
          <p className="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">In the last 24h</p>
        </div>
        <div className="p-6 bg-slate-500/5 border border-slate-500/20 rounded-xl">
          <div className="flex items-center gap-3 mb-4 text-slate-600">
            <Settings2 className="w-5 h-5" /> <span className="font-bold">Success Rate</span>
          </div>
          <p className="text-4xl font-bold text-foreground">99.8%</p>
          <p className="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">Execution healthy</p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base font-semibold">Workflow Rules</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {workflows.map((flow) => (
              <div key={flow.name} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-muted ${flow.color}`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{flow.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Trigger: {flow.trigger}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${flow.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                    {flow.status}
                  </span>
                  <button className="text-muted-foreground hover:text-foreground p-1"><Settings2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
