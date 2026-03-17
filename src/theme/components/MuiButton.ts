import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiButton: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: tokens.radiusMd,
    },
    containedPrimary: {
      '&:hover': { backgroundColor: tokens.primaryDark },
    },
    outlinedPrimary: {
      borderColor: tokens.border,
      '&:hover': {
        backgroundColor: tokens.secondary100,
        borderColor: tokens.primary,
      },
    },
  },
}

export default MuiButton
