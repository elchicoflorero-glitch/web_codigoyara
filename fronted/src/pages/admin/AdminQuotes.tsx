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

function defaultBody(q: Quote): string {
  return `Gracias por tu interés en nuestros servicios, ${q.name}.

Hemos revisado tu solicitud para el proyecto de tipo "${q.projectType}" con un presupuesto estimado de ${q.budget}.

Nos pondremos en contacto contigo a la brevedad para coordinar una reunión y presentarte nuestra propuesta.

Saludos,
Equipo Código Yara`;
}

export default function AdminQuotes() {
  const { authFetch } = useAdmin();
  const [quotes,   setQuotes]   = useState<Quote[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter,   setFilter]   = useState<string>("ALL");

  // Auto-reply toggle
  const [autoReply,        setAutoReply]        = useState(false);
  const [autoReplyLoading, setAutoReplyLoading] = useState(true);
  const [autoReplySaving,  setAutoReplySaving]  = useState(false);

  // Reply modal state
  const [replyQuote,   setReplyQuote]   = useState<Quote | null>(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody,    setReplyBody]    = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyMsg,     setReplyMsg]     = useState<{ ok: boolean; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/quotes");
      const d   = await res.json();
      setQuotes(d.data ?? []);
    } finally { setLoading(false); }
  };

  const loadConfig = async () => {
    setAutoReplyLoading(true);
    try {
      const res = await authFetch("/api/config");
      const d   = await res.json();
      setAutoReply(d.autoReply ?? false);
    } finally { setAutoReplyLoading(false); }
  };

  useEffect(() => { load(); loadConfig(); }, []);

  const toggleAutoReply = async () => {
    const next = !autoReply;
    setAutoReplySaving(true);
    try {
      const res = await authFetch("/api/config", {
        method: "PUT",
        body: JSON.stringify({ autoReply: next }),
      });
      const d = await res.json();
      if (d.success) setAutoReply(d.autoReply);
    } finally { setAutoReplySaving(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    await authFetch(`/api/quotes/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    load();
  };

  const openReply = (q: Quote) => {
    setReplyQuote(q);
    setReplySubject(`Cotización ${q.projectType} - Código Yara`);
    setReplyBody(defaultBody(q));
    setReplyMsg(null);
  };

  const closeReply = () => {
    setReplyQuote(null);
    setReplyMsg(null);
  };

  const sendReply = async () => {
    if (!replyQuote) return;
    setReplySending(true);
    setReplyMsg(null);
    try {
      const res = await authFetch(`/api/quotes/${replyQuote.id}/reply`, {
        method: "POST",
        body: JSON.stringify({ subject: replySubject, body: replyBody }),
      });
      const d = await res.json();
      if (d.success) {
        setReplyMsg({ ok: true, text: "¡Respuesta enviada correctamente!" });
        load();
        setTimeout(closeReply, 1800);
      } else {
        setReplyMsg({ ok: false, text: d.message ?? "Error al enviar" });
      }
    } catch {
      setReplyMsg({ ok: false, text: "Error de conexión" });
    } finally {
      setReplySending(false);
    }
  };

  const filtered = filter === "ALL" ? quotes : quotes.filter(q => q.status === filter);

  return (
    <AdminLayout>
      {/* Page header + auto-reply toggle */}
      <div className="admin-page-header quotes-header">
        <div>
          <h1>Cotizaciones</h1>
          <p>{quotes.length} solicitudes recibidas · {quotes.filter(q => q.status === "PENDING").length} pendientes</p>
        </div>

        {/* Toggle */}
        <div className="autoreply-toggle-wrap">
          <span className="autoreply-toggle-label">
            {autoReply ? "Modo automático" : "Modo manual"}
          </span>
          <button
            className={`autoreply-toggle ${autoReply ? "active" : ""}`}
            onClick={toggleAutoReply}
            disabled={autoReplyLoading || autoReplySaving}
            title={autoReply ? "Desactivar respuesta automática" : "Activar respuesta automática"}
          >
            <span className="autoreply-toggle-thumb" />
          </button>
          <span className="autoreply-toggle-hint">
            {autoReply
              ? "El cliente recibe respuesta automática al cotizar"
              : "Responde manualmente desde el panel"}
          </span>
        </div>
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
                    <button className="admin-btn-sm green" onClick={() => openReply(q)}>
                      ✉ Responder
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p className="admin-empty">No hay cotizaciones en esta categoría.</p>}
        </div>
      )}

      {/* ── Reply Modal ── */}
      {replyQuote && (
        <div className="amodal-overlay" onClick={(e) => e.target === e.currentTarget && closeReply()}>
          <div className="amodal-box reply-modal-box">
            <div className="amodal-header">
              <h2 className="amodal-title">Responder a {replyQuote.name}</h2>
              <button className="amodal-close" onClick={closeReply}>×</button>
            </div>

            <div className="amodal-body">
              <div className="reply-to-bar">
                <span className="reply-to-label">Para:</span>
                <span className="reply-to-email">{replyQuote.name} &lt;{replyQuote.email}&gt;</span>
              </div>
              <div className="reply-field">
                <label className="reply-field-label">Asunto</label>
                <input
                  className="reply-input"
                  value={replySubject}
                  onChange={e => setReplySubject(e.target.value)}
                  placeholder="Asunto del correo"
                />
              </div>
              <div className="reply-field">
                <label className="reply-field-label">Mensaje</label>
                <textarea
                  className="reply-textarea"
                  value={replyBody}
                  onChange={e => setReplyBody(e.target.value)}
                  rows={12}
                  placeholder="Escribe tu respuesta..."
                />
              </div>
              {replyMsg && (
                <p className={replyMsg.ok ? "admin-success" : "admin-error"} style={{ marginTop: 8 }}>
                  {replyMsg.text}
                </p>
              )}
            </div>

            <div className="reply-modal-footer">
              <button className="admin-btn-ghost" onClick={closeReply} disabled={replySending}>
                Cancelar
              </button>
              <button
                className="admin-btn-primary"
                onClick={sendReply}
                disabled={replySending || !replySubject.trim() || !replyBody.trim()}
              >
                {replySending ? "Enviando…" : "Enviar respuesta ✉"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
