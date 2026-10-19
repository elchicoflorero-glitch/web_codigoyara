# web_codigoyara — Nuvora

Sitio web corporativo de Nuvora con panel de administración. Monorepo con frontend React + backend Express + PostgreSQL en Railway.

---

## Estructura del repositorio

```
web_sistemas/
├── fronted/          # React + Vite + TypeScript (frontend)
│   ├── src/
│   │   ├── assets/           # Modelos 3D (.glb), SVGs, texturas
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   └── sections/     # Hero, Services, Projects, Testvimonials, CTA, FAQ, Contact, Terminal, IdeaToProduct
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── admin/        # AdminLogin, AdminDashboard, AdminProjects, AdminTeam, AdminQuotes
│   │   └── styles/           # index.css, admin.css
│   ├── .env                  # Variables de entorno locales (no se sube a git)
│   └── package.json
│
├── backend/          # Express + TypeScript + Prisma
│   ├── src/
│   │   ├── routes/           # admin, config, projects, quotes, team, testimonials
│   │   ├── services/         # db.ts (Prisma client), email.ts (Resend)
│   │   ├── templates/        # confirmation.ts, notification.ts (HTML emails)
│   │   └── index.ts          # Entry point, CORS, rutas
│   ├── prisma/
│   │   ├── schema.prisma     # Modelos: Quote, Project, ProjectResult, TeamMember, Testimonial, SiteConfig, Admin
│   │   └── migrations/       # Historial de migraciones Prisma
│   ├── Dockerfile            # Build con node:20-slim + OpenSSL + pnpm
│   ├── .env                  # Variables de entorno locales (no se sube a git)
│   └── package.json
│
└── README.md
```

---

## Stack tecnológico

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI |
| Vite | 8 | Build tool |
| TypeScript | 5.7 | Tipado |
| Three.js | 0.186 | Modelos 3D |
| Framer Motion | 14 | Animaciones |
| GSAP | 3.15 | Animaciones avanzadas |
| React Router | 7 | Routing |
| Tailwind CSS | 4 | Estilos utilitarios |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Express | 4 | HTTP server |
| TypeScript | 5.7 | Tipado |
| Prisma | 5.22 | ORM |
| PostgreSQL | — | Base de datos |
| bcryptjs | 3 | Hash de contraseñas |
| jsonwebtoken | 9 | Auth JWT |
| Resend | 4 | Envío de emails |
| Zod | 3 | Validación de schemas |

---

## Servicios externos

### Railway — Hosting
- **URL:** [railway.app](https://railway.app)
- **Proyecto backend:** `marvelous-victory` → servicio `spectacular-cat`
- **Proyecto frontend:** `valiente-benevolencia` → servicio `codigo_web`
- **Base de datos:** PostgreSQL en el proyecto `marvelous-victory`
- **URLs de producción:**
  - Frontend: `https://webcodigoyara-production.up.railway.app`
  - Backend: `https://spectacular-cat-production-7265.up.railway.app`

### Resend — Emails transaccionales
- **URL:** [resend.com](https://resend.com)
- **Cuenta:** `carlos.daniel.proa@gmail.com`
- **API Key:** configurada en variable `RESEND_API_KEY` (ver `.env`)
- **From email:** `onboarding@resend.dev` (plan free, sin dominio propio)
- **Emails que se envían:**
  - Confirmación al cliente cuando envía cotización
  - Notificación interna al equipo (`NOTIFY_EMAIL`)
- **Limitación plan free:** solo puede enviar al email del dueño de la cuenta. Para enviar a clientes externos se necesita verificar un dominio propio.

### Google OAuth — Login social
- **Consola:** [console.cloud.google.com](https://console.cloud.google.com)
- **Client ID:** configurado en variable `VITE_GOOGLE_CLIENT_ID`
- **Authorized JavaScript origins:** agregar la URL del frontend en producción
- **Nota:** en producción el Client ID debe estar en las variables de Railway del frontend

### GitHub — Control de versiones
- **Repo:** `elchicoflorero-glitch/web_codigoyara`
- **Branch principal:** `main`
- **Auto-deploy:** habilitado en ambos servicios de Railway (se redeploya con cada push a `main`)

---

## Variables de entorno

### Backend (`backend/.env`)

```env
# Base de datos (Railway PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/railway"

# Resend (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxx

# Email de notificación interna
NOTIFY_EMAIL="carlos.daniel.proa@gmail.com"

# Origen permitido del frontend (CORS)
FRONTEND_URL="https://webcodigoyara-production.up.railway.app"

# Puerto del servidor
PORT=3000

# Admin JWT
JWT_SECRET="string-secreto-largo-y-seguro"
ADMIN_EMAIL="carlos.daniel.proa@gmail.com"
ADMIN_PASSWORD="tu-password-seguro"
```

### Frontend (`fronted/.env`)

```env
# URL del backend
VITE_API_URL=https://spectacular-cat-production-7265.up.railway.app

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
```

### Variables en Railway (spectacular-cat — backend)
Las mismas que el `.env` del backend, configuradas manualmente en Railway → Variables. Railway inyecta `DATABASE_URL` automáticamente via `${{Postgres.DATABASE_URL}}`.

### Variables en Railway (codigo_web — frontend)
- `VITE_API_URL` — URL del backend sin barra al final
- `VITE_GOOGLE_CLIENT_ID` — Client ID de Google OAuth

---

## Deploy

### Flujo automático
Cada push a `main` redeploya automáticamente ambos servicios en Railway (auto-deploy habilitado).

```bash
# Frontend
cd fronted
git add .
git commit -m "descripción del cambio"
git push

# Backend
cd backend
git add .
git commit -m "descripción del cambio"
git push
```

### Migraciones de base de datos
Las migraciones corren automáticamente al arrancar el backend (`prisma migrate deploy` en el CMD del Dockerfile). Para agregar una nueva migración:

```bash
cd backend
npx prisma migrate dev --name nombre_de_la_migracion
git add prisma/migrations
git commit -m "add migration: nombre_de_la_migracion"
git push
```

### Build local
```bash
# Frontend
cd fronted
pnpm install
pnpm dev          # desarrollo en http://localhost:5173

# Backend
cd backend
pnpm install
pnpm dev          # desarrollo en http://localhost:3000
```

---

## Admin Panel

- **URL local:** `http://localhost:5173/admin`
- **URL producción:** `https://webcodigoyara-production.up.railway.app/admin`
- **Credenciales:** configuradas en `ADMIN_EMAIL` y `ADMIN_PASSWORD` (variables de Railway)
- **Auth:** JWT con expiración de 12h, almacenado en `localStorage`
- **Bootstrap admin:** el login verifica primero contra las variables de entorno, no requiere registro en la DB

---

## Base de datos — Modelos Prisma

| Tabla | Descripción |
|---|---|
| `quotes` | Solicitudes de cotización del formulario de contacto |
| `projects` | Proyectos del portafolio con imágenes en base64 |
| `project_results` | Métricas de resultados por proyecto |
| `team_members` | Miembros del equipo con foto en base64 |
| `testimonials` | Testimonios de clientes (pendiente/aprobado/rechazado) |
| `site_config` | Configuración global del sitio (fondo activo del hero, etc.) |
| `admins` | Admins registrados en DB (adicional al bootstrap admin del env) |

---

## Dominio personalizado

Pendiente. Para configurar un dominio propio:

1. Comprar dominio en [Cloudflare Registrar](https://cloudflare.com/products/registrar) (~$10-15/año)
2. Railway → servicio → Settings → Networking → Custom Domain
3. Agregar el CNAME que da Railway en el DNS de Cloudflare
4. Actualizar `FRONTEND_URL` en el backend y `VITE_API_URL` en el frontend
5. Verificar dominio en Resend para poder enviar emails a cualquier destinatario
