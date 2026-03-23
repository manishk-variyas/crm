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
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '14px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
