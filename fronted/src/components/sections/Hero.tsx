import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Icon } from "@/components/ui";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ModelViewer from "@/components/ui/ModelViewer";
import { copyVariants, itemVariant } from "@/lib/motionVariants";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

import jellyfishUrl from "@/assets/source/waifu122.glb?url";

export default function Hero() {
  const { lang } = useLang();
  const tr = t(lang).hero;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const y1      = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2      = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  const springY1 = useSpring(y1, { stiffness: 80, damping: 20 });
  const springY2 = useSpring(y2, { stiffness: 80, damping: 20 });

  return (
    <section ref={heroRef} className="hero dark-section hero-v2" id="inicio">
      <div className="hero-grid-bg" />

      <motion.div className="hero-glow hero-glow-one"   style={{ y: springY1 }} />
      <motion.div className="hero-glow hero-glow-two"   style={{ y: springY2 }} />
      <motion.div className="hero-glow hero-glow-three" style={{ y: springY1 }} />

      <motion.div className="container hero-grid" style={{ opacity, scale }}>

        {/* Copy */}
        <motion.div className="hero-copy" variants={copyVariants} initial="hidden" animate="show">
          <motion.div className="status-pill status-pill-v2" variants={itemVariant}>
            <span /><b>{tr.pill}</b>
          </motion.div>

          <motion.h1 className="hero-h1-v2" variants={itemVariant}>
            {tr.h1a}{" "}
            <span className="typewriter-word">
              <span className="tw-cycle">{tr.h1verb}</span>
            </span>
            {" "}{tr.h1b}
          </motion.h1>

          <motion.p className="hero-desc-v2" variants={itemVariant}>
            {tr.desc}
          </motion.p>

          <motion.div className="hero-actions hero-actions-v2" variants={itemVariant}>
            <motion.a
              className="button button-primary button-glow button-large magnetic"
              href="#contacto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {tr.ctaPrimary} <Icon name="arrow" size={18} />
            </motion.a>
            <motion.a
              className="button button-glass button-large magnetic"
              href="#servicios"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {tr.ctaSecondary}
            </motion.a>
          </motion.div>

          <motion.div className="hero-tags hero-tags-v2" variants={itemVariant}>
            {[tr.tag1, tr.tag2, tr.tag3].map((tag) => (
              <motion.span key={tag} whileHover={{ scale: 1.06 }}>
                <Icon name="check" size={15} />{tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          className="hero-visual hero-visual-v2"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <ModelViewer modelUrl={jellyfishUrl} height={520} autoRotate enableControls />
        </motion.div>
      </motion.div>

      {/* Trust strip */}
      <motion.div
        className="container trust-strip trust-strip-v2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        <div>
          <strong>+<AnimatedCounter target={50} duration={1600} /></strong>
          <span>{tr.stat1label}</span>
        </div>
        <div>
          <strong><AnimatedCounter target={99} duration={1800} suffix="%" /></strong>
          <span>{tr.stat2label}</span>
        </div>
        <div><Icon name="spark" /><span>{tr.stat3label}</span></div>
        <div><Icon name="support" /><span>{tr.stat4label}</span></div>
      </motion.div>

      <a href="#servicios" className="scroll-indicator" aria-label="Ver más contenido">
        <span className="scroll-mouse"><span className="scroll-wheel" /></span>
        <span className="scroll-label">Scroll</span>
      </a>
    </section>
  );
}
