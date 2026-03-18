# ── Stage 1: deps ───────────────────────────────
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --include=optional

# ── Stage 2: build ──────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Stage 3: runner ─────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY package.json ./ 
COPY --from=deps /app/package-lock.json ./package-lock.json
RUN npm ci --frozen-lockfile --omit=dev

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs appuser
USER appuser

EXPOSE 3000
CMD ["node", "dist/server-entry/server.js"]