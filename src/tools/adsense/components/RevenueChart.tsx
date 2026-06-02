import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { RevenueBreakdown } from '../types';
import type { Theme } from '../types';

interface Props {
  expected: RevenueBreakdown;
  conservative: RevenueBreakdown;
  optimistic: RevenueBreakdown;
  theme: Theme;
  t: (key: string) => string;
}

export default function RevenueChart({ expected, conservative, optimistic, theme, t }: Props) {
  const isDark = theme === 'dark';

  const chartData = useMemo(() => [
    { name: t('daily'), expected: expected.daily, conservative: conservative.daily, optimistic: optimistic.daily },
    { name: t('monthly'), expected: expected.monthly, conservative: conservative.monthly, optimistic: optimistic.monthly },
    { name: t('yearly'), expected: expected.yearly, conservative: conservative.yearly, optimistic: optimistic.yearly },
  ], [expected, conservative, optimistic, t]);

  return (
    <div className="w-full" style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={2} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} tickLine={false} axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }} />
          <YAxis tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={v => '$' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v < 1 ? v.toFixed(2) : v.toFixed(0))} />
          <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: '8px', color: isDark ? '#f1f5f9' : '#1e293b', fontSize: '13px' }}
            formatter={(value: number) => ['$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), '']} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '6px' }} />
          <Bar dataKey="conservative" name={t('conservative')} fill="#ea4335" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expected" name={t('expected')} fill="#1a73e8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="optimistic" name={t('optimistic')} fill="#34a853" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
