import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Copy, Check } from 'lucide-react';

interface Props {
  tips: string[];
  hashtags: string[];
  optimizedCopy: string;
  t: (key: string) => string;
}

export default function ResultsPanel({ tips, hashtags, optimizedCopy, t }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  if (tips.length === 0 && hashtags.length === 0) return null;

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.35,ease:'easeOut'}}
      className="space-y-4">
      {/* Tips */}
      {tips.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-rose-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('ctrTip')}</h3>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <motion.li key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{duration:0.3,delay:0.4 + i * 0.08}}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 flex-shrink-0">▸</span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-rose-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
          <h3 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{t('hashtags')}</h3>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, i) => (
              <motion.span key={tag} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.3,delay:0.5 + i * 0.08}}
                className="inline-block px-3 py-1.5 rounded-lg text-sm font-medium cursor-default"
                style={{ backgroundColor: '#f43f5e' + '15', color: '#f43f5e' }}>
                #{tag}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Optimized Copy */}
      {optimizedCopy && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-rose-200/30 dark:shadow-black/20 p-5 border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('copyResult')}</h3>
            <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.95}} onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: copied ? '#22c55e' + '15' : '#f43f5e' + '10', color: copied ? '#16a34a' : '#e11d48' }}>
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t('copySuccess') : t('copyBtn')}
            </motion.button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 leading-relaxed border border-gray-100 dark:border-gray-700/30">
            {optimizedCopy}
          </pre>
        </div>
      )}
    </motion.div>
  );
}
