import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import AdminModal from "./AdminModal";
import { useAdmin } from "./useAdmin";
import ImageUpload from "./ImageUpload";
import MediaUpload from "./MediaUpload";

interface Project {
  id: string; slug: string; title: string; label: string;
  published: boolean; createdAt: string;
  coverImage?: string;
  images?: string[];
}

interface FormData {
  slug: string; title: string; label: string; type: string;
  text: string; stack: string; tagline: string; challenge: string;
  solution: string; duration: string; year: string; color: string;
  published: boolean; features: string;
  results: string;
  coverImage: string;
  images: string[];
  videos: string[];
}

const EMPTY: FormData = {
  slug: "", title: "", label: "", type: "dashboard",
  text: "", stack: "", tagline: "", challenge: "",
  solution: "", duration: "3 meses", year: "2026",
  color: "#246bfe", published: false,
  features: "", results: '[{"metric":"","label":""}]',
  coverImage: "",
  images: [],
  videos: [],
};

export default function AdminProjects() {
  const { authFetch } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form,     setForm]     = useState<FormData>(EMPTY);
  const [editing,  setEditing]  = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [msg,      setMsg]      = useState("");

  const load = async () => {
    const res = await authFetch("/api/projects/all");
    const d   = await res.json();
    setProjects(d.data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setMsg("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY);
    setMsg("");
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    try {
      const body = {
        ...form,
        stack:    form.stack.split(",").map(s => s.trim()).filter(Boolean),
        features: form.features.split("\n").map(s => s.trim()).filter(Boolean),
        results:  JSON.parse(form.results),
        coverImage: form.coverImage || null,
        images: form.images,
        videos: form.videos,
      };
      const res = editing
        ? await authFetch(`/api/projects/${editing}`, { method: "PUT",  body: JSON.stringify(body) })
        : await authFetch("/api/projects",             { method: "POST", body: JSON.stringify(body) });
      const d = await res.json();
      if (!d.success) {
        if (d.errors) {
          const msgs = Object.entries(d.errors as Record<string, string[]>)
            .map(([field, errs]) => `${field}: ${(errs as string[]).join(", ")}`)
            .join(" | ");
          throw new Error(msgs || d.message || "Error de validación");
        }
        throw new Error(d.message ?? "Error");
      }
      setMsg(editing ? "✓ Proyecto actualizado" : "✓ Proyecto creado");
      load();
      // Close after short delay so user sees the success message
      setTimeout(() => closeModal(), 900);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error");
    } finally { setLoading(false); }
  };

  const del = async (id: string) => {
    if (!confirm("¿Eliminar proyecto?")) return;
    await authFetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  const edit = (p: Project) => {
    setMsg("");
    setEditing(p.id);
    authFetch(`/api/projects/${p.slug}`).then(r => r.json()).then(d => {
      const pr = d.data;
      setForm({
        slug: pr.slug, title: pr.title, label: pr.label, type: pr.type,
        text: pr.text, stack: pr.stack.join(", "), tagline: pr.tagline,
        challenge: pr.challenge, solution: pr.solution,
        duration: pr.duration, year: pr.year, color: pr.color,
        published: pr.published,
        features: pr.features.join("\n"),
        results: JSON.stringify(pr.results.map((r: any) => ({ metric: r.metric, label: r.label }))),
        coverImage: pr.coverImage ?? "",
        images: pr.images ?? [],
        videos: pr.videos ?? [],
      });
      setModalOpen(true);
    });
  };

  const upd = (k: keyof FormData, v: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const thumb = (p: Project) => p.coverImage || p.images?.[0] || null;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Proyectos</h1>
        <p>{projects.length} proyectos en total</p>
        <button className="admin-btn-primary" onClick={openNew}>
          + Nuevo proyecto
        </button>
      </div>

      {/* ── List ── */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Slug</th>
              <th>Galería</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#a0a0a0", padding: 32 }}>
                Sin proyectos aún
              </td></tr>
            )}
            {projects.map(p => {
              const t = thumb(p);
              const imgCount = (p.images ?? []).length;
              return (
                <tr key={p.id}>
                  <td>
                    {t ? (
                      <img src={t} alt={p.title}
                        style={{ width: 64, height: 40, objectFit: "cover", borderRadius: 6, display: "block" }} />
                    ) : (
                      <div style={{ width: 64, height: 40, background: "#1a1a2e", borderRadius: 6,
                        display: "grid", placeItems: "center", fontSize: 10, color: "#a0a0a0" }}>—</div>
                    )}
                  </td>
                  <td><strong style={{ color: "white" }}>{p.title}</strong></td>
                  <td><code>{p.slug}</code></td>
                  <td>
                    {imgCount > 0 ? (
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {(p.images ?? []).slice(0, 4).map((src, i) => (
                          <img key={i} src={src} alt=""
                            style={{ width: 32, height: 20, objectFit: "cover", borderRadius: 3 }} />
                        ))}
                        {imgCount > 4 && (
                          <span style={{ fontSize: 10, color: "#a0a0a0", alignSelf: "center" }}>+{imgCount - 4}</span>
                        )}
                      </div>
                    ) : <span style={{ color: "#a0a0a0", fontSize: 12 }}>—</span>}
                  </td>
                  <td>
                    <span className={`admin-badge ${p.published ? "green" : "gray"}`}>
                      {p.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="admin-actions">
                    <button onClick={() => edit(p)} className="admin-btn-sm">Editar</button>
                    <button onClick={() => del(p.id)} className="admin-btn-sm danger">Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      <AdminModal
        open={modalOpen}
        title={editing ? "Editar proyecto" : "Nuevo proyecto"}
        onClose={closeModal}
        width={760}
      >
        <form onSubmit={save} className="admin-form">
          <div className="admin-form-row">
            <label>Título<input required value={form.title} onChange={e => upd("title", e.target.value)} placeholder="Nexo ERP" /></label>
            <label>Slug<input required value={form.slug} onChange={e => upd("slug", e.target.value)} placeholder="nexo-erp" /></label>
          </div>
          <div className="admin-form-row">
            <label>Label<input required value={form.label} onChange={e => upd("label", e.target.value)} placeholder="Operaciones" /></label>
            <label>Tipo
              <select value={form.type} onChange={e => upd("type", e.target.value)}>
                <option value="dashboard">Dashboard</option>
                <option value="mobile">Mobile</option>
                <option value="saas">SaaS</option>
              </select>
            </label>
          </div>
          <label>Tagline<input required value={form.tagline} onChange={e => upd("tagline", e.target.value)} placeholder="La operación en un solo lugar" /></label>
          <label>Descripción corta<textarea rows={2} required value={form.text} onChange={e => upd("text", e.target.value)} /></label>
          <label>Stack (separado por comas)<input value={form.stack} onChange={e => upd("stack", e.target.value)} placeholder="React, NestJS, PostgreSQL" /></label>
          <div className="admin-form-row">
            <label>Duración<input value={form.duration} onChange={e => upd("duration", e.target.value)} /></label>
            <label>Año<input value={form.year} onChange={e => upd("year", e.target.value)} /></label>
            <label>Color<input type="color" value={form.color} onChange={e => upd("color", e.target.value)} /></label>
          </div>
          <label>Desafío<textarea rows={3} required value={form.challenge} onChange={e => upd("challenge", e.target.value)} /></label>
          <label>Solución<textarea rows={3} required value={form.solution} onChange={e => upd("solution", e.target.value)} /></label>
          <label>Features (una por línea)<textarea rows={3} value={form.features} onChange={e => upd("features", e.target.value)} /></label>
          <label>
            Resultados (JSON)
            <textarea rows={3} value={form.results} onChange={e => upd("results", e.target.value)}
              placeholder='[{"metric":"62%","label":"Reducción errores"}]' />
          </label>

          <ImageUpload
            label="Imagen de portada (máx 800KB)"
            value={form.coverImage}
            onChange={v => upd("coverImage", v)}
            maxKB={800}
          />

          <div>
            <p style={{ fontSize: 11, color: "#a0a0a0", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>
              Galería del proyecto
            </p>
            <MediaUpload
              images={form.images}
              videos={form.videos}
              onImagesChange={imgs => upd("images", imgs)}
              onVideosChange={vids => upd("videos", vids)}
              maxKB={800}
              maxImages={10}
            />
          </div>

          <label className="admin-checkbox">
            <input type="checkbox" checked={form.published} onChange={e => upd("published", e.target.checked)} />
            Publicado
          </label>

          {msg && (
            <p className={msg.startsWith("✓") ? "admin-success" : "admin-error"}>{msg}</p>
          )}

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? "Guardando..." : editing ? "Actualizar proyecto" : "Crear proyecto"}
            </button>
            <button type="button" className="admin-btn-ghost" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </AdminModal>
    </AdminLayout>
  );
}
