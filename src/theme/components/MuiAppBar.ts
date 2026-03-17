import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiAppBar: Components<Omit<Theme, 'components'>>['MuiAppBar'] = {
  defaultProps: { elevation: 0, color: 'transparent' },
  styleOverrides: {
    root: {
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${tokens.border}`,
      color: tokens.textPrimary,
    },
  },
}

export default MuiAppBar
