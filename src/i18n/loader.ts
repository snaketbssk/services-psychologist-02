import type { Locale, Translations } from './types'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './types'

// Static imports so Vite/Rolldown bundles all locale files
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'

export const ALL_TRANSLATIONS: Record<Locale, Translations> = {
  en: en as Translations,
  es: es as Translations,
  fr: fr as Translations,
}

export function getTranslations(locale: Locale): Translations {
  return ALL_TRANSLATIONS[locale] ?? ALL_TRANSLATIONS[DEFAULT_LOCALE]
}

/**
 * Detects locale from:
 * 1. Cookie (user preference, persisted across visits)
 * 2. Accept-Language header
 * 3. Falls back to DEFAULT_LOCALE
 */
export function detectLocale(headers: Record<string, string | string[] | undefined>): Locale {
  // 1. Cookie
  const cookieHeader = headers['cookie'] as string | undefined
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)locale=([a-z]{2})/)
    if (match) {
      const cookieLocale = match[1] as Locale
      if (SUPPORTED_LOCALES.includes(cookieLocale)) return cookieLocale
    }
  }

  // 2. Accept-Language header
  const acceptLang = headers['accept-language'] as string | undefined
  if (acceptLang) {
    const preferred = acceptLang
      .split(',')
      .map(s => s.split(';')[0].trim().slice(0, 2).toLowerCase())
    for (const lang of preferred) {
      if (SUPPORTED_LOCALES.includes(lang as Locale)) return lang as Locale
    }
  }

  return DEFAULT_LOCALE
}
