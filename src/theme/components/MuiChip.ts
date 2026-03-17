import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiChip: Components<Omit<Theme, 'components'>>['MuiChip'] = {
  styleOverrides: {
    root: { fontWeight: 600, borderRadius: tokens.radiusSm },
    filled: {
      backgroundColor: tokens.chipBg,
      color: tokens.chipFg,
    },
  },
}

export default MuiChip
