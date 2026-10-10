import { useEffect, useRef } from "react";

/**
 * Adds a glowing orb that follows the cursor with smooth lerp.
 * Does NOT hide the native cursor — it adds a glow effect on top.
 * Magnetic pull on elements with class "magnetic".
 */
export default function useMagneticCursor() {
  const posRef    = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    // Create cursor glow orb
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.transform = "translate(-999px,-999px)";
    document.body.appendChild(cursor);

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Magnetic effect
      const el = (e.target as HTMLElement).closest?.(".magnetic") as HTMLElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        cursor.classList.add("cursor-magnetic");
      } else {
        document.querySelectorAll<HTMLElement>(".magnetic").forEach(m => {
          m.style.transform = "";
        });
        cursor.classList.remove("cursor-magnetic");
      }

      // Hover state
      const tag = (e.target as HTMLElement).tagName?.toLowerCase();
      const isClickable = tag === "a" || tag === "button" ||
        !!(e.target as HTMLElement).closest?.("a, button");
      cursor.classList.toggle("cursor-hover", isClickable);
    };

    const onDown  = () => cursor.classList.add("cursor-click");
    const onUp    = () => cursor.classList.remove("cursor-click");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    // Smooth lerp animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.1);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.1);
      cursor.style.transform =
        `translate(calc(${posRef.current.x}px - 50%), calc(${posRef.current.y}px - 50%))`;
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      cursor.remove();
    };
  }, []);
}
