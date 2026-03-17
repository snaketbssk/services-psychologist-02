import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiPaper: Components<Omit<Theme, 'components'>>['MuiPaper'] = {
  defaultProps: { elevation: 0 },
  styleOverrides: {
    root: {
      border: `1px solid ${tokens.border}`,
      borderRadius: tokens.radiusLg,
    },
    elevation0: {
      boxShadow: 'none',
    },
  },
}

export default MuiPaper
