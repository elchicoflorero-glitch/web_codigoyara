import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, SectionHeading } from "@/components/ui";
import OrbitalThree from "@/components/ui/OrbitalThree";
import ModelViewer from "@/components/ui/ModelViewer";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

import webUrl    from "@/assets/web.glb?url";
import mobileUrl from "@/assets/mobile.glb?url";
import serverUrl from "@/assets/server.glb?url";
import laptopUrl from "@/assets/laptop.glb?url";
import cartUrl   from "@/assets/cart.glb?url";
import chipUrl   from "@/assets/chip.glb?url";

import { services as staticServices } from "@/data";

const SERVICE_MODELS = [chipUrl, webUrl, mobileUrl, serverUrl, laptopUrl, cartUrl];
const RADIUS = 210;
const CENTER = 260;

export default function Services() {
  const { lang } = useLang();
  const tr = t(lang).services;

  const [active, setActive] = useState(0);
  const orbitRef    = useRef(0);
  const pausedRef   = useRef(false);
  const rafRef      = useRef<number>(0);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    const loop = () => {
      if (!pausedRef.current) {
        orbitRef.current += 0.003;
        setOrbitAngle(orbitRef.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleSelect = (i: number) => {
    setActive(i);
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 3000);
  };

  // Use translated items but keep icon from static data
  const items = tr.items.map((item, i) => ({ ...staticServices[i], ...item }));
  const currentService  = items[active];
  const currentModelUrl = SERVICE_MODELS[active];

  return (
    <section className="section services-section services-orbital" id="servicios">
      <div className="container">
        <SectionHeading
          eyebrow={tr.eyebrow}
          title={tr.title}
          text={tr.text}
        />

        <div className="orbital-layout">
          {/* ── Orbit stage ── */}
          <div className="orbital-stage">
            <OrbitalThree />
            <div className="orbit-ring" />
            {items.map((svc, i) => {
              const angle = (i / items.length) * Math.PI * 2 + orbitAngle;
              const x = CENTER + Math.cos(angle) * RADIUS;
              const y = CENTER + Math.sin(angle) * RADIUS;
              const isActive = active === i;
              return (
                <motion.button
                  key={i}
                  className={`orbital-node ${isActive ? "orbital-node-active" : ""}`}
                  style={{ left: x, top: y }}
                  onClick={() => handleSelect(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  aria-label={svc.title}
                  title={svc.title}
                >
                  <Icon name={svc.icon} size={20} />
                  {isActive && (
                    <motion.div
                      className="node-pulse"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ── Detail panel ── */}
          <div className="orbital-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${lang}`}
                className="orbital-detail"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="service-model-wrap">
                  <ModelViewer modelUrl={currentModelUrl} height={200} autoRotate enableControls={false} />
                </div>
                <span className="orbital-detail-num">0{active + 1}</span>
                <h3>{currentService.title}</h3>
                <p>{currentService.text}</p>
                <motion.a
                  href="#contacto"
                  className="orbital-detail-cta"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {tr.cta} <Icon name="arrow" size={16} />
                </motion.a>
              </motion.div>
            </AnimatePresence>

            <div className="orbital-dots">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`orbital-dot ${active === i ? "active" : ""}`}
                  onClick={() => handleSelect(i)}
                  aria-label={`Servicio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
