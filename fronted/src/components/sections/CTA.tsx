import { useRef, useEffect } from "react";
import { Icon } from "@/components/ui";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

// Pexels free stock video — "View Of City In Timelapse Mode" (ID 1654216)
// License: Free to use, no attribution required — pexels.com/license
const VIDEO_SOURCES = [
  "https://videos.pexels.com/video-files/1654216/1654216-hd_1920_1080_30fps.mp4",
];

export default function CTA() {
  const { lang } = useLang();
  const nav = t(lang).nav;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure playback after mount (autoplay policy)
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="cta-section cta-video-section">
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="cta-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        {VIDEO_SOURCES.map(src => (
          <source key={src} src={src} type="video/mp4" />
        ))}
      </video>

      {/* ── Overlay ── */}
      <div className="cta-video-overlay" />

      {/* ── Grid texture ── */}
      <div className="cta-grid-bg" />

      {/* ── Content ── */}
      <div className="container cta-inner">
        <div>
          <span className="eyebrow eyebrow-dark"><span />Construyamos el futuro</span>
          <h2>¿Tienes una idea?<br />Hagámosla realidad.</h2>
        </div>
        <div className="cta-copy">
          <p>Cuéntanos qué necesitas y diseñemos juntos la solución tecnológica para tu negocio.</p>
          <div>
            <a href="#contacto" className="button button-white button-large">
              {nav.cta} <Icon name="arrow" size={18} />
            </a>
            <a href="mailto:hola@codigoyara.com" className="button button-dark-ghost button-large">
              Hablar con nosotros
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
