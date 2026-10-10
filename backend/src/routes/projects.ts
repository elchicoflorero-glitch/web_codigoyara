import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../services/db";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

const projectSchema = z.object({
  slug:      z.string().min(2),
  title:     z.string().min(2),
  label:     z.string().min(1),
  type:      z.string().default("dashboard"),
  text:      z.string().min(1),
  stack:     z.array(z.string()).min(1),
  tagline:   z.string().min(1),
  challenge: z.string().min(1),
  solution:  z.string().min(1),
  duration:  z.string().min(1),
  year:      z.string().min(4),
  color:     z.string().default("#246bfe"),
  published: z.boolean().default(false),
  features:  z.array(z.string()).default([]),
  results:   z.array(z.object({
    metric: z.string(),
    label:  z.string(),
  })).default([]),
  coverImage: z.string().nullable().optional(),  // base64 data URL
  images:    z.array(z.string()).default([]),     // base64 data URLs
  videos:    z.array(z.string()).default([]),     // video URLs
});

// GET /api/projects — public, only published
router.get("/", async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where:   { published: true },
      include: { results: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// GET /api/projects/all — admin only
router.get("/all", requireAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { results: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// GET /api/projects/:slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where:   { slug: String(req.params.slug) },
      include: { results: true },
    });
    if (!project) { res.status(404).json({ success: false, message: "No encontrado" }); return; }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// POST /api/projects — admin only
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const result = projectSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors }); return; }

  const { results, ...data } = result.data;
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        results: { create: results },
      },
      include: { results: true },
    });
    res.status(201).json({ success: true, data: project });
  } catch (err: any) {
    if (err.code === "P2002") { res.status(400).json({ success: false, message: "El slug ya existe" }); return; }
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// PUT /api/projects/:id — admin only
router.put("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const result = projectSchema.partial().safeParse(req.body);
  if (!result.success) { res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors }); return; }

  const { results, ...data } = result.data;
  try {
    if (results) {
      await prisma.projectResult.deleteMany({ where: { projectId: String(req.params.id) } });
    }
    const project = await prisma.project.update({
      where: { id: String(req.params.id) },
      data: {
        ...data,
        ...(results ? { results: { create: results } } : {}),
      },
      include: { results: true },
    });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// DELETE /api/projects/:id — admin only
router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.project.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: "Proyecto eliminado" });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

export default router;
