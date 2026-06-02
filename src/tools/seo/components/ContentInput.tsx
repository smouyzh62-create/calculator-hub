import { motion } from 'framer-motion';
import { Globe, FileText } from 'lucide-react';
import { getPlatforms } from '../utils/analyzer';

interface Props {
  text: string;
  onTextChange: (v: string) => void;
  platform: string;
  onPlatformChange: (v: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
  t: (key: string) => string;
  theme: string;
}

export default function ContentInput({ text, onTextChange, platform, onPlatformChange, onAnalyze, analyzing, t, theme }: Props) {
  const platforms = getPlatforms();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-rose-200/30 dark:shadow-black/20 p-6 border border-gray-100 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">{t('input')}</h2>
      <textarea
        value={text}
        onChange={e => onTextChange(e.target.value)}
        placeholder={t('inputPlaceholder')}
        rows={6}
        className="w-full rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 p-4 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-rose-400 transition-shadow placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="relative flex-1 sm:flex-initial">
            <select value={platform} onChange={e => onPlatformChange(e.target.value)}
              className="w-full sm:w-40 pl-8 pr-8 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer appearance-none">
              {platforms.map(p => (
                <option key={p} value={p}>{t('platforms.' + p)}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>

        <motion.button
          whileHover={{scale:1.02}} whileTap={{scale:0.97}}
          onClick={onAnalyze}
          disabled={analyzing || !text.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: analyzing ? 'linear-gradient(135deg, #f43f5e, #fb7185)' : 'linear-gradient(135deg, #e11d48, #f43f5e)',
            animation: analyzing ? 'pulse-glow 1.5s infinite' : 'none',
          }}>
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              {t('analyzing')}
            </span>
          ) : t('analyze')}
        </motion.button>
      </div>
    </div>
  );
}
