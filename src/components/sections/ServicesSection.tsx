import { JSX } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './SectionHeader'
import { useI18n } from '../../i18n/context'

export default function ServicesSection(): JSX.Element {
  const { t } = useI18n()
  const items = [
    t.services.items.individual, t.services.items.family,
    t.services.items.couples,    t.services.items.group,
    t.services.items.adolescent, t.services.items.trauma,
  ]

  return (
    <SectionWrapper bgcolor="background.default">
      <SectionHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
        align="left"
        action={
          <Button variant="outlined" endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: 99, borderColor: 'text.primary', color: 'text.primary',
              fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': { bgcolor: 'text.primary', color: 'background.paper' } }}>
            {t.services.cta}
          </Button>
        }
      />

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',
              transition: 'border-color 0.2s', '&:hover': { borderColor: 'primary.main' } }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" fontWeight={700} color="text.primary" gutterBottom
                  sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flex: 1, lineHeight: 1.7, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2.5,
                  fontSize: '0.85rem', fontWeight: 600, color: 'text.primary' }}>
                  {t.services.readMore} <ArrowForwardIcon sx={{ fontSize: 15 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  )
}
