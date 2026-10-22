import { useEffect, useRef, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useBg } from "@/lib/BgContext";
import { BG_VARIANTS, type BgVariant } from "@/lib/bgVariants";
import type { BgId } from "@/lib/BgContext";

/* ── Extraer ID de YouTube de una URL ────────────────────── */
function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

/* ── Custom video card ───────────────────────────────────── */
function CustomVideoBgCard({ isActive, onApply }: { isActive: boolean; onApply: (id: BgId, videoId: string) => void }) {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleApply = () => {
    const ytId = extractYoutubeId(url.trim());
    if (!ytId) { setError("URL de YouTube inválida"); return; }
    setError("");
    setPreview(ytId);
    onApply("custom", ytId);
  };

  return (
    <div className={`bg-variant-card ${isActive ? "bg-variant-active" : ""}`} style={{ gridColumn: "1 / -1" }}>
      {isActive && <div className="bg-variant-badge">✓ Aplicado</div>}

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 20 }}>🎬</span>
          <span className="bg-variant-label">Video Personalizado</span>
        </div>
        <p className="bg-variant-desc" style={{ marginBottom: 14 }}>
          Pega cualquier URL de YouTube y úsala como fondo animado del sitio.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={e => { setUrl(e.target.value); setError(""); }}
            style={{
              flex: 1, minWidth: 240, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8, padding: "9px 14px", color: "#fff", fontSize: 13, outline: "none",
            }}
          />
          <button
            className="bg-variant-apply-btn"
            onClick={handleApply}
            style={{ whiteSpace: "nowrap" }}
          >
            Aplicar video
          </button>
        </div>
        {error && <p style={{ color: "#ff6b6b", fontSize: 12, marginTop: 6 }}>{error}</p>}
      </div>

      {preview && (
        <div style={{ padding: "14px 20px 16px", position: "relative" }}>
          <img
            src={`https://img.youtube.com/vi/${preview}/hqdefault.jpg`}
            alt="preview"
            style={{ width: "100%", maxHeight: 140, objectFit: "cover", borderRadius: 8, opacity: 0.85 }}
          />
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            fontSize: 28, opacity: 0.9,
          }}>▶</div>
        </div>
      )}
    </div>
  );
}

/* ── YouTube thumbnail card ──────────────────────────────── */
function YoutubeBgCard({
  variant,
  isActive,
  onApply,
}: {
  variant: BgVariant;
  isActive: boolean;
  onApply: (id: BgId) => void;
}) {
  return (
    <div className={`bg-variant-card ${isActive ? "bg-variant-active" : ""}`}>
      {isActive && <div className="bg-variant-badge">✓ Aplicado</div>}

      <div className="bg-variant-canvas" style={{ position: "relative", overflow: "hidden", background: "#000" }}>
        <img
          src={`https://img.youtube.com/vi/${variant.youtubeId}/hqdefault.jpg`}
          alt={variant.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
        />
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.3)",
        }}>
          <span style={{ fontSize: 32, opacity: 0.9 }}>▶</span>
        </div>
        <div style={{
          position: "absolute", bottom: 6, right: 8,
          background: "rgba(255,0,0,0.85)", color: "#fff",
          fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
        }}>YouTube</div>
      </div>

      <div className="bg-variant-info">
        <div className="bg-variant-info-row">
          <span className="bg-variant-label">{variant.label}</span>
          <button
            className={`bg-variant-apply-btn ${isActive ? "applied" : ""}`}
            onClick={() => onApply(variant.id)}
            disabled={isActive}
          >
            {isActive ? "Activo" : "Aplicar"}
          </button>
        </div>
        <p className="bg-variant-desc">{variant.description}</p>
      </div>
    </div>
  );
}

/* ── Canvas preview card ─────────────────────────────────── */
function BgCard({
  variant,
  isActive,
  onApply,
}: {
  variant: BgVariant;
  isActive: boolean;
  onApply: (id: BgId) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    if (variant.id === "matrix") {
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#000500";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const ctx = canvas.getContext("2d")!;
    const loop = () => {
      tRef.current += 0.016;
      variant.draw(ctx, canvas.width, canvas.height, tRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [variant]);

  return (
    <div className={`bg-variant-card ${isActive ? "bg-variant-active" : ""}`}>
      {isActive && (
        <div className="bg-variant-badge">✓ Aplicado</div>
      )}

      <canvas ref={canvasRef} className="bg-variant-canvas" />

      <div className="bg-variant-info">
        <div className="bg-variant-info-row">
          <span className="bg-variant-label">{variant.label}</span>
          <button
            className={`bg-variant-apply-btn ${isActive ? "applied" : ""}`}
            onClick={() => onApply(variant.id)}
            disabled={isActive}
          >
            {isActive ? "Activo" : "Aplicar"}
          </button>
        </div>
        <p className="bg-variant-desc">{variant.description}</p>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function AdminDesigns() {
  const { activeBg, setActiveBg } = useBg();

  const handleApply = (id: BgId, videoId?: string) => {
    setActiveBg(id, videoId);
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Diseños de Fondo</h1>
          <p>
            Activo:{" "}
            <strong style={{ color: "#ffd21f" }}>
              {BG_VARIANTS.find(v => v.id === activeBg)?.label ?? activeBg}
            </strong>
            {" "}— el cambio se aplica en tiempo real al sitio público.
          </p>
        </div>
      </div>

      <div className="bg-variants-grid">
        {/* Custom video card — spans full width */}
        <CustomVideoBgCard
          isActive={activeBg === "custom"}
          onApply={handleApply}
        />

        {BG_VARIANTS.map(v =>
          v.type === "youtube" ? (
            <YoutubeBgCard
              key={v.id}
              variant={v}
              isActive={activeBg === v.id}
              onApply={handleApply}
            />
          ) : (
            <BgCard
              key={v.id}
              variant={v}
              isActive={activeBg === v.id}
              onApply={handleApply}
            />
          )
        )}
      </div>
    </AdminLayout>
  );
}
