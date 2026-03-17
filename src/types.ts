// ── Post ────────────────────────────────────────────────────────────────────

export interface Post {
  id: number
  title: string
  date: string
  excerpt: string
  tags: string[]
}

// ── Server render result ────────────────────────────────────────────────────

export interface RenderResult {
  html: string
  head?: string
}
