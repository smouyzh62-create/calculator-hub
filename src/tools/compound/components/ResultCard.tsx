import { motion } from 'framer-motion';
import type { CompoundResults } from '../types';

interface Props {
  results: CompoundResults;
  t: (key: string) => string;
}

export default function ResultCard({ results, t }: Props) {
  const { finalTotal, totalPrincipal, totalInterest } = results;
  const profitPercent = totalPrincipal > 0 ? ((finalTotal - totalPrincipal) / totalPrincipal) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Value — largest */}
      <motion.div
        layout
        className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg col-span-1 sm:col-span-3"
      >
        <p className="text-xs text-blue-100 uppercase tracking-wider mb-1">{t('totalValue')}</p>
        <motion.p
          key={`final-${finalTotal}`}
          initial={{ opacity: 0.5, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold tabular-nums"
        >
          ${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </motion.p>
        <p className="text-xs text-blue-200 mt-1">
          {t('totalPrincipal')}: ${totalPrincipal.toLocaleString()} &middot;
          +{profitPercent.toFixed(1)}%
        </p>
      </motion.div>

      {/* Total Principal */}
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('totalPrincipal')}</p>
        <motion.p
          key={`principal-${totalPrincipal}`}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-xl font-bold text-gray-900 dark:text-white tabular-nums"
        >
          ${totalPrincipal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </motion.p>
      </div>

      {/* Total Interest */}
      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4 border border-emerald-100 dark:border-emerald-800/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('totalInterest')}</p>
        <motion.p
          key={`interest-${totalInterest}`}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums"
        >
          ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </motion.p>
      </div>

      {/* Return percentage */}
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Return</p>
        <motion.p
          key={`return-${profitPercent}`}
          initial={{ opacity: 0.5, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-xl font-bold text-gray-900 dark:text-white tabular-nums"
        >
          +{profitPercent.toFixed(1)}%
        </motion.p>
      </div>
    </div>
  );
}
