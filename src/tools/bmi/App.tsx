import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import Header from './components/Header';
import SliderInput from './components/SliderInput';
import BMIGauge from './components/BMIGauge';
import CalorieCard from './components/CalorieCard';
import { calculateBMI } from './utils/calculations';
import { useTheme } from './hooks/useTheme';
import { useTranslation } from './i18n';
import type { BMIInputs, Gender, ActivityLevel, UnitSystem } from './types';

const DEFAULTS: BMIInputs = { weight: 70, height: 175, age: 30, gender: 'male', activity: 'moderate', unit: 'metric' };

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLocale, locale } = useTranslation();
  const [inputs, setInputs] = useState<BMIInputs>(DEFAULTS);
  const results = useMemo(() => calculateBMI(inputs), [inputs.weight, inputs.height, inputs.age, inputs.gender, inputs.activity, inputs.unit]);

  const isMetric = inputs.unit === 'metric';
  const weightLabel = isMetric ? t('kg') : t('lb');
  const heightLabel = isMetric ? t('cm') : t('inches');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Header theme={theme} toggleTheme={toggleTheme} t={t} locale={locale} toggleLocale={toggleLocale} />

        {/* BMI Result */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.1}} className="mb-6">
          <BMIGauge bmi={results.bmi} category={results.category} t={t} healthyMin={results.healthyRangeMin} healthyMax={results.healthyRangeMax} unit={isMetric ? t('kg') : t('lb')} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Controls */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-200/30 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inputs</h2>
                <div className="flex items-center gap-2">
                  {/* Unit Toggle */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
                    {(['metric','imperial'] as UnitSystem[]).map(u => (
                      <button key={u} onClick={() => setInputs(p => ({...p, unit: u}))}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${inputs.unit === u ? 'bg-white dark:bg-gray-600 shadow-sm font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>{t(u)}</button>
                    ))}
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={() => setInputs(DEFAULTS)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">{t('reset')}</motion.button>
                </div>
              </div>

              <SliderInput label={t('weight') + ' (' + weightLabel + ')'} value={inputs.weight} min={isMetric ? 20 : 44} max={isMetric ? 250 : 550} step={isMetric ? 0.5 : 1}
                formatValue={v => v.toFixed(1)} onChange={v => setInputs(p => ({...p, weight: v}))} theme={theme} />
              <SliderInput label={t('height') + ' (' + heightLabel + ')'} value={inputs.height} min={isMetric ? 100 : 39} max={isMetric ? 250 : 98} step={isMetric ? 0.5 : 0.5}
                formatValue={v => v.toFixed(1)} onChange={v => setInputs(p => ({...p, height: v}))} theme={theme} />
              <SliderInput label={t('age') + ' (' + t('years') + ')'} value={inputs.age} min={10} max={100} step={1}
                onChange={v => setInputs(p => ({...p, age: v}))} theme={theme} />

              {/* Gender */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('gender')}</label>
                <div className="flex gap-2">
                  {(['male','female'] as Gender[]).map(g => (
                    <button key={g} onClick={() => setInputs(p => ({...p, gender: g}))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${inputs.gender === g
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-700'
                        : 'bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {g === 'male' ? '♂ ' : '♀ '}{t(g)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('activity')}</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={inputs.activity} onChange={e => setInputs(p => ({...p, activity: e.target.value as ActivityLevel}))}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer">
                    {(['sedentary','light','moderate','heavy','athlete'] as ActivityLevel[]).map(a => (
                      <option key={a} value={a}>{t(a)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* BMR + TDEE */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.5,delay:0.2,ease:'easeOut'}}
              className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{t('bmr')}</p>
                <motion.p key={results.bmr} initial={{opacity:0.5,y:-4}} animate={{opacity:1,y:0}} transition={{duration:0.3,ease:'easeOut'}} className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{results.bmr.toLocaleString()}</motion.p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{t('calories')}/{t('daily')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{t('tdee')}</p>
                <motion.p key={results.tdee} initial={{opacity:0.5,y:-4}} animate={{opacity:1,y:0}} transition={{duration:0.3,ease:'easeOut'}} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{results.tdee.toLocaleString()}</motion.p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{t('calories')}/{t('daily')}</p>
              </div>
            </motion.div>

            {/* Three calorie cards */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.3,ease:'easeOut'}} className="grid grid-cols-3 gap-3">
              <CalorieCard label={t('cut')} desc={t('cutDesc')} calories={results.cutCalories} color="#f97316" t={t} />
              <CalorieCard label={t('maintain')} desc={t('maintainDesc')} calories={results.maintainCalories} color="#22c55e" t={t} />
              <CalorieCard label={t('bulk')} desc={t('bulkDesc')} calories={results.bulkCalories} color="#6366f1" t={t} />
            </motion.div>
          </div>
        </div>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6,duration:0.4}} className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 max-w-lg mx-auto leading-relaxed">{t('disclaimer')}</motion.p>
      </div>
    </div>
  );
}
