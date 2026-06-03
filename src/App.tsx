import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdsensePage from './pages/AdsensePage';
import BMIPage from './pages/BMIPage';
import CompoundPage from './pages/CompoundPage';
import HelocPage from './pages/HelocPage';
import SEOPage from './pages/SEOPage';

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const s = localStorage.getItem('hub-theme');
    return s === 'dark' || s === 'light' ? s : (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  });
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('hub-theme', theme); }, [theme]);
  const toggleTheme = useCallback(() => setTheme(p => p === 'dark' ? 'light' : 'dark'), []);

  const [locale, setLocale] = useState<'en' | 'zh'>(() => {
    const s = localStorage.getItem('hub-home-locale');
    return s === 'en' || s === 'zh' ? s : 'en';
  });
  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'zh' : 'en';
    setLocale(next);
    localStorage.setItem('hub-home-locale', next);
  }, [locale]);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} locale={locale} toggleLocale={toggleLocale}>
      <Routes>
        <Route path='/' element={<Home locale={locale} />} />
        <Route path='/ad-calculator' element={<AdsensePage />} />
        <Route path='/bmi' element={<BMIPage />} />
        <Route path='/compound' element={<CompoundPage />} />
        <Route path='/heloc' element={<HelocPage />} />
        <Route path='/seo' element={<SEOPage />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
