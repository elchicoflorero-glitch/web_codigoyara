import { Link } from "react-router-dom";
import { Logo } from "@/components/ui";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const tr = t(lang).footer;
  const nav = t(lang).nav;

  const NAV_LINKS = [
    { label: nav.home,     href: "#inicio" },
    { label: nav.services, href: "#servicios" },
    { label: nav.projects, href: "#proyectos" },
    { label: nav.team,     href: "#equipo" },
    { label: nav.contact,  href: "#contacto" },
  ];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo variant="light" height={30} />
          <p>{tr.tagline}</p>
          <div className="socials">
            <a href="https://www.linkedin.com/in/carlos-daniel-proa-sanchez-845539297/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="GitHub">gh</a>
          </div>
        </div>

        <div>
          <h4>{tr.colCompany}</h4>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>

        <div>
          <h4>{tr.colServices}</h4>
          {tr.serviceItems.map(item => (
            <a key={item} href="#servicios">{item}</a>
          ))}
        </div>

        <div>
          <h4>{tr.colContact}</h4>
          <a href="mailto:ventas@codigoyara.com">ventas@codigoyara.com</a>
          <span>🇵🇪 Lima, Perú</span>
          <span>🇸🇪 Estocolmo, Suecia</span>
          <a href="tel:+51994841296">+51 994 841 296</a>
          <a href="tel:+46000000000">+46 00 000 00 00</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} CodigoYara. {tr.rights}</span>
        <div>
          <Link to="/privacidad">{tr.privacy}</Link>
          <Link to="/terminos">{tr.terms}</Link>
          <Link to="/admin" className="footer-admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
