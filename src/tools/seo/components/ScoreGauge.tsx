import { motion } from 'framer-motion';
import { getScoreLevel } from '../utils/analyzer';

interface Props { score: number; t: (key: string) => string; }

export default function ScoreGauge({ score, t }: Props) {
  const level = getScoreLevel(score);
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const levelColors: Record<string, { base: string; light: string; text: string }> = {
    poor: { base: '#ef4444', light: '#fecaca', text: '#dc2626' },
    fair: { base: '#f59e0b', light: '#fde68a', text: '#d97706' },
    good: { base: '#22c55e', light: '#bbf7d0', text: '#16a34a' },
    excellent: { base: '#6366f1', light: '#c7d2fe', text: '#4f46e5' },
  };

  const c = levelColors[level] || levelColors.poor;
  const levelLabel = t('score' + level.charAt(0).toUpperCase() + level.slice(1));

  return (
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.5,delay:0.15,ease:'easeOut'}}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-rose-200/30 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50 flex flex-col items-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">{t('overallScore')}</p>
      <div className="relative">
        <svg width="180" height="180" className="-rotate-90">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="currentColor" strokeWidth="10"
            className="text-gray-100 dark:text-gray-700" />
          <motion.circle cx="90" cy="90" r={radius} fill="none" stroke={c.base} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{strokeDashoffset: circumference}}
            animate={{strokeDashoffset: offset}} transition={{duration: 1, ease: 'easeOut', delay: 0.3}} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span key={score} initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} transition={{duration:0.4,delay:0.5}}
            className="text-5xl font-bold tabular-nums" style={{ color: c.base }}>
            {score}
          </motion.span>
          <span className="text-[10px] text-gray-400 mt-0.5">/ 100</span>
        </div>
      </div>
      <motion.span key={levelLabel} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3,delay:0.6}}
        className="mt-3 text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: c.light, color: c.text }}>
        {levelLabel}
      </motion.span>
    </motion.div>
  );
}
