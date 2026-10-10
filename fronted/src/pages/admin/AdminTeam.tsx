import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import AdminModal from "./AdminModal";
import { useAdmin } from "./useAdmin";
import ImageUpload from "./ImageUpload";

interface Member {
  id: string; name: string; role: string; active: boolean; order: number; photo?: string;
}
interface FormData {
  name: string; role: string; bio: string; initials: string;
  color: string; linkedin: string; order: string; active: boolean; photo: string;
}
const EMPTY: FormData = {
  name: "", role: "", bio: "", initials: "",
  color: "#246bfe", linkedin: "", order: "0", active: true, photo: "",
};

export default function AdminTeam() {
  const { authFetch } = useAdmin();
  const [members,    setMembers]    = useState<Member[]>([]);
  const [form,       setForm]       = useState<FormData>(EMPTY);
  const [editing,    setEditing]    = useState<string | null>(null);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [msg,        setMsg]        = useState("");

  const load = async () => {
    const res = await authFetch("/api/team");
    const d   = await res.json();
    setMembers(d.data ?? []);
  };
  useEffect(() => { load(); }, []);

  const upd = (k: keyof FormData, v: string | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }));

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
    e.preventDefault(); setLoading(true); setMsg("");
    try {
      const body = { ...form, order: parseInt(form.order) };
      const res = editing
        ? await authFetch(`/api/team/${editing}`, { method: "PUT",  body: JSON.stringify(body) })
        : await authFetch("/api/team",             { method: "POST", body: JSON.stringify(body) });
      const d = await res.json();
      if (!d.success) throw new Error(d.message ?? "Error");
      setMsg(editing ? "✓ Miembro actualizado" : "✓ Miembro creado");
      load();
      setTimeout(() => closeModal(), 900);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error");
    } finally { setLoading(false); }
  };

  const del = async (id: string) => {
    if (!confirm("¿Eliminar miembro?")) return;
    await authFetch(`/api/team/${id}`, { method: "DELETE" });
    load();
  };

  const edit = (m: Member) => {
    setEditing(m.id);
    setMsg("");
    setForm({
      name: m.name, role: m.role,
      bio: (m as any).bio ?? "", initials: (m as any).initials ?? "",
      color: (m as any).color ?? "#246bfe",
      linkedin: (m as any).linkedin ?? "",
      order: String(m.order),
      active: m.active, photo: m.photo ?? "",
    });
    setModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Equipo</h1>
        <p>{members.length} miembros</p>
        <button className="admin-btn-primary" onClick={openNew}>
          + Nuevo miembro
        </button>
      </div>

      {/* ── List ── */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Orden</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#a0a0a0", padding: 32 }}>
                Sin miembros aún
              </td></tr>
            )}
            {members.map(m => (
              <tr key={m.id}>
                <td>
                  {m.photo ? (
                    <img src={m.photo} alt={m.name}
                      style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a1a2e",
                      display: "grid", placeItems: "center", fontSize: 11, color: "#a0a0a0" }}>—</div>
                  )}
                </td>
                <td><strong style={{ color: "white" }}>{m.name}</strong></td>
                <td>{m.role}</td>
                <td>{m.order}</td>
                <td>
                  <span className={`admin-badge ${m.active ? "green" : "gray"}`}>
                    {m.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="admin-actions">
                  <button onClick={() => edit(m)} className="admin-btn-sm">Editar</button>
                  <button onClick={() => del(m.id)} className="admin-btn-sm danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      <AdminModal
        open={modalOpen}
        title={editing ? "Editar miembro" : "Nuevo miembro"}
        onClose={closeModal}
        width={580}
      >
        <form onSubmit={save} className="admin-form">
          <div className="admin-form-row">
            <label>Nombre<input required value={form.name} onChange={e => upd("name", e.target.value)} placeholder="Laura Vega" /></label>
            <label>Rol<input required value={form.role} onChange={e => upd("role", e.target.value)} placeholder="CEO & Co-fundadora" /></label>
          </div>
          <div className="admin-form-row">
            <label>Iniciales<input required maxLength={3} value={form.initials} onChange={e => upd("initials", e.target.value)} placeholder="LV" /></label>
            <label>Color<input type="color" value={form.color} onChange={e => upd("color", e.target.value)} /></label>
            <label>Orden<input type="number" value={form.order} onChange={e => upd("order", e.target.value)} /></label>
          </div>
          <label>Bio<textarea rows={3} required value={form.bio} onChange={e => upd("bio", e.target.value)} /></label>
          <label>LinkedIn URL<input type="url" value={form.linkedin} onChange={e => upd("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." /></label>

          <ImageUpload
            label="Foto del miembro (máx 500KB)"
            value={form.photo}
            onChange={v => upd("photo", v)}
            maxKB={500}
          />

          <label className="admin-checkbox">
            <input type="checkbox" checked={form.active} onChange={e => upd("active", e.target.checked)} />
            Activo
          </label>

          {msg && (
            <p className={msg.startsWith("✓") ? "admin-success" : "admin-error"}>{msg}</p>
          )}

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? "Guardando..." : editing ? "Actualizar miembro" : "Crear miembro"}
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
