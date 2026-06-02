import en from './en';
import zh from './zh';
import type { Locale } from '../types';

const translations: Record<Locale, Record<string, string>> = { en, zh };

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language || navigator.languages?.[0] || 'en';
  return lang.startsWith('zh') ? 'zh' : 'en';
}

export function t(key: string, locale: Locale): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
