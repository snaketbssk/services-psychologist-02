import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./App";
import { I18nProvider } from "./i18n/context";
import { ALL_TRANSLATIONS, getTranslations } from "./i18n/loader";
import createEmotionCache from "./mui/createEmotionCache";
import { fetchHomeData } from "./server/fetchHomeData";
import theme from "./theme";

import type { Locale } from "./i18n/types";
import type { RenderResult } from "./types";

export interface ServerSideData {
  homeData: Awaited<ReturnType<typeof fetchHomeData>>;
}

export async function render(
  url: string,
  locale: Locale,
): Promise<RenderResult> {
  const translations = getTranslations(locale);
  const homeData = await fetchHomeData();

  const serverData: ServerSideData = { homeData };

  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const app = (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StaticRouter location={url}>
          <I18nProvider
            locale={locale}
            translations={translations}
            allTranslations={ALL_TRANSLATIONS}
          >
            <App serverData={serverData} />
          </I18nProvider>
        </StaticRouter>
      </ThemeProvider>
    </CacheProvider>
  );

  const html = renderToString(app);

  const emotionChunks = extractCriticalToChunks(html);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

  const head = `
${emotionStyleTags}
<script>
window.__I18N__ = ${JSON.stringify({
    locale,
    translations,
    allTranslations: ALL_TRANSLATIONS,
  })};
window.__SERVER_DATA__ = ${JSON.stringify(serverData)};
</script>
`;

  return { html, head };
}
