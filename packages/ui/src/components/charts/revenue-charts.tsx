import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export function RevenueTrend() {
  const data = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 38000 },
    { name: 'Mar', value: 42000 },
    { name: 'Apr', value: 58000 },
    { name: 'May', value: 48000 },
    { name: 'Jun', value: 65000 },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Monthly revenue breakdown</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderRadius: '12px', 
                border: '1px solid hsl(var(--border))', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 700 }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#4F46E5" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RevenueByVertical() {
  const data = [
    { name: 'Banking', value: 124000, color: '#4F46E5' },
    { name: 'Healthcare', value: 96000, color: '#3B82F6' },
    { name: 'Retail', value: 64000, color: '#10B981' },
    { name: 'Manufacturing', value: 82000, color: '#F59E0B' },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Revenue by Vertical</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Top performing industries</p>
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
              tickFormatter={(value) => `$${value/1000}k`}
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
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
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
