import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis,
  CartesianGrid
} from 'recharts';

export function OpportunitySources() {
  const data = [
    { name: 'Cold Call', value: 25, color: '#2563EB' },
    { name: 'Email', value: 18, color: '#6366F1' },
    { name: 'LinkedIn', value: 22, color: '#60A5FA' },
    { name: 'Referral', value: 15, color: '#10B981' },
    { name: 'Social Media', value: 12, color: '#EC4899' },
    { name: 'Website', value: 8, color: '#F59E0B' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Opportunity Sources</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Top performing industry lead sources</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
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
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
             <span className="text-2xl font-black text-foreground tracking-tight">1,240</span>
             <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Leads</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8">
        {data.map(s => (
          <div key={s.name} className="flex items-center gap-2 group cursor-default">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{s.name}</span>
            <span className="text-[10px] text-foreground font-bold ml-auto">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FunnelConversion() {
  const data = [
    { name: 'Created', value: 2400, color: '#10B981' },
    { name: 'Qualified', value: 1200, color: '#10B981' },
    { name: 'Pipeline', value: 600, color: '#10B981' },
    { name: 'Won', value: 145, color: '#10B981' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Funnel Conversion</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Top-to-bottom conversion efficiency</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderRadius: '12px', 
                border: '1px solid hsl(var(--border))', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                color: 'hsl(var(--foreground))'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={50} animationDuration={2000}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={1 - index * 0.2} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
