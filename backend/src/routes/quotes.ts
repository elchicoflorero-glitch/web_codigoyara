import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { prisma } from "../services/db";
import { sendQuoteEmails, sendReplyEmail, sendAutoReplyEmail } from "../services/email";
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

// POST /api/quotes/:id/reply — admin only
const replySchema = z.object({
  subject: z.string().min(1, "El asunto es requerido"),
  body:    z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

router.post("/:id/reply", requireAuth, async (req: AuthRequest, res: Response) => {
  const parsed = replySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    return;
  }

  try {
    const quote = await prisma.quote.findUnique({ where: { id: String(req.params.id) } });
    if (!quote) {
      res.status(404).json({ success: false, message: "Cotización no encontrada" });
      return;
    }

    await sendReplyEmail({
      toName:  quote.name,
      toEmail: quote.email,
      subject: parsed.data.subject,
      body:    parsed.data.body,
    });

    // Guardar mensaje enviado + marcar como contactado si estaba pendiente
    await prisma.quote.update({
      where: { id: quote.id },
      data: {
        replyMessage: `Asunto: ${parsed.data.subject}\n\n${parsed.data.body}`,
        repliedAt:    new Date(),
        ...(quote.status === "PENDING" ? { status: "CONTACTED" } : {}),
      },
    });

    res.json({ success: true, message: "Respuesta enviada correctamente" });
  } catch (err) {
    console.error("[quotes] Error al enviar respuesta:", err);
    res.status(500).json({ success: false, message: "Error al enviar el correo" });
  }
});

// DELETE /api/quotes/:id — admin only
router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.quote.delete({ where: { id: String(req.params.id) } });
    res.json({ success: true, message: "Cotización eliminada" });
  } catch {
    res.status(500).json({ success: false, message: "Error al eliminar" });
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
  const result = quoteSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });
    return;
  }

  const data = result.data;

  try {
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

    const config = await prisma.siteConfig.findUnique({ where: { id: "global" } });
    const isAutoReply = config?.autoReply ?? false;

    if (isAutoReply) {
      // Modo automático: auto-reply al cliente + notificación interna + status CONTACTED + guardar mensaje
      const autoBody = `Estimado/a ${data.name},\n\nHemos recibido su solicitud de cotización para el desarrollo de "${data.projectType}", con un presupuesto estimado de ${data.budget}.\n\nUn especialista de nuestro equipo se comunicará con usted en un plazo máximo de 24 horas hábiles.\n\nAtentamente,\nEquipo Código Yara`;

      Promise.allSettled([
        sendAutoReplyEmail({
          toName:      data.name,
          toEmail:     data.email,
          projectType: data.projectType,
          budget:      data.budget,
        }),
        sendQuoteEmails({
          quoteId:          quote.id,
          name:             data.name,
          company:          data.company,
          email:            data.email,
          phone:            data.phone,
          projectType:      data.projectType,
          budget:           data.budget,
          message:          data.message,
          skipConfirmation: true,
        }),
      ]).then(() =>
        prisma.quote.update({
          where: { id: quote.id },
          data: {
            status:       "CONTACTED",
            replyMessage: autoBody,
            repliedAt:    new Date(),
          },
        }).catch((err) => console.error("[quotes] Error actualizando status:", err))
      ).catch((err) => console.error("[quotes] Error en auto-reply:", err));

    } else {
      // Modo manual: solo notificación interna, sin correo al cliente
      sendQuoteEmails({
        quoteId:          quote.id,
        name:             data.name,
        company:          data.company,
        email:            data.email,
        phone:            data.phone,
        projectType:      data.projectType,
        budget:           data.budget,
        message:          data.message,
        skipConfirmation: true,
      }).catch((err) => console.error("[quotes] Error enviando notificación:", err));
    }

    res.status(201).json({
      success: true,
      message: "Cotización recibida. Nos pondremos en contacto con usted pronto.",
      id: quote.id,
    });
  } catch (err) {
    console.error("[quotes] Error al guardar cotización:", err);
    res.status(500).json({ success: false, message: "Error interno. Por favor inténtalo de nuevo." });
  }
});

export default router;
