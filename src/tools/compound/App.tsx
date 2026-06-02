import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

import Header from './components/Header';
import SliderInput from './components/SliderInput';
import GrowthChart from './components/GrowthChart';
import ResultCard from './components/ResultCard';
import YearlyBreakdown from './components/YearlyBreakdown';

import { calculateCompound, formatCurrency } from './utils/calculations';
import { useTheme } from './hooks/useTheme';
import { detectLocale, t as translate } from './i18n';
import type { CompoundInputs, Locale } from './types';

const DEFAULTS: CompoundInputs = {
  initialInvestment: 10000,
  monthlyContribution: 1000,
  annualReturn: 8,
  timeHorizon: 20,
};

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [locale, setLocale] = useState<Locale>(detectLocale);
  const [inputs, setInputs] = useState<CompoundInputs>(DEFAULTS);

  const results = useMemo(() => calculateCompound(inputs), [inputs.initialInvestment, inputs.monthlyContribution, inputs.annualReturn, inputs.timeHorizon]);
  const t = (key: string) => translate(key, locale);

  useEffect(() => { setLocale(detectLocale()); }, []);

  const handleReset = () => setInputs(DEFAULTS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Header theme={theme} toggleTheme={toggleTheme} t={t} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Left: Controls */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('controls')}
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
                label={t('initialInvestment')}
                value={inputs.initialInvestment}
                min={0} max={1000000} step={1000}
                formatValue={v => formatCurrency(v)}
                onChange={v => setInputs(p => ({ ...p, initialInvestment: v }))}
                theme={theme}
              />

              <SliderInput
                label={t('monthlyContribution')}
                value={inputs.monthlyContribution}
                min={0} max={50000} step={100}
                formatValue={v => formatCurrency(v)}
                onChange={v => setInputs(p => ({ ...p, monthlyContribution: v }))}
                theme={theme}
              />

              <SliderInput
                label={t('annualReturn')}
                value={inputs.annualReturn}
                min={0} max={30} step={0.5}
                suffix="%"
                onChange={v => setInputs(p => ({ ...p, annualReturn: v }))}
                theme={theme}
              />

              <SliderInput
                label={t('timeHorizon')}
                value={inputs.timeHorizon}
                min={1} max={50} step={1}
                suffix={` ${t('years')}`}
                onChange={v => setInputs(p => ({ ...p, timeHorizon: v }))}
                theme={theme}
              />
            </div>
          </div>

          {/* Right: Chart + Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50"
            >
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {t('growthChart')}
              </h2>
              <GrowthChart data={results.yearlyData} theme={theme} t={t} />
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <ResultCard results={results} t={t} />
            </motion.div>

            {/* Yearly Breakdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <YearlyBreakdown data={results.yearlyData} t={t} />
            </motion.div>
          </div>
        </motion.div>

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
