import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('bmi-theme') as Theme | null;
    return stored === 'dark' || stored === 'light' ? stored : window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('bmi-theme', theme); }, [theme]);
  const toggleTheme = useCallback(() => setThemeState(p => (p === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggleTheme };
}
