import { useState, useCallback } from 'react';
import type { Locale } from '../types';
import en from './en';
import zh from './zh';

const dict: Record<Locale, Record<string, any>> = { en, zh };

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  return (navigator.language || '').startsWith('zh') ? 'zh' : 'en';
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(detectLocale);
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let val: any = dict[locale];
    for (const k of keys) { val = val?.[k]; if (val === undefined) break; }
    if (typeof val === 'string') return val;
    val = dict.en;
    for (const k of keys) { val = val?.[k]; if (val === undefined) break; }
    return typeof val === 'string' ? val : key;
  }, [locale]);
  const toggleLocale = useCallback(() => setLocale(p => (p === 'en' ? 'zh' : 'en')), []);
  return { locale, t, toggleLocale, setLocale };
}
