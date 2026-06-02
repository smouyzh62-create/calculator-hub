import { useState, useCallback } from 'react';
import type { Locale } from '../types';
import en from './en';
import zh from './zh';

const translations: Record<Locale, Record<string, string>> = { en, zh };

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language || navigator.languages?.[0] || 'en';
  return lang.startsWith('zh') ? 'zh' : 'en';
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale(prev => (prev === 'en' ? 'zh' : 'en'));
  }, []);

  return { locale, t, toggleLocale, setLocale };
}
