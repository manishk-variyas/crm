import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ReportStatsCardProps {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

export function ReportStatsCard({ label, value, trend, isPositive, icon, iconBg }: ReportStatsCardProps) {
  return (
    <div className="bg-card p-5 rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-all group group-hover:border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl text-white shadow-sm transition-transform group-hover:scale-110", iconBg)}>
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg",
          isPositive ? "text-emerald-600 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">{label}</span>
        <span className="text-2xl font-black text-foreground tracking-tight">{value}</span>
        <span className="text-[10px] text-muted-foreground/60 font-medium mt-1">vs last period</span>
      </div>
    </div>
  );
}
