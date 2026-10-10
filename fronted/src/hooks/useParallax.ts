import { useEffect, useRef } from "react";

/**
 * Applies a subtle vertical parallax offset on scroll
 * to the referenced element. `speed` controls intensity (0–1).
 */
export default function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.12
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const center = rect.top + rect.height / 2 - viewH / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
