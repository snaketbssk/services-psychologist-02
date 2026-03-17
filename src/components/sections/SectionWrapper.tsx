import { JSX, ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { Breakpoint } from '@mui/material/styles'

interface SectionWrapperProps {
  children:  ReactNode
  bgcolor?:  'background.default' | 'background.paper'
  maxWidth?: Breakpoint | false
  py?:       number | object
}

export default function SectionWrapper({
  children,
  bgcolor   = 'background.default',
  maxWidth  = 'lg',
  py        = { xs: 6, sm: 8, md: 12 },
}: SectionWrapperProps): JSX.Element {
  return (
    <Box component="section" sx={{ bgcolor, py, width: '100%', boxSizing: 'border-box' }}>
      <Box
        sx={{
          maxWidth: maxWidth
            ? (theme) => theme.breakpoints.values[maxWidth]
            : undefined,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
