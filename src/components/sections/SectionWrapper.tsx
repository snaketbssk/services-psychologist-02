import { JSX, ReactNode } from 'react'
import Box from '@mui/material/Box'

interface SectionWrapperProps {
  children: ReactNode
  bgcolor?: 'background.default' | 'background.paper'
  py?: number | object
}

export default function SectionWrapper({
  children,
  bgcolor = 'background.default',
  py = { xs: 6, sm: 8, md: 12 },
}: SectionWrapperProps): JSX.Element {
  return (
    <Box component="section" sx={{ bgcolor, py, width: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
    </Box>
  )
}
