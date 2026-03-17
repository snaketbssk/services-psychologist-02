import { JSX } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { useI18n } from '../i18n/context'

export default function About(): JSX.Element {
  const { t } = useI18n()
  const steps = [t.about.i18n.step1, t.about.i18n.step2, t.about.i18n.step3, t.about.i18n.step4, t.about.i18n.step5]

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: 5 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" fontWeight={900} letterSpacing="-0.03em">{t.about.title}</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>{t.about.lead}</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>{t.about.structure.title}</Typography>
          <Box component="pre" sx={{
            fontFamily: 'ui-monospace, monospace', fontSize: '0.78rem', lineHeight: 1.7,
            bgcolor: 'background.default', p: 2, borderRadius: 1,
            overflowX: 'auto', color: 'text.primary', mt: 1,
          }}>
{`vite8-ssr-ts/
├── Dockerfile
├── index.html
├── server.ts               # Detects locale from headers/cookie
├── vite.config.ts
└── src/
    ├── mui/
    │   └── createEmotionCache.ts
    ├── theme/
    │   ├── tokens.ts       # Sand tokens (single source of truth)
    │   ├── palette.ts      # MUI PaletteOptions
    │   ├── typography.ts   # MUI TypographyVariantsOptions
    │   ├── components.ts   # Barrel: imports all component overrides
    │   ├── theme.ts        # createTheme() assembler
    │   ├── index.ts        # Public barrel export
    │   └── components/
    │       ├── MuiAppBar.ts
    │       ├── MuiAvatar.ts
    │       ├── MuiButton.ts
    │       ├── MuiCard.ts
    │       ├── MuiChip.ts
    │       ├── MuiCssBaseline.ts
    │       ├── MuiDivider.ts
    │       ├── MuiLink.ts
    │       ├── MuiPaper.ts
    │       ├── MuiSelect.ts
    │       ├── MuiTextField.ts
    │       └── MuiTooltip.ts
    ├── i18n/               # context, loader, types
    ├── locales/            # en.json / es.json / fr.json
    ├── entry-server.tsx    # Extracts Emotion CSS for SSR
    └── entry-client.tsx    # Hydrates with same Emotion cache`}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>{t.about.i18n.title}</Typography>
          {steps.map((step, i) => (
            <Box key={i}>
              {i > 0 && <Divider sx={{ my: 1.5 }} />}
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <Avatar sx={{ width: 22, height: 22, fontSize: '0.65rem', fontWeight: 700, flexShrink: 0, mt: 0.1 }}>
                  {i + 1}
                </Avatar>
                <Typography variant="body2" color="text.secondary">{step}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
    </Box>
  )
}
