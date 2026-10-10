import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "./useAdmin";

const NAV = [
  { label: "Dashboard",    href: "/admin/dashboard" },
  { label: "Proyectos",    href: "/admin/proyectos" },
  { label: "Equipo",       href: "/admin/equipo" },
  { label: "Testimonios",  href: "/admin/testimonios" },
  { label: "Cotizaciones", href: "/admin/cotizaciones" },
  { label: "Diseños",      href: "/admin/designs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAdmin();
  const { pathname } = useLocation();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">nuvora<span>.</span><small>admin</small></div>
        <nav className="admin-nav">
          {NAV.map(n => (
            <Link
              key={n.href}
              to={n.href}
              className={`admin-nav-item ${pathname === n.href ? "active" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="admin-logout" onClick={logout}>Cerrar sesión</button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
