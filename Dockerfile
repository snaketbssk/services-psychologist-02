# ── Stage 1: deps ────────────────────────────────────────────────────────────
# node:22-slim uses Debian/glibc — required for Rolldown's native .node bindings.
# Alpine uses musl libc; the rolldown-binding.linux-x64-musl.node optional package
# is not installed by npm ci from a lockfile generated on a glibc machine.
FROM node:22-slim AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
# --include=optional ensures Rolldown's native glibc binding is installed
RUN npm ci --frozen-lockfile --include=optional

# ── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build client bundle, SSR bundle, and compile server.ts → plain JS
RUN npm run build

# ── Stage 3: runner ──────────────────────────────────────────────────────────
# Slim Debian — matches the glibc ABI used at build time.
FROM node:22-slim AS runner
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

RUN groupadd --system --gid 1001 nodejs \
 && useradd  --system --uid 1001 --gid nodejs appuser
USER appuser

EXPOSE 3000

# Plain node — no tsx, no compilation at runtime
CMD ["node", "dist/server-entry/server.js"]
