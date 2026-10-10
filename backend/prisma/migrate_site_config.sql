-- Migración: tabla site_config
-- Guarda la configuración global del sitio (un único registro id = 'global')

CREATE TABLE IF NOT EXISTS site_config (
  id          TEXT        NOT NULL DEFAULT 'global',
  "activeBg"  TEXT        NOT NULL DEFAULT 'hero',
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT site_config_pkey PRIMARY KEY (id)
);

-- Inserta el registro global si aún no existe
INSERT INTO site_config (id, "activeBg", "updatedAt")
VALUES ('global', 'hero', now())
ON CONFLICT (id) DO NOTHING;
