/**
 * SalesTargets Page - Detailed view of organizational and individual sales quotas
 */
import React from 'react';
import { SalesTargets } from '../components/SalesTargets';
import { PerformanceChart } from '../components/PerformanceChart';
import { Card, CardHeader, CardTitle, CardContent } from '@crm/ui';
import { Target, TrendingUp, Filter, Download } from 'lucide-react';

export function SalesTargetsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-2">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary text-white rounded-xl shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sales Performance & Targets</h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">Monitoring overall organization performance against global quota</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors text-sm">
            <Filter className="w-4 h-4" /> Filter by Region
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="space-y-8 pb-12">
        <SalesTargets />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-border/50">
            <CardHeader className="border-b pb-4">
              <div className="flex items-center gap-2 text-primary">
                 <TrendingUp className="w-4 h-4" />
                 <CardTitle className="text-base font-semibold text-foreground">Historical Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <PerformanceChart />
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
             <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground">Target Contributors</CardTitle>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Top Performing Teams</span>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {['Enterprise Sales', 'Mid-Market', 'SMB West', 'Global Accounts'].map((team, i) => (
                    <div key={team} className="p-4 flex items-center justify-between group hover:bg-muted/30 transition-colors">
                       <span className="text-sm font-medium text-foreground">{team}</span>
                       <div className="flex items-center gap-4">
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${80 - i * 15}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">{80 - i * 15}%</span>
                       </div>
                    </div>
                  ))}
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
