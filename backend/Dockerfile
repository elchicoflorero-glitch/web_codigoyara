FROM node:20-alpine AS builder

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install all deps (including dev) and generate prisma client with dummy URL
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── Runtime ──────────────────────────────────────────────
FROM node:20-alpine

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install ALL deps including prisma CLI for migrate deploy
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm install --frozen-lockfile

COPY --from=builder /app/dist ./dist
# Copy generated prisma client from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/index.js"]
