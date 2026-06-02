import { motion } from 'framer-motion';
import { getBMIColor } from '../utils/calculations';

interface Props { bmi: number; category: string; t: (key: string) => string; healthyMin: number; healthyMax: number; unit: string; }

const CATEGORIES = [
  { label: 'underweight', min: 0, max: 18.5, color: '#f59e0b' },
  { label: 'healthy', min: 18.5, max: 25, color: '#22c55e' },
  { label: 'overweight', min: 25, max: 30, color: '#f97316' },
  { label: 'obese', min: 30, max: 50, color: '#ef4444' },
];

export default function BMIGauge({ bmi, category, t, healthyMin, healthyMax, unit }: Props) {
  const color = getBMIColor(category);
  const position = Math.min((bmi / 50) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('bmi')}</p>
          <motion.p key={bmi} initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.3,ease:'easeOut'}}
            className="text-4xl font-bold tabular-nums" style={{ color }}>{bmi.toFixed(1)}</motion.p>
          <p className="text-sm font-medium mt-0.5" style={{ color }}>{t(category)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 dark:text-gray-500">{t('healthyRange')}</p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 tabular-nums">{healthyMin.toFixed(0)} – {healthyMax.toFixed(0)} {unit}</p>
        </div>
      </div>

      {/* Color bar */}
      <div className="relative h-4 rounded-full overflow-hidden flex mt-2">
        {CATEGORIES.map(c => {
          const w = ((c.max - c.min) / 50) * 100;
          return <div key={c.label} className="h-full opacity-70" style={{ width: w + '%', backgroundColor: c.color }} />;
        })}
      </div>

      {/* Pointer */}
      <div className="relative h-6 mt-1" style={{ marginLeft: `calc(${position}% - 8px)` }}>
        <motion.div initial={{y:-8,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.3,delay:0.1}}
          className="w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: color }} />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 px-0.5">
        <span>0</span><span>18.5</span><span>25</span><span>30</span><span>50</span>
      </div>
    </div>
  );
}

