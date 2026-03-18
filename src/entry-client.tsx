import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { I18nProvider } from "./i18n/context";
import { ALL_TRANSLATIONS } from "./i18n/loader";
import { DEFAULT_LOCALE } from "./i18n/types";

import type { ServerSideData } from "./entry-server";
import type { Locale, Translations } from "./i18n/types";

import App from "./App";
import createEmotionCache from "./mui/createEmotionCache";
import theme from "./theme";

import "./index.css";

const w = window as unknown as {
  __I18N__?: { locale: Locale; translations: Translations };
  __SERVER_DATA__?: ServerSideData;
};

const locale = w.__I18N__?.locale ?? DEFAULT_LOCALE;
const translations =
  w.__I18N__?.translations ?? ALL_TRANSLATIONS[DEFAULT_LOCALE];
const serverData = w.__SERVER_DATA__ ?? null;

const cache = createEmotionCache();

const container = document.getElementById("app");
if (!container) throw new Error("#app root element not found");

hydrateRoot(
  container,
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <I18nProvider
          locale={locale}
          translations={translations}
          allTranslations={ALL_TRANSLATIONS}
        >
          <App serverData={serverData} />
        </I18nProvider>
      </BrowserRouter>
    </ThemeProvider>
  </CacheProvider>,
);
