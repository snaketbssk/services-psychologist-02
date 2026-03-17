import { JSX } from 'react'
import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { useI18n } from '../i18n/context'
import type { Post } from '../types'

const MOCK_POSTS: Post[] = [
  { id: 1, title: 'Getting Started with Vite 8', date: '2026-03-01', excerpt: 'Vite 8 ships Rolldown as the default bundler — learn how to migrate and what to expect.', tags: ['vite', 'tooling'] },
  { id: 2, title: 'SSR vs SSG: When to Use Each', date: '2026-03-05', excerpt: "Server-side rendering and static site generation serve different use cases. Here's how to choose.", tags: ['ssr', 'architecture'] },
  { id: 3, title: 'React 19 New Features', date: '2026-03-10', excerpt: 'React 19 brings Actions, useOptimistic, and improved Server Component support.', tags: ['react', 'typescript'] },
  { id: 4, title: 'Hydration in React Explained', date: '2026-03-12', excerpt: 'What exactly happens when hydrateRoot() runs? Understanding the client takeover process.', tags: ['react', 'ssr'] },
  { id: 5, title: 'TypeScript 5.5 Inferred Predicates', date: '2026-03-14', excerpt: 'TypeScript 5.5 can now infer type predicates automatically, reducing boilerplate significantly.', tags: ['typescript'] },
]

type SortKey = 'date' | 'title'

export default function Posts(): JSX.Element {
  const { t } = useI18n()
  const [filter, setFilter]     = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sortBy, setSortBy]     = useState<SortKey>('date')

  const allTags = useMemo(() => Array.from(new Set(MOCK_POSTS.flatMap(p => p.tags))).sort(), [])

  const filtered = useMemo<Post[]>(() =>
    MOCK_POSTS
      .filter(p => {
        const matchText = !filter || p.title.toLowerCase().includes(filter.toLowerCase()) || p.excerpt.toLowerCase().includes(filter.toLowerCase())
        const matchTag = !activeTag || p.tags.includes(activeTag)
        return matchText && matchTag
      })
      .sort((a, b) => sortBy === 'date' ? b.date.localeCompare(a.date) : a.title.localeCompare(b.title)),
    [filter, activeTag, sortBy]
  )

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: 5 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" fontWeight={900} letterSpacing="-0.03em">{t.posts.title}</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>{t.posts.lead}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <TextField
          placeholder={t.posts.searchPlaceholder}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        <Select size="small" value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)} sx={{ minWidth: 140 }}>
          <MenuItem value="date">{t.posts.sort.newest}</MenuItem>
          <MenuItem value="title">{t.posts.sort.az}</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Button size="small" variant={activeTag === null ? 'contained' : 'outlined'} disableElevation onClick={() => setActiveTag(null)}>
          {t.posts.all}
        </Button>
        {allTags.map(tag => (
          <Button key={tag} size="small" variant={activeTag === tag ? 'contained' : 'outlined'} disableElevation
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}>
            {tag}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {filtered.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={5}>{t.posts.empty}</Typography>
        ) : (
          filtered.map(post => (
            <Card key={post.id} sx={{ '&:hover': { borderColor: 'primary.main' } }}>
              <CardContent>
                <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                <Typography variant="subtitle1" fontWeight={600}>{post.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>{post.excerpt}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    {post.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
                  </Box>
                  <Button size="small" variant="text" color="primary">{t.posts.readMore}</Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
    </Box>
  )
}
