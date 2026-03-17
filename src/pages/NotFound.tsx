import { JSX } from 'react'
import { Link } from 'react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useI18n } from '../i18n/context'

export default function NotFound(): JSX.Element {
  const { t } = useI18n()
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12, gap: 2, textAlign: 'center' }}>
      <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 900, lineHeight: 1 }}>{t.notFound.code}</Typography>
      <Typography variant="h5" fontWeight={700}>{t.notFound.title}</Typography>
      <Typography color="text.secondary">{t.notFound.description}</Typography>
      <Button component={Link as never} to="/" variant="contained" disableElevation>
        {t.notFound.back}
      </Button>
    </Box>
    </Box>
  )
}
