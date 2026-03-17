import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiCssBaseline: Components<Omit<Theme, 'components'>>['MuiCssBaseline'] = {
  styleOverrides: {
    '*, *::before, *::after': { boxSizing: 'border-box' },
    body: { margin: 0 },
    a: { color: tokens.primary, textDecoration: 'none' },
    'a:hover': { textDecoration: 'underline' },
    code: {
      fontFamily: tokens.fontMono,
      fontSize: '0.85em',
      background: tokens.chipBg,
      color: tokens.textPrimary,
      padding: '0.15em 0.45em',
      borderRadius: tokens.radiusSm,
    },
  },
}

export default MuiCssBaseline
