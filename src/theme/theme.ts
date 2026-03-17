// ── Sand theme assembler ─────────────────────────────────────────────────────
// Combines palette, typography, and component overrides into a single
// MUI theme object. Import this via the barrel: import theme from '@/theme'

import { createTheme } from '@mui/material/styles'
import palette    from './palette'
import typography from './typography'
import components from './components'
import { tokens } from './tokens'

const theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: parseInt(tokens.radiusLg, 10),
  },
})

export default theme
