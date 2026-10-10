import { useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { useBg } from "@/lib/BgContext";
import { BG_VARIANTS, type BgVariant } from "@/lib/bgVariants";
import type { BgId } from "@/lib/BgContext";

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
      {/* Active badge */}
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
        {BG_VARIANTS.map(v => (
          <BgCard
            key={v.id}
            variant={v}
            isActive={activeBg === v.id}
            onApply={handleApply}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
