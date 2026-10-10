import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../services/db";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

const submitSchema = z.object({
  name:    z.string().min(2),
  role:    z.string().min(2),
  company: z.string().min(1),
  quote:   z.string().min(20),
  rating:  z.number().min(1).max(5).default(5),
});

// GET /api/testimonials — public, only approved
router.get("/", async (_req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where:   { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: testimonials });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// GET /api/testimonials/all — admin
router.get("/all", requireAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, data: testimonials });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// POST /api/testimonials — public submission
router.post("/", async (req: Request, res: Response) => {
  const result = submitSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors }); return; }

  try {
    const t = await prisma.testimonial.create({ data: result.data });
    res.status(201).json({ success: true, message: "Gracias por tu comentario. Lo revisaremos pronto.", id: t.id });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// PUT /api/testimonials/:id/status — admin approve/reject
router.put("/:id/status", requireAuth, async (req: AuthRequest, res: Response) => {
  const { status } = req.body as { status: "APPROVED" | "REJECTED" };
  if (!["APPROVED", "REJECTED"].includes(status)) {
    res.status(400).json({ success: false, message: "Estado inválido" }); return;
  }
  try {
    const t = await prisma.testimonial.update({ where: { id: String(req.params.id) }, data: { status } });
    res.json({ success: true, data: t });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// DELETE /api/testimonials/:id — admin
router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.testimonial.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: "Eliminado" });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

export default router;
