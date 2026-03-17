import { JSX, useState } from 'react'
import { Outlet, NavLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useI18n } from '../i18n/context'
import LanguageSwitcher from './LanguageSwitcher'

export default function Layout(): JSX.Element {
  const { t } = useI18n()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navItems: [string, string, boolean][] = [
    ['/', t.nav.home, true],
    ['/about', t.nav.about, false],
    ['/posts', t.nav.posts, false],
  ]

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <AppBar position="sticky">
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 }, gap: 1, minHeight: { xs: 56, sm: 64 } }}>

          {/* Logo */}
          <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ flexShrink: 0, mr: 1 }}>
            ⚡ Vite 8 SSR
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flex: 1 }}>
            {navItems.map(([to, label, end]) => (
              <NavLink key={to} to={to} end={end} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <Button size="small" variant={isActive ? 'contained' : 'text'} disableElevation
                    sx={{ fontSize: '0.875rem', color: isActive ? 'primary.contrastText' : 'text.secondary',
                      '&:hover': { bgcolor: isActive ? undefined : 'action.hover' } }}>
                    {label}
                  </Button>
                )}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flex: { xs: 1, sm: 0 } }} />

          {/* Desktop lang switcher */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <LanguageSwitcher />
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'text.primary', ml: 'auto' }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: 'background.paper' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={700}>⚡ Vite 8 SSR</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" aria-label="close menu">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider />
        <List disablePadding>
          {navItems.map(([to, label, end]) => (
            <NavLink key={to} to={to} end={end} style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => setDrawerOpen(false)}>
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton selected={isActive} sx={{ py: 1.5, px: 2,
                    '&.Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText',
                      '&:hover': { bgcolor: 'primary.dark' } } }}>
                    <ListItemText primary={label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 400, fontSize: '0.95rem' }} />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <LanguageSwitcher />
        </Box>
      </Drawer>

      {/* ── Page content ───────────────────────────────────────────────── */}
      <Box component="main" sx={{ flex: 1, width: '100%' }}>
        <Outlet />
      </Box>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 2.5, px: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          {t.footer} · <a href="https://vite.dev" target="_blank" rel="noreferrer">vite.dev</a>
        </Typography>
      </Box>
    </Box>
  )
}
