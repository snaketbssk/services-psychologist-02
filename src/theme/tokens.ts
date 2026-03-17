// ── Sand design tokens — single source of truth ──────────────────────────────
// All MUI theme files import from here. Changing a value here
// propagates automatically to palette, components, and CSS baseline.

export const tokens = {
  // Background
  bgDefault:        'hsl(40, 20%, 93%)',
  bgPaper:          'hsl(0, 0%, 100%)',

  // Primary — terracotta
  primary:          'hsl(28, 60%, 62%)',
  primaryDark:      'hsl(28, 60%, 52%)',
  primaryLight:     'hsl(28, 60%, 74%)',
  primaryContrast:  '#ffffff',

  // Secondary — warm brown
  secondary:        'hsl(30, 40%, 35%)',
  secondaryContrast:'#ffffff',

  // Text
  textPrimary:      'hsl(30, 40%, 16%)',
  textSecondary:    'hsl(30, 15%, 50%)',

  // Surface
  divider:          'hsl(35, 18%, 83%)',
  border:           'hsl(35, 18%, 83%)',
  chipBg:           'hsl(38, 25%, 88%)',
  chipFg:           'hsl(30, 30%, 28%)',
  secondary100:     'hsl(38, 25%, 88%)',  // secondary background tint

  // Semantic
  success:          'hsl(140, 55%, 42%)',
  successContrast:  '#ffffff',
  error:            'hsl(0, 72%, 60%)',
  errorContrast:    '#ffffff',
  warning:          'hsl(38, 92%, 50%)',
  warningContrast:  '#ffffff',
  info:             'hsl(207, 65%, 55%)',
  infoContrast:     '#ffffff',

  // Shape
  radiusSm:         '6px',
  radiusMd:         '8px',
  radiusLg:         '12px',
  radiusXl:         '16px',

  // Typography
  fontFamily:       "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontMono:         "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
} as const

export type Tokens = typeof tokens
