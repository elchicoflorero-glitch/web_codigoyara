import "dotenv/config";
import express from "express";
import cors from "cors";
import quotesRouter       from "./routes/quotes";
import projectsRouter     from "./routes/projects";
import teamRouter         from "./routes/team";
import testimonialsRouter from "./routes/testimonials";
import adminRouter        from "./routes/admin";
import configRouter       from "./routes/config";

const app = express();
const PORT         = parseInt(process.env.PORT ?? "3000", 10);
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:8443";

// ── Middlewares ──────────────────────────────────────────────
app.use(cors({
  origin:  FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ── Rutas ────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/quotes",       quotesRouter);
app.use("/api/projects",     projectsRouter);
app.use("/api/team",         teamRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/admin",        adminRouter);
app.use("/api/config",       configRouter);

// ── 404 ──────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

// ── Error handler ────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[server] Error no manejado:", err);
  res.status(500).json({ success: false, message: "Error interno del servidor" });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✓ Nuvora backend corriendo en http://localhost:${PORT}`);
  console.log(`  → /api/quotes /api/projects /api/team /api/testimonials /api/admin /api/config`);
});
