FROM node:20-slim

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY src ./src/
COPY tsconfig.json ./

# Dummy URL only for prisma generate at build time
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Install all deps (prisma generate runs via postinstall... but postinstall is empty)
RUN pnpm install --frozen-lockfile

# Generate prisma client explicitly
RUN node_modules/.bin/prisma generate

# Build TypeScript
RUN node_modules/.bin/tsc

EXPOSE 3000

# Railway injects the real DATABASE_URL at runtime, overriding the dummy
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/index.js"]
