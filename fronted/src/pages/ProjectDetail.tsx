import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon, ProjectMockup } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import { projects as staticProjects } from "@/data";
import { fadeUp, stagger } from "@/lib/motionVariants";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface ProjectData {
  slug: string;
  title: string;
  label: string;
  type: string;
  text: string;
  stack: string[];
  tagline: string;
  challenge: string;
  solution: string;
  duration: string;
  year: string;
  color: string;
  features: string[];
  results: { metric: string; label: string }[];
  coverImage?: string | null;
  images?: string[];
  videos?: string[];
}

function LoadingScreen() {
  return (
    <div className="site-shell">
      <Navbar />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#a0a0a0", fontSize: 14 }}>Cargando proyecto...</div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }

    // Try API first
    fetch(`${API}/api/projects/${slug}`)
      .then(r => r.json())
      .then((d: { success: boolean; data: ProjectData }) => {
        if (d.success && d.data) {
          setProject(d.data);
        } else {
          // Fallback to static data
          const staticP = staticProjects.find(p => p.slug === slug);
          if (staticP) {
            setProject({
              slug: staticP.slug,
              title: staticP.title,
              label: staticP.label,
              type: staticP.type,
              text: staticP.text,
              stack: staticP.stack,
              tagline: staticP.detail.tagline,
              challenge: staticP.detail.challenge,
              solution: staticP.detail.solution,
              duration: staticP.detail.duration,
              year: staticP.detail.year,
              color: staticP.detail.color,
              features: staticP.detail.features,
              results: staticP.detail.results,
            });
          } else {
            setNotFound(true);
          }
        }
      })
      .catch(() => {
        // Network error — fallback to static
        const staticP = staticProjects.find(p => p.slug === slug);
        if (staticP) {
          setProject({
            slug: staticP.slug,
            title: staticP.title,
            label: staticP.label,
            type: staticP.type,
            text: staticP.text,
            stack: staticP.stack,
            tagline: staticP.detail.tagline,
            challenge: staticP.detail.challenge,
            solution: staticP.detail.solution,
            duration: staticP.detail.duration,
            year: staticP.detail.year,
            color: staticP.detail.color,
            features: staticP.detail.features,
            results: staticP.detail.results,
          });
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingScreen />;
  if (notFound || !project) return <Navigate to="/" replace />;

  return (
    <div className="site-shell">
      <Navbar />
      <main className="project-detail-page">

        {/* ── Hero ── */}
        <section className="pd-hero" style={{ "--pd-color": project.color } as React.CSSProperties}>
          <div className="pd-hero-glow" />
          <div className="pd-grid-bg" />
          <div className="container pd-hero-inner">
            <motion.div className="pd-hero-copy" variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <Link to="/#proyectos" className="pd-back">
                  <Icon name="arrow" size={16} /> Volver a proyectos
                </Link>
              </motion.div>
              <motion.span className="pd-label" variants={fadeUp}>{project.label}</motion.span>
              <motion.h1 variants={fadeUp}>{project.title}</motion.h1>
              <motion.p className="pd-tagline" variants={fadeUp}>{project.tagline}</motion.p>
              <motion.div className="pd-meta" variants={fadeUp}>
                <div className="pd-meta-item">
                  <small>Duración</small>
                  <strong>{project.duration}</strong>
                </div>
                <div className="pd-meta-item">
                  <small>Año</small>
                  <strong>{project.year}</strong>
                </div>
                <div className="pd-meta-item">
                  <small>Stack</small>
                  <div className="pd-stack">
                    {project.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link to="/#contacto" className="button button-glow button-primary button-large magnetic">
                  Quiero un proyecto similar <Icon name="arrow" size={18} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="pd-hero-visual"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            >
              <ProjectMockup type={project.type} coverImage={project.coverImage} />
            </motion.div>
          </div>
        </section>

        {/* ── Gallery ── */}
        {((project.images?.length ?? 0) > 0 || (project.videos?.length ?? 0) > 0) && (
          <section className="pd-section pd-gallery-section">
            <div className="container">
              <motion.h2
                className="pd-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Galería del proyecto
              </motion.h2>

              {/* Images grid */}
              {(project.images?.length ?? 0) > 0 && (
                <motion.div
                  className="pd-gallery-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {project.images!.map((src, i) => (
                    <motion.div key={i} className="pd-gallery-item" variants={fadeUp}>
                      <img src={src} alt={`${project.title} — imagen ${i + 1}`} loading="lazy" />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Videos */}
              {(project.videos?.length ?? 0) > 0 && (
                <motion.div
                  className="pd-videos-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {project.videos!.map((url, i) => {
                    const embed = (() => {
                      try {
                        const u = new URL(url);
                        const ytId = u.hostname.includes("youtu.be")
                          ? u.pathname.slice(1)
                          : u.searchParams.get("v");
                        if (ytId) return `https://www.youtube.com/embed/${ytId}`;
                        if (u.hostname.includes("vimeo.com"))
                          return `https://player.vimeo.com/video${u.pathname}`;
                      } catch { /* noop */ }
                      return url;
                    })();
                    return (
                      <motion.div key={i} className="pd-video-item" variants={fadeUp}>
                        <iframe
                          src={embed}
                          title={`${project.title} — video ${i + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* ── Results ── */}
        {project.results?.length > 0 && (
          <section className="pd-section pd-results-section">
            <div className="container">
              <motion.h2
                className="pd-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Resultados obtenidos
              </motion.h2>
              <motion.div
                className="pd-results-grid"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {project.results.map(r => (
                  <motion.div key={r.label} className="pd-result-card" variants={fadeUp}>
                    <strong style={{ color: project.color }}>{r.metric}</strong>
                    <span>{r.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Challenge + Solution ── */}
        <section className="pd-section pd-content-section">
          <div className="container pd-two-col">
            <motion.div
              className="pd-content-block"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="pd-block-eyebrow" style={{ color: project.color }}>
                <span style={{ background: project.color }} />
                El desafío
              </div>
              <p>{project.challenge}</p>
            </motion.div>
            <motion.div
              className="pd-content-block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="pd-block-eyebrow" style={{ color: project.color }}>
                <span style={{ background: project.color }} />
                La solución
              </div>
              <p>{project.solution}</p>
            </motion.div>
          </div>
        </section>

        {/* ── Features ── */}
        {project.features?.length > 0 && (
          <section className="pd-section pd-features-section">
            <div className="container">
              <motion.h2
                className="pd-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Funcionalidades clave
              </motion.h2>
              <motion.div
                className="pd-features-grid"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {project.features.map((f, i) => (
                  <motion.div key={i} className="pd-feature-item" variants={fadeUp}>
                    <div className="pd-feature-icon" style={{ background: `${project.color}18`, color: project.color }}>
                      <Icon name="check" size={16} />
                    </div>
                    <span>{f}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="pd-cta-section">
          <div className="container pd-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2>¿Te gustaría algo similar?</h2>
              <p>Cuéntanos tu idea y armamos juntos la solución para tu negocio.</p>
              <div className="pd-cta-actions">
                <Link to="/#contacto" className="button button-primary button-glow button-large magnetic">
                  Solicitar cotización <Icon name="arrow" size={18} />
                </Link>
                <Link to="/#proyectos" className="button button-glass button-large">
                  Ver más proyectos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
