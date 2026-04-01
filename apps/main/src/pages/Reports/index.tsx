/**
 * Reports Page - Analytics and reporting dashboard
 * Revenue charts, conversion funnels, pipeline metrics
 * @route /reports
 */
import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Users, 
  Timer, 
  Zap, 
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  Layers,
  Globe,
  Wallet
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardContent, 
  cn,
  ReportStatsCard,
  RevenueTrend, 
  RevenueByVertical,
  DealsByStage, 
  PipelineByStage,
  OpportunitySources, 
  FunnelConversion,
  RevenueForecast, 
  ExportReports
} from '@crm/ui';

export function Reports() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      {/* Header & Filters */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground drop-shadow-sm">Reports & Analytics</h1>
            <p className="text-muted-foreground font-medium mt-1.5 flex items-center gap-2">
              Comprehensive insights into sales performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2 h-10 font-bold active:scale-95 transition-all">
              <Download className="w-4.5 h-4.5" />
              Download Full Report
            </Button>
            <Button className="flex items-center gap-2 h-10 shadow-lg active:scale-95 transition-all font-bold">
              <Zap className="w-4.5 h-4.5" />
              Generate Insight
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-card p-4 rounded-3xl border border-border/60 shadow-xl flex flex-wrap items-center gap-6">
           <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-2">Date Range</label>
              <div className="relative group">
                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                 <select className="pl-9 pr-6 py-2 bg-muted/30 hover:bg-background border border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Year to Date</option>
                 </select>
              </div>
           </div>

           <div className="w-px h-10 bg-border hidden sm:block" />

           <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-2">Vertical</label>
              <div className="relative group">
                 <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                 <select className="pl-9 pr-6 py-2 bg-muted/30 hover:bg-background border border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer">
                    <option>All Verticals</option>
                    <option>Banking</option>
                    <option>Healthcare</option>
                 </select>
              </div>
           </div>

           <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-2">Region</label>
              <div className="relative group">
                 <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                 <select className="pl-9 pr-6 py-2 bg-muted/30 hover:bg-background border border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer">
                    <option>All Regions</option>
                    <option>NAMER</option>
                    <option>EMEA</option>
                 </select>
              </div>
           </div>

           <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest px-2">Currency</label>
              <div className="relative group">
                 <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                 <select className="pl-9 pr-6 py-2 bg-muted/30 hover:bg-background border border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                 </select>
              </div>
           </div>

           <div className="ml-auto">
              <Button className="rounded-xl px-8 h-10 font-black tracking-widest uppercase text-[11px] shadow-lg active:scale-95 transition-all">
                 Apply
              </Button>
           </div>
        </div>
      </div>

      {/* Stats Summary Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <ReportStatsCard 
          label="Total Revenue" 
          value="$340,000" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<DollarSign className="w-5 h-5" />} 
          iconBg="bg-primary"
        />
        <ReportStatsCard 
          label="Deals Won" 
          value="145" 
          trend="+8.2%" 
          isPositive={true} 
          icon={<CheckCircle2 className="w-5 h-5" />} 
          iconBg="bg-indigo-600"
        />
        <ReportStatsCard 
          label="Win Rate" 
          value="58%" 
          trend="-2.1%" 
          isPositive={false} 
          icon={<TrendingUp className="w-5 h-5" />} 
          iconBg="bg-violet-600"
        />
        <ReportStatsCard 
          label="Pipeline Value" 
          value="$5,550,000" 
          trend="+15.3%" 
          isPositive={true} 
          icon={<Layers className="w-5 h-5" />} 
          iconBg="bg-sky-600"
        />
        <ReportStatsCard 
          label="Active Opportunities" 
          value="1,240" 
          trend="+5.4%" 
          isPositive={true} 
          icon={<Users className="w-5 h-5" />} 
          iconBg="bg-orange-500"
        />
        <ReportStatsCard 
          label="Average Deal Size" 
          value="$23,400" 
          trend="+1.2%" 
          isPositive={true} 
          icon={<Target className="w-5 h-5" />} 
          iconBg="bg-teal-500"
        />
        <ReportStatsCard 
          label="Sales Cycle Length" 
          value="42 Days" 
          trend="-4 days" 
          isPositive={true} 
          icon={<Timer className="w-5 h-5" />} 
          iconBg="bg-cyan-600"
        />
        <ReportStatsCard 
          label="Quote Conversion" 
          value="45%" 
          trend="+3.5%" 
          isPositive={true} 
          icon={<FileText className="w-5 h-5" />} 
          iconBg="bg-pink-600"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RevenueTrend />
        <RevenueByVertical />
        <DealsByStage />
        <PipelineByStage />
        <OpportunitySources />
        <FunnelConversion />
        <RevenueForecast />
        <ExportReports />
      </div>
    </div>
  );
}
