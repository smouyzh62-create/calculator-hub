import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ContentInput from './components/ContentInput';
import ScoreGauge from './components/ScoreGauge';
import ScoreBreakdown from './components/ScoreBreakdown';
import ResultsPanel from './components/ResultsPanel';
import { analyzeContent } from './utils/analyzer';
import { useTheme } from './hooks/useTheme';
import { useTranslation } from './i18n';
import type { AnalysisResult } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLocale, locale } = useTranslation();
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!text.trim()) return;
    setAnalyzing(true);
    // Simulate brief delay for UX — replace with OpenAI call later
    setTimeout(() => {
      const res = analyzeContent({ text, targetPlatform: platform });
      setResult(res);
      setAnalyzing(false);
      setHasAnalyzed(true);
    }, 600);
  }, [text, platform]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Header theme={theme} toggleTheme={toggleTheme} t={t} locale={locale} toggleLocale={toggleLocale} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Input */}
          <div className="lg:col-span-2 space-y-6">
            <ContentInput text={text} onTextChange={setText} platform={platform}
              onPlatformChange={setPlatform} onAnalyze={handleAnalyze} analyzing={analyzing} t={t} theme={theme} />

            <AnimatePresence mode="wait">
              {!hasAnalyzed && !analyzing && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="bg-white/50 dark:bg-gray-800/30 rounded-2xl p-6 border border-dashed border-gray-200 dark:border-gray-700/50">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Sparkles className="w-8 h-8 text-rose-400" />
                    <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed max-w-xs">
                      {locale === 'zh'
                        ? '粘贴你的文案，点击"分析文案"获得爆款潜力评分与优化建议'
                        : 'Paste your copy and click "Analyze Content" to get a viral potential score & optimization tips'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {hasAnalyzed && result && (
              <ScoreBreakdown dimensions={result.dimensions} t={t} />
            )}
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              {analyzing ? (
                <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div animate={{rotate:360}} transition={{repeat:Infinity,duration:1.5,ease:'linear'}}
                      className="w-16 h-16 rounded-full border-4 border-rose-200 dark:border-rose-800 border-t-rose-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('analyzing')}</p>
                  </div>
                </motion.div>
              ) : hasAnalyzed && result ? (
                <motion.div key="results" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-6">
                  <ScoreGauge score={result.overallScore} t={t} />
                  <ResultsPanel tips={result.tips} hashtags={result.hashtags} optimizedCopy={result.optimizedCopy} t={t} />
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="hidden lg:flex items-center justify-center py-20">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      {locale === 'zh'
                        ? '在左侧输入文案并点击分析，结果将显示在这里'
                        : 'Enter your copy on the left and click Analyze — results will appear here'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
