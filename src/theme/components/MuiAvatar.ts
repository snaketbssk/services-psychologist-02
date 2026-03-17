import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiAvatar: Components<Omit<Theme, 'components'>>['MuiAvatar'] = {
  styleOverrides: {
    root: {
      backgroundColor: tokens.primary,
      color: tokens.primaryContrast,
      fontWeight: 700,
    },
  },
}

export default MuiAvatar
