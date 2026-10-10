import { Router, Request, Response } from "express";
import { prisma } from "../services/db";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/config  ─── público: el frontend lo llama al iniciar
router.get("/", async (_req: Request, res: Response) => {
  try {
    const config = await prisma.siteConfig.upsert({
      where:  { id: "global" },
      update: {},
      create: { id: "global", activeBg: "hero" },
    });
    res.json({ success: true, activeBg: config.activeBg });
  } catch (err) {
    console.error("[config] GET error:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// PUT /api/config  ─── protegido: solo admin puede cambiar el fondo
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const { activeBg } = req.body as { activeBg?: string };

  const VALID_VARIANTS = ["hero", "aurora", "neon", "ocean", "nebula", "matrix"];
  if (!activeBg || !VALID_VARIANTS.includes(activeBg)) {
    res.status(400).json({ success: false, message: "activeBg inválido" });
    return;
  }

  try {
    const config = await prisma.siteConfig.upsert({
      where:  { id: "global" },
      update: { activeBg },
      create: { id: "global", activeBg },
    });
    res.json({ success: true, activeBg: config.activeBg });
  } catch (err) {
    console.error("[config] PUT error:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

export default router;
