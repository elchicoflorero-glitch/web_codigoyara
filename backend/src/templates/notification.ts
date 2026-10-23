interface NotificationData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
  quoteId: string;
}

export function notificationTemplate(data: NotificationData): string {
  const {
    name, company, email, phone,
    projectType, budget, message, quoteId,
  } = data;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Nueva cotización — Código Yara</title>
</head>
<body style="margin:0;padding:0;background:#07101f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0a1629;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color:#ffffff;font-size:18px;font-weight:800;">Código Yara</span>
                    <span style="display:inline-block;margin-left:12px;padding:3px 10px;background:rgba(79,224,167,0.12);border:1px solid rgba(79,224,167,0.25);border-radius:20px;color:#4fe0a7;font-size:10px;font-weight:700;letter-spacing:1px;vertical-align:middle;">NUEVA COTIZACIÓN</span>
                  </td>
                  <td align="right">
                    <span style="color:#536078;font-size:10px;">ID: ${quoteId}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">

              <!-- Datos del cliente -->
              <p style="margin:0 0 16px;color:#6eb8ff;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Datos del cliente</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${[
                  ["Nombre", name],
                  ["Empresa", company],
                  ["Email", `<a href="mailto:${email}" style="color:#50a6ff;">${email}</a>`],
                  ["Teléfono", phone ?? "—"],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#536078;font-size:12px;width:140px;">${label}</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#dce8f8;font-size:12px;font-weight:600;">${value}</td>
                </tr>`).join("")}
              </table>

              <!-- Detalles del proyecto -->
              <p style="margin:0 0 16px;color:#6eb8ff;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Detalles del proyecto</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${[
                  ["Tipo de proyecto", projectType],
                  ["Presupuesto", budget],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#536078;font-size:12px;width:140px;">${label}</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#dce8f8;font-size:12px;font-weight:600;">${value}</td>
                </tr>`).join("")}
              </table>

              <!-- Mensaje -->
              <p style="margin:0 0 12px;color:#6eb8ff;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Mensaje</p>
              <div style="padding:18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;">
                <p style="margin:0;color:#a8b9cc;font-size:13px;line-height:1.75;">${message}</p>
              </div>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#1f65f5,#3388ff);border-radius:10px;">
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;">
                      Responder a ${name} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#536078;font-size:10px;">
                Notificación automática del sistema de cotizaciones · codigoyara.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
