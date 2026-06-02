import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Finance', path: '/', icon: '\uD83D\uDCB0' },
  { label: 'Health', path: '/bmi', icon: '\uD83D\uDCAA' },
  { label: 'Marketing', path: '/seo', icon: '\uD83D\uDCCA' },
];

interface Props { theme: string; toggleTheme: () => void; }

export default function Navbar({ theme, toggleTheme }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const activeClass = 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400';
  const inactiveClass = 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30 group-hover:shadow-xl group-hover:scale-105 transition-all">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">CalcHub</span>
          </Link>

          {/* Nav links - desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={'px-4 py-2 rounded-xl text-sm font-medium transition-colors ' + (isHome ? activeClass : inactiveClass)}>
              All Tools
            </Link>
            {navItems.map(item => (
              <Link key={item.path} to={item.path}
                className={'px-4 py-2 rounded-xl text-sm font-medium transition-colors ' + (location.pathname === item.path ? activeClass : inactiveClass)}>
                {item.icon} {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              <Link to="/" onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                All Tools
              </Link>
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
