import { JSX } from 'react'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Locale, Translations } from './types'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './types'

interface I18nContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  locale: Locale
  translations: Translations
  allTranslations: Record<Locale, Translations>
  children: ReactNode
}

export function I18nProvider({ locale: initialLocale, translations: initialT, allTranslations, children }: I18nProviderProps): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [t, setT] = useState<Translations>(initialT)

  const setLocale = useCallback((next: Locale) => {
    if (!SUPPORTED_LOCALES.includes(next)) return
    setLocaleState(next)
    setT(allTranslations[next])
    // Persist preference in cookie so server can pick it up on next request
    document.cookie = `locale=${next};path=/;max-age=31536000`
  }, [allTranslations])

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

/** Replaces {{key}} placeholders in a translation string */
export function interpolate(str: string, vars: Record<string, string | number>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ''))
}
