import type { PaletteOptions } from '@mui/material/styles'
import { tokens } from './tokens'

const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main:         tokens.primary,
    dark:         tokens.primaryDark,
    light:        tokens.primaryLight,
    contrastText: tokens.primaryContrast,
  },
  secondary: {
    main:         tokens.secondary,
    contrastText: tokens.secondaryContrast,
  },
  background: {
    default: tokens.bgDefault,
    paper:   tokens.bgPaper,
  },
  text: {
    primary:   tokens.textPrimary,
    secondary: tokens.textSecondary,
  },
  divider: tokens.divider,
  success: { main: tokens.success, contrastText: tokens.successContrast },
  error:   { main: tokens.error,   contrastText: tokens.errorContrast   },
  warning: { main: tokens.warning, contrastText: tokens.warningContrast },
  info:    { main: tokens.info,    contrastText: tokens.infoContrast    },
}

export default palette
