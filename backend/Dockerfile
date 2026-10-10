FROM node:20-slim

# Install OpenSSL explicitly (required by Prisma engine)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY src ./src/
COPY tsconfig.json ./

# Install all deps
RUN pnpm install --frozen-lockfile

# Generate prisma client with dummy URL (build time only, not persisted to runtime)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" node_modules/.bin/prisma generate

# Build TypeScript
RUN node_modules/.bin/tsc

EXPOSE 3000

# DATABASE_URL is injected by Railway at runtime with the real value
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/index.js"]
