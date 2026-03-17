import { JSX, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './SectionHeader'
import { useI18n } from '../../i18n/context'

export default function TestimonialsSection(): JSX.Element {
  const { t } = useI18n()
  const [active, setActive] = useState(0)

  const testimonials = [t.testimonials.items.t1, t.testimonials.items.t2, t.testimonials.items.t3]
  const stats = [
    t.testimonials.stats.experience, t.testimonials.stats.customers,
    t.testimonials.stats.projects,   t.testimonials.stats.awards,
  ]
  const current = testimonials[active]

  return (
    <SectionWrapper bgcolor="background.default">
      <SectionHeader eyebrow={t.testimonials.eyebrow} title={t.testimonials.title}
        subtitle={t.testimonials.subtitle} align="center" />

      <Card sx={{ borderRadius: { xs: 2, sm: 4 }, overflow: 'hidden' }}>
        <CardContent sx={{ p: 0 }}>

          {/* Quote row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

            {/* Avatar */}
            <Box sx={{
              width: { xs: '100%', md: 240 },
              height: { xs: 160, sm: 200, md: 'auto' },
              minHeight: { md: 280 },
              flexShrink: 0, bgcolor: 'secondary.light',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Box sx={{ width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, borderRadius: '50%',
                bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" color="primary.contrastText" fontWeight={700}
                  sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                  {current.author.charAt(0)}
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
              <Box sx={{ display: 'flex', gap: 0.25, mb: 1.5 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: { xs: 15, sm: 18 }, color: 'primary.main' }} />
                ))}
              </Box>
              <Typography variant="h6" fontWeight={600} color="text.primary"
                sx={{ lineHeight: 1.6, mb: 2.5, fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' } }}>
                &ldquo;{current.quote}&rdquo;
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary">{current.author}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2.5 }}>{current.role}</Typography>

              {/* Dots + link */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {testimonials.map((_, i) => (
                    <Box key={i} onClick={() => setActive(i)} sx={{
                      width: i === active ? 20 : 8, height: 8, borderRadius: 99,
                      cursor: 'pointer', transition: 'all 0.2s',
                      bgcolor: i === active ? 'primary.main' : 'divider',
                    }} />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                  <Typography variant="body2" fontWeight={600} color="text.primary"
                    sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' } }}>
                    {t.testimonials.readMore}
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 14, color: 'text.primary' }} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Stats bar — 2×2 on mobile, 4×1 on desktop */}
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider',
            display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
            {stats.map((stat, i) => (
              <Box key={stat.label} sx={{
                py: { xs: 2.5, sm: 3 }, px: { xs: 2, sm: 3.5 },
                borderRight: { xs: i % 2 === 0 ? '1px solid' : 'none', md: i < 3 ? '1px solid' : 'none' },
                borderBottom: { xs: i < 2 ? '1px solid' : 'none', md: 'none' },
                borderColor: 'divider',
              }}>
                <Typography variant="h4" fontWeight={800} color="text.primary"
                  sx={{ fontSize: { xs: '1.4rem', sm: '2.125rem' } }}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </SectionWrapper>
  )
}
