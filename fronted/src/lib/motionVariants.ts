import type { Variants } from "framer-motion";

// Framer Motion 14 requires ease as string, not number[]
// Use named easing or cubic-bezier string format
const EASE = "easeOut";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

export const floatIn: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.7, ease: EASE } },
};

export const itemVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const copyVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};
