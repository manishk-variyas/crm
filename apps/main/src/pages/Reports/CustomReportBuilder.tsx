import React, { useState } from 'react';
import { 
  Database, 
  Calendar, 
  ChevronDown, 
  Check, 
  BarChart4, 
  Settings2, 
  Plus, 
  FileText,
  MousePointerClick,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button, Card, cn } from '@crm/ui';

export function CustomReportBuilder() {
  const [dataSource, setDataSource] = useState('Deals');
  const [dateRange, setDateRange] = useState('All Time');
  const [selectedFields, setSelectedFields] = useState(['Deal Name', 'Amount', 'Stage']);
  const [aggregations, setAggregations] = useState(['Sum (Total Deal Value)']);
  const [groupBy, setGroupBy] = useState('None');

  const fields = [
    'Deal Name', 'Amount', 'Stage', 'Close Date',
    'Owner', 'Probability', 'Next Step'
  ];

  const aggregationOptions = [
    'Sum (Total Deal Value)', 'Avg Deal Size', 'Count',
    'Min / Max', 'Forecast'
  ];

  const toggleField = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <Card className="rounded-xl border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 space-y-10">
          
          {/* Section: Basic Config */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Database className="w-3 h-3" />
                Data Source
              </label>
              <div className="relative group">
                <select 
                  value={dataSource}
                  onChange={(e) => setDataSource(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 bg-muted/20 border border-border/50 rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                >
                  <option>Deals</option>
                  <option>Accounts</option>
                  <option>Contacts</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Timeframe
              </label>
              <div className="relative group">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 bg-muted/20 border border-border/50 rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                >
                  <option>All Time</option>
                  <option>Last 30 Days</option>
                  <option>Current Quarter</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              </div>
            </div>
          </div>

          {/* Section: Fields Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3 h-3" />
              Columns & Metadata
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {fields.map(field => (
                <button
                  key={field}
                  onClick={() => toggleField(field)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md border text-[11px] font-bold transition-all text-left",
                    selectedFields.includes(field)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-muted/10 border-border/20 text-muted-foreground hover:bg-muted/20 hover:border-border/40"
                  )}
                >
                  <div className={cn(
                    "w-3 h-3 rounded-[3px] border flex items-center justify-center transition-all",
                    selectedFields.includes(field) ? "bg-primary border-primary" : "border-muted-foreground/20"
                  )}>
                    {selectedFields.includes(field) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  {field}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Aggregation */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <BarChart4 className="w-3 h-3" />
              Aggregation Metrics
            </label>
            <div className="flex flex-wrap gap-2">
              {aggregationOptions.map(agg => (
                <button
                  key={agg}
                  onClick={() => setAggregations(prev => prev.includes(agg) ? prev.filter(a => a !== agg) : [...prev, agg])}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-[11px] font-bold tracking-tight transition-all",
                    aggregations.includes(agg)
                      ? "bg-foreground text-background border-foreground"
                      : "bg-muted/20 border-border/40 text-muted-foreground hover:border-border"
                  )}
                >
                  {agg}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Pivot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border/30">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-3 h-3" />
                Group Dimension
              </label>
              <div className="relative">
                <select 
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 bg-muted/10 border border-border/30 rounded-lg text-xs font-semibold text-foreground focus:outline-none appearance-none cursor-pointer"
                >
                  <option>None</option>
                  <option>Stage</option>
                  <option>Owner</option>
                  <option>Region</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
              </div>
            </div>

            <div className="flex items-end">
              <Button className="w-full h-10 rounded-lg text-xs font-bold shadow-lg shadow-primary/10 active:scale-95 transition-all">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Build Custom View
              </Button>
            </div>
          </div>

        </div>
      </Card>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-2 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Query Engine Ready
        </div>
        <div>v1.2.0-alpha</div>
      </div>
    </div>
  );
}


