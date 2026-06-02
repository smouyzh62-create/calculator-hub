import { motion } from 'framer-motion';
import type { RevenueBreakdown } from '../types';

interface Props {
  label: string;
  data: RevenueBreakdown;
  color: string;
  t: (key: string) => string;
}

const periods = ['daily', 'monthly', 'yearly'] as const;

export default function ResultCard({ label, data, color, t }: Props) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: color + '30' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color }}>{label}</p>
      <div className="space-y-2">
        {periods.map(p => {
          const val = data[p];
          return (
            <div key={p} className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">{t(p)}</span>
              <motion.span
                key={`${p}-${val}`}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-base font-bold tabular-nums" style={{ color }}
              >
                ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
