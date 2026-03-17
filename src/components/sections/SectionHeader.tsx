import { JSX } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  action?: JSX.Element
}

export default function SectionHeader({
  eyebrow, title, subtitle, align = 'center', action,
}: SectionHeaderProps): JSX.Element {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: align === 'center' ? 'column' : { xs: 'column', md: 'row' },
      alignItems: align === 'center' ? 'center' : 'flex-start',
      justifyContent: 'space-between',
      textAlign: align,
      gap: { xs: 1.5, md: 2 },
      mb: { xs: 4, md: 6 },
    }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="overline"
          sx={{ color: 'text.secondary', letterSpacing: '0.12em', fontSize: '0.68rem', fontWeight: 700 }}>
          {eyebrow}
        </Typography>
        <Typography variant="h3" fontWeight={700} color="text.primary"
          sx={{ mt: 0.75, mb: subtitle ? 1 : 0, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary"
            sx={{ maxWidth: align === 'center' ? 500 : undefined, mx: align === 'center' ? 'auto' : undefined,
              fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && (
        <Box sx={{ flexShrink: 0, mt: { xs: 0.5, md: align === 'left' ? 0.5 : 0 }, alignSelf: { xs: 'flex-start', md: 'center' } }}>
          {action}
        </Box>
      )}
    </Box>
  )
}
