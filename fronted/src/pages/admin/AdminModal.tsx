import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface AdminModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: number; // px, default 680
}

export default function AdminModal({
  open,
  title,
  onClose,
  children,
  width = 680,
}: AdminModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="amodal-overlay"
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="amodal-box" style={{ maxWidth: width }}>
        {/* Header */}
        <div className="amodal-header">
          <h2 className="amodal-title">{title}</h2>
          <button
            type="button"
            className="amodal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className="amodal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
