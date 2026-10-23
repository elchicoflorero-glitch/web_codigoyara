interface AutoReplyData {
  name: string;
  projectType: string;
  budget: string;
}

export function autoReplyTemplate({ name, projectType, budget }: AutoReplyData): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111111;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:48px 24px 0;">

        <!-- Logo -->
        <p style="margin:0 0 48px;font-size:18px;font-weight:700;letter-spacing:-0.3px;color:#111111;">
          Código Yara
        </p>

        <!-- Content -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
          <tr>
            <td style="font-size:15px;line-height:1.75;color:#333333;text-align:left;">
              <p style="margin:0 0 20px;">Estimado/a ${name},</p>
              <p style="margin:0 0 20px;">
                Hemos recibido su solicitud de cotización para el desarrollo de
                <strong>${projectType}</strong>, con un presupuesto estimado de
                <strong>${budget}</strong>.
              </p>
              <p style="margin:0 0 20px;">
                Un especialista de nuestro equipo analizará los detalles de su proyecto
                y se comunicará con usted en un plazo máximo de <strong>24 horas hábiles</strong>
                para coordinar una reunión y presentarle una propuesta técnica y económica personalizada.
              </p>
              <p style="margin:0;">
                Si desea proporcionar información adicional o tiene alguna consulta, puede responder
                directamente a este correo.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:40px 0 20px;">
              <hr style="border:none;border-top:1px solid #ebebeb;margin:0;" />
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="font-size:14px;color:#333333;line-height:1.6;text-align:left;padding-bottom:16px;">
              Atentamente,<br/>
              <strong>Equipo Código Yara</strong><br/>
              <span style="color:#888888;font-size:12px;">Desarrollo de software y soluciones digitales</span>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="font-size:12px;color:#999999;line-height:1.6;text-align:left;padding-bottom:48px;border-top:1px solid #ebebeb;padding-top:16px;">
              Este mensaje fue generado automáticamente tras recibir su solicitud en
              <a href="https://codigoyara.com" style="color:#999999;">codigoyara.com</a>.<br/>
              Para consultas, escríbenos a
              <a href="mailto:codigoyara@codigoyara.com" style="color:#111111;">codigoyara@codigoyara.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
