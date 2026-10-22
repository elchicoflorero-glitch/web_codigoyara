import { useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { useBg } from "@/lib/BgContext";
import { BG_VARIANTS, type BgVariant } from "@/lib/bgVariants";
import type { BgId } from "@/lib/BgContext";

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

  const handleApply = (id: BgId) => {
    setActiveBg(id);
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
