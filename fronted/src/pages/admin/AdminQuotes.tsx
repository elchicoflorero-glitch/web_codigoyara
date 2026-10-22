import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAdmin } from "./useAdmin";

interface Quote {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING:     "Pendiente",
  CONTACTED:   "Contactado",
  IN_PROGRESS: "En progreso",
  CLOSED:      "Cerrado",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING:     "yellow",
  CONTACTED:   "green",
  IN_PROGRESS: "green",
  CLOSED:      "gray",
};

export default function AdminQuotes() {
  const { authFetch } = useAdmin();
  const [quotes,   setQuotes]   = useState<Quote[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter,   setFilter]   = useState<string>("ALL");

  const load = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/quotes");
      const d   = await res.json();
      setQuotes(d.data ?? []);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await authFetch(`/api/quotes/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    load();
  };

  const filtered = filter === "ALL" ? quotes : quotes.filter(q => q.status === filter);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Cotizaciones</h1>
        <p>{quotes.length} solicitudes recibidas · {quotes.filter(q => q.status === "PENDING").length} pendientes</p>
      </div>

      {/* Filter bar */}
      <div className="admin-filter-bar">
        {(["ALL", "PENDING", "CONTACTED", "IN_PROGRESS", "CLOSED"] as const).map(f => (
          <button
            key={f}
            className={`admin-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "Todas" : STATUS_LABELS[f]}
            <span className="admin-filter-count">
              {f === "ALL" ? quotes.length : quotes.filter(q => q.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "#a0a0a0" }}>Cargando...</p>
      ) : (
        <div className="admin-quotes-list">
          {filtered.map(q => (
            <div key={q.id} className="admin-quote-card">
              {/* Header */}
              <div className="admin-quote-header" onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
                <div className="admin-quote-info">
                  <strong>{q.name}</strong>
                  <span>{q.company}</span>
                </div>
                <div className="admin-quote-meta">
                  <span className="admin-quote-type">{q.projectType}</span>
                  <span className="admin-quote-budget">{q.budget}</span>
                  <span className={`admin-badge ${STATUS_COLORS[q.status] ?? "gray"}`}>
                    {STATUS_LABELS[q.status] ?? q.status}
                  </span>
                  <span className="admin-quote-date">
                    {new Date(q.createdAt).toLocaleDateString("es-PE")}
                  </span>
                  <span className="admin-quote-toggle">{expanded === q.id ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === q.id && (
                <div className="admin-quote-detail">
                  <div className="admin-quote-detail-grid">
                    <div>
                      <small>Email</small>
                      <a href={`mailto:${q.email}`}>{q.email}</a>
                    </div>
                    {q.phone && (
                      <div>
                        <small>Teléfono</small>
                        <a href={`tel:${q.phone}`}>{q.phone}</a>
                      </div>
                    )}
                    <div>
                      <small>Tipo de proyecto</small>
                      <span>{q.projectType}</span>
                    </div>
                    <div>
                      <small>Presupuesto</small>
                      <span>{q.budget}</span>
                    </div>
                  </div>

                  <div className="admin-quote-message">
                    <small>Mensaje</small>
                    <p>{q.message}</p>
                  </div>

                  <div className="admin-quote-actions">
                    <span style={{ color: "#a0a0a0", fontSize: 11 }}>Cambiar estado:</span>
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        className={`admin-btn-sm ${q.status === key ? "green" : ""}`}
                        onClick={() => updateStatus(q.id, key)}
                        disabled={q.status === key}
                      >
                        {label}
                      </button>
                    ))}
                    <a href={`mailto:${q.email}?subject=Re: Cotización ${q.projectType} - CodigoYara`}
                       className="admin-btn-sm green">
                      Responder →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p className="admin-empty">No hay cotizaciones en esta categoría.</p>}
        </div>
      )}
    </AdminLayout>
  );
}
