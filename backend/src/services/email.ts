import { Resend } from "resend";
import { confirmationTemplate } from "../templates/confirmation";
import { notificationTemplate } from "../templates/notification";
import { replyTemplate } from "../templates/reply";
import { autoReplyTemplate } from "../templates/autoReply";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "Código Yara <noreply@codigoyara.com>";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "codigoyara@codigoyara.com";

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
      subject: `Recibimos tu solicitud, ${data.name} — Código Yara`,
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

interface ReplyEmailData {
  toName: string;
  toEmail: string;
  subject: string;
  body: string;
}

export async function sendReplyEmail(data: ReplyEmailData): Promise<void> {
  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.toEmail,
    subject: data.subject,
    html: replyTemplate({
      name: data.toName,
      subject: data.subject,
      body: data.body,
    }),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

interface AutoReplyEmailData {
  toName: string;
  toEmail: string;
  projectType: string;
  budget: string;
}

export async function sendAutoReplyEmail(data: AutoReplyEmailData): Promise<void> {
  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.toEmail,
    subject: `Tu solicitud fue recibida — Código Yara`,
    html: autoReplyTemplate({
      name:        data.toName,
      projectType: data.projectType,
      budget:      data.budget,
    }),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}
