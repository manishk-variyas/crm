/**
 * Automation Page - Workflow Builder for CRM processes
 * Features a visual canvas for designing triggers, conditions, and actions
 */
import React from 'react';
import { 
  Zap, 
  Play, 
  Plus, 
  Settings2, 
  Filter, 
  Mail, 
  Bell, 
  PlusCircle, 
  Save, 
  Users, 
  Clock, 
  LayoutGrid, 
  Smartphone, 
  Split,
  Target,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, cn } from '@crm/ui';

export function Automation() {
  const triggers = [
    { label: 'New Opportunity', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Deal Stage Change', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Task Overdue', icon: Clock, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  const actions = [
    { label: 'Send Email', icon: Mail, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Create Task', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Send Notification', icon: Bell, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Update Field', icon: ArrowRight, color: 'text-slate-500', bg: 'bg-slate-500/10' },
  ];

  const logic = [
    { label: 'Condition (If/Else)', icon: Filter, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-1">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Automation Builder</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">Design workflows to automate your sales process.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 px-6 border-border/60 font-bold text-xs h-11">
            <Play className="w-3.5 h-3.5" /> Test Run
          </Button>
          <Button className="flex items-center gap-2 px-6 bg-primary shadow-lg shadow-primary/20 font-bold text-xs h-11">
            <Save className="w-3.5 h-3.5" /> Save Workflow
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Visual Canvas Area */}
        <div className="flex-1 relative bg-muted/20 rounded-3xl border border-border/50 border-dashed p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-0">
            
            {/* Step 1: Trigger */}
            <WorkflowStep 
              type="TRIGGER" 
              title="New Opportunity Created" 
              description="When an opportunity is added manually or via API" 
              icon={Users} 
              iconColor="text-blue-500"
              iconBg="bg-blue-500/10"
            />

            <StepConnector />

            {/* Step 2: Condition */}
            <WorkflowStep 
              type="CONDITION" 
              title="Industry is Tech" 
              description='Check if opportunity industry matches "Technology"' 
              icon={Filter} 
              iconColor="text-amber-500"
              iconBg="bg-amber-500/10"
            />

            <StepConnector />

            {/* Step 3: Action 1 */}
            <WorkflowStep 
              type="ACTION" 
              title="Assign to Tech Team" 
              description='Route opportunity to "North America Tech" queue' 
              icon={Target} 
              iconColor="text-emerald-500"
              iconBg="bg-emerald-500/10"
            />

            <StepConnector />

            {/* Step 4: Action 2 */}
            <WorkflowStep 
              type="ACTION" 
              title="Send Welcome Email" 
              description='Send "Tech Intro" template immediately' 
              icon={Mail} 
              iconColor="text-indigo-500"
              iconBg="bg-indigo-500/10"
            />

            <div className="mt-8 flex justify-center">
              <button className="p-3 bg-card border border-border/50 rounded-full shadow-md text-muted-foreground hover:text-primary hover:border-primary transition-all active:scale-95 group">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbox Sidebar */}
        <aside className="w-80 shrink-0 flex flex-col gap-6">
          <Card className="border-border/50 shadow-sm h-full flex flex-col overflow-hidden">
            <CardHeader className="border-b border-border/40 py-5">
              <CardTitle className="text-base font-black uppercase tracking-widest text-foreground/80">Toolbox</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              
              <section className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Triggers</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {triggers.map(item => (
                    <ToolboxItem key={item.label} {...item} />
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Actions</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {actions.map(item => (
                    <ToolboxItem key={item.label} {...item} />
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Logic</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {logic.map(item => (
                    <ToolboxItem key={item.label} {...item} />
                  ))}
                </div>
              </section>

            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function WorkflowStep({ type, title, description, icon: Icon, iconColor, iconBg }: any) {
  return (
    <div className="w-full bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group animate-in slide-in-from-bottom-2">
      <div className="flex items-start gap-5">
        <div className={cn("p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform", iconBg, iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-[9px] font-black tracking-widest uppercase",
              type === 'TRIGGER' ? "text-blue-500" : 
              type === 'CONDITION' ? "text-amber-500" : "text-emerald-500"
            )}>
              {type}
            </span>
          </div>
          <h4 className="text-lg font-bold text-foreground leading-tight">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1.5 font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StepConnector() {
  return (
    <div className="h-12 w-0.5 bg-border/40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-border" />
    </div>
  );
}

function ToolboxItem({ label, icon: Icon, color, bg }: any) {
  return (
    <button className="flex items-center gap-3.5 p-3 rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/10 hover:border-primary/30 transition-all text-left group">
      <div className={cn("p-2 rounded-lg group-hover:scale-110 transition-transform", bg, color)}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">{label}</span>
    </button>
  );
}
