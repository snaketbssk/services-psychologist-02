# Vite 8 + React 19 + TypeScript + SSR

A fully-typed Server-Side Rendering starter using **Vite 8** (Rolldown), **React 19**, **React Router 7**, **TypeScript 5**, and **Express**.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
```

> **Requires Node.js ≥ 20.12 or ≥ 22** (Vite 8/Rolldown requirement)

## Scripts

| Command            | Description                              |
|--------------------|------------------------------------------|
| `npm run dev`      | Dev server with HMR at localhost:5173    |
| `npm run build`    | Build client + server bundles            |
| `npm run preview`  | Run production build                     |
| `npm run typecheck`| Run `tsc --noEmit` type check            |

## Project Structure

```
vite8-ssr-ts/
├── index.html              # HTML shell — <!--ssr-outlet-->
├── server.ts               # Typed Express server (dev + prod)
├── vite.config.ts          # Vite 8 config with path aliases
├── tsconfig.json           # App TypeScript config
├── tsconfig.node.json      # Server/config TypeScript config
└── src/
    ├── types.ts            # Shared: Post, NavItem, RenderResult
    ├── entry-client.tsx    # hydrateRoot()
    ├── entry-server.tsx    # renderToString() → RenderResult
    ├── App.tsx             # Route definitions
    ├── index.css
    ├── components/
    │   ├── Layout.tsx      # Nav + footer, typed NavItem[]
    │   └── Layout.css
    └── pages/
        ├── Home.tsx        # Counter demo, typed Feature[]
        ├── About.tsx       # SSR flow + TS highlights
        ├── Posts.tsx       # Typed Post[], filter + sort
        ├── NotFound.tsx
        └── Page.css
```

## SSR Flow

```
Request → server.ts
  │
  ├─ DEV:  vite.ssrLoadModule('/src/entry-server.tsx')
  └─ PROD: import('./dist/server/entry-server.js')
                │
                ▼
       renderToString(<StaticRouter>)  ← typed render(url): Promise<RenderResult>
                │
                ▼
    Inject into index.html → send HTML
                │
                ▼
      Browser: hydrateRoot()  ← typed, throws if #app missing
                │
                ▼
         App is interactive
```
