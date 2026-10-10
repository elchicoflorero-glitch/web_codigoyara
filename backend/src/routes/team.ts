import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../services/db";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

const memberSchema = z.object({
  name:     z.string().min(2),
  role:     z.string().min(2),
  bio:      z.string().min(10),
  initials: z.string().min(1).max(3),
  color:    z.string().default("#246bfe"),
  linkedin: z.string().default("#"),
  order:    z.number().default(0),
  active:   z.boolean().default(true),
  photo:    z.string().optional().nullable(),  // base64 data URL
});

// GET /api/team — public
router.get("/", async (_req: Request, res: Response) => {
  try {
    const members = await prisma.teamMember.findMany({
      where:   { active: true },
      orderBy: { order: "asc" },
    });
    res.json({ success: true, data: members });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// POST /api/team — admin
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const result = memberSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors }); return; }

  try {
    const member = await prisma.teamMember.create({ data: result.data });
    res.status(201).json({ success: true, data: member });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// PUT /api/team/:id — admin
router.put("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const result = memberSchema.partial().safeParse(req.body);
  if (!result.success) { res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors }); return; }

  try {
    const member = await prisma.teamMember.update({ where: { id: String(req.params.id) }, data: result.data });
    res.json({ success: true, data: member });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// DELETE /api/team/:id — admin
router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.teamMember.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: "Miembro eliminado" });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

export default router;
