# ── Stage 1: deps ────────────────────────────────────────────────────────────
FROM node:22-slim AS deps
WORKDIR /app

COPY package.json ./
# Do NOT copy the lockfile here.
# Lockfiles generated on macOS/Windows omit Linux-specific optional packages
# (e.g. @rolldown/binding-linux-x64-gnu). Copying them causes npm ci to skip
# those bindings entirely, breaking the Vite 8 / Rolldown build.
# Instead we run `npm install` so npm resolves the correct platform bindings
# for the current Linux/glibc environment and writes a fresh lockfile.
RUN npm install --include=optional

# ── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY . .

# Build client bundle, SSR bundle, and compile server.ts → plain JS
RUN npm run build

# ── Stage 3: runner ──────────────────────────────────────────────────────────
# No build tools — only production deps + compiled output + plain node.
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Reuse the Linux-resolved lockfile from the deps stage so the runner
# installs exactly the same prod packages without re-resolving.
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY package.json ./
RUN npm ci --frozen-lockfile --omit=dev

# Copy Vite client + SSR bundles
COPY --from=builder /app/dist ./dist

RUN groupadd --system --gid 1001 nodejs \
 && useradd  --system --uid 1001 --gid nodejs appuser
USER appuser

EXPOSE 3000

# Plain node — no tsx, no compilation at runtime
CMD ["node", "dist/server-entry/server.js"]
