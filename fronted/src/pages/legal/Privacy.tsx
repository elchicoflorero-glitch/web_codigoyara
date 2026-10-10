import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { Icon } from "@/components/ui";

const sections = [
  {
    title: "1. Información que recopilamos",
    content: `Recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, empresa y número de teléfono al completar el formulario de contacto. También podemos recopilar información técnica como dirección IP, tipo de navegador y páginas visitadas para mejorar nuestra plataforma.`,
  },
  {
    title: "2. Uso de la información",
    content: `Utilizamos la información recopilada para responder a sus consultas y solicitudes de cotización, mejorar nuestros servicios y la experiencia del usuario, enviar comunicaciones relacionadas con sus proyectos, y cumplir con obligaciones legales aplicables.`,
  },
  {
    title: "3. Protección de datos",
    content: `Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sus datos se almacenan en servidores seguros con cifrado en tránsito y en reposo.`,
  },
  {
    title: "4. Compartición de información",
    content: `No vendemos, alquilamos ni compartimos su información personal con terceros para fines comerciales. Podemos compartir datos con proveedores de servicios de confianza que nos asisten en la operación del sitio, siempre bajo acuerdos de confidencialidad.`,
  },
  {
    title: "5. Cookies",
    content: `Utilizamos cookies técnicas necesarias para el funcionamiento del sitio. No utilizamos cookies de rastreo publicitario de terceros. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades.`,
  },
  {
    title: "6. Sus derechos",
    content: `Usted tiene derecho a acceder, rectificar, eliminar o limitar el tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en hola@nuvora.dev. Responderemos a su solicitud dentro de los plazos legalmente establecidos.`,
  },
  {
    title: "7. Retención de datos",
    content: `Conservamos sus datos personales durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, o según lo exija la legislación aplicable. Los datos de contacto se eliminan a solicitud del usuario.`,
  },
  {
    title: "8. Cambios en esta política",
    content: `Podemos actualizar esta política de privacidad periódicamente. Notificaremos cambios significativos por correo electrónico o mediante un aviso prominente en nuestro sitio web. La fecha de última actualización se indica al final de este documento.`,
  },
];

export default function Privacy() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="legal-page">
        <div className="legal-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Link to="/" className="legal-back">
                <Icon name="arrow" size={15} /> Volver al inicio
              </Link>
              <span className="legal-label">Legal</span>
              <h1>Política de Privacidad</h1>
              <p>Última actualización: Octubre 2026 · Nuvora — Lima, Perú & Estocolmo, Suecia</p>
            </motion.div>
          </div>
        </div>

        <div className="container legal-body">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </motion.div>
          ))}

          <div className="legal-contact">
            <h3>¿Preguntas sobre privacidad?</h3>
            <p>Si tenés preguntas sobre esta política, contactanos en <a href="mailto:hola@nuvora.dev">hola@nuvora.dev</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
