import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiLink: Components<Omit<Theme, 'components'>>['MuiLink'] = {
  defaultProps: { underline: 'hover' },
  styleOverrides: {
    root: { color: tokens.primary },
  },
}

export default MuiLink
