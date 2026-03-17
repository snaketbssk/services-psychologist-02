import { JSX } from 'react'
import { Routes, Route } from 'react-router'
import { ServerDataProvider } from './context/ServerDataContext'
import type { ServerSideData } from './entry-server'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import NotFound from './pages/NotFound'

interface AppProps { serverData?: ServerSideData | null }

export default function App({ serverData = null }: AppProps): JSX.Element {
  return (
    <ServerDataProvider data={serverData}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts" element={<Posts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ServerDataProvider>
  )
}
