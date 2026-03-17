import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiSelect: Components<Omit<Theme, 'components'>>['MuiSelect'] = {
  defaultProps: { size: 'small', variant: 'outlined' },
  styleOverrides: {
    outlined: {
      borderRadius: tokens.radiusMd,
      backgroundColor: tokens.bgPaper,
    },
  },
}

export default MuiSelect
