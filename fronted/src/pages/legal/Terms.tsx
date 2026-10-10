import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { Icon } from "@/components/ui";

const sections = [
  {
    title: "1. Aceptación de los términos",
    content: `Al acceder y utilizar el sitio web de Nuvora, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice nuestros servicios.`,
  },
  {
    title: "2. Descripción de servicios",
    content: `Nuvora ofrece servicios de desarrollo de software, aplicaciones web y móviles, sistemas empresariales, e-commerce e integración de APIs. Los detalles específicos de cada proyecto se definen en contratos individuales con cada cliente.`,
  },
  {
    title: "3. Propiedad intelectual",
    content: `El contenido de este sitio web, incluyendo textos, imágenes, logos y código, es propiedad de Nuvora y está protegido por leyes de derechos de autor. El código y productos desarrollados para clientes son propiedad del cliente tras el pago completo, según lo estipulado en cada contrato.`,
  },
  {
    title: "4. Uso del sitio",
    content: `Usted se compromete a utilizar este sitio de manera legal y ética. Está prohibido realizar actividades que interfieran con el funcionamiento del sitio, intentar acceder a áreas no autorizadas, o utilizar el sitio para fines fraudulentos o ilegales.`,
  },
  {
    title: "5. Limitación de responsabilidad",
    content: `Nuvora no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios. Nuestra responsabilidad máxima no excederá el monto pagado por el servicio específico en cuestión durante los últimos tres meses.`,
  },
  {
    title: "6. Confidencialidad",
    content: `Toda información comercial, técnica o de negocios compartida durante el proceso de cotización o desarrollo se considerará confidencial. Firmamos NDAs con todos nuestros clientes que lo requieran, y tratamos la información del cliente con la máxima discreción.`,
  },
  {
    title: "7. Pagos y facturación",
    content: `Los términos de pago se establecen en cada contrato individual. Generalmente trabajamos con un adelanto del 50% para iniciar el proyecto y el 50% restante al finalizar. Los precios están expresados en USD y no incluyen impuestos locales aplicables.`,
  },
  {
    title: "8. Modificaciones",
    content: `Nuvora se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. El uso continuado del sitio tras las modificaciones implica la aceptación de los nuevos términos.`,
  },
  {
    title: "9. Ley aplicable",
    content: `Estos términos se rigen por las leyes de la República del Perú y la legislación sueca aplicable según la sede del servicio contratado. Cualquier disputa será sometida a los mecanismos de resolución acordados en el contrato individual con cada cliente.`,
  },
];

export default function Terms() {
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
              <h1>Términos y Condiciones</h1>
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
            <h3>¿Preguntas sobre nuestros términos?</h3>
            <p>Escribinos a <a href="mailto:hola@nuvora.dev">hola@nuvora.dev</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
