import { JSX, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SectionWrapper from './SectionWrapper'
import type { Breakpoint } from '@mui/material/styles'
import { useI18n } from '../../i18n/context'
import { tokens } from '../../theme'


type BgColor = 'background.default' | 'background.paper'
export default function ConsultationSection({ bgcolor = 'background.default', maxWidth = 'lg' }: { bgcolor?: BgColor; maxWidth?: Breakpoint | false }): JSX.Element {
  const { t } = useI18n()
  const c = t.consultation
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))
  const handleSubmit = () => { if (form.name && form.email) setSubmitted(true) }

  const contactItems = [
    { icon: <EmailOutlinedIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, text: c.contact.email },
    { icon: <PhoneOutlinedIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, text: c.contact.phone },
    { icon: <PlaceOutlinedIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, text: c.contact.address },
  ]

  return (
    <SectionWrapper bgcolor={bgcolor} maxWidth={maxWidth}>
      <Card sx={{ borderRadius: { xs: 2, sm: 4 }, overflow: 'hidden' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

            {/* Left — info */}
            <Box sx={{ flex: 1, p: { xs: 3, sm: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="overline"
                sx={{ color: 'text.secondary', letterSpacing: '0.12em', fontSize: '0.65rem', fontWeight: 700, mb: 1.5 }}>
                {c.eyebrow}
              </Typography>
              <Typography variant="h4" fontWeight={700} color="text.primary"
                sx={{ mb: 2, lineHeight: 1.25, fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2.125rem' } }}>
                {c.title}
              </Typography>
              <Typography variant="body2" color="text.secondary"
                sx={{ mb: { xs: 3, sm: 4 }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                {c.description}
              </Typography>

              <Box sx={{ height: 1, bgcolor: 'divider', mb: { xs: 2.5, sm: 3 } }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
                {contactItems.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ mt: 0.1, flexShrink: 0, color: 'text.secondary' }}>{item.icon}</Box>
                    <Typography variant="body2" color="text.secondary"
                      sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' } }}>{item.text}</Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: { xs: 2.5, sm: 3.5 }, cursor: 'pointer', width: 'fit-content' }}>
                <Typography variant="body2" fontWeight={700} color="text.primary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{c.openMap}</Typography>
                <ArrowForwardIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.primary' }} />
              </Box>
            </Box>

            {/* Right — form */}
            <Box sx={{
              width: { xs: '100%', md: 360 }, flexShrink: 0,
              bgcolor: 'background.paper',
              p: { xs: 3, sm: 4, md: 5 },
              borderTop: { xs: '1px solid', md: 'none' },
              borderLeft: { md: '1px solid' },
              borderColor: 'divider',
              display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 },
            }}>
              <Typography variant="h6" fontWeight={700} color="text.primary" textAlign="center"
                sx={{ mb: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {c.formTitle}
              </Typography>

              {submitted ? (
                <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                  <Typography variant="h6" color="primary" fontWeight={600}>{c.successTitle}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>{c.successMessage}</Typography>
                </Box>
              ) : (
                <>
                  <TextField placeholder={c.fields.name}    size="small" fullWidth value={form.name}    onChange={handleChange('name')} />
                  <TextField placeholder={c.fields.email}   size="small" fullWidth type="email" value={form.email}   onChange={handleChange('email')} />
                  <TextField placeholder={c.fields.phone}   size="small" fullWidth value={form.phone}   onChange={handleChange('phone')} />
                  <FormControl size="small" fullWidth>
                    <Select displayEmpty value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      renderValue={v => v || <Typography color="text.secondary" variant="body2">{c.fields.service}</Typography>}>
                      {c.services.map((s: string) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField placeholder={c.fields.message} size="small" fullWidth multiline
                    rows={4} value={form.message} onChange={handleChange('message')} />
                  <Button variant="contained" fullWidth size="large" onClick={handleSubmit}
                    sx={{ bgcolor: tokens.primaryLight, color: tokens.textPrimary, fontWeight: 700,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      '&:hover': { bgcolor: tokens.primary, color: '#fff' } }}>
                    {c.submit}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </SectionWrapper>
  )
}
