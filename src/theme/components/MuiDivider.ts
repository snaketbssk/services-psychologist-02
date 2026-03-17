import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiDivider: Components<Omit<Theme, 'components'>>['MuiDivider'] = {
  styleOverrides: {
    root: { borderColor: tokens.border },
  },
}

export default MuiDivider
