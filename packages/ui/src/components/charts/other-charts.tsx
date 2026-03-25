import React from 'react';
import { 
  FileText, 
  Download,
  FileDown
} from 'lucide-react';
import { Button } from '../button';
import { cn } from '../../lib/utils';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Area 
} from 'recharts';

export function RevenueForecast() {
  const data = [
    { name: 'Jul', BestCase: 65000, Commit: 45000, Expected: 35000, Trend: 55000 },
    { name: 'Aug', BestCase: 70000, Commit: 50000, Expected: 40000, Trend: 62000 },
    { name: 'Sep', BestCase: 75000, Commit: 55000, Expected: 38000, Trend: 71000 },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Revenue Forecast</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Expected revenue growth next 3 months</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderRadius: '12px', 
                border: '1px solid hsl(var(--border))', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                color: 'hsl(var(--foreground))'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))', paddingTop: '20px' }}
            />
            <Bar dataKey="Expected" stackId="a" fill="#C7D2FE" radius={[0, 0, 0, 0]} barSize={40} />
            <Bar dataKey="Commit" stackId="a" fill="#818CF8" radius={[0, 0, 0, 0]} barSize={40} />
            <Bar dataKey="BestCase" stackId="a" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={40} />
            <Line type="monotone" dataKey="Trend" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ExportReports() {
  const reports = [
    { name: 'Deal Performance Report', sub: 'Full breakdown of all deals and stages.' },
    { name: 'Revenue by Vertical', sub: 'Revenue analysis across all industries.' },
    { name: 'Sales Rep Performance', sub: 'Detailed metrics for each team member.' },
    { name: 'Quote Conversion', sub: 'Analysis of quote-to-closed-won rates.' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Export Reports</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Download comprehensive data summaries</p>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted hover:border-primary/20 transition-all group">
             <div className="p-2.5 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <FileText className="w-4 h-4" />
             </div>
             <div className="flex flex-col flex-1">
                <span className="text-[13px] font-bold text-foreground">{r.name}</span>
                <span className="text-[11px] text-muted-foreground font-medium">{r.sub}</span>
             </div>
             <div className="flex items-center gap-2">
                {['CSV', 'Excel', 'PDF'].map(ext => (
                   <Button 
                     key={ext}
                     variant="outline" 
                     className="px-2 py-1 h-7 text-[10px] font-bold uppercase tracking-wider border-border text-muted-foreground hover:bg-background hover:text-primary hover:border-primary/30 active:scale-95 transition-all"
                   >
                     {ext}
                   </Button>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
