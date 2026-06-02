import { motion } from 'framer-motion';
import type { ScoreDimension } from '../types';

interface Props { dimensions: ScoreDimension[]; t: (key: string) => string; }

const DIM_ICONS: Record<string, string> = {
  appeal: '🎯',
  tone: '🎵',
  keywords: '🔑',
  cta: '📢',
};

export default function ScoreBreakdown({ dimensions, t }: Props) {
  if (dimensions.length === 0) return null;

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.25,ease:'easeOut'}}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-rose-200/30 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50">
      <h3 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">{t('howToImprove')}</h3>
      <div className="space-y-4">
        {dimensions.map((dim, idx) => {
          const barColor = dim.score >= 75 ? '#22c55e' : dim.score >= 50 ? '#f59e0b' : '#ef4444';
          return (
            <motion.div key={dim.label} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{duration:0.3,delay:0.3 + idx * 0.1}}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{DIM_ICONS[dim.label] || '📊'}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t(dim.label)}</span>
                </div>
                <motion.span key={dim.score} initial={{opacity:0}} animate={{opacity:1}}
                  className="text-sm font-bold tabular-nums" style={{ color: barColor }}>{dim.score}</motion.span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full transition-colors" style={{ backgroundColor: barColor }}
                  initial={{width:0}} animate={{width: dim.score + '%'}} transition={{duration:0.6,delay:0.4 + idx * 0.1,ease:'easeOut'}} />
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">{t('dimension_' + dim.label)}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
