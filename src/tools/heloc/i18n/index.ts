import en from './en';
import zh from './zh';
import type { Locale } from '../types';

const translations: Record<Locale, Record<string, string>> = { en, zh };

/**
 * Get the user's preferred language from the browser.
 */
export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language || navigator.languages?.[0] || 'en';
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

/**
 * Simple translation function.
 */
export function t(key: string, locale: Locale): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
