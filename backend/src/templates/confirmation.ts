interface ConfirmationData {
  name: string;
  phone?: string;
  projectType: string;
  budget: string;
}

export function confirmationTemplate({ name, phone, projectType, budget }: ConfirmationData): string {
  const phoneLine = phone
    ? `Un agente de nuestro equipo se comunicará contigo al número <strong>${phone}</strong> en las próximas horas.`
    : `Un agente de nuestro equipo se pondrá en contacto contigo a la brevedad por este correo.`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recibimos tu solicitud — Código Yara</title>
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
                    <span style="color:rgba(255,255,255,0.5);font-size:11px;">Confirmación de solicitud</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 16px;color:#0f1f35;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                ¡Recibimos tu solicitud, ${name}!
              </h1>

              <!-- Aviso de contacto -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#edf5ff;border:1px solid #c2d5ff;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:14px;vertical-align:top;">
                          <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#1f65f5,#3388ff);display:inline-flex;align-items:center;justify-content:center;font-size:18px;line-height:36px;text-align:center;">👤</div>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;color:#0f1f35;font-size:14px;font-weight:700;">Tu agente te contactará pronto</p>
                          <p style="margin:0;color:#536078;font-size:13px;line-height:1.6;">${phoneLine}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;color:#536078;font-size:14px;line-height:1.7;">
                También revisaremos los detalles de tu proyecto y te responderemos con una propuesta en menos de <strong>24 horas hábiles</strong>.
              </p>

              <!-- Resumen -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafd;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 14px;color:#8494a8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Resumen de tu solicitud</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:9px 0;border-bottom:1px solid #e4eaf2;color:#536078;font-size:13px;">Tipo de proyecto</td>
                        <td style="padding:9px 0;border-bottom:1px solid #e4eaf2;color:#0f1f35;font-size:13px;font-weight:600;text-align:right;">${projectType}</td>
                      </tr>
                      <tr>
                        <td style="padding:9px 0;color:#536078;font-size:13px;">Presupuesto estimado</td>
                        <td style="padding:9px 0;color:#0f1f35;font-size:13px;font-weight:600;text-align:right;">${budget}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

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
                Este correo fue enviado porque completaste el formulario de contacto en codigoyara.com.<br/>
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
