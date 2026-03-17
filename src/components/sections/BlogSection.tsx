import { JSX } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import SectionWrapper from './SectionWrapper'
import type { Breakpoint } from '@mui/material/styles'
import SectionHeader from './SectionHeader'
import { useI18n } from '../../i18n/context'


type BgColor = 'background.default' | 'background.paper'
export default function BlogSection({ bgcolor = 'background.default', maxWidth = 'lg' }: { bgcolor?: BgColor; maxWidth?: Breakpoint | false }): JSX.Element {
  const { t } = useI18n()
  const posts = [
    { id: 'p1', ...t.blog.posts.p1 }, { id: 'p2', ...t.blog.posts.p2 },
    { id: 'p3', ...t.blog.posts.p3 }, { id: 'p4', ...t.blog.posts.p4 },
  ]

  return (
    <SectionWrapper bgcolor={bgcolor} maxWidth={maxWidth}>
      <SectionHeader eyebrow={t.blog.eyebrow} title={t.blog.title}
        subtitle={t.blog.subtitle} align="center" />

      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
        {posts.map(post => (
          <Grid item xs={6} sm={6} md={3} key={post.id}>
            <Card sx={{ borderRadius: { xs: 2, sm: 3 }, overflow: 'hidden', height: '100%',
              cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ height: { xs: 140, sm: 180, md: 220 }, bgcolor: 'secondary.light' }} />
                {/* Date badge */}
                <Box sx={{ position: 'absolute', top: 8, left: 8,
                  bgcolor: 'text.primary', color: 'background.paper',
                  borderRadius: 1, px: 0.75, py: 0.5, textAlign: 'center', minWidth: 30 }}>
                  <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' }, fontWeight: 700, lineHeight: 1, color: 'inherit' }}>
                    {post.day}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.5rem', sm: '0.6rem' }, fontWeight: 600,
                    textTransform: 'uppercase', color: 'inherit', letterSpacing: '0.05em' }}>
                    {post.month}
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 }, pb: '12px !important' }}>
                <Typography variant="overline"
                  sx={{ color: 'text.secondary', fontSize: { xs: '0.58rem', sm: '0.65rem' }, letterSpacing: '0.08em', fontWeight: 600 }}>
                  {post.category}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary"
                  sx={{ mt: 0.25, lineHeight: 1.4, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' } }}>
                  {post.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  )
}
