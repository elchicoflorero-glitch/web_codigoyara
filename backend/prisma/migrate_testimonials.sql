DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'TestimonialStatus') THEN
    CREATE TYPE "TestimonialStatus" AS ENUM ('PENDING','APPROVED','REJECTED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS testimonials (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  quote       TEXT NOT NULL,
  rating      INTEGER NOT NULL DEFAULT 5,
  status      "TestimonialStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id             TEXT PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
