import { JSX } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { useI18n } from '../i18n/context'
import { SUPPORTED_LOCALES, LOCALE_LABELS } from '../i18n/types'
import type { Locale } from '../i18n/types'

export default function LanguageSwitcher(): JSX.Element {
  const { locale, setLocale } = useI18n()

  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      sx={{ '& .MuiButton-root': { textTransform: 'none', fontWeight: 700, fontSize: '0.7rem', minWidth: 36, px: 1 } }}
    >
      {SUPPORTED_LOCALES.map(l => (
        <Button
          key={l}
          variant={locale === l ? 'contained' : 'outlined'}
          disableElevation
          onClick={() => setLocale(l as Locale)}
          title={LOCALE_LABELS[l]}
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  )
}
