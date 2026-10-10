import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { prisma } from "../services/db";
import { sendQuoteEmails } from "../services/email";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/quotes — admin only
router.get("/", requireAuth, async (_req: AuthRequest, res: Response) => {
  try {
    const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, data: quotes });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

// PUT /api/quotes/:id/status — admin only
router.put("/:id/status", requireAuth, async (req: AuthRequest, res: Response) => {
  const { status } = req.body as { status: string };
  const valid = ["PENDING","CONTACTED","IN_PROGRESS","CLOSED"];
  if (!valid.includes(status)) {
    res.status(400).json({ success: false, message: "Estado inválido" }); return;
  }
  try {
    const quote = await prisma.quote.update({
      where: { id: String(req.params.id) },
      data:  { status: status as any },
    });
    res.json({ success: true, data: quote });
  } catch {
    res.status(500).json({ success: false, message: "Error interno" });
  }
});
const quoteSchema = z.object({
  name:        z.string().min(2,  "El nombre es requerido"),
  company:     z.string().min(1,  "La empresa es requerida"),
  email:       z.string().email("Email inválido"),
  phone:       z.string().optional(),
  projectType: z.string().min(1,  "El tipo de proyecto es requerido"),
  budget:      z.string().min(1,  "El presupuesto es requerido"),
  message:     z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

router.post("/", async (req: Request, res: Response) => {
  // Validación
  const result = quoteSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  const data = result.data;

  try {
    // Guardar en DB
    const quote = await prisma.quote.create({
      data: {
        name:        data.name,
        company:     data.company,
        email:       data.email,
        phone:       data.phone,
        projectType: data.projectType,
        budget:      data.budget,
        message:     data.message,
      },
    });

    // Enviar emails (no bloqueante para el response)
    sendQuoteEmails({
      quoteId:     quote.id,
      name:        data.name,
      company:     data.company,
      email:       data.email,
      phone:       data.phone,
      projectType: data.projectType,
      budget:      data.budget,
      message:     data.message,
    }).catch((err) =>
      console.error("[quotes] Error enviando emails:", err)
    );

    res.status(201).json({
      success: true,
      message: "Cotización recibida. Te contactaremos en menos de 24 horas.",
      id: quote.id,
    });
  } catch (err) {
    console.error("[quotes] Error al guardar cotización:", err);
    res.status(500).json({
      success: false,
      message: "Error interno. Por favor intentá de nuevo.",
    });
  }
});

export default router;
