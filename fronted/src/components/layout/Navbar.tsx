import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo, Icon } from "@/components/ui";
import { useLang, type Lang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { useActiveSection } from "@/hooks/useActiveSection";

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "es", label: "Español",    flag: "🇪🇸" },
  { code: "en", label: "English",    flag: "🇬🇧" },
  { code: "sv", label: "Svenska",    flag: "🇸🇪" },
  { code: "pt", label: "Português",  flag: "🇧🇷" },
  { code: "fr", label: "Français",   flag: "🇫🇷" },
  { code: "de", label: "Deutsch",    flag: "🇩🇪" },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tr = t(lang).nav;
  const active = useActiveSection();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);
  const current = LANGUAGES.find(l => l.code === lang)!;

  // true when we're NOT on the home page
  const isSubPage = location.pathname !== "/";

  // Transparent navbar at top, solid on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const NAV_LINKS = [
    { label: tr.home,     href: "#inicio",    id: "inicio" },
    { label: tr.services, href: "#servicios", id: "servicios" },
    { label: tr.projects, href: "#proyectos", id: "proyectos" },
    { label: tr.team,     href: "#equipo",    id: "equipo" },
    { label: tr.contact,  href: "#contacto",  id: "contacto" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    closeMenu();

    const sectionId = href.slice(1);

    if (isSubPage) {
      // Navigate to home and then scroll to the section
      navigate("/");
      // Wait for the page to mount before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar${!scrolled && !isSubPage ? " navbar-transparent" : ""}`}>
      <div className="container nav-inner">
        <Logo />

        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              className={active === id ? "nav-link-active" : ""}
              onClick={e => handleNav(e, href)}
            >
              {label}
            </a>
          ))}
          <a className="button button-primary mobile-cta" href="#contacto" onClick={e => handleNav(e, "#contacto")}>
            {tr.cta}
          </a>
        </nav>

        {/* Right side */}
        <div className="nav-right">
          {/* Language selector */}
          <div className="lang-selector" ref={langRef}>
            <button
              className="lang-trigger"
              onClick={() => setLangOpen(o => !o)}
              aria-label="Cambiar idioma"
              aria-expanded={langOpen}
            >
              <span className="lang-flag">{current.flag}</span>
              <span className="lang-code">{current.code.toUpperCase()}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`lang-chevron ${langOpen ? "open" : ""}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {langOpen && (
              <div className="lang-dropdown" role="listbox" aria-label="Idiomas disponibles">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    role="option"
                    aria-selected={lang === l.code}
                    className={`lang-option ${lang === l.code ? "active" : ""}`}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                  >
                    <span className="lang-flag">{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && (
                      <svg className="lang-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin shortcut — subtle icon button */}
          <Link
            to="/admin"
            className="nav-admin-btn"
            aria-label="Panel de administración"
            title="Admin"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </Link>

          <a className="button button-primary desktop-cta" href="#contacto" onClick={e => handleNav(e, "#contacto")}>
            {tr.cta} <Icon name="arrow" size={18} />
          </a>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </div>
    </header>
  );
}
