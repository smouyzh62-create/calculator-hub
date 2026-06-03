import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props { children: React.ReactNode; theme: string; toggleTheme: () => void; locale: 'en' | 'zh'; toggleLocale: () => void; }

export default function Layout({ children, theme, toggleTheme, locale, toggleLocale }: Props) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Navbar theme={theme} toggleTheme={toggleTheme} locale={locale} toggleLocale={toggleLocale} />
      <motion.main initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>{children}</motion.main>
      <Footer locale={locale} />
    </div>
  );
}
