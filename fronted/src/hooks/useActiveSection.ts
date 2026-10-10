import { useEffect, useState } from "react";

const SECTION_IDS = [
  "inicio",
  "servicios",
  "proyectos",
  "equipo",
  "testimonials",
  "contacto",
];

export function useActiveSection() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return active;
}
