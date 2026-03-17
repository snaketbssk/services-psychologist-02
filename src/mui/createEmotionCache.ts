import createCache from '@emotion/cache'

// key: 'css' + prepend: true ensures MUI styles are injected at the top
// of <head>, before any other styles, preventing specificity issues.
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}
