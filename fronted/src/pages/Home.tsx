import { useEffect } from "react";
import { Navbar, Footer } from "@/components/layout";
import { SectionDots, GoatWidget } from "@/components/ui";
import {
  Hero,
  Services,
  Projects,
  Team,
  Testimonials,
  IdeaToProduct,
  Terminal,
  FAQ,
  CTA,
  Contact,
} from "@/components/sections";

export default function Home() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
    };
    links.forEach(l => l.addEventListener("click", handler));
    return () => links.forEach(l => l.removeEventListener("click", handler));
  }, []);

  return (
    <div className="site-shell">
      <Navbar />
      <SectionDots />
      <GoatWidget />
      <main>
        <Hero />
        <Services />
        <Terminal />
        <IdeaToProduct />
        <Projects />
        <Team />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
