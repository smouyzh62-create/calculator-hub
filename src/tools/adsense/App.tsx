import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SliderInput from './components/SliderInput';
import RevenueChart from './components/RevenueChart';
import ResultCard from './components/ResultCard';
import { calculateAdSense, formatCurrency } from './utils/calculations';
import { useTheme } from './hooks/useTheme';
import { useTranslation } from './i18n';
import type { AdSenseInputs } from './types';

const DEFAULTS: AdSenseInputs = { dailyPageViews: 5000, ctr: 1.5, cpc: 0.35 };

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLocale, locale } = useTranslation();
  const [inputs, setInputs] = useState<AdSenseInputs>(DEFAULTS);
  const results = useMemo(() => calculateAdSense(inputs), [inputs.dailyPageViews, inputs.ctr, inputs.cpc]);
  const dailyClicks = Math.round(inputs.dailyPageViews * (inputs.ctr / 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Header theme={theme} toggleTheme={toggleTheme} t={t} locale={locale} toggleLocale={toggleLocale} />

        {/* Summary Badge */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.1}}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm border border-blue-100 dark:border-blue-800/50">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="tabular-nums">{t('clicks')}: <strong>{dailyClicks.toLocaleString()}</strong></span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-blue-200/30 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('pageViews')}</h2>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={() => setInputs(DEFAULTS)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">{t('reset')}</motion.button>
              </div>
              <SliderInput label={t('dailyPageViews')} value={inputs.dailyPageViews} min={100} max={100000} step={100} formatValue={v => v.toLocaleString()} onChange={v => setInputs(p => ({...p, dailyPageViews: v}))} theme={theme} />
              <SliderInput label={t('ctr')} value={inputs.ctr} min={0.1} max={20} step={0.1} suffix="%" onChange={v => setInputs(p => ({...p, ctr: v}))} theme={theme} />
              <SliderInput label={t('cpc')} value={inputs.cpc} min={0.01} max={5} step={0.01} formatValue={v => formatCurrency(v)} onChange={v => setInputs(p => ({...p, cpc: v}))} theme={theme} />
            </div>
          </div>

          {/* Right: Chart + Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chart */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.5,delay:0.2,ease:'easeOut'}}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-blue-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">{t('revenueChart')}</h2>
              <RevenueChart expected={results.expected} conservative={results.conservative} optimistic={results.optimistic} theme={theme} t={t} />
            </motion.div>

            {/* Three result cards */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.3,ease:'easeOut'}}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ResultCard label={t('conservative')} data={results.conservative} color="#ea4335" t={t} />
              <ResultCard label={t('expected')} data={results.expected} color="#1a73e8" t={t} />
              <ResultCard label={t('optimistic')} data={results.optimistic} color="#34a853" t={t} />
            </motion.div>
          </div>
        </div>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6,duration:0.4}}
          className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 max-w-lg mx-auto leading-relaxed">{t('disclaimer')}</motion.p>
      </div>
    </div>
  );
}
