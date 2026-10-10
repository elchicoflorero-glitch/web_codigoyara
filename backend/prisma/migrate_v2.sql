-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  label       TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'dashboard',
  text        TEXT NOT NULL,
  stack       TEXT[] NOT NULL DEFAULT '{}',
  tagline     TEXT NOT NULL,
  challenge   TEXT NOT NULL,
  solution    TEXT NOT NULL,
  duration    TEXT NOT NULL,
  year        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#246bfe',
  published   BOOLEAN NOT NULL DEFAULT false,
  features    TEXT[] NOT NULL DEFAULT '{}',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_results (
  id          TEXT PRIMARY KEY,
  metric      TEXT NOT NULL,
  label       TEXT NOT NULL,
  "projectId" TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE
);

-- Team
CREATE TABLE IF NOT EXISTS team_members (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL,
  bio         TEXT NOT NULL,
  initials    TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#246bfe',
  linkedin    TEXT NOT NULL DEFAULT '#',
  "order"     INTEGER NOT NULL DEFAULT 0,
  active      BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TYPE IF NOT EXISTS "TestimonialStatus" AS ENUM ('PENDING','APPROVED','REJECTED');

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

-- Admins
CREATE TABLE IF NOT EXISTS admins (
  id             TEXT PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
