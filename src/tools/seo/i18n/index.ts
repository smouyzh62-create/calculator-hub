import { useState, useEffect, useCallback } from 'react';
import type { Locale } from '../types';
import en from './en';
import zh from './zh';

const dict: Record<Locale, Record<string, any>> = { en, zh };

export function detectLocale(): Locale {
  return 'en';
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('hub-locale') as Locale | null;
      if (stored === 'en' || stored === 'zh') setLocale(stored);
    };
    window.addEventListener('localechange', handler);
    handler();
    return () => window.removeEventListener('localechange', handler);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let val: any = dict[locale];
    for (const k of keys) { val = val?.[k]; if (val === undefined) break; }
    if (typeof val === 'string') return val;
    val = dict.en;
    for (const k of keys) { val = val?.[k]; if (val === undefined) break; }
    return typeof val === 'string' ? val : key;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'zh' : 'en';
    setLocale(next);
    localStorage.setItem('hub-locale', next);
    window.dispatchEvent(new Event('localechange'));
  }, [locale]);

  return { locale, t, toggleLocale, setLocale };
}
