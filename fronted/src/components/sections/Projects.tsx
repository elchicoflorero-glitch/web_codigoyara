import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon, SectionHeading, ProjectMockup } from "@/components/ui";
import { projects as staticProjects } from "@/data";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface Project {
  id?: string;
  slug: string;
  title: string;
  label: string;
  type: string;
  text: string;
  stack: string[];
  coverImage?: string | null;
}

export default function Projects() {
  const { lang } = useLang();
  const tr = t(lang).projects;

  const trackRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(r => r.json())
      .then((d: { success: boolean; data: Project[] }) => {
        if (d.success && d.data?.length) setProjects(d.data);
      })
      .catch(() => {});
  }, []);

  const useMarquee = projects.length >= 4;
  const TRACK = useMarquee ? [...projects, ...projects, ...projects] : projects;

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; };

  return (
    <section className="section projects-section" id="proyectos">
      <div className="container">
        <div className="projects-heading">
          <SectionHeading
            eyebrow={tr.eyebrow}
            title={tr.title}
            text={tr.text}
          />
          <a href="#contacto" className="text-link">
            {tr.cta} <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>

      <div className="projects-marquee-wrap">
        <div className="marquee-fade marquee-fade-left" />
        <div className="marquee-fade marquee-fade-right" />

        <div
          ref={trackRef}
          className="projects-marquee-track"
          style={useMarquee ? {} : { animation: "none", justifyContent: "center", width: "100%", flexWrap: "wrap", padding: "0 24px" }}
          onMouseEnter={useMarquee ? pause : undefined}
          onMouseLeave={useMarquee ? resume : undefined}
        >
          {TRACK.map((project, i) => (
            <motion.article
              className="project-card project-card-marquee"
              key={`${project.slug}-${i}`}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Link
                to={`/proyectos/${project.slug}`}
                className="project-card-link"
                aria-label={`Ver detalle de ${project.title}`}
              >
                <ProjectMockup type={project.type} coverImage={project.coverImage} />
                <div className="project-info">
                  <span className="project-label">{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  <div className="stack-row">
                    {project.stack.map(item => <span key={item}>{item}</span>)}
                  </div>
                  <span className="project-cta-link">
                    {tr.viewProject} <Icon name="arrow" size={17} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
