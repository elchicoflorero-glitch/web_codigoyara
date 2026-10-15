import { motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function IdeaToProduct() {
  const { lang } = useLang();
  const tr = t(lang).ideaToProduct;

  return (
    <section className="section itp-section itp-video-section">
      <div className="container">
        <motion.div
          className="itp-video-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow eyebrow-dark"><span />{tr.eyebrow}</span>
          <h2>{tr.title}</h2>
          <p>{tr.text}</p>
        </motion.div>

        <motion.div
          className="itp-video-wrap"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="itp-video-frame">
            <iframe
              src="https://www.youtube.com/embed/HI2AqFP9C84"
              title="Nuvora — Mira lo que construimos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
