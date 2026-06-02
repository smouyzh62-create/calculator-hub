import { motion } from 'framer-motion';
import type { HelocResults } from '../types';

interface Props {
  results: HelocResults;
  t: (key: string) => string;
}

const colorMap = {
  success: { text: 'text-emerald-600 dark:text-emerald-400', bar: '#22c55e' },
  warning: { text: 'text-amber-600 dark:text-amber-400', bar: '#f59e0b' },
  danger: { text: 'text-red-600 dark:text-red-400', bar: '#ef4444' },
};

export default function ResultPanel({ results, t }: Props) {
  const {
    homeValue, currentBalance, availableEquity,
    currentLtvRatio, equityPercent, colorClass,
    maxBorrowingPower, helocUsagePercent, maxLtv
  } = results;
  const colors = colorMap[colorClass];

  const metricCard = (label: string, value: string, sub?: string) => (
    <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700/50">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.5, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="text-xl font-bold text-gray-900 dark:text-white tabular-nums"
      >
        {value}
      </motion.p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 break-all">{sub}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Main available-equity card */}
      <motion.div
        layout
        className={`rounded-xl p-4 border ${
          colorClass === 'success'
            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20'
            : colorClass === 'warning'
            ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20'
            : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
        }`}
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('availableEquity')}</p>
        <motion.p
          key={`equity-${availableEquity}`}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`text-2xl md:text-3xl font-bold ${colors.text} tabular-nums`}
        >
          ${availableEquity.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </motion.p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: colors.bar }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(equityPercent, 100)}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
          <span className={`text-sm font-semibold ${colors.text} tabular-nums`}>
            {equityPercent.toFixed(1)}%
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          {t('maxBorrowingPower')}: ${maxBorrowingPower.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          &nbsp;(Max LTV: {maxLtv}%)
        </p>
      </motion.div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        {metricCard(
          t('homeValue'),
          `$${(homeValue / 1000).toFixed(0)}k`,
          `$${homeValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        )}
        {metricCard(
          t('currentBalance'),
          `$${(currentBalance / 1000).toFixed(0)}k`,
          `$${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        )}
        {metricCard(t('loanToValue'), `${currentLtvRatio.toFixed(1)}%`)}
        {metricCard(t('helocUsage'), `${helocUsagePercent.toFixed(1)}%`)}
      </div>
    </div>
  );
}
