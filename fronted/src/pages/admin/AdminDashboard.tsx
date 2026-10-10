import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAdmin } from "./useAdmin";

interface Stats {
  quotes: number;
  projects: number;
  team: number;
  testimonials: number;
  pending: number;
}

export default function AdminDashboard() {
  const { authFetch } = useAdmin();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [q, p, t, te] = await Promise.all([
          authFetch("/api/quotes").then(r => r.json()),
          authFetch("/api/projects/all").then(r => r.json()),
          authFetch("/api/team").then(r => r.json()),
          authFetch("/api/testimonials/all").then(r => r.json()),
        ]);
        setStats({
          quotes:       q.data?.length  ?? 0,
          projects:     p.data?.length  ?? 0,
          team:         t.data?.length  ?? 0,
          testimonials: te.data?.length ?? 0,
          pending:      (te.data ?? []).filter((x: any) => x.status === "PENDING").length,
        });
      } catch {}
    };
    load();
  }, []);

  const cards = [
    { label: "Cotizaciones",  value: stats?.quotes,       href: "/admin/cotizaciones", color: "#ffd21f" },
    { label: "Proyectos",     value: stats?.projects,     href: "/admin/proyectos",    color: "#60a5fa" },
    { label: "Equipo",        value: stats?.team,         href: "/admin/equipo",       color: "#a78bfa" },
    { label: "Testimonios",   value: stats?.testimonials, href: "/admin/testimonios",  color: "#4ade80" },
    { label: "Pend. aprob.",  value: stats?.pending,      href: "/admin/testimonios",  color: "#f87171" },
  ];

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Resumen general de Nuvora</p>
      </div>
      <div className="admin-stats-grid">
        {cards.map(c => (
          <Link to={c.href} key={c.label} className="admin-stat-card">
            <div className="admin-stat-value" style={{ color: c.color }}>
              {c.value ?? "—"}
            </div>
            <div className="admin-stat-label">{c.label}</div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
