import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  height?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
}

export function DonutChart({ 
  data, 
  height = 300,
  innerRadius = "60%",
  outerRadius = "80%"
}: DonutChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderRadius: '12px', 
              border: '1px solid hsl(var(--border))', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
              color: 'hsl(var(--foreground))'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
