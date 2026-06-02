import { motion } from 'framer-motion';
import type { HelocResults } from '../types';

interface Props {
  results: HelocResults;
  t: (key: string) => string;
}

const colorMap = {
  success: { stroke: '#22c55e', bg: '#bbf7d0', text: '#166534' },
  warning: { stroke: '#f59e0b', bg: '#fde68a', text: '#92400e' },
  danger: { stroke: '#ef4444', bg: '#fecaca', text: '#991b1b' },
};

export default function EquityGauge({ results, t }: Props) {
  const { equityPercent, helocUsagePercent, colorClass, maxBorrowingPower, currentBalance } = results;
  const colors = colorMap[colorClass];

  // SVG donut params
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // Available equity arc — positive remaining equity
  const availableOffset = circumference * (1 - equityPercent / 100);
  // Used portion arc — how much of max capacity is consumed
  const usedOffset = circumference * (1 - helocUsagePercent / 100);
  const strokeWidth = 16;

  return (
    <div className="flex flex-col items-center py-4 px-2">
      {/* Donut Chart */}
      <div className="relative w-56 h-56 md:w-64 md:h-64">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 184 184"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle — max borrowing capacity */}
          <motion.circle
            cx="92"
            cy="92"
            r={radius}
            stroke={colors.bg}
            strokeWidth={strokeWidth}
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Available equity arc (green/orange/red) */}
          <motion.circle
            cx="92"
            cy="92"
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: availableOffset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Used portion arc (inner ring, subtle) */}
          <motion.circle
            cx="92"
            cy="92"
            r={radius - strokeWidth - 6}
            stroke="#64748b"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: usedOffset }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            opacity={0.4}
          />
        </svg>

        {/* Center label — remaining equity % */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={`equity-${equityPercent}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold tabular-nums"
            style={{ color: colors.text }}
          >
            {equityPercent.toFixed(1)}%
          </motion.span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('equityPercent')}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4 w-full max-w-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.stroke }} />
          <div className="text-xs">
            <span className="text-gray-500 dark:text-gray-400">{t('availableLabel')}</span>
            <p className="font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
              ${((maxBorrowingPower - currentBalance) / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500" />
          <div className="text-xs">
            <span className="text-gray-500 dark:text-gray-400">{t('usedLabel')}</span>
            <p className="font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
              ${(currentBalance / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
