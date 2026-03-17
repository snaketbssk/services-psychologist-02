# ── Stage 1: deps ────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build client bundle, SSR bundle, and compile server.ts → plain JS
RUN npm run build

# ── Stage 3: runner ──────────────────────────────────────────────────────────
# No tsx, no TypeScript — just node + production deps + compiled output.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies (tsx, vite, tsc etc. are excluded)
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile --omit=dev

# Copy Vite bundles
COPY --from=builder /app/dist ./dist

# Copy compiled server entry (server.ts → dist/server-entry/server.js)
COPY --from=builder /app/dist/server-entry ./dist/server-entry

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 appuser
USER appuser

EXPOSE 3000

# Plain node — no tsx, no compilation at runtime
CMD ["node", "dist/server-entry/server.js"]
