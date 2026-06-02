import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { YearlyData } from '../types';
import type { Theme } from '../types';

interface Props {
  data: YearlyData[];
  theme: Theme;
  t: (key: string) => string;
}

export default function GrowthChart({ data, theme, t }: Props) {
  const isDark = theme === 'dark';

  const chartData = useMemo(() =>
    data.map(d => ({
      year: d.year,
      [t('principalLabel')]: d.totalPrincipal,
      [t('interestLabel')]: d.totalInterest,
    })),
    [data, t]
  );

  return (
    <div className="w-full" style={{ height: 360 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="principalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#334155' : '#e2e8f0'}
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
            label={{ value: t('year'), position: 'insideBottom', offset: -4, fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontSize: '13px',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            labelFormatter={(year) => `${t('year')} ${year}`}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '8px' }}
          />
          <Area
            type="monotone"
            dataKey={t('interestLabel')}
            stackId="1"
            stroke="#22c55e"
            fill="url(#interestGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey={t('principalLabel')}
            stackId="1"
            stroke="#3b82f6"
            fill="url(#principalGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
