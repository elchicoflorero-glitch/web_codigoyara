DROP TABLE IF EXISTS quotes;
DROP TYPE IF EXISTS "QuoteStatus";

CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'CONTACTED', 'IN_PROGRESS', 'CLOSED');

CREATE TABLE quotes (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  company       TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  "projectType" TEXT NOT NULL,
  budget        TEXT NOT NULL,
  message       TEXT NOT NULL,
  status        "QuoteStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
