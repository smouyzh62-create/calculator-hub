import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

import Header from './components/Header';
import SliderInput from './components/SliderInput';
import EquityGauge from './components/EquityGauge';
import ResultPanel from './components/ResultPanel';

import { calculateHeloc } from './utils/calculations';
import { formatCurrency } from './utils/formatters';
import { useTheme } from './hooks/useTheme';
import { detectLocale, t as translate } from './i18n';
import type { HelocInputs, Locale } from './types';

// Default values
const DEFAULT_HOME_VALUE = 450000;
const DEFAULT_BALANCE = 250000;
const DEFAULT_MAX_LTV = 80;

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [locale, setLocale] = useState<Locale>(detectLocale);
  const [inputs, setInputs] = useState<HelocInputs>({
    homeValue: DEFAULT_HOME_VALUE,
    currentBalance: DEFAULT_BALANCE,
    maxLtv: DEFAULT_MAX_LTV,
  });

  // Memoized results — calculation is pure
  const results = useMemo(() => calculateHeloc(inputs), [inputs.homeValue, inputs.currentBalance, inputs.maxLtv]);

  // Translation helper bound to current locale
  const t = (key: string) => translate(key, locale);

  // Re-detect locale on mount
  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const handleReset = () => {
    setInputs({ homeValue: DEFAULT_HOME_VALUE, currentBalance: DEFAULT_BALANCE, maxLtv: DEFAULT_MAX_LTV });
  };

  const formatUSD = (v: number) => formatCurrency(v);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <Header theme={theme} toggleTheme={toggleTheme} t={t} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Left: Sliders */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('valueLabel')}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReset}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('reset')}
                </motion.button>
              </div>

              <SliderInput
                label={t('homeValue')}
                value={inputs.homeValue}
                min={50000}
                max={2000000}
                step={5000}
                formatValue={formatUSD}
                onChange={(v) => setInputs(prev => ({ ...prev, homeValue: v }))}
                theme={theme}
              />

              <SliderInput
                label={t('currentBalance')}
                value={inputs.currentBalance}
                min={0}
                max={inputs.homeValue}
                step={5000}
                formatValue={formatUSD}
                onChange={(v) => setInputs(prev => ({ ...prev, currentBalance: v }))}
                theme={theme}
              />

              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('maxLtv')}
                  </label>
                  <motion.span
                    key={inputs.maxLtv}
                    initial={{ opacity: 0.5, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums"
                  >
                    {inputs.maxLtv}%
                  </motion.span>
                </div>
                <div className="relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 rounded-full"
                    style={{ backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 rounded-full transition-all duration-150"
                    style={{
                      width: `${((inputs.maxLtv - 50) / 50) * 100}%`,
                      backgroundColor: 'var(--color-primary-light)',
                    }}
                  />
                  <input
                    type="range"
                    value={inputs.maxLtv}
                    min={50}
                    max={100}
                    step={1}
                    onChange={e => setInputs(prev => ({ ...prev, maxLtv: Number(e.target.value) }))}
                    className="relative w-full bg-transparent cursor-pointer z-10"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1 px-0.5">
                  <span>50%</span>
                  <span>100%</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('maxLtvHint')}</p>
              </div>
            </div>
          </div>

          {/* Center / Right: Visual & Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50"
            >
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {t('percentage')}
              </h2>
              <EquityGauge results={results} t={t} />
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <ResultPanel results={results} t={t} />
            </motion.div>
          </div>
        </motion.div>

        {/* Footer disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 max-w-lg mx-auto leading-relaxed"
        >
          {t('disclaimer')}
        </motion.p>
      </div>
    </div>
  );
}
