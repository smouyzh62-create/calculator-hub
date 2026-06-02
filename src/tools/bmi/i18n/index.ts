import { useState, useCallback } from 'react';
import type { Locale } from '../types';
import en from './en';
import zh from './zh';

const dict: Record<Locale, Record<string,string>> = { en, zh };

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  return (navigator.language || '').startsWith('zh') ? 'zh' : 'en';
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(detectLocale);
  const t = useCallback((key: string): string => dict[locale]?.[key] ?? dict.en[key] ?? key, [locale]);
  const toggleLocale = useCallback(() => setLocale(p => (p === 'en' ? 'zh' : 'en')), []);
  return { locale, t, toggleLocale, setLocale };
}
