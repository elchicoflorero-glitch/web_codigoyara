import type { IconName } from "@/types";

export const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "web", title: "Desarrollo Web", text: "Aplicaciones web modernas, rápidas y escalables que convierten visitas en oportunidades." },
  { icon: "mobile", title: "Aplicaciones móviles", text: "Apps Android y multiplataforma con experiencias fluidas, intuitivas y consistentes." },
  { icon: "database", title: "Sistemas empresariales", text: "Plataformas para administrar procesos, equipos, operaciones y datos críticos." },
  { icon: "braces", title: "Software a medida", text: "Soluciones diseñadas desde cero para adaptarse a la lógica real de tu empresa." },
  { icon: "commerce", title: "E-commerce", text: "Tiendas virtuales modernas, seguras y optimizadas para vender más." },
  { icon: "link", title: "Integración de APIs", text: "Conectamos herramientas y servicios para automatizar procesos sin fricción." },
];

export const technologies: string[] = [
  "Flutter", "Dart", "React", "Next.js", "Node.js",
  "NestJS", "PostgreSQL", "Python", "Docker", "Git",
];

export const processSteps: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Descubrimiento", text: "Entendemos tu negocio, tus usuarios y objetivos." },
  { n: "02", title: "Diseño", text: "Creamos la experiencia y la interfaz del producto." },
  { n: "03", title: "Desarrollo", text: "Construimos con tecnología moderna y buenas prácticas." },
  { n: "04", title: "Pruebas", text: "Validamos rendimiento, seguridad y funcionamiento." },
  { n: "05", title: "Lanzamiento", text: "Publicamos y acompañamos la evolución del producto." },
];

export const projects: {
  type: string;
  label: string;
  title: string;
  slug: string;
  text: string;
  stack: string[];
  detail: {
    tagline: string;
    challenge: string;
    solution: string;
    results: { metric: string; label: string }[];
    features: string[];
    duration: string;
    year: string;
    color: string;
  };
}[] = [
  {
    type: "dashboard",
    label: "Operaciones",
    title: "Nexo ERP",
    slug: "nexo-erp",
    text: "Sistema de gestión empresarial que centraliza inventario, ventas y equipos.",
    stack: ["React", "NestJS", "PostgreSQL"],
    detail: {
      tagline: "La operación de tu empresa, en un solo lugar.",
      challenge: "Una empresa de distribución con 80 empleados manejaba inventario en Excel, ventas en papel y equipos sin visibilidad centralizada. Los errores de stock costaban miles de dólares por mes.",
      solution: "Diseñamos y desarrollamos Nexo ERP, una plataforma web que integra inventario en tiempo real, módulo de ventas con facturación, gestión de equipos y reportes ejecutivos en un dashboard unificado.",
      results: [
        { metric: "62%", label: "Reducción de errores de stock" },
        { metric: "3x", label: "Velocidad en cierre de ventas" },
        { metric: "40%", label: "Ahorro operativo mensual" },
        { metric: "98%", label: "Adopción del equipo en 30 días" },
      ],
      features: [
        "Dashboard ejecutivo con KPIs en tiempo real",
        "Gestión de inventario con alertas automáticas",
        "Módulo de ventas con facturación electrónica",
        "Administración de equipos y permisos por rol",
        "Reportes exportables en PDF y Excel",
        "API REST documentada para integraciones",
      ],
      duration: "4 meses",
      year: "2025",
      color: "#246bfe",
    },
  },
  {
    type: "mobile",
    label: "Fintech",
    title: "Pulse Mobile",
    slug: "pulse-mobile",
    text: "Aplicación móvil para gestionar finanzas y objetivos desde cualquier lugar.",
    stack: ["Flutter", "Node.js", "AWS"],
    detail: {
      tagline: "Tus finanzas personales, inteligentes y simples.",
      challenge: "Los usuarios jóvenes no tenían una herramienta que combinara seguimiento de gastos, metas de ahorro y visualización clara de su salud financiera en una sola app móvil nativa.",
      solution: "Desarrollamos Pulse Mobile con Flutter para Android e iOS. La app conecta con cuentas bancarias vía Open Banking, categoriza gastos automáticamente con IA y gamifica el ahorro con objetivos visuales.",
      results: [
        { metric: "50K+", label: "Usuarios activos al mes 3" },
        { metric: "4.8★", label: "Rating en Play Store" },
        { metric: "68%", label: "Retención a 30 días" },
        { metric: "2.1s", label: "Tiempo de carga promedio" },
      ],
      features: [
        "Conexión con bancos vía Open Banking API",
        "Categorización automática de gastos con IA",
        "Metas de ahorro con progreso visual",
        "Notificaciones inteligentes de gastos",
        "Modo oscuro y accesibilidad completa",
        "Sincronización offline con AWS",
      ],
      duration: "6 meses",
      year: "2025",
      color: "#0ea5e9",
    },
  },
  {
    type: "saas",
    label: "SaaS",
    title: "Metric Cloud",
    slug: "metric-cloud",
    text: "Plataforma de analítica operativa con reportes y alertas en tiempo real.",
    stack: ["Next.js", "Python", "Docker"],
    detail: {
      tagline: "Decisiones más rápidas basadas en datos reales.",
      challenge: "Empresas medianas sin equipo de datos necesitaban visibilidad operativa sin la complejidad ni el costo de herramientas enterprise como Tableau o PowerBI.",
      solution: "Metric Cloud es un SaaS de analítica que se conecta a las fuentes de datos existentes (bases de datos, APIs, hojas de cálculo) y genera dashboards automáticos con alertas configurables y reportes programados.",
      results: [
        { metric: "120+", label: "Empresas en la plataforma" },
        { metric: "15min", label: "Setup inicial promedio" },
        { metric: "99.9%", label: "Uptime garantizado" },
        { metric: "5x", label: "ROI promedio en 90 días" },
      ],
      features: [
        "Conectores para PostgreSQL, MySQL, REST APIs y Google Sheets",
        "Builder de dashboards drag & drop",
        "Alertas por email, Slack y WhatsApp",
        "Reportes PDF programados automáticamente",
        "Multi-tenant con aislamiento de datos",
        "SSO con Google y Microsoft",
      ],
      duration: "8 meses",
      year: "2026",
      color: "#7c3aed",
    },
  },
];

export const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "braces", title: "Desarrollo personalizado", text: "Cada solución nace de tus objetivos y se adapta a tus procesos." },
  { icon: "spark", title: "Tecnología moderna", text: "Un stack robusto para construir productos rápidos y seguros." },
  { icon: "rocket", title: "Escalabilidad", text: "Arquitecturas preparadas para crecer junto a tu negocio." },
  { icon: "support", title: "Soporte continuo", text: "Te acompañamos antes, durante y después del lanzamiento." },
];
