import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * Returns { ref, inView, progress } where progress is 0→1
 * based on how far the element has scrolled into view.
 */
export default function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -60px 0px" } = options;
  const ref     = useRef<T>(null);
  const [inView, setInView]     = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver for in-view trigger
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);

    // Scroll progress
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const p    = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, rootMargin]);

  return { ref, inView, progress };
}
