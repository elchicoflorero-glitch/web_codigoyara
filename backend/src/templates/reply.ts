interface ReplyData {
  name: string;
  subject: string;
  body: string;
}

export function replyTemplate({ name, subject, body }: ReplyData): string {
  // Convert newlines to <br> for HTML rendering
  const htmlBody = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f2251,#1a4db5);padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Código Yara</span>
                  </td>
                  <td align="right">
                    <span style="color:rgba(255,255,255,0.5);font-size:11px;">Respuesta a tu cotización</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 20px;color:#0f1f35;font-size:20px;font-weight:700;">
                Hola, ${name}
              </h2>

              <div style="color:#4a5568;font-size:14px;line-height:1.8;margin-bottom:32px;">
                ${htmlBody}
              </div>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e4eaf2;margin:28px 0;" />

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#1f65f5,#3388ff);border-radius:10px;">
                    <a href="https://codigoyara.com" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">
                      Ver nuestro trabajo →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background:#f8fafd;border-top:1px solid #e4eaf2;">
              <p style="margin:0;color:#8494a8;font-size:11px;line-height:1.6;">
                Este correo es una respuesta a tu solicitud de cotización en codigoyara.com.<br/>
                Si tenés preguntas escribinos a <a href="mailto:codigoyara@codigoyara.com" style="color:#246bfe;">codigoyara@codigoyara.com</a>
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
