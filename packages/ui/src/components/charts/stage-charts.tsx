import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';

export function DealsByStage() {
  const data = [
    { name: 'Prospecting', value: 38, color: '#2563EB' },
    { name: 'Qualification', value: 24, color: '#6366F1' },
    { name: 'Proposal', value: 16, color: '#10B981' },
    { name: 'Negotiation', value: 12, color: '#F59E0B' },
    { name: 'Closed Won', value: 8, color: '#F43F5E' },
    { name: 'Closed Lost', value: 4, color: '#94A3B8' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Deals by Stage</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Deal distribution across the funnel</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} 
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderRadius: '12px', 
                border: '1px solid hsl(var(--border))', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 700 }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PipelineByStage() {
  const data = [
    { name: 'Qualification', value: 1200000, color: '#6366F1' },
    { name: 'Proposal', value: 1800000, color: '#6366F1' },
    { name: 'Negotiation', value: 2500000, color: '#6366F1' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Pipeline Value by Stage</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Total value in each pipeline stage</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
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
              tickFormatter={(value) => `$${value/1000000}M`}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderRadius: '12px', 
                border: '1px solid hsl(var(--border))', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 700 }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Pipeline Value']}
            />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]} 
              barSize={60} 
              fill="#6366F1"
              fillOpacity={0.8}
              stroke="#6366F1"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
