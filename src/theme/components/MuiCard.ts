import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiCard: Components<Omit<Theme, 'components'>>['MuiCard'] = {
  defaultProps: { elevation: 0 },
  styleOverrides: {
    root: {
      border: `1px solid ${tokens.border}`,
      borderRadius: tokens.radiusLg,
      transition: 'border-color 0.15s ease',
    },
  },
}

export default MuiCard
