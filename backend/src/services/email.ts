import { Resend } from "resend";
import { confirmationTemplate } from "../templates/confirmation";
import { notificationTemplate } from "../templates/notification";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "Nuvora <onboarding@resend.dev>";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "hola@nuvora.dev";

interface QuoteEmailData {
  quoteId: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
}

export async function sendQuoteEmails(data: QuoteEmailData): Promise<void> {
  const [confirmation, notification] = await Promise.allSettled([
    // Email de confirmación al usuario
    resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Recibimos tu solicitud, ${data.name} — Nuvora`,
      html: confirmationTemplate({
        name: data.name,
        phone: data.phone,
        projectType: data.projectType,
        budget: data.budget,
      }),
    }),
    // Notificación interna al equipo
    resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: `${data.name} <${data.email}>`,
      subject: `Nueva cotización de ${data.name} (${data.company})`,
      html: notificationTemplate(data),
    }),
  ]);

  // Log de errores sin romper el flujo
  if (confirmation.status === "rejected") {
    console.error("[email] Error al enviar confirmación:", confirmation.reason);
  }
  if (notification.status === "rejected") {
    console.error("[email] Error al enviar notificación:", notification.reason);
  }
}
