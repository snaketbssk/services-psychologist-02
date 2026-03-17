import type { Components, Theme } from '@mui/material/styles'
import { tokens } from '../tokens'

const MuiTextField: Components<Omit<Theme, 'components'>>['MuiTextField'] = {
  defaultProps: { size: 'small', variant: 'outlined' },
  styleOverrides: {
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: tokens.radiusMd,
        backgroundColor: tokens.bgPaper,
        '& fieldset': { borderColor: tokens.border },
        '&:hover fieldset': { borderColor: tokens.primary },
        '&.Mui-focused fieldset': { borderColor: tokens.primary },
      },
    },
  },
}

export default MuiTextField
