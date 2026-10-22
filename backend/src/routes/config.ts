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
    res.json({
      success: true,
      activeBg: config.activeBg,
      customVideoId: config.customVideoId ?? null,
    });
  } catch (err) {
    console.error("[config] GET error:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// PUT /api/config  ─── protegido: solo admin puede cambiar el fondo
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const { activeBg, customVideoId } = req.body as { activeBg?: string; customVideoId?: string };

  const VALID_VARIANTS = ["hero", "aurora", "neon", "ocean", "nebula", "matrix", "white", "flowers", "cyberpunk", "galaxy", "storm", "beach", "lofi", "custom"];

  // Si viene activeBg debe ser válido
  if (activeBg && !VALID_VARIANTS.includes(activeBg)) {
    res.status(400).json({ success: false, message: "activeBg inválido" });
    return;
  }

  // Si activeBg es "custom" debe venir customVideoId
  if (activeBg === "custom" && !customVideoId) {
    res.status(400).json({ success: false, message: "Se requiere customVideoId para el fondo personalizado" });
    return;
  }

  try {
    const updateData: { activeBg?: string; customVideoId?: string } = {};
    if (activeBg) updateData.activeBg = activeBg;
    if (customVideoId !== undefined) updateData.customVideoId = customVideoId;

    const config = await prisma.siteConfig.upsert({
      where:  { id: "global" },
      update: updateData,
      create: { id: "global", activeBg: activeBg ?? "hero", customVideoId: customVideoId ?? null },
    });
    res.json({
      success: true,
      activeBg: config.activeBg,
      customVideoId: config.customVideoId ?? null,
    });
  } catch (err) {
    console.error("[config] PUT error:", err);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

export default router;
