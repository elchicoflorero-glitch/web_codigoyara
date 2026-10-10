-- Add images and videos arrays to projects table
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS "coverImage" TEXT,
  ADD COLUMN IF NOT EXISTS images       TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS videos       TEXT[] NOT NULL DEFAULT '{}';
