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
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('hub-theme') as 'light' | 'dark' | null;
    return stored === 'dark' || stored === 'light' ? stored : window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('hub-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(p => p === 'dark' ? 'light' : 'dark'), []);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
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
    </BrowserRouter>
  );
}
