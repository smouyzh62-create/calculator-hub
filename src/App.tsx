import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdsensePage from './pages/AdsensePage';
import BMIPage from './pages/BMIPage';
import CompoundPage from './pages/CompoundPage';
import HelocPage from './pages/HelocPage';
import SEOPage from './pages/SEOPage';

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('hub-theme') as 'light' | 'dark' | null;
    return stored === 'dark' || stored === 'light' ? stored : window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('hub-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(p => p === 'dark' ? 'light' : 'dark'), []);

  const [locale, setLocale] = useState<'en' | 'zh'>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem('hub-locale') as 'en' | 'zh' | null;
    return stored === 'en' || stored === 'zh' ? stored : 'en';
  });
  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'zh' : 'en';
    setLocale(next);
    localStorage.setItem('hub-locale', next);
    window.dispatchEvent(new Event('localechange'));
  }, [locale]);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} locale={locale} toggleLocale={toggleLocale}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad-calculator" element={<AdsensePage />} />
        <Route path="/bmi" element={<BMIPage />} />
        <Route path="/compound" element={<CompoundPage />} />
        <Route path="/heloc" element={<HelocPage />} />
        <Route path="/seo" element={<SEOPage />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <SpeedInsights />
    </BrowserRouter>
  );
}
