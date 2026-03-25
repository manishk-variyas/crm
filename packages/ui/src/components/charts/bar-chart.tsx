import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface BarChartProps {
  data: any[];
  xAxisKey: string;
  bars: {
    key: string;
    color: string;
    name?: string;
  }[];
  height?: number;
}

export function BarChart({ data, xAxisKey, bars, height = 300 }: BarChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 0, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 500 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 500 }}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
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
          {bars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={bar.color}
              name={bar.name || bar.key}
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
