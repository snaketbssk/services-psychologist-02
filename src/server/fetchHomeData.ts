// This module runs SERVER-SIDE ONLY.
// It simulates fetching data from a DB or external API.
// In a real app, replace with actual fetch() calls or DB queries.

export interface Stat {
  label: string
  value: string
  trend: string
  up: boolean
}

export interface RecentPost {
  id: number
  title: string
  date: string
  tags: string[]
  readingTime: number
}

export interface HomeData {
  stats: Stat[]
  recentPosts: RecentPost[]
  fetchedAt: string
}

/** Simulates a ~80ms server-side data fetch */
export async function fetchHomeData(): Promise<HomeData> {
  await new Promise(r => setTimeout(r, 80))

  return {
    stats: [
      { label: 'Posts Published',  value: '5',    trend: '+2 this week', up: true  },
      { label: 'Total Readers',    value: '1,284', trend: '+18% vs last month', up: true  },
      { label: 'Avg. Read Time',   value: '5.2m',  trend: '-0.3m vs last month', up: false },
      { label: 'Tags',             value: '6',     trend: '2 new this month', up: true  },
    ],
    recentPosts: [
      { id: 5, title: 'TypeScript 5.5 Inferred Predicates', date: '2026-03-14', tags: ['typescript'],       readingTime: 3 },
      { id: 4, title: 'Hydration in React Explained',       date: '2026-03-12', tags: ['react', 'ssr'],     readingTime: 5 },
      { id: 3, title: 'React 19 New Features',              date: '2026-03-10', tags: ['react', 'typescript'], readingTime: 8 },
    ],
    fetchedAt: new Date().toISOString(),
  }
}
