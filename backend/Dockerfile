FROM node:20-alpine AS builder

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Generate prisma client with a dummy URL (no real DB needed at build time)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── Runtime ──────────────────────────────────────────────
FROM node:20-alpine

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
