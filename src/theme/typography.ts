import type { TypographyVariantsOptions } from '@mui/material/styles'
import { tokens } from './tokens'

const typography: TypographyVariantsOptions = {
  fontFamily: tokens.fontFamily,
  h1: { fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 },
  h2: { fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1  },
  h3: { fontWeight: 700, letterSpacing: '-0.02em'                   },
  h4: { fontWeight: 800, letterSpacing: '-0.02em'                   },
  h5: { fontWeight: 700, letterSpacing: '-0.01em'                   },
  h6: { fontWeight: 600                                             },
  subtitle1: { fontWeight: 600, lineHeight: 1.4 },
  subtitle2: { fontWeight: 600, lineHeight: 1.4 },
  body1:     { lineHeight: 1.6 },
  body2:     { lineHeight: 1.6 },
  button:    { textTransform: 'none', fontWeight: 600 },
  caption:   { lineHeight: 1.5 },
}

export default typography
