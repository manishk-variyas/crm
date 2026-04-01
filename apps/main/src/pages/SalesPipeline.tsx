/**
 * Sales Pipeline Page - Visual pipeline view
 * Kanban-style board showing deals by stage
 * @route /pipeline
 */
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Target,
  DollarSign,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { Button, Badge, cn } from '@crm/ui';

interface PipelineDeal {
  id: string;
  name: string;
  account: string;
  amount: string;
  stage: string;
  probability: string;
}

interface Column {
  id: string;
  title: string;
  deals: PipelineDeal[];
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'qual',
    title: 'Qualification',
    deals: [
      { id: '1', name: 'Platform Integration', account: 'Acme Corp', amount: '$45,000', stage: 'qual', probability: '20%' },
      { id: '2', name: 'Data Migration', account: 'Global Tech', amount: '$12,000', stage: 'qual', probability: '10%' },
    ]
  },
  {
    id: 'prop',
    title: 'Proposal Sent',
    deals: [
      { id: '3', name: 'Enterprise License', account: 'Stark Ind', amount: '$150,000', stage: 'prop', probability: '60%' },
    ]
  },
  {
    id: 'neg',
    title: 'Negotiation',
    deals: [
      { id: '4', name: 'Service Agreement', account: 'Wayne Ent', amount: '$85,000', stage: 'neg', probability: '80%' },
      { id: '5', name: 'API Access', account: 'Cyberdyne', amount: '$30,000', stage: 'neg', probability: '75%' },
    ]
  },
  {
    id: 'close',
    title: 'Final Review',
    deals: [
      { id: '6', name: 'Cloud Expansion', account: 'Umbrella', amount: '$200,000', stage: 'close', probability: '95%' },
    ]
  }
];

export function SalesPipeline() {
  const [columns] = useState<Column[]>(INITIAL_COLUMNS);

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1.5">
            Visualize and manage your deal progression.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 mr-4 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Total Value</span>
              <span className="text-foreground font-bold">$522,000</span>
            </div>
            <div className="w-px h-8 bg-primary/20" />
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Deals</span>
              <span className="text-foreground font-bold">6</span>
            </div>
          </div>
          <Button className="flex items-center gap-2 h-10 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wide">{column.title}</h3>
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground/70">
                  {column.deals.length}
                </span>
              </div>
              <button className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Column Body */}
            <div className="flex-1 bg-muted/30 rounded-2xl p-3 border border-border/50 space-y-3 min-h-[400px]">
              {column.deals.map((deal) => (
                <div 
                  key={deal.id}
                  className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <button className="text-muted-foreground/30 hover:text-foreground transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h4 className="font-bold text-foreground text-[13px] mb-1 group-hover:text-primary transition-colors">{deal.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-medium mb-4">
                    <Briefcase className="w-3 h-3" />
                    {deal.account}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/50 font-bold uppercase">Value</span>
                      <span className="text-xs font-extrabold text-foreground/90">{deal.amount}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[10px] text-muted-foreground/50 font-bold uppercase">Prob.</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[10px] py-0 px-1.5">
                        {deal.probability}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Add Column Placeholder */}
        <button className="flex-shrink-0 w-80 h-[500px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground/40 hover:border-border/80 hover:text-muted-foreground/60 transition-all hover:bg-muted/20 gap-2 font-bold text-sm">
          <Plus className="w-6 h-6" />
          Add Column
        </button>
      </div>
    </div>
  );
}
