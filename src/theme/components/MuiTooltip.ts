import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiTooltip: Components<Omit<Theme, 'components'>>['MuiTooltip'] = {
  styleOverrides: {
    tooltip: {
      backgroundColor: tokens.textPrimary,
      color: tokens.bgPaper,
      fontSize: '0.75rem',
      borderRadius: tokens.radiusSm,
    },
  },
}

export default MuiTooltip
