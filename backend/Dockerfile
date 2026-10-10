FROM node:20-alpine

RUN npm install -g pnpm@9.15.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY src ./src/
COPY tsconfig.json ./

# Install all deps (including devDeps for prisma CLI and tsc)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm install --frozen-lockfile

# Build TypeScript
RUN node_modules/.bin/tsc

EXPOSE 3000

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/index.js"]
