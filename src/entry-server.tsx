import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import App from './App'
import { I18nProvider } from './i18n/context'
import { getTranslations, ALL_TRANSLATIONS } from './i18n/loader'
import { fetchHomeData } from './server/fetchHomeData'
import createEmotionCache from './mui/createEmotionCache'
import theme from './theme'
import type { RenderResult } from './types'
import type { Locale } from './i18n/types'

export interface ServerSideData {
  homeData: Awaited<ReturnType<typeof fetchHomeData>>
}

export async function render(url: string, locale: Locale): Promise<RenderResult> {
  const translations = getTranslations(locale)
  const homeData = await fetchHomeData()
  const serverData: ServerSideData = { homeData }

  // Fresh Emotion cache per request — required for SSR correctness
  const cache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

  const html = renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StaticRouter location={url}>
          <I18nProvider locale={locale} translations={translations} allTranslations={ALL_TRANSLATIONS}>
            <App serverData={serverData} />
          </I18nProvider>
        </StaticRouter>
      </ThemeProvider>
    </CacheProvider>
  )

  // Extract all Emotion CSS generated during renderToString
  // and inject as <style> tags — this is what eliminates the FOUC
  const emotionChunks    = extractCriticalToChunks(html)
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks)

  const head = `${emotionStyleTags}
    <script>
      window.__I18N__ = ${JSON.stringify({ locale, translations, allTranslations: ALL_TRANSLATIONS })};
      window.__SERVER_DATA__ = ${JSON.stringify(serverData)};
    </script>`

  return { html, head }
}
