import { JSX } from 'react'
import { createContext, useContext, type ReactNode } from 'react'
import type { ServerSideData } from '../entry-server'

const ServerDataContext = createContext<ServerSideData | null>(null)

export function ServerDataProvider({
  data,
  children,
}: {
  data: ServerSideData | null
  children: ReactNode
}): JSX.Element {
  return (
    <ServerDataContext.Provider value={data}>
      {children}
    </ServerDataContext.Provider>
  )
}

export function useServerData(): ServerSideData | null {
  return useContext(ServerDataContext)
}
