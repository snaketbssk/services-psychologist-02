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

RUN npm run build

# ── Stage 3: runner ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy the production build
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies + tsx (needed to run server.ts)
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile --include=dev \
    --omit=optional \
 && npm prune --production \
 && npm install tsx --save-dev

# Copy server entry (tsx compiles it at runtime)
COPY --from=builder /app/server.ts ./server.ts

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 appuser
USER appuser

EXPOSE 3000

CMD ["./node_modules/.bin/tsx", "server.ts"]
