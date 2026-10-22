import type { Lang } from "./LangContext";

export interface Translations {
  // ── Navbar ──────────────────────────────────────────────
  nav: {
    home: string;
    services: string;
    projects: string;
    team: string;
    contact: string;
    cta: string;
  };
  // ── Hero ────────────────────────────────────────────────
  hero: {
    pill: string;
    h1a: string;
    h1verb: string;
    h1b: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    tag1: string;
    tag2: string;
    tag3: string;
    stat1label: string;
    stat2label: string;
    stat3label: string;
    stat4label: string;
  };
  // ── Services ────────────────────────────────────────────
  services: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    items: { title: string; text: string }[];
  };
  // ── Projects ────────────────────────────────────────────
  projects: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    viewProject: string;
  };
  // ── Testimonials ────────────────────────────────────────
  testimonials: {
    eyebrow: string;
    title: string;
    text: string;
    formTitle: string;
    formText: string;
    fieldName: string;
    fieldRole: string;
    fieldCompany: string;
    fieldRating: string;
    fieldComment: string;
    commentPlaceholder: string;
    submitBtn: string;
    sending: string;
    successTitle: string;
  };
  // ── Contact ─────────────────────────────────────────────
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    writeUs: string;
    callUs: string;
    offices: string;
    fieldName: string;
    fieldCompany: string;
    fieldEmail: string;
    fieldPhone: string;
    fieldProjectType: string;
    fieldBudget: string;
    fieldMessage: string;
    messagePlaceholder: string;
    submitBtn: string;
    sending: string;
    sent: string;
    orManually: string;
    projectOptions: string[];
    budgetOptions: string[];
    toastTitle: string;
    toastText: string;
  };
  // ── Footer ──────────────────────────────────────────────
  footer: {
    tagline: string;
    colCompany: string;
    colServices: string;
    colContact: string;
    serviceItems: string[];
    rights: string;
    privacy: string;
    terms: string;
  };
  // ── IdeaToProduct ───────────────────────────────────────
  ideaToProduct: {
    eyebrow: string;
    title: string;
    text: string;
  };
  // ── Terminal ────────────────────────────────────────────
  terminal: {
    eyebrow: string;
    title: string;
    text: string;
  };
  // ── Team ────────────────────────────────────────────────
  team: {
    eyebrow: string;
    title: string;
    text: string;
    values: string[];
  };
  // ── FAQ ─────────────────────────────────────────────────
  faq: {
    eyebrow: string;
    title: string;
    text: string;
    items: { q: string; a: string }[];
  };
}

const es: Translations = {
  nav: {
    home: "Inicio", services: "Servicios", projects: "Proyectos",
    team: "Equipo", contact: "Contacto", cta: "Solicitar cotización",
  },
  hero: {
    pill: "Software que mueve negocios reales",
    h1a: "Transformamos ideas en software que",
    h1verb: "hace crecer",
    h1b: "tu negocio",
    desc: "Desarrollamos soluciones digitales modernas, escalables y personalizadas para empresas que buscan optimizar procesos, mejorar su productividad y crecer.",
    ctaPrimary: "Solicitar cotización",
    ctaSecondary: "Ver nuestros servicios",
    tag1: "Desarrollo a medida",
    tag2: "Apps Web y Mobile",
    tag3: "Soluciones escalables",
    stat1label: "Proyectos desarrollados",
    stat2label: "Clientes satisfechos",
    stat3label: "Desarrollo personalizado",
    stat4label: "Soporte continuo",
  },
  services: {
    eyebrow: "Lo que hacemos",
    title: "Soluciones digitales para tu negocio",
    text: "Diseñamos productos digitales que resuelven desafíos reales, simplifican la operación y crean nuevas oportunidades de crecimiento.",
    cta: "Solicitar este servicio",
    items: [
      { title: "Integración de APIs", text: "Conectamos herramientas y servicios para automatizar procesos sin fricción." },
      { title: "Desarrollo Web", text: "Aplicaciones web modernas, rápidas y escalables que convierten visitas en oportunidades." },
      { title: "Aplicaciones móviles", text: "Apps Android y multiplataforma con experiencias fluidas, intuitivas y consistentes." },
      { title: "Sistemas empresariales", text: "Plataformas para administrar procesos, equipos, operaciones y datos críticos." },
      { title: "Software a medida", text: "Soluciones diseñadas desde cero para adaptarse a la lógica real de tu empresa." },
      { title: "E-commerce", text: "Tiendas virtuales modernas, seguras y optimizadas para vender más." },
    ],
  },
  projects: {
    eyebrow: "Casos de éxito",
    title: "Proyectos que convierten ideas en soluciones",
    text: "Productos pensados para generar resultados medibles y experiencias que las personas disfrutan usar.",
    cta: "Explorar proyectos",
    viewProject: "Ver proyecto",
  },
  testimonials: {
    eyebrow: "Lo que dicen nuestros clientes",
    title: "Resultados que hablan por sí solos",
    text: "Empresas de distintas industrias confían en Nuvora para construir su tecnología.",
    formTitle: "¿Trabajaste con nosotros? Dejá tu comentario",
    formText: "Tu testimonio será revisado y publicado en esta sección.",
    fieldName: "Tu nombre", fieldRole: "Cargo / Rol", fieldCompany: "Empresa",
    fieldRating: "Tu calificación", fieldComment: "Tu comentario",
    commentPlaceholder: "Cuéntanos tu experiencia trabajando con Nuvora...",
    submitBtn: "Enviar comentario", sending: "Enviando...",
    successTitle: "¡Gracias por tu comentario!",
  },
  contact: {
    eyebrow: "Hablemos",
    title: "Tu próximo gran proyecto comienza aquí",
    text: "Cuéntanos sobre tu idea. Nuestro equipo la analizará y te contactará para definir el mejor camino.",
    writeUs: "Escríbenos", callUs: "Llámanos", offices: "Nuestras sedes",
    fieldName: "Nombre", fieldCompany: "Empresa", fieldEmail: "Correo electrónico",
    fieldPhone: "Teléfono", fieldProjectType: "Tipo de proyecto",
    fieldBudget: "Presupuesto aproximado", fieldMessage: "Cuéntanos sobre tu proyecto",
    messagePlaceholder: "¿Qué desafío quieres resolver?",
    submitBtn: "Enviar solicitud", sending: "Enviando...", sent: "Solicitud enviada",
    orManually: "o completá manualmente",
    projectOptions: ["Aplicación web", "Aplicación móvil", "Software a medida", "E-commerce", "Plataforma SaaS"],
    budgetOptions: ["Hasta USD 100", "USD 100 — 3k", "USD 3k — 8k", "USD 8k — 20k", "USD 20k — 50k", "Más de USD 50k"],
    toastTitle: "¡Solicitud enviada!", toastText: "Te contactaremos en menos de 24 horas.",
  },
  footer: {
    tagline: "Diseñamos y desarrollamos productos digitales que impulsan negocios hacia el futuro. Presencia en Lima y Estocolmo.",
    colCompany: "Empresa", colServices: "Servicios", colContact: "Contacto",
    serviceItems: ["Desarrollo Web", "Apps móviles", "Software a medida", "SaaS", "Sistemas empresariales"],
    rights: "Todos los derechos reservados.", privacy: "Privacidad", terms: "Términos",
  },
  ideaToProduct: {
    eyebrow: "Nuestro trabajo",
    title: "Mirá lo que construimos",
    text: "Una muestra real de cómo transformamos ideas en productos digitales de alto impacto.",
  },
  terminal: {
    eyebrow: "Flutter · Live build",
    title: "Código que se convierte en app",
    text: "Mirá cómo construimos una app móvil desde cero — línea a línea, en tiempo real.",
  },
  team: {
    eyebrow: "El equipo",
    title: "Las personas detrás de cada proyecto",
    text: "Un equipo pequeño, enfocado y con experiencia real construyendo productos digitales desde cero.",
    values: ["Obsesión por el producto", "Compromiso con la calidad", "Aprendizaje continuo", "Comunicación directa"],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Todo lo que necesitás saber",
    text: "Si tu pregunta no está acá, escribinos y te respondemos en menos de 24 horas.",
    items: [
      { q: "¿Cuánto tiempo tarda un proyecto típico?", a: "Depende de la complejidad. Una aplicación web o móvil estándar toma entre 6 y 14 semanas. Proyectos más grandes como plataformas SaaS o sistemas empresariales pueden tomar de 3 a 6 meses. En la primera reunión te damos una estimación concreta." },
      { q: "¿Trabajan con startups o solo con empresas grandes?", a: "Trabajamos con ambas. Tenemos experiencia acompañando startups desde su MVP hasta el escalado, y también ejecutando proyectos para empresas con operaciones consolidadas. El enfoque se adapta a cada etapa." },
      { q: "¿Qué pasa después del lanzamiento?", a: "Ofrecemos planes de soporte y mantenimiento post-lanzamiento. Esto incluye monitoreo, corrección de bugs, actualizaciones de seguridad y mejoras iterativas. No te dejamos solo después de entregar." },
      { q: "¿Cómo es el proceso de trabajo y comunicación?", a: "Trabajamos en sprints quincenales con demos al final de cada uno. Usamos herramientas como Slack, Notion y Linear para mantener todo visible y alineado. Siempre tendrás un punto de contacto directo." },
      { q: "¿Tienen contratos y protección de código?", a: "Sí. Cada proyecto tiene un contrato formal que incluye NDA, propiedad intelectual del cliente sobre el producto final, y términos claros de entrega y pagos. La transparencia es parte de cómo trabajamos." },
      { q: "¿Cuál es el presupuesto mínimo para arrancar?", a: "Los proyectos desde cero parten desde USD 3.000. También ofrecemos modelos de desarrollo por horas para equipos que necesitan refuerzo técnico. Cuéntanos tu caso y buscamos la mejor opción." },
    ],
  },
};

const en: Translations = {
  nav: {
    home: "Home", services: "Services", projects: "Projects",
    team: "Team", contact: "Contact", cta: "Request a quote",
  },
  hero: {
    pill: "Software that moves real businesses",
    h1a: "We transform ideas into software that",
    h1verb: "grows",
    h1b: "your business",
    desc: "We develop modern, scalable and tailored digital solutions for companies looking to optimize processes, improve productivity and grow.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "See our services",
    tag1: "Custom development",
    tag2: "Web & Mobile apps",
    tag3: "Scalable solutions",
    stat1label: "Projects delivered",
    stat2label: "Satisfied clients",
    stat3label: "Custom development",
    stat4label: "Continuous support",
  },
  services: {
    eyebrow: "What we do",
    title: "Digital solutions for your business",
    text: "We design digital products that solve real challenges, simplify operations and create new growth opportunities.",
    cta: "Request this service",
    items: [
      { title: "API Integration", text: "We connect tools and services to automate processes without friction." },
      { title: "Web Development", text: "Modern, fast and scalable web applications that turn visitors into opportunities." },
      { title: "Mobile Apps", text: "Android and cross-platform apps with smooth, intuitive and consistent experiences." },
      { title: "Enterprise Systems", text: "Platforms to manage processes, teams, operations and critical data." },
      { title: "Custom Software", text: "Solutions designed from scratch to adapt to your company's real logic." },
      { title: "E-commerce", text: "Modern, secure online stores optimized to sell more." },
    ],
  },
  projects: {
    eyebrow: "Success stories",
    title: "Projects that turn ideas into solutions",
    text: "Products designed to generate measurable results and experiences people enjoy using.",
    cta: "Explore projects",
    viewProject: "View project",
  },
  testimonials: {
    eyebrow: "What our clients say",
    title: "Results that speak for themselves",
    text: "Companies from various industries trust Nuvora to build their technology.",
    formTitle: "Did you work with us? Leave a review",
    formText: "Your testimonial will be reviewed and published in this section.",
    fieldName: "Your name", fieldRole: "Position / Role", fieldCompany: "Company",
    fieldRating: "Your rating", fieldComment: "Your comment",
    commentPlaceholder: "Tell us about your experience working with Nuvora...",
    submitBtn: "Submit review", sending: "Sending...",
    successTitle: "Thanks for your review!",
  },
  contact: {
    eyebrow: "Let's talk",
    title: "Your next big project starts here",
    text: "Tell us about your idea. Our team will analyze it and contact you to define the best path.",
    writeUs: "Write to us", callUs: "Call us", offices: "Our offices",
    fieldName: "Name", fieldCompany: "Company", fieldEmail: "Email address",
    fieldPhone: "Phone", fieldProjectType: "Project type",
    fieldBudget: "Approximate budget", fieldMessage: "Tell us about your project",
    messagePlaceholder: "What challenge do you want to solve?",
    submitBtn: "Send request", sending: "Sending...", sent: "Request sent",
    orManually: "or fill in manually",
    projectOptions: ["Web application", "Mobile app", "Custom software", "E-commerce", "SaaS platform"],
    budgetOptions: ["Under USD 100", "USD 100 — 3k", "USD 3k — 8k", "USD 8k — 20k", "USD 20k — 50k", "More than USD 50k"],
    toastTitle: "Request sent!", toastText: "We'll contact you within 24 hours.",
  },
  footer: {
    tagline: "We design and develop digital products that drive businesses into the future. Offices in Lima and Stockholm.",
    colCompany: "Company", colServices: "Services", colContact: "Contact",
    serviceItems: ["Web Development", "Mobile Apps", "Custom Software", "SaaS", "Enterprise Systems"],
    rights: "All rights reserved.", privacy: "Privacy", terms: "Terms",
  },
  ideaToProduct: {
    eyebrow: "Our work",
    title: "See what we build",
    text: "A real showcase of how we transform ideas into high-impact digital products.",
  },
  terminal: {
    eyebrow: "Flutter · Live build",
    title: "Code that becomes an app",
    text: "Watch how we build a mobile app from scratch — line by line, in real time.",
  },
  team: {
    eyebrow: "The team",
    title: "The people behind every project",
    text: "A small, focused team with real experience building digital products from scratch.",
    values: ["Product obsession", "Commitment to quality", "Continuous learning", "Direct communication"],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Everything you need to know",
    text: "If your question isn't here, write to us and we'll reply within 24 hours.",
    items: [
      { q: "How long does a typical project take?", a: "It depends on complexity. A standard web or mobile app takes 6 to 14 weeks. Larger projects like SaaS platforms or enterprise systems can take 3 to 6 months. We'll give you a concrete estimate in the first meeting." },
      { q: "Do you work with startups or only large companies?", a: "Both. We have experience supporting startups from MVP to scale, and also executing projects for established businesses. The approach adapts to each stage." },
      { q: "What happens after launch?", a: "We offer post-launch support and maintenance plans including monitoring, bug fixes, security updates and iterative improvements. We don't leave you alone after delivery." },
      { q: "How does the work and communication process work?", a: "We work in two-week sprints with demos at the end of each one. We use Slack, Notion and Linear to keep everything visible and aligned. You'll always have a direct point of contact." },
      { q: "Do you have contracts and code protection?", a: "Yes. Every project has a formal contract including NDA, client intellectual property over the final product, and clear delivery and payment terms. Transparency is part of how we work." },
      { q: "What is the minimum budget to get started?", a: "Projects from scratch start at USD 3,000. We also offer hourly development models for teams that need technical reinforcement. Tell us your case and we'll find the best option." },
    ],
  },
};

const sv: Translations = {
  nav: {
    home: "Hem", services: "Tjänster", projects: "Projekt",
    team: "Team", contact: "Kontakt", cta: "Begär offert",
  },
  hero: {
    pill: "Mjukvara som driver riktiga företag",
    h1a: "Vi förvandlar idéer till mjukvara som",
    h1verb: "växer",
    h1b: "ditt företag",
    desc: "Vi utvecklar moderna, skalbara och skräddarsydda digitala lösningar för företag som vill optimera processer, öka produktiviteten och växa.",
    ctaPrimary: "Begär offert",
    ctaSecondary: "Se våra tjänster",
    tag1: "Skräddarsydd utveckling",
    tag2: "Webb- och mobilappar",
    tag3: "Skalbara lösningar",
    stat1label: "Levererade projekt",
    stat2label: "Nöjda kunder",
    stat3label: "Skräddarsydd utveckling",
    stat4label: "Kontinuerligt stöd",
  },
  services: {
    eyebrow: "Vad vi gör",
    title: "Digitala lösningar för ditt företag",
    text: "Vi designar digitala produkter som löser verkliga utmaningar, förenklar driften och skapar nya tillväxtmöjligheter.",
    cta: "Begär denna tjänst",
    items: [
      { title: "API-integration", text: "Vi kopplar samman verktyg och tjänster för att automatisera processer utan friktion." },
      { title: "Webbutveckling", text: "Moderna, snabba och skalbara webbapplikationer som omvandlar besökare till möjligheter." },
      { title: "Mobilappar", text: "Android- och plattformsoberoende appar med smidiga, intuitiva och konsekventa upplevelser." },
      { title: "Företagssystem", text: "Plattformar för att hantera processer, team, verksamhet och kritisk data." },
      { title: "Skräddarsydd mjukvara", text: "Lösningar designade från grunden för att anpassa sig till ditt företags verkliga logik." },
      { title: "E-handel", text: "Moderna, säkra nätbutiker optimerade för att sälja mer." },
    ],
  },
  projects: {
    eyebrow: "Framgångshistorier",
    title: "Projekt som förvandlar idéer till lösningar",
    text: "Produkter designade för att generera mätbara resultat och upplevelser som människor njuter av att använda.",
    cta: "Utforska projekt",
    viewProject: "Visa projekt",
  },
  testimonials: {
    eyebrow: "Vad våra kunder säger",
    title: "Resultat som talar för sig själva",
    text: "Företag från olika branscher litar på Nuvora för att bygga sin teknologi.",
    formTitle: "Jobbade du med oss? Lämna ett omdöme",
    formText: "Ditt omdöme granskas och publiceras i detta avsnitt.",
    fieldName: "Ditt namn", fieldRole: "Befattning / Roll", fieldCompany: "Företag",
    fieldRating: "Ditt betyg", fieldComment: "Din kommentar",
    commentPlaceholder: "Berätta om din erfarenhet av att arbeta med Nuvora...",
    submitBtn: "Skicka omdöme", sending: "Skickar...",
    successTitle: "Tack för ditt omdöme!",
  },
  contact: {
    eyebrow: "Låt oss prata",
    title: "Ditt nästa stora projekt börjar här",
    text: "Berätta om din idé. Vårt team analyserar den och kontaktar dig för att hitta den bästa vägen.",
    writeUs: "Skriv till oss", callUs: "Ring oss", offices: "Våra kontor",
    fieldName: "Namn", fieldCompany: "Företag", fieldEmail: "E-postadress",
    fieldPhone: "Telefon", fieldProjectType: "Projekttyp",
    fieldBudget: "Ungefärlig budget", fieldMessage: "Berätta om ditt projekt",
    messagePlaceholder: "Vilken utmaning vill du lösa?",
    submitBtn: "Skicka förfrågan", sending: "Skickar...", sent: "Förfrågan skickad",
    orManually: "eller fyll i manuellt",
    projectOptions: ["Webbapplikation", "Mobilapp", "Skräddarsydd mjukvara", "E-handel", "SaaS-plattform"],
    budgetOptions: ["Under USD 100", "USD 100 — 3k", "USD 3k — 8k", "USD 8k — 20k", "USD 20k — 50k", "Mer än USD 50k"],
    toastTitle: "Förfrågan skickad!", toastText: "Vi kontaktar dig inom 24 timmar.",
  },
  footer: {
    tagline: "Vi designar och utvecklar digitala produkter som driver företag mot framtiden. Kontor i Lima och Stockholm.",
    colCompany: "Företag", colServices: "Tjänster", colContact: "Kontakt",
    serviceItems: ["Webbutveckling", "Mobilappar", "Skräddarsydd mjukvara", "SaaS", "Företagssystem"],
    rights: "Alla rättigheter förbehållna.", privacy: "Integritet", terms: "Villkor",
  },
  ideaToProduct: {
    eyebrow: "Vårt arbete",
    title: "Se vad vi bygger",
    text: "Ett verkligt exempel på hur vi förvandlar idéer till digitala produkter med hög effekt.",
  },
  terminal: {
    eyebrow: "Flutter · Live build",
    title: "Kod som blir en app",
    text: "Se hur vi bygger en mobilapp från grunden — rad för rad, i realtid.",
  },
  team: {
    eyebrow: "Teamet",
    title: "Personerna bakom varje projekt",
    text: "Ett litet, fokuserat team med verklig erfarenhet av att bygga digitala produkter från grunden.",
    values: ["Produktobsession", "Engagemang för kvalitet", "Kontinuerligt lärande", "Direkt kommunikation"],
  },
  faq: {
    eyebrow: "Vanliga frågor",
    title: "Allt du behöver veta",
    text: "Om din fråga inte finns här, skriv till oss så svarar vi inom 24 timmar.",
    items: [
      { q: "Hur lång tid tar ett typiskt projekt?", a: "Det beror på komplexiteten. En standard webb- eller mobilapp tar 6 till 14 veckor. Större projekt som SaaS-plattformar eller företagssystem kan ta 3 till 6 månader. Vi ger dig en konkret uppskattning vid det första mötet." },
      { q: "Arbetar ni med startups eller bara stora företag?", a: "Båda. Vi har erfarenhet av att stödja startups från MVP till skalning, och av att genomföra projekt för etablerade företag. Tillvägagångssättet anpassas efter varje fas." },
      { q: "Vad händer efter lanseringen?", a: "Vi erbjuder support- och underhållsplaner efter lansering inklusive övervakning, buggfixar, säkerhetsuppdateringar och iterativa förbättringar. Vi lämnar dig inte ensam efter leverans." },
      { q: "Hur fungerar arbets- och kommunikationsprocessen?", a: "Vi arbetar i tvåveckorssprintar med demos i slutet av var och en. Vi använder Slack, Notion och Linear för att hålla allt synligt och i linje. Du har alltid en direkt kontaktpunkt." },
      { q: "Har ni kontrakt och kodskydd?", a: "Ja. Varje projekt har ett formellt kontrakt inklusive NDA, klientens immateriella rättigheter till slutprodukten och tydliga leverans- och betalningsvillkor. Transparens är en del av hur vi arbetar." },
      { q: "Vad är minimibudgeten för att komma igång?", a: "Projekt från grunden börjar på USD 3 000. Vi erbjuder också timbaserade utvecklingsmodeller för team som behöver teknisk förstärkning. Berätta om ditt fall så hittar vi det bästa alternativet." },
    ],
  },
};

const pt: Translations = {
  nav: {
    home: "Início", services: "Serviços", projects: "Projetos",
    team: "Equipe", contact: "Contato", cta: "Solicitar orçamento",
  },
  hero: {
    pill: "Software que move negócios reais",
    h1a: "Transformamos ideias em software que",
    h1verb: "faz crescer",
    h1b: "seu negócio",
    desc: "Desenvolvemos soluções digitais modernas, escaláveis e personalizadas para empresas que buscam otimizar processos, melhorar a produtividade e crescer.",
    ctaPrimary: "Solicitar orçamento",
    ctaSecondary: "Ver nossos serviços",
    tag1: "Desenvolvimento personalizado",
    tag2: "Apps Web e Mobile",
    tag3: "Soluções escaláveis",
    stat1label: "Projetos desenvolvidos",
    stat2label: "Clientes satisfeitos",
    stat3label: "Desenvolvimento personalizado",
    stat4label: "Suporte contínuo",
  },
  services: {
    eyebrow: "O que fazemos",
    title: "Soluções digitais para o seu negócio",
    text: "Projetamos produtos digitais que resolvem desafios reais, simplificam as operações e criam novas oportunidades de crescimento.",
    cta: "Solicitar este serviço",
    items: [
      { title: "Integração de APIs", text: "Conectamos ferramentas e serviços para automatizar processos sem atrito." },
      { title: "Desenvolvimento Web", text: "Aplicações web modernas, rápidas e escaláveis que convertem visitas em oportunidades." },
      { title: "Aplicativos móveis", text: "Apps Android e multiplataforma com experiências fluidas, intuitivas e consistentes." },
      { title: "Sistemas empresariais", text: "Plataformas para gerenciar processos, equipes, operações e dados críticos." },
      { title: "Software personalizado", text: "Soluções projetadas do zero para se adaptar à lógica real da sua empresa." },
      { title: "E-commerce", text: "Lojas virtuais modernas, seguras e otimizadas para vender mais." },
    ],
  },
  projects: {
    eyebrow: "Casos de sucesso",
    title: "Projetos que transformam ideias em soluções",
    text: "Produtos projetados para gerar resultados mensuráveis e experiências que as pessoas adoram usar.",
    cta: "Explorar projetos",
    viewProject: "Ver projeto",
  },
  testimonials: {
    eyebrow: "O que nossos clientes dizem",
    title: "Resultados que falam por si só",
    text: "Empresas de diversas indústrias confiam na Nuvora para construir sua tecnologia.",
    formTitle: "Trabalhou conosco? Deixe seu depoimento",
    formText: "Seu depoimento será revisado e publicado nesta seção.",
    fieldName: "Seu nome", fieldRole: "Cargo / Função", fieldCompany: "Empresa",
    fieldRating: "Sua avaliação", fieldComment: "Seu comentário",
    commentPlaceholder: "Conte-nos sobre sua experiência trabalhando com a Nuvora...",
    submitBtn: "Enviar depoimento", sending: "Enviando...",
    successTitle: "Obrigado pelo seu depoimento!",
  },
  contact: {
    eyebrow: "Vamos conversar",
    title: "Seu próximo grande projeto começa aqui",
    text: "Conte-nos sobre sua ideia. Nossa equipe irá analisá-la e entrar em contato para definir o melhor caminho.",
    writeUs: "Escreva-nos", callUs: "Ligue para nós", offices: "Nossas sedes",
    fieldName: "Nome", fieldCompany: "Empresa", fieldEmail: "Endereço de e-mail",
    fieldPhone: "Telefone", fieldProjectType: "Tipo de projeto",
    fieldBudget: "Orçamento aproximado", fieldMessage: "Conte-nos sobre seu projeto",
    messagePlaceholder: "Qual desafio você quer resolver?",
    submitBtn: "Enviar solicitação", sending: "Enviando...", sent: "Solicitação enviada",
    orManually: "ou preencha manualmente",
    projectOptions: ["Aplicação web", "Aplicativo móvel", "Software personalizado", "E-commerce", "Plataforma SaaS"],
    budgetOptions: ["Menos de USD 100", "USD 100 — 3k", "USD 3k — 8k", "USD 8k — 20k", "USD 20k — 50k", "Mais de USD 50k"],
    toastTitle: "Solicitação enviada!", toastText: "Entraremos em contato em menos de 24 horas.",
  },
  footer: {
    tagline: "Projetamos e desenvolvemos produtos digitais que impulsionam empresas para o futuro. Presença em Lima e Estocolmo.",
    colCompany: "Empresa", colServices: "Serviços", colContact: "Contato",
    serviceItems: ["Desenvolvimento Web", "Apps móveis", "Software personalizado", "SaaS", "Sistemas empresariais"],
    rights: "Todos os direitos reservados.", privacy: "Privacidade", terms: "Termos",
  },
  ideaToProduct: {
    eyebrow: "Nosso trabalho",
    title: "Veja o que construímos",
    text: "Uma amostra real de como transformamos ideias em produtos digitais de alto impacto.",
  },
  terminal: {
    eyebrow: "Flutter · Live build",
    title: "Código que se transforma em app",
    text: "Veja como construímos um aplicativo móvel do zero — linha por linha, em tempo real.",
  },
  team: {
    eyebrow: "A equipe",
    title: "As pessoas por trás de cada projeto",
    text: "Uma equipe pequena, focada e com experiência real construindo produtos digitais do zero.",
    values: ["Obsessão pelo produto", "Compromisso com a qualidade", "Aprendizado contínuo", "Comunicação direta"],
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Tudo o que você precisa saber",
    text: "Se sua pergunta não estiver aqui, escreva para nós e responderemos em menos de 24 horas.",
    items: [
      { q: "Quanto tempo leva um projeto típico?", a: "Depende da complexidade. Um aplicativo web ou móvel padrão leva de 6 a 14 semanas. Projetos maiores como plataformas SaaS ou sistemas empresariais podem levar de 3 a 6 meses. Daremos uma estimativa concreta na primeira reunião." },
      { q: "Vocês trabalham com startups ou apenas com grandes empresas?", a: "Ambas. Temos experiência apoiando startups desde o MVP até a escala, e também executando projetos para empresas consolidadas. A abordagem se adapta a cada etapa." },
      { q: "O que acontece após o lançamento?", a: "Oferecemos planos de suporte e manutenção pós-lançamento incluindo monitoramento, correção de bugs, atualizações de segurança e melhorias iterativas. Não te deixamos sozinho após a entrega." },
      { q: "Como é o processo de trabalho e comunicação?", a: "Trabalhamos em sprints quinzenais com demos no final de cada um. Usamos Slack, Notion e Linear para manter tudo visível e alinhado. Você sempre terá um ponto de contato direto." },
      { q: "Vocês têm contratos e proteção de código?", a: "Sim. Cada projeto tem um contrato formal incluindo NDA, propriedade intelectual do cliente sobre o produto final e termos claros de entrega e pagamento. A transparência faz parte de como trabalhamos." },
      { q: "Qual é o orçamento mínimo para começar?", a: "Projetos do zero partem de USD 3.000. Também oferecemos modelos de desenvolvimento por hora para equipes que precisam de reforço técnico. Conte-nos seu caso e encontraremos a melhor opção." },
    ],
  },
};

const fr: Translations = {
  nav: {
    home: "Accueil", services: "Services", projects: "Projets",
    team: "Équipe", contact: "Contact", cta: "Demander un devis",
  },
  hero: {
    pill: "Des logiciels qui font avancer les vrais business",
    h1a: "Nous transformons les idées en logiciels qui",
    h1verb: "font grandir",
    h1b: "votre entreprise",
    desc: "Nous développons des solutions numériques modernes, évolutives et personnalisées pour les entreprises qui cherchent à optimiser leurs processus, améliorer leur productivité et croître.",
    ctaPrimary: "Demander un devis",
    ctaSecondary: "Voir nos services",
    tag1: "Développement sur mesure",
    tag2: "Apps Web et Mobile",
    tag3: "Solutions évolutives",
    stat1label: "Projets livrés",
    stat2label: "Clients satisfaits",
    stat3label: "Développement personnalisé",
    stat4label: "Support continu",
  },
  services: {
    eyebrow: "Ce que nous faisons",
    title: "Solutions numériques pour votre entreprise",
    text: "Nous concevons des produits numériques qui résolvent des défis réels, simplifient les opérations et créent de nouvelles opportunités de croissance.",
    cta: "Demander ce service",
    items: [
      { title: "Intégration d'APIs", text: "Nous connectons les outils et services pour automatiser les processus sans friction." },
      { title: "Développement Web", text: "Applications web modernes, rapides et évolutives qui transforment les visites en opportunités." },
      { title: "Applications mobiles", text: "Apps Android et multiplateformes avec des expériences fluides, intuitives et cohérentes." },
      { title: "Systèmes d'entreprise", text: "Plateformes pour gérer les processus, les équipes, les opérations et les données critiques." },
      { title: "Logiciel sur mesure", text: "Solutions conçues de zéro pour s'adapter à la logique réelle de votre entreprise." },
      { title: "E-commerce", text: "Boutiques en ligne modernes, sécurisées et optimisées pour vendre davantage." },
    ],
  },
  projects: {
    eyebrow: "Cas de succès",
    title: "Des projets qui transforment les idées en solutions",
    text: "Des produits conçus pour générer des résultats mesurables et des expériences que les gens adorent utiliser.",
    cta: "Explorer les projets",
    viewProject: "Voir le projet",
  },
  testimonials: {
    eyebrow: "Ce que disent nos clients",
    title: "Des résultats qui parlent d'eux-mêmes",
    text: "Des entreprises de diverses industries font confiance à Nuvora pour construire leur technologie.",
    formTitle: "Vous avez travaillé avec nous ? Laissez un avis",
    formText: "Votre témoignage sera examiné et publié dans cette section.",
    fieldName: "Votre nom", fieldRole: "Poste / Rôle", fieldCompany: "Entreprise",
    fieldRating: "Votre note", fieldComment: "Votre commentaire",
    commentPlaceholder: "Parlez-nous de votre expérience de travail avec Nuvora...",
    submitBtn: "Envoyer l'avis", sending: "Envoi en cours...",
    successTitle: "Merci pour votre avis !",
  },
  contact: {
    eyebrow: "Parlons-en",
    title: "Votre prochain grand projet commence ici",
    text: "Parlez-nous de votre idée. Notre équipe l'analysera et vous contactera pour définir la meilleure voie.",
    writeUs: "Écrivez-nous", callUs: "Appelez-nous", offices: "Nos bureaux",
    fieldName: "Nom", fieldCompany: "Entreprise", fieldEmail: "Adresse e-mail",
    fieldPhone: "Téléphone", fieldProjectType: "Type de projet",
    fieldBudget: "Budget approximatif", fieldMessage: "Parlez-nous de votre projet",
    messagePlaceholder: "Quel défi voulez-vous résoudre ?",
    submitBtn: "Envoyer la demande", sending: "Envoi en cours...", sent: "Demande envoyée",
    orManually: "ou remplissez manuellement",
    projectOptions: ["Application web", "Application mobile", "Logiciel sur mesure", "E-commerce", "Plateforme SaaS"],
    budgetOptions: ["Moins de USD 100", "USD 100 — 3k", "USD 3k — 8k", "USD 8k — 20k", "USD 20k — 50k", "Plus de USD 50k"],
    toastTitle: "Demande envoyée !", toastText: "Nous vous contacterons dans moins de 24 heures.",
  },
  footer: {
    tagline: "Nous concevons et développons des produits numériques qui propulsent les entreprises vers l'avenir. Bureaux à Lima et Stockholm.",
    colCompany: "Entreprise", colServices: "Services", colContact: "Contact",
    serviceItems: ["Développement Web", "Apps mobiles", "Logiciel sur mesure", "SaaS", "Systèmes d'entreprise"],
    rights: "Tous droits réservés.", privacy: "Confidentialité", terms: "Conditions",
  },
  ideaToProduct: {
    eyebrow: "Notre travail",
    title: "Voyez ce que nous construisons",
    text: "Un vrai aperçu de la façon dont nous transformons les idées en produits numériques à fort impact.",
  },
  terminal: {
    eyebrow: "Flutter · Live build",
    title: "Du code qui devient une app",
    text: "Regardez comment nous construisons une application mobile de zéro — ligne par ligne, en temps réel.",
  },
  team: {
    eyebrow: "L'équipe",
    title: "Les personnes derrière chaque projet",
    text: "Une petite équipe focused avec une vraie expérience dans la création de produits numériques de zéro.",
    values: ["Obsession du produit", "Engagement qualité", "Apprentissage continu", "Communication directe"],
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Tout ce que vous devez savoir",
    text: "Si votre question n'est pas là, écrivez-nous et nous répondrons en moins de 24 heures.",
    items: [
      { q: "Combien de temps prend un projet typique ?", a: "Cela dépend de la complexité. Une application web ou mobile standard prend de 6 à 14 semaines. Des projets plus importants comme des plateformes SaaS peuvent prendre de 3 à 6 mois. Nous vous donnerons une estimation concrète lors de la première réunion." },
      { q: "Travaillez-vous avec des startups ou seulement de grandes entreprises ?", a: "Les deux. Nous avons l'expérience d'accompagner des startups depuis leur MVP jusqu'à la mise à l'échelle, et d'exécuter des projets pour des entreprises consolidées. L'approche s'adapte à chaque étape." },
      { q: "Que se passe-t-il après le lancement ?", a: "Nous offrons des plans de support et de maintenance post-lancement incluant la surveillance, la correction de bugs, les mises à jour de sécurité et les améliorations itératives. Nous ne vous laissons pas seul après la livraison." },
      { q: "Comment fonctionne le processus de travail et de communication ?", a: "Nous travaillons en sprints de deux semaines avec des démos à la fin de chacun. Nous utilisons Slack, Notion et Linear pour garder tout visible et aligné. Vous aurez toujours un point de contact direct." },
      { q: "Avez-vous des contrats et une protection du code ?", a: "Oui. Chaque projet a un contrat formel incluant NDA, propriété intellectuelle du client sur le produit final, et des termes clairs de livraison et de paiement. La transparence fait partie de notre façon de travailler." },
      { q: "Quel est le budget minimum pour démarrer ?", a: "Les projets de zéro commencent à partir de 3 000 USD. Nous proposons également des modèles de développement à l'heure pour les équipes qui ont besoin de renfort technique. Dites-nous votre cas et nous trouverons la meilleure option." },
    ],
  },
};

const de: Translations = {
  nav: {
    home: "Startseite", services: "Leistungen", projects: "Projekte",
    team: "Team", contact: "Kontakt", cta: "Angebot anfordern",
  },
  hero: {
    pill: "Software, das echte Unternehmen voranbringt",
    h1a: "Wir verwandeln Ideen in Software, die",
    h1verb: "wächst",
    h1b: "Ihr Unternehmen",
    desc: "Wir entwickeln moderne, skalierbare und maßgeschneiderte digitale Lösungen für Unternehmen, die Prozesse optimieren, die Produktivität steigern und wachsen wollen.",
    ctaPrimary: "Angebot anfordern",
    ctaSecondary: "Unsere Leistungen ansehen",
    tag1: "Maßgeschneiderte Entwicklung",
    tag2: "Web- und Mobile-Apps",
    tag3: "Skalierbare Lösungen",
    stat1label: "Abgeschlossene Projekte",
    stat2label: "Zufriedene Kunden",
    stat3label: "Individuelle Entwicklung",
    stat4label: "Kontinuierlicher Support",
  },
  services: {
    eyebrow: "Was wir tun",
    title: "Digitale Lösungen für Ihr Unternehmen",
    text: "Wir entwerfen digitale Produkte, die echte Herausforderungen lösen, den Betrieb vereinfachen und neue Wachstumschancen schaffen.",
    cta: "Diesen Service anfragen",
    items: [
      { title: "API-Integration", text: "Wir verbinden Tools und Dienste zur reibungslosen Prozessautomatisierung." },
      { title: "Webentwicklung", text: "Moderne, schnelle und skalierbare Webanwendungen, die Besucher in Chancen umwandeln." },
      { title: "Mobile Apps", text: "Android- und plattformübergreifende Apps mit reibungslosen, intuitiven Erlebnissen." },
      { title: "Unternehmenssysteme", text: "Plattformen zur Verwaltung von Prozessen, Teams, Betrieb und kritischen Daten." },
      { title: "Maßgeschneiderte Software", text: "Lösungen, die von Grund auf entwickelt wurden, um sich an die reale Logik Ihres Unternehmens anzupassen." },
      { title: "E-Commerce", text: "Moderne, sichere Online-Shops, optimiert für mehr Umsatz." },
    ],
  },
  projects: {
    eyebrow: "Erfolgsgeschichten",
    title: "Projekte, die Ideen in Lösungen verwandeln",
    text: "Produkte, die messbare Ergebnisse liefern und Erlebnisse schaffen, die Menschen gerne nutzen.",
    cta: "Projekte erkunden",
    viewProject: "Projekt ansehen",
  },
  testimonials: {
    eyebrow: "Was unsere Kunden sagen",
    title: "Ergebnisse, die für sich sprechen",
    text: "Unternehmen aus verschiedenen Branchen vertrauen Nuvora beim Aufbau ihrer Technologie.",
    formTitle: "Haben Sie mit uns gearbeitet? Hinterlassen Sie eine Bewertung",
    formText: "Ihr Testimonial wird geprüft und in diesem Abschnitt veröffentlicht.",
    fieldName: "Ihr Name", fieldRole: "Position / Rolle", fieldCompany: "Unternehmen",
    fieldRating: "Ihre Bewertung", fieldComment: "Ihr Kommentar",
    commentPlaceholder: "Erzählen Sie uns von Ihrer Erfahrung mit Nuvora...",
    submitBtn: "Bewertung absenden", sending: "Wird gesendet...",
    successTitle: "Danke für Ihre Bewertung!",
  },
  contact: {
    eyebrow: "Sprechen wir",
    title: "Ihr nächstes großes Projekt beginnt hier",
    text: "Erzählen Sie uns von Ihrer Idee. Unser Team analysiert sie und kontaktiert Sie, um den besten Weg zu definieren.",
    writeUs: "Schreiben Sie uns", callUs: "Rufen Sie uns an", offices: "Unsere Büros",
    fieldName: "Name", fieldCompany: "Unternehmen", fieldEmail: "E-Mail-Adresse",
    fieldPhone: "Telefon", fieldProjectType: "Projekttyp",
    fieldBudget: "Ungefähres Budget", fieldMessage: "Erzählen Sie uns von Ihrem Projekt",
    messagePlaceholder: "Welche Herausforderung möchten Sie lösen?",
    submitBtn: "Anfrage senden", sending: "Wird gesendet...", sent: "Anfrage gesendet",
    orManually: "oder manuell ausfüllen",
    projectOptions: ["Webanwendung", "Mobile App", "Maßgeschneiderte Software", "E-Commerce", "SaaS-Plattform"],
    budgetOptions: ["Unter USD 100", "USD 100 — 3k", "USD 3k — 8k", "USD 8k — 20k", "USD 20k — 50k", "Mehr als USD 50k"],
    toastTitle: "Anfrage gesendet!", toastText: "Wir melden uns innerhalb von 24 Stunden.",
  },
  footer: {
    tagline: "Wir entwerfen und entwickeln digitale Produkte, die Unternehmen in die Zukunft treiben. Büros in Lima und Stockholm.",
    colCompany: "Unternehmen", colServices: "Leistungen", colContact: "Kontakt",
    serviceItems: ["Webentwicklung", "Mobile Apps", "Maßgeschneiderte Software", "SaaS", "Unternehmenssysteme"],
    rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz", terms: "AGB",
  },
  ideaToProduct: {
    eyebrow: "Unsere Arbeit",
    title: "Sehen Sie, was wir bauen",
    text: "Ein echter Einblick, wie wir Ideen in digitale Produkte mit hoher Wirkung verwandeln.",
  },
  terminal: {
    eyebrow: "Flutter · Live build",
    title: "Code, der zur App wird",
    text: "Sehen Sie, wie wir eine mobile App von Grund auf bauen — Zeile für Zeile, in Echtzeit.",
  },
  team: {
    eyebrow: "Das Team",
    title: "Die Menschen hinter jedem Projekt",
    text: "Ein kleines, fokussiertes Team mit echter Erfahrung im Aufbau digitaler Produkte von Grund auf.",
    values: ["Produktbesessenheit", "Qualitätsverpflichtung", "Kontinuierliches Lernen", "Direkte Kommunikation"],
  },
  faq: {
    eyebrow: "Häufig gestellte Fragen",
    title: "Alles, was Sie wissen müssen",
    text: "Wenn Ihre Frage nicht hier ist, schreiben Sie uns und wir antworten innerhalb von 24 Stunden.",
    items: [
      { q: "Wie lange dauert ein typisches Projekt?", a: "Es hängt von der Komplexität ab. Eine Standard-Web- oder Mobile-App dauert 6 bis 14 Wochen. Größere Projekte wie SaaS-Plattformen oder Unternehmenssysteme können 3 bis 6 Monate dauern. Wir geben Ihnen beim ersten Gespräch eine konkrete Schätzung." },
      { q: "Arbeiten Sie mit Startups oder nur mit großen Unternehmen?", a: "Beides. Wir haben Erfahrung darin, Startups vom MVP bis zur Skalierung zu begleiten, und auch Projekte für etablierte Unternehmen durchzuführen. Der Ansatz passt sich jeder Phase an." },
      { q: "Was passiert nach dem Launch?", a: "Wir bieten Post-Launch-Support- und Wartungspläne an, einschließlich Monitoring, Fehlerbehebung, Sicherheitsupdates und iterativer Verbesserungen. Wir lassen Sie nach der Lieferung nicht allein." },
      { q: "Wie funktioniert der Arbeits- und Kommunikationsprozess?", a: "Wir arbeiten in zweiwöchigen Sprints mit Demos am Ende jedes Sprints. Wir nutzen Slack, Notion und Linear, um alles sichtbar und abgestimmt zu halten. Sie haben immer einen direkten Ansprechpartner." },
      { q: "Haben Sie Verträge und Codeschutz?", a: "Ja. Jedes Projekt hat einen formellen Vertrag mit NDA, geistigem Eigentum des Kunden am Endprodukt und klaren Liefer- und Zahlungsbedingungen. Transparenz ist Teil unserer Arbeitsweise." },
      { q: "Was ist das Mindestbudget für den Start?", a: "Projekte von Grund auf beginnen ab USD 3.000. Wir bieten auch stundenbasierte Entwicklungsmodelle für Teams an, die technische Verstärkung benötigen. Schildern Sie uns Ihren Fall und wir finden die beste Option." },
    ],
  },
};

export const translations: Record<Lang, Translations> = { es, en, sv, pt, fr, de };

export function t(lang: Lang): Translations {
  return translations[lang];
}
