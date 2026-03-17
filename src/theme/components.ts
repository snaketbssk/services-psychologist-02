// ── Component overrides barrel ───────────────────────────────────────────────
// Each MUI component has its own file in ./components/.
// Add a new override by creating a file there and importing it here.

import type { Components, Theme } from '@mui/material/styles'
import MuiAppBar      from './components/MuiAppBar'
import MuiAvatar      from './components/MuiAvatar'
import MuiButton      from './components/MuiButton'
import MuiCard        from './components/MuiCard'
import MuiChip        from './components/MuiChip'
import MuiCssBaseline from './components/MuiCssBaseline'
import MuiDivider     from './components/MuiDivider'
import MuiLink        from './components/MuiLink'
import MuiPaper       from './components/MuiPaper'
import MuiSelect      from './components/MuiSelect'
import MuiTextField   from './components/MuiTextField'
import MuiTooltip     from './components/MuiTooltip'

const components: Components<Omit<Theme, 'components'>> = {
  MuiAppBar,
  MuiAvatar,
  MuiButton,
  MuiCard,
  MuiChip,
  MuiCssBaseline,
  MuiDivider,
  MuiLink,
  MuiPaper,
  MuiSelect,
  MuiTextField,
  MuiTooltip,
}

export default components
