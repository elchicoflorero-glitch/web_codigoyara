import { motion } from "framer-motion";

interface ProjectMockupProps {
  type: string;
  coverImage?: string | null;
}

export default function ProjectMockup({ type, coverImage }: ProjectMockupProps) {
  // If there's a real cover image, show it instead of the generic mockup
  if (coverImage) {
    return (
      <motion.div
        className="project-visual cover-visual"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <img
          src={coverImage}
          alt=""
          className="project-cover-img"
          loading="lazy"
        />
      </motion.div>
    );
  }

  if (type === "mobile") {
    return (
      <motion.div
        className="project-visual mobile-visual"
        whileHover={{ rotateY: 8, rotateX: -4, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
      >
        <div className="phone">
          <div className="phone-bar" />
          <small>Balance disponible</small>
          <strong>$24,890.00</strong>
          <div className="mini-chart">
            {[40, 60, 48, 75, 66, 90, 82].map((h, i) => (
              <motion.i
                key={i}
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="phone-row"><span /><span /><span /></div>
        </div>
        <motion.span
          className="float-pill"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          +18.4% este mes
        </motion.span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`project-visual ${type}-visual`}
      whileHover={{ rotateY: -6, rotateX: 3, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
    >
      <div className="mini-window">
        <div className="window-head"><span /><span /><span /></div>
        <div className="window-body">
          <div className="window-side">{[1,2,3,4].map(n => <i key={n} />)}</div>
          <div className="window-content">
            <div className="content-top"><span /><span /></div>
            <div className="content-grid"><div /><div /><div /></div>
            <div className="content-chart">
              {[42, 66, 52, 84, 71, 92, 78, 88].map((h, i) => (
                <motion.i
                  key={i}
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
