import { JSX } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './SectionHeader'
import { useI18n } from '../../i18n/context'

export default function ProcessSection(): JSX.Element {
  const { t } = useI18n()
  const steps = [
    { number: 1, ...t.process.steps.step1 },
    { number: 2, ...t.process.steps.step2 },
    { number: 3, ...t.process.steps.step3 },
    { number: 4, ...t.process.steps.step4 },
  ]

  return (
    <SectionWrapper bgcolor="background.paper">
      <SectionHeader eyebrow={t.process.eyebrow} title={t.process.title} subtitle={t.process.subtitle} align="center" />

      <Box sx={{ position: 'relative' }}>
        {/* Horizontal connector — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute',
          top: 21, left: '12.5%', right: '12.5%', height: '1px', bgcolor: 'divider', zIndex: 0 }} />

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 3, sm: 4, md: 3 },
          position: 'relative', zIndex: 1,
        }}>
          {steps.map(step => (
            <Box key={step.number} sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column', md: 'column' },
              alignItems: { xs: 'flex-start', sm: 'center', md: 'center' },
              gap: { xs: 2, sm: 2 },
            }}>
              {/* Vertical connector — mobile only */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '50%',
                  bgcolor: 'primary.light', border: '2px solid', borderColor: 'primary.main',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: (theme) => `0 0 0 4px ${theme.palette.background.paper}, 0 0 0 5px ${theme.palette.divider}`,
                }}>
                  <Typography variant="body2" fontWeight={800} color="primary.contrastText">{step.number}</Typography>
                </Box>
                {step.number < steps.length && (
                  <Box sx={{ width: '2px', height: 32, bgcolor: 'divider', mt: 1 }} />
                )}
              </Box>

              {/* Circle — sm and above */}
              <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                width: 44, height: 44, borderRadius: '50%',
                bgcolor: 'primary.light', border: '2px solid', borderColor: 'primary.main',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: (theme) => `0 0 0 5px ${theme.palette.background.paper}, 0 0 0 6px ${theme.palette.divider}`,
              }}>
                <Typography variant="body2" fontWeight={800} color="primary.contrastText">{step.number}</Typography>
              </Box>

              <Box sx={{ textAlign: { xs: 'left', sm: 'center', md: 'center' } }}>
                <Typography variant="subtitle2" fontWeight={700} color="text.primary" gutterBottom
                  sx={{ fontSize: { xs: '0.9rem', sm: '0.875rem' } }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                  sx={{ lineHeight: 1.7, fontSize: { xs: '0.8rem', sm: '0.78rem' } }}>
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  )
}
