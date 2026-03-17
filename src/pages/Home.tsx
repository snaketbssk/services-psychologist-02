import { JSX, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BoltIcon from '@mui/icons-material/Bolt'
import { useI18n, interpolate } from '../i18n/context'
import { useServerData } from '../context/ServerDataContext'
import type { Stat, RecentPost } from '../server/fetchHomeData'
import {
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  BlogSection,
  ConsultationSection,
} from '../components/sections'

export default function Home(): JSX.Element {
  const { t } = useI18n()
  const serverData = useServerData()
  const [count, setCount] = useState(0)

  const features = [
    { icon: '🦀', ...t.home.features.rolldown },
    { icon: '🌐', ...t.home.features.ssr },
    { icon: '🔷', ...t.home.features.typescript },
    { icon: '🌍', ...t.home.features.i18n },
  ]

  return (
    <Box>
      {/* ── App demo — constrained width, own padding ────────────────────── */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 5 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 5 } }}>

          {/* Hero */}
          <Box>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' } }}>
              Vite <Box component="span" color="primary.main">8</Box> + SSR
            </Typography>
            <Typography variant="h5" color="info.main" sx={{ fontWeight: 700, mt: 0.5 }}>
              {t.home.subtitle}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 520 }}>
              {t.home.description}
            </Typography>
          </Box>

          {/* Server data */}
          {serverData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                borderRadius: 99, px: 1.5, py: 0.5, width: 'fit-content',
              }}>
                <Box sx={{
                  width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main',
                  boxShadow: '0 0 6px #4caf50', flexShrink: 0,
                  animation: 'ssrPulse 2s ease-in-out infinite',
                  '@keyframes ssrPulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } },
                }} />
                <Typography variant="caption" color="text.secondary">
                  Server-rendered · fetched at {new Date(serverData.homeData.fetchedAt).toLocaleTimeString()}
                </Typography>
              </Box>

              <Grid container spacing={1.5}>
                {serverData.homeData.stats.map((stat: Stat) => (
                  <Grid item xs={6} md={3} key={stat.label}>
                    <Card>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 800, lineHeight: 1 }}>{stat.value}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>{stat.label}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          {stat.up
                            ? <TrendingUpIcon sx={{ fontSize: 13, color: 'success.main' }} />
                            : <TrendingDownIcon sx={{ fontSize: 13, color: 'error.main' }} />}
                          <Typography variant="caption" sx={{ fontWeight: 600, color: stat.up ? 'success.main' : 'error.main' }}>
                            {stat.trend}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Recent Posts</Typography>
                    <Chip label="from server" size="small" />
                  </Box>
                  {serverData.homeData.recentPosts.map((post: RecentPost, i: number) => (
                    <Box key={post.id}>
                      {i > 0 && <Divider sx={{ my: 1.5 }} />}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>{post.title}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                            <AccessTimeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">{post.date} · {post.readingTime} min</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {post.tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Counter */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <BoltIcon color="primary" fontSize="small" />
                <Typography variant="subtitle2" fontWeight={600}>{t.home.counter.title}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{t.home.counter.description}</Typography>
              <Button variant="contained" disableElevation onClick={() => setCount(c => c + 1)}>
                {interpolate(t.home.counter.button, { count })}
              </Button>
            </CardContent>
          </Card>

          {/* Feature cards */}
          <Grid container spacing={1.5}>
            {features.map(({ icon, title, description }) => (
              <Grid item xs={6} md={3} key={title}>
                <Card sx={{ height: '100%', '&:hover': { borderColor: 'primary.main' } }}>
                  <CardContent>
                    <Typography fontSize="1.75rem" lineHeight={1} mb={1}>{icon}</Typography>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>{title}</Typography>
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* ── Full-width sections — bgcolor alternates automatically via i % 2 ── */}
      {[
        ServicesSection,
        ProcessSection,
        TestimonialsSection,
        BlogSection,
        ConsultationSection,
      ].map((Component, i) => (
        <Component
          key={i}
          bgcolor={i % 2 === 0 ? 'background.default' : 'background.paper'}
          maxWidth="lg"
        />
      ))}
    </Box>
  )
}
