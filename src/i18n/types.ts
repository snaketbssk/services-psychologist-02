export type Locale = 'en' | 'es' | 'fr'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'fr']
export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: '🇬🇧 English',
  es: '🇪🇸 Español',
  fr: '🇫🇷 Français',
}

interface TitleDesc { title: string; description: string }
interface StatItem   { value: string; label: string }
interface StepItem   { title: string; description: string }
interface BlogPost   { day: string; month: string; category: string; title: string }
interface TestItem   { author: string; role: string; quote: string }

export interface Translations {
  nav:    { home: string; about: string; posts: string }
  home: {
    title: string; titleHighlight: string; subtitle: string; description: string
    counter: { title: string; description: string; button: string }
    features: { rolldown: TitleDesc; ssr: TitleDesc; typescript: TitleDesc; i18n: TitleDesc }
  }
  about: {
    title: string; lead: string
    structure: { title: string }
    flow:      { title: string }
    i18n: { title: string; step1: string; step2: string; step3: string; step4: string; step5: string }
  }
  posts: {
    title: string; lead: string; searchPlaceholder: string
    sort:  { label: string; newest: string; az: string }
    all: string; readMore: string; empty: string; minRead: string
  }
  notFound: { code: string; title: string; description: string; back: string }
  footer: string

  // ── Sections ──────────────────────────────────────────────────────────────
  services: {
    eyebrow: string; title: string; subtitle: string; cta: string; readMore: string
    items: {
      individual: TitleDesc; family: TitleDesc; couples: TitleDesc
      group: TitleDesc; adolescent: TitleDesc; trauma: TitleDesc
    }
  }
  process: {
    eyebrow: string; title: string; subtitle: string
    steps: { step1: StepItem; step2: StepItem; step3: StepItem; step4: StepItem }
  }
  testimonials: {
    eyebrow: string; title: string; subtitle: string; readMore: string
    stats: { experience: StatItem; customers: StatItem; projects: StatItem; awards: StatItem }
    items: { t1: TestItem; t2: TestItem; t3: TestItem }
  }
  blog: {
    eyebrow: string; title: string; subtitle: string
    posts: { p1: BlogPost; p2: BlogPost; p3: BlogPost; p4: BlogPost }
  }
  consultation: {
    eyebrow: string; title: string; description: string; formTitle: string
    fields:  { name: string; email: string; phone: string; service: string; message: string }
    submit: string; successTitle: string; successMessage: string; openMap: string
    contact: { email: string; phone: string; address: string }
    services: string[]
  }
}
