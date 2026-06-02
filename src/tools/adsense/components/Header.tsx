import { motion } from 'framer-motion';
import type { Theme, Locale } from '../types';

interface Props { theme: Theme; toggleTheme: () => void; t: (key: string) => string; locale: Locale; toggleLocale: () => void; }

export default function Header({ theme, toggleTheme, t, locale, toggleLocale }: Props) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <motion.h1 initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{duration:0.5,ease:'easeOut'}} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</motion.h1>
        <motion.p initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.1,ease:'easeOut'}} className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('subtitle')}</motion.p>
      </div>
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <motion.button initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.4,delay:0.15}} onClick={toggleLocale}
          className="relative w-12 h-7 rounded-full transition-colors flex items-center px-0.5" style={{backgroundColor: locale === 'en' ? '#1a73e8' : '#34a853'}}>
          <motion.div animate={{x: locale === 'en' ? 0 : 20}} transition={{type:'spring',stiffness:300,damping:20}}
            className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-[10px] font-bold" style={{color: locale === 'en' ? '#1a73e8' : '#34a853'}}>
            {locale === 'en' ? 'EN' : '中'}
          </motion.div>
        </motion.button>
        {/* Theme Toggle */}
        <motion.button initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.4,delay:0.2}} onClick={toggleTheme}
          className="relative w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors shadow-sm" aria-label={theme==='dark'?t('lightMode'):t('darkMode')}>
          <motion.svg key="s" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute text-amber-500"
            initial={false} animate={{rotate:theme==='light'?0:180,opacity:theme==='light'?1:0,scale:theme==='light'?1:0.5}} transition={{duration:0.35,ease:'easeInOut'}}>
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </motion.svg>
          <motion.svg key="m" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute text-indigo-400"
            initial={false} animate={{rotate:theme==='dark'?0:-180,opacity:theme==='dark'?1:0,scale:theme==='dark'?1:0.5}} transition={{duration:0.35,ease:'easeInOut'}}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </motion.svg>
        </motion.button>
      </div>
    </header>
  );
}
