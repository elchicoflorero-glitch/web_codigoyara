FROM node:20-alpine

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY src ./src/
COPY tsconfig.json ./

# Set dummy URL so prisma generate works at build time (no real DB needed)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Install all deps including prisma CLI
RUN pnpm install --frozen-lockfile

# Build TypeScript
RUN node_modules/.bin/tsc

EXPOSE 3000

# At runtime Railway injects the real DATABASE_URL, overriding the dummy
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/index.js"]
