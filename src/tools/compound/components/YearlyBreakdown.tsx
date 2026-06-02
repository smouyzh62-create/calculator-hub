import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { YearlyData } from '../types';

interface Props {
  data: YearlyData[];
  t: (key: string) => string;
}

export default function YearlyBreakdown({ data, t }: Props) {
  const [open, setOpen] = useState(false);
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-sm px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-left flex items-center justify-between"
      >
        <span>{open ? t('hideBreakdown') : t('showBreakdown')}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
                    <tr className="text-left text-gray-500 dark:text-gray-400">
                      <th className="px-4 py-3 font-medium">{t('year')}</th>
                      <th className="px-4 py-3 font-medium text-right">{t('principalCol')}</th>
                      <th className="px-4 py-3 font-medium text-right">{t('interestCol')}</th>
                      <th className="px-4 py-3 font-medium text-right">{t('amount')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                    {data.map(d => (
                      <motion.tr
                        key={d.year}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: d.year * 0.015 }}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        <td className="px-4 py-2.5 font-medium">{t('year')} {d.year}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">${d.totalPrincipal.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                          ${d.totalInterest.toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-semibold">
                          ${d.totalValue.toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
