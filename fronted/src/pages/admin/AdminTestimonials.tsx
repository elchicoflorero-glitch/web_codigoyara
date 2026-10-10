import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAdmin } from "./useAdmin";

interface Testimonial {
  id: string; name: string; company: string; role: string;
  quote: string; rating: number; status: string; createdAt: string;
}

export default function AdminTestimonials() {
  const { authFetch } = useAdmin();
  const [items,   setItems]   = useState<Testimonial[]>([]);
  const [filter,  setFilter]  = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");

  const load = async () => {
    const res = await authFetch("/api/testimonials/all");
    const d   = await res.json();
    setItems(d.data ?? []);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    await authFetch(`/api/testimonials/${id}/status`, {
      method: "PUT", body: JSON.stringify({ status }),
    });
    load();
  };

  const del = async (id: string) => {
    if (!confirm("¿Eliminar testimonio?")) return;
    await authFetch(`/api/testimonials/${id}`, { method: "DELETE" });
    load();
  };

  const filtered = filter === "ALL" ? items : items.filter(i => i.status === filter);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Testimonios</h1>
        <p>{items.filter(i => i.status === "PENDING").length} pendientes de aprobación</p>
      </div>

      <div className="admin-filter-bar">
        {(["ALL","PENDING","APPROVED","REJECTED"] as const).map(f => (
          <button key={f} className={`admin-filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f === "ALL" ? "Todos" : f === "PENDING" ? "Pendientes" : f === "APPROVED" ? "Aprobados" : "Rechazados"}
            <span className="admin-filter-count">
              {f === "ALL" ? items.length : items.filter(i => i.status === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="admin-testimonials-list">
        {filtered.map(t => (
          <div key={t.id} className="admin-testimonial-card">
            <div className="admin-testimonial-header">
              <div>
                <strong>{t.name}</strong>
                <span>{t.role} · {t.company}</span>
              </div>
              <div className="admin-testimonial-meta">
                <span className="admin-stars">{"★".repeat(t.rating)}</span>
                <span className={`admin-badge ${t.status === "APPROVED" ? "green" : t.status === "REJECTED" ? "red" : "yellow"}`}>
                  {t.status === "APPROVED" ? "Aprobado" : t.status === "REJECTED" ? "Rechazado" : "Pendiente"}
                </span>
              </div>
            </div>
            <p className="admin-testimonial-quote">"{t.quote}"</p>
            <div className="admin-actions">
              {t.status !== "APPROVED"  && <button className="admin-btn-sm green"  onClick={() => setStatus(t.id, "APPROVED")}>Aprobar</button>}
              {t.status !== "REJECTED"  && <button className="admin-btn-sm danger" onClick={() => setStatus(t.id, "REJECTED")}>Rechazar</button>}
              <button className="admin-btn-sm danger" onClick={() => del(t.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="admin-empty">No hay testimonios en esta categoría.</p>}
      </div>
    </AdminLayout>
  );
}
