import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useActiveSection } from "@/hooks/useActiveSection";

interface Section {
  id: string;
  label: string;
}

export default function SectionDots() {
  const { lang } = useLang();
  const tr = t(lang).nav;
  const active = useActiveSection();

  const SECTIONS: Section[] = [
    { id: "inicio",       label: tr.home },
    { id: "servicios",    label: tr.services },
    { id: "proyectos",    label: tr.projects },
    { id: "equipo",       label: tr.team },
    { id: "testimonials", label: "Testimonios" },
    { id: "contacto",     label: tr.contact },
  ];

  const [hovered, setHovered] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="section-dots" aria-label="Navegación por secciones">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            className={`sd-dot ${isActive ? "sd-active" : ""}`}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
          >
            <span className="sd-pip" />
            {(hovered === id || isActive) && (
              <span className="sd-label">{label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
